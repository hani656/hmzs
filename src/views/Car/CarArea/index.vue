<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <el-button type="primary" @click="addArea">添加区域</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table
        style="width: 100%"
        :data="carAreaList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          label="区域名称"
          width="180"
          prop="areaName"
        />
        <el-table-column
          label="车位数(个)"
          prop="spaceNumber"
        />
        <el-table-column
          label="面积(m²)"
          width="120"
          prop="areaProportion"
        />
        <el-table-column
          label="计费规则"
          width="120"
          prop="ruleName"
        />
        <el-table-column
          label="备注"
          prop="remark"
        />
        <el-table-column
          label="操作"
        >
          <template #default="scope">
            <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
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
    <!-- 添加区域弹框 -->
    <el-dialog
      :title="dynamicTitle"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
      @open="openDialog"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="区域名称" prop="areaName">
            <el-input v-model="addForm.areaName" placeholder="请输入区域名称" />
          </el-form-item>
          <el-form-item label="车位数（个）" prop="spaceNumber">
            <el-input v-model="addForm.spaceNumber" placeholder="请输入车位个数" />
          </el-form-item>
          <el-form-item label="面积（m²）" prop="areaProportion">
            <el-input v-model="addForm.areaProportion" class="area-proportion" placeholder="请输入面积" />m²
          </el-form-item>
          <el-form-item label="关联计费规则" prop="ruleId">
            <br>
            <el-select v-model="addForm.ruleId" class="rule-select" placeholder="请选择计费规则">
              <el-option
                v-for="item in ruleSelectList"
                :key="item.ruleId"
                :label="item.ruleName"
                :value="item.ruleId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="addForm.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { getAreaListAPI, getRuleSelectListAPI, addAreaAPI, editAreaAPI, deleteAreaAPI } from '@/api/area'
export default {
  name: 'CarArea',
  data() {
    return {
      carAreaList: [],
      // 请求参数
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      // 显示 dialog 弹层
      dialogVisible: false,
      ruleSelectList: [],
      addForm: {
        areaName: '',
        spaceNumber: '',
        areaProportion: '',
        ruleId: '',
        remark: ''
      },
      addFormRules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        spaceNumber: [
          { required: true, message: '请输入车位个数', trigger: 'blur' }
        ],
        areaProportion: [
          { required: true, message: '请输入面积', trigger: 'blur' }
        ],
        ruleId: [
          { required: true, message: '请选择计费规则', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dynamicTitle() {
      return this.addForm.id ? '编辑区域' : '添加区域'
    }
  },
  created() {
    this.getCarAreaList()
  },
  methods: {
    async getCarAreaList() {
      const res = await getAreaListAPI(this.params)
      this.carAreaList = res.data.rows
      // console.log(this.carAreaList)
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getCarAreaList()
      // console.log(`每页 ${val} 条`)
    },

    pageChange(page) {
      this.params.page = page
      this.getCarAreaList()
    },
    addArea() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      // 注意这里需要清空表单数据，在打开编辑后，然后在打开添加区域弹框时，表单数据会被保留，因此需要清空表单数据
      this.clearForm()
    },
    // 统一清空表单
    clearForm() {
      // 重置表单
      this.addForm = {
        areaName: '',
        spaceNumber: '',
        areaProportion: '',
        ruleId: '',
        remark: ''
      }
    },
    async openDialog() {
      const res = await getRuleSelectListAPI()
      this.ruleSelectList = res.data
    },
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          if (!this.addForm.id) {
            // 添加区域
            await addAreaAPI(this.addForm)
          } else {
            // 编辑区域
            await editAreaAPI(this.addForm)
          }
        }
        // 获取列表
        this.getCarAreaList()
        // 提示
        this.$message.success(this.addForm.id ? '编辑成功' : '添加成功')
        // 关闭弹层
        this.dialogVisible = false
        // 重置表单
        this.clearForm()
      })
    },
    // 编辑区域
    edit(row) {
      // console.log(row)
      this.dialogVisible = true
      const { id, areaName, spaceNumber, areaProportion, ruleId, remark } = row
      this.addForm = {
        id,
        areaName,
        spaceNumber,
        areaProportion,
        ruleId,
        remark
      }
    },
    // 删除区域
    async del(row) {
      // await deleteAreaAPI(row.id)
      // this.getCarAreaList()
      // this.$message.success('删除成功')
      this.$confirm(`确认删除当前 （${row.areaName}） 区域吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteAreaAPI(row.id)
        this.getCarAreaList()
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container{
  padding:10px;
}
.search-container{
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237,237,237,.9);;
  padding-bottom: 20px;
  .search-label{
    width:100px;
  }
  .search-main{
    width: 220px;
    margin-right: 10px;
  }
}
.page-container{
    padding:4px 0px;
    text-align: right;
  }
  .form-container{
    margin: 0 30px;
    .area-proportion{
      width: 96%;
    }
    .rule-select{
      width: 100%;
    }
  }
</style>
