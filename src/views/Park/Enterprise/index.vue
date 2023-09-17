<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <div class="search-label">企业名称：</div>
      <!--
        分页 页数位于子组件内部 父组件如果想要用 子传父去获取 @current-change='pageChange'
        清除 叉号位于子组件中 点击叉号时去通知父组件我现在给你清空了 你去做事儿吧 @clear

        子传父的本质: 子组件通过调用父组件中的某个方法 通知它做个事儿
       -->
      <el-input v-model="params.name" clearable placeholder="请输入内容" class="search-main" @clear="clearSearch" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/addEnterprise')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list">
        <el-table-column type="index" label="序号" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column
          label="联系电话"
          prop="contactNumber"
        />
        <el-table-column label="操作">
          <template #default>
            <el-button size="mini" type="text">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <!--
      1. 页数分出来  页数 = 总数 / 每页条数  total  pageSize
      2. 点击页数获取数据  @current-change="pageChange"  page 请求数据
     -->
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { getListAPI } from '@/api/park'
export default ({
  data() {
    return {
      list: [], // 企业列表
      params: {
        name: '',
        page: 1,
        pageSize: 2
      },
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      // 1. 接口调用
      const res = await getListAPI(this.params)
      // 2. 数据赋值
      this.list = res.data.rows
      this.total = res.data.total
    },
    pageChange(page) {
      this.params.page = page
      this.getList()
    },
    doSearch() {
      this.params.page = 1
      this.getList()
    },
    clearSearch() {
      console.log('清空了')
      this.getList()
    }
  }
})

</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
