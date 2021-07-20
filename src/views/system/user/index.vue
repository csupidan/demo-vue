<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.query"
          placeholder="请输入用户名、姓名或电话"
          style="width: 260px; padding-right: 5px"
          class="filter-item"
          clearable
          size="small"
          @keyup.enter.native="crud.toQuery"
        />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!-- 表单组件-->
    <!-- eslint-disable -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="400px"
    >
      <!-- :rules="rules" -->
      <el-form ref="form" :rules="rules" :model="form" size="small" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="crud.status.edit ? true : false" style="width: 200px" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 200px" />
        </el-form-item>
        <el-form-item v-if="crud.status.edit ? false : true" label="密码" prop="password">
          <el-input v-model="form.password" type="password" style="width: 200px" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" style="width: 200px" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.roles" multiple placeholder="Please select">
            <el-option v-for="item in rulesOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="disabled">
          <el-select v-model="form.disabled" placeholder="Please select">
            <el-option v-for="item in disableOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染 -->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" border @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="roles" label="角色">
        <template slot-scope="scope">
          <el-tag v-for="role in scope.row.roles" :key="role" class="tag-space">
            {{ role === 'ADMIN' ? '管理员' : role === 'user' ? '普通用户' : role === 'Audit' ? '审计员' : '' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="disabled" label="是否启用" width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disabled"
            :active-value="false"
            :inactive-value="true"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.disabled)"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="checkPer(['admin'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <udOperation :data.sync="scope.row" :permission="permission" :disabledDle="scope.row.disabled ? false : true" style="display: inline" />
          <div style="display: inline">
            <el-button title="重置密码" size="mini" type="primary" icon="el-icon-lock" circle @click="clickPass(scope.row, scope.$index)" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改密码组件 -->
    <updatePass ref="pass" :uid="uid" />
    <!--分页组件-->
    <pagination />
  </div>
</template>

<!-- eslint-disable -->
<script>
import crudUser from '@/api/system/user'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import updatePass from './updatePass'

const defaultForm = { id: null, username: null, password: null, name: null, roles: [], phone: null, disabled: null }
export default {
  name: 'SystemUser',
  components: { pagination, crudOperation, rrOperation, udOperation, updatePass },
  cruds() {
    return CRUD({ title: '用户', url: 'users', crudMethod: { ...crudUser } })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      // loading: false,
      permission: {
        add: ['admin', 'user:add'],
        edit: ['admin', 'user:edit'],
        del: ['admin', 'user:del']
      },
      disableOptions: [
        {
          value: true,
          label: '禁用'
        },
        {
          value: false,
          label: '启用'
        }
      ],
      rulesOptions: [
        {
          value: 'ADMIN',
          label: '管理员'
        },
        {
          value: 'user',
          label: '普通用户'
        },
        {
          value: 'Audit',
          label: '审计用户'
        }
      ],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        disabled: [{ required: true, message: '请选择账户状态', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      uid: ''
    }
  },
  methods: {
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 ' + (val ? '禁用 ' : '启用 ') + data.username + '账号, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          crudUser
            .edit(data)
            .then(() => {
              this.crud.notify('成功', 'success')
              this.crud.refresh()
            })
            .catch(err => {
              data.disabled = !data.disabled
              console.log(err.data.message)
            })
        })
        .catch(() => {
          console.log('come catch')
          data.disabled = !data.disabled
        })
    },
    clickPass(row, index) {
      this.$refs.pass.dialog = true
      this.uid = row.id
    },
    [CRUD.HOOK.beforeToEdit]() {
      this.crud.refresh()
      console.log('执行toedit钩子函数')
    }
  },
  created() {
    // 控制是否启用头部crud组件
    this.crud.optShow = {
      add: true,
      edit: true,
      del: true,
      download: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
.tag-space {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
