<template>
  <div class="databoard-container">
    <div class="left">
      <info-wrapper title="园区数据">
        <div class="pard-data">
          <div class="item">
            <span class="label">年度累计收费（元）</span>
            <span class="value">{{ detail.annualIncome ? detail.annualIncome: '--' }}</span>
          </div>
          <div class="item">
            <span class="label">入驻企业总数（个）</span>
            <span class="value">{{ detail.enterpriseTotal ? detail.enterpriseTotal:'--' }}</span>
          </div>
          <div class="item">
            <span class="label">月卡车辆总数（辆）</span>
            <span class="value">{{ detail.monthCardTotal ? detail.monthCardTotal: '--' }}</span>
          </div>
          <div class="item">
            <span class="label">一体杆总数（台）</span>
            <span class="value">{{ detail.chargePoleTotal ? detail.chargePoleTotal: '--' }}</span>
          </div>
        </div>
      </info-wrapper>
      <info-wrapper title="年度收入统计">
        <!-- echarts渲染的节点 -->
        <div id="income-chart" class="chart-container" />
      </info-wrapper>
      <info-wrapper title="临期合同提醒">
        <el-table
          :data="contract"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
          />
          <el-table-column
            prop="enterpriseName"
            label="企业名称"
          />
          <el-table-column
            prop="buildingName"
            label="租赁楼宇"
          />
          <el-table-column
            prop="startTime"
            label="租赁时间"
          >
            <template #default="{row}">
              {{ row.startTime }} 至 {{ row.endTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="buildingName"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">续签</el-button>
              <el-button type="text" size="small">退租</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-container">
          <el-pagination
            :current-page="params.page"
            layout="total, sizes,prev, pager, next"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="params.pageSize"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="pageChange"
          />
        </div>
      </info-wrapper>
    </div>
    <div class="right">
      <info-wrapper title="快捷入口">
        <div class="fast-enter">
          <div class="item" @click="$router.push('/addEnterprise')">
            <img src="@/assets/add-enterprise.png" alt="" class="img">
            <span class="label">添加企业</span>
          </div>
          <div class="item" @click="$router.push('/sys/user')">
            <img src="@/assets/employee-manage.png" class="img">
            <span class="label">员工管理</span>
          </div>
          <div class="item" @click="addBillVisible = true">
            <img src="@/assets/add-bill.png" class="img">
            <span class="label">添加账单</span>
          </div>
          <!-- <div class="item" @click="$router.push('/big-screen')">
            <img src="@/assets/data-screen.png" class="img">
            <span class="label">数据大屏</span>
          </div> -->
        </div>
      </info-wrapper>
    </div>
  </div>
</template>

<script>
import { getInfoAPI, getContractAPI } from '@/api/work'
import InfoWrapper from './components/InfoWrapper.vue'
// 导入包中所有的东西 放到echarts变量身上
import * as echarts from 'echarts'
// 图表渲染
// 1. 图表渲染依赖真实的dom节点 - mounted初始化操作 （地图业务）
// 2. 封装单独的初始化方法 在mounted中执行这个方法
// 3. 看官网写代码
export default {
  components: {
    InfoWrapper
  },
  data() {
    return {
      detail: {},
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      contract: []
    }
  },
  async mounted() {
    await this.getContract(this.params)
    // 保证图表要用到的数据返回之后才做初始化使用
    await this.getInfo()
    this.initEcharts()
  },
  methods: {
    async getContract(params) {
      const res = await getContractAPI(this.params)
      console.log(res, '------------------')
      this.contract = res.data.rows
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getContract()
      // console.log(`每页 ${val} 条`)
    },

    pageChange(page) {
      this.params.page = page
      this.getContract()
    },

    async getInfo() {
      const res = await getInfoAPI()
      // console.log(res)
      this.detail = res.data
    },
    // 初始化函数
    initEcharts() {
      // 进行图表的初始化
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('income-chart'))
      // 获取图表具体的业务数据
      const chartData = this.detail.annualIncomeArray
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // 右上角类别
        legend: {
          show: true,
          orient: 'vertical',
          right: 0,
          top: 0
        },
        // 横轴数据
        xAxis: {
          data: chartData.xmonth
        },
        yAxis: {},
        series: [
          {
            data: chartData.ybuilding,
            type: 'bar',
            stack: 'x',
            name: '物业费',
            itemStyle: {
              color: '#3656FF'
            },
            barWidth: '25%'
          },
          {
            data: chartData.yparking,
            type: 'bar',
            stack: 'x',
            name: '行车收入',
            itemStyle: {
              color: '#CDE4FF'
            },
            barWidth: '25%'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
  .databoard-container {
    display: flex;
    background-color: #f4f6f8;
    .left {
      flex-basis: 70%;
      margin-right: 20px;
      .pard-data {
        display: flex;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          .label {
            color: #909399;
            margin-bottom: 12px;
            font-size: 14px;
          }
          .value {
            color: #303035;
            font-weight: 500;
            font-size: 24px;
          }
        }
      }
      .contract-list {
        ::v-deep() {
          .search-table {
            padding: 0;
            .search-table__main {
              padding-top: 0;
            }
          }
        }
      }
    }
    .right {
      flex-basis: calc(30% - 20px);
      .fast-enter {
        display: flex;
        justify-content: space-between;
        .item {
          display: flex;
          text-align: center;
          flex-direction: column;
          cursor: pointer;
          .img {
            width: 44px;
            height: 44px;
            margin-bottom: 9px;
          }
          .label {
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
          }
        }
      }
      .warn-list {
        padding-left: 20px;
        text-align: center;
        svg {
          width: 160px;
          height: 160px;
        }
        .warn-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f4f6f8;
          position: relative;
          &::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(250, 205, 119, 0.35);
            position: absolute;
            left: -20px;
            top: 16px;
          }
          .title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
            text-align: left;
          }
          .time {
            font-size: 13px;
            color: #c3c5cb;
            text-align: left;
          }
          .btn {
            cursor: pointer;
            padding: 5px 10px;
            background: #edf5ff;
            border-radius: 4px;
            font-size: 12px;
            color: #4578fb;
            white-space: nowrap;
          }
        }
        ::v-deep() {
          .ant-btn {
            margin-top: 20px;
            border-radius: 22px !important;
            height: 36px;
          }
        }
      }
    }
    .chart-container {
      height: 300px;
    }
  }
  .page-container{
    padding:4px 0px;
    text-align: right;
  }
</style>
