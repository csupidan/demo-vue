<!--分页-->
<template>
  <el-pagination
    :page-size.sync="page.pageSize"
    :total="page.totalPages"
    :current-page.sync="page.pageNo"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
  />
</template>
<script>
import { pagination } from '@crud/crud'
export default {
  mixins: [pagination()]
}
</script>
