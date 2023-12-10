<template>
  <div class="detail-enterprise">
    <header class="add-header">
      <el-page-header content="查看企业" @back="$router.back()" />
    </header>

    <div class="add-descriptions">
      <div class="form-descriptions">
        <el-descriptions title="企业信息" direction="vertical" :column="4" border>
          <el-descriptions-item label="企业名称">{{ enterpriseInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="法人">{{ enterpriseInfo.legalPerson }}</el-descriptions-item>
          <el-descriptions-item label="注册地址">{{ enterpriseInfo.registeredAddress }}</el-descriptions-item>
          <el-descriptions-item label="所在行业">{{ enterpriseInfo.industryName }}</el-descriptions-item>
          <!-- <el-descriptions-item label="营业执照">{{ enterpriseInfo.businessLicenseUrl }}</el-descriptions-item> -->
          <el-descriptions-item label="营业执照">
            <el-image
              style="width: 100px; height: 60px"
              :src="enterpriseInfo.businessLicenseUrl"
              :preview-src-list="srcList"
            />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <div class="add-descriptions">
      <div class="form-descriptions">
        <el-descriptions title="联系人信息" direction="vertical" :column="4" border>
          <el-descriptions-item label="企业联系人">{{ enterpriseInfo.contact }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ enterpriseInfo.contactNumber }}</el-descriptions-item>
        </el-descriptions></div>
    </div>

    <main class="add-main">
      <div class="form-container">
        <div class="title">租赁记录</div>
        <div class="table-container">
          <el-table
            :data="rentList"
            style="width: 100%"
            border
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
            />
            <el-table-column
              prop="name"
              label="租赁楼宇"
              width="180"
            />
            <el-table-column
              label="租赁起止时间"
              width="280"
            >
              <template #default="{row}">
                {{ row.startTime }} - {{ row.endTime }}
              </template>
            </el-table-column>
            <!--
                预览实现步骤
                1. 提供一个现成的预览地址
                2. 按照固定的形式 previewURL?src=合同文件地址 拼接起来
                3. 使用a链接在一个新窗口打开
             -->
            <el-table-column
              label="租赁合同(点击预览)"
            >
              <template #default="{row}">
                <a :href="`${previewURL}?src=${row.contractUrl}`" target="_blank">
                  <el-button type="text">
                    {{ row.contractName }}
                  </el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="录入时间"
            />
            <!--
                下载功能
                    只需要通过一个a链接打开 浏览器识别你打开的是一个可下载的文件 就会自动触发下载功能
             -->
            <el-table-column
              prop="address"
              label="操作"
            >
              <template #default="{row}">
                <a :href="row.contractUrl">
                  <el-button type="text">合同下载</el-button>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </main>

  </div>
</template>

<script>
import { getEnterpriseDetailAPI } from '@/api/park'
// 预览地址 固定的 由产品后端来提供
const previewURL = 'https://view.officeapps.live.com/op/view.aspx'
export default {
  data() {
    return {
      enterpriseInfo: '',
      rentList: [],
      previewURL: previewURL,
      srcList: []
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await getEnterpriseDetailAPI(this.$route.query.id)
      this.enterpriseInfo = res.data
      this.rentList = res.data.rent
      this.srcList = [res.data.businessLicenseUrl]
    }
  }
}
</script>

<style scoped lang="scss">
.detail-enterprise {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-descriptions{
    background: #f4f6f8;
    padding: 20px 130px 10px 130px;
    .form-descriptions{
      background-color: #fff;
      padding: 20px;
      .aaaa{
        margin: 0 auto;
        width: 80%;
      }
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 10px 130px 10px 130px;

    .form-container {
      background-color: #fff;
      margin-bottom: 20px;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-weight: bold;
      }
    }
    .table-container{
      padding:20px;
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }
}

</style>
