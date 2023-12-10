<template>
  <div class="view-card">
    <header class="view-header">
      <el-page-header :content="state" @back="$router.back()" />
    </header>
    <main class="view-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <el-descriptions :column="2">
          <el-descriptions-item label="车主姓名">欧阳修66</el-descriptions-item>
          <el-descriptions-item label="联系方式">1208558888866</el-descriptions-item>
          <el-descriptions-item label="车牌号码">秦H456666661</el-descriptions-item>
          <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 666666666666 号</el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="form-container">
        <div class="title">月卡缴费记录</div>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
        </el-table>
      </div>

    </main>
    <footer class="view-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }

}
</script>

<style scoped lang="scss">
.view-card {
  background-color: #f4f6f8;
  height: 100vh;

  .view-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

  }

  .view-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
      margin-bottom: 20px;
      .title{
        padding: 20px 30px;
        height: 58px;
        border-bottom: 1px solid rgb(236, 236, 236);
      }
      .el-descriptions{
        padding: 20px 200px;
        height: 130px;
      }
    }
  }

  .view-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
