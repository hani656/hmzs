<template>
  <div class="view-card">
    <header class="view-header">
      <!-- :content="state" -->
      <el-page-header content="查看详情" @back="$router.back()" />
    </header>
    <main class="view-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <el-descriptions :column="2">
          <el-descriptions-item label="车主姓名">{{ cardDetail.personName }}</el-descriptions-item>
          <el-descriptions-item label="联系方式">{{ cardDetail.phoneNumber }}</el-descriptions-item>
          <el-descriptions-item label="车牌号码">{{ cardDetail.carNumber }}</el-descriptions-item>
          <el-descriptions-item label="车辆品牌">{{ cardDetail.carBrand }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="form-container">
        <div class="title">月卡缴费记录</div>
        <el-table
          :data="rechargeList"
          border
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="150"
          />
          <el-table-column label="有效时间">
            <template slot-scope="scope">
              <span>{{ scope.row.cardStartDate }}至{{ scope.row.cardEndDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="paymentAmount"
            label="支付金额"
          />
          <el-table-column
            prop="paymentMethod"
            label="支付方式"
          />
          <el-table-column
            prop="createTime"
            label="办理时间"
          />
          <el-table-column
            prop="createUser"
            label="办理人"
          />
        </el-table>
      </div>

    </main>

  </div>
</template>

<script>
import { getWarningDetailAPI } from '@/api/warning'
export default {
  data() {
    return {
      warnDetail: ''
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  mounted() {

  },
  methods: {

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

  }
  </style>

