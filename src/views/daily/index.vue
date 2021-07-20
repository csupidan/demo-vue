<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.employee" placeholder="姓名" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button type="primary" style="margin-left: 10px" class="filter-item" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" style="margin-left: 10px" class="filter-item" icon="el-icon-edit-outline" @click="handleCreate">创建</el-button>
      <el-button type="primary" style="margin-left: 10px" class="filter-item" icon="el-icon-download">导出</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="id" width="60">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="员工" width="100">
        <template slot-scope="scope">
          {{ scope.row.employee }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="团队" width="120">
        <template slot-scope="scope">
          {{ scope.row.team }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作日期" width="120">
        <template slot-scope="scope">
          {{ scope.row.workdata }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="今日工作">
        <template slot-scope="scope">
          {{ scope.row.dailywork }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="明日待办">
        <template slot-scope="scope">
          {{ scope.row.todolist }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.creatime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作员">
        <template slot-scope="scope">
          {{ scope.row.operator }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="145">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!-- 新建对话框 -->
    <el-dialog title="创建" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 85%; margin-left: 10px">
        <el-form-item label="姓名" prop="employee">
          <el-input v-model="temp.employee" style="width: 200px" />
        </el-form-item>
        <el-form-item label="团队" prop="team">
          <el-select v-model="temp.team" class="filter-item" placeholder="Please select">
            <el-option v-for="item in teamOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="工作日期" prop="workdata">
          <el-date-picker v-model="temp.workdata" type="date" :picker-options="pickerOptions" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="今日工作" prop="dailywork">
          <el-input v-model="temp.dailywork" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" />
        </el-form-item>
        <el-form-item label="明日待办" prop="todolist">
          <el-input v-model="temp.todolist" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, createDaily, updateDaily } from '@/api/daily'
import Pagination from '@/components/Pagination'
import moment from 'moment'

const teamOptions = [
  { key: 'KF', display_name: '开发中心' },
  { key: 'YW', display_name: '运维与安全中心' },
  { key: 'CS', display_name: '架构与测试中心' }
]
// arr to obj,  { KF : "开发中心", YW : "运维与安全中心" ... }
const teamKeyValue = teamOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { Pagination },
  filters: {
    teamFilter(team) {
      return teamKeyValue[team]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        employee: undefined,
        page: 1,
        limit: 10,
        operator: undefined
      },
      temp: {
        id: undefined,
        employee: '',
        team: '',
        workdata: new Date(),
        dailywork: '',
        todolist: '',
        operator: undefined,
        creatime: new Date()
      },
      teamOptions,
      dialogFormVisible: false,
      rules: {
        employee: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        team: [{ required: true, message: '请选择团队', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        dailywork: [{ required: true, message: '请填写今日工作', trigger: 'blur' }],
        todolist: [{ required: true, message: '请填写明日待办', trigger: 'blur' }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateDaily(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 1000
      })
      this.list.splice(index, 1)
    },
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    //     const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    //     const list = this.list
    //     const data = this.formatJson(filterVal, list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: this.filename,
    //       autoWidth: this.autoWidth,
    //       bookType: this.bookType
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       if (j === 'timestamp') {
    //         return parseTime(v[j])
    //       } else {
    //         return v[j]
    //       }
    //     })
    //   )
    // },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.items
          this.listLoading = false
          this.total = response.data.total ? response.data.total : 0
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        employee: '',
        team: '',
        workdata: new Date(),
        dailywork: '',
        todolist: '',
        operator: undefined,
        creatime: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.operator = 'admin'
          this.temp.workdata = moment(this.temp.workdata).format('YYYY-MM-DD')
          this.temp.creatime = moment().format('YYYY-MM-DD')
          createDaily(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
