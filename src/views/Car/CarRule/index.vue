<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="openDialog">增加停车计费规则</el-button>
      <!-- <el-button @click="exportExcel">导出Excel</el-button> -->
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上限(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式">
          <template #default="scope">
            {{ formatChargeType(scope.row.chargeType ) || chargeType }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
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
      <!-- <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="pageChange"
      /> -->
    </div>
    <!-- 弹框 -->
    <el-dialog
      :title="`${formData.id ? '编辑停车计费规则' : '添加停车计费规则'}`"
      :visible="dialogVisible"
      width="600px"
      @close="closeDialog"
      @open="openDialog"
    >

      <el-form ref="form" :model="formData" :rules="rules" label-position="top" label-width="auto" size="small">
        <el-form-item label="计费规则编号" prop="ruleNumber">
          <el-input v-model="formData.ruleNumber" placeholder="请输入计费规则编号" />
        </el-form-item>
        <el-form-item label="计费规则名称" prop="ruleName">
          <el-input v-model="formData.ruleName" placeholder="请输入计费规则名称" />
        </el-form-item>
        <el-form-item label="计费方式（全天收费）" prop="chargeType">
          <el-radio-group v-model="formData.chargeType" size="small">
            <el-radio border label="duration">时长收费</el-radio>
            <el-radio border label="turn">按次收费</el-radio>
            <el-radio border label="partition">分段收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="免费时长" prop="freeDuration">
              <el-input-number v-model="formData.freeDuration" class="input-number" controls-position="right" placeholder="请输入免费时长" :min="1" />
              <!-- <el-input v-model="formData.freeDuration" class="input-number" placeholder="请输入免费时长" /> -->
              <span> 分钟</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收费上限" prop="chargeCeiling">
              <el-input v-model="formData.chargeCeiling" class="input-number" placeholder="请输入收费上限" />
              <span> 元</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 时长收费 -->
        <el-row v-if="formData.chargeType === 'duration'" :gutter="5">
          <el-col :span="8">
            <el-form-item label="计费规则" prop="durationTime">
              <span>每 </span>
              <!-- <el-input v-model="formData.durationTime" class="mei-span" placeholder="请输入" /> -->
              <el-input-number v-model="formData.durationTime" class="mei-span" controls-position="right" placeholder="请输入" :min="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="input-top">
            <el-form-item prop="durationType">
              <el-select v-model="formData.durationType" placeholder="请选择时间类型">
                <el-option label="小时" value="hour" />
                <el-option label="分钟" value="minute" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="input-top">
            <el-form-item prop="durationPrice">
              <el-input v-model="formData.durationPrice" class="mei-span" placeholder="请输入" />
              <span> 元</span>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- 时长收费 -->
        <!-- <el-row v-show="formData.chargeType === 'duration'" :gutter="5">
          <el-form-item label="计费规则" prop="durationTime">
            <el-col :span="7">
              <span>每</span>
              <el-input v-model="formData.durationTime" class="mei-span" placeholder="请输入" />
            </el-col>
            <el-col :span="7">
              <el-select v-model="formData.durationType" placeholder="请选择时间类型">
                <el-option label="小时" value="hour" />
                <el-option label="分钟" value="minute" />
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-input v-model="formData.durationPrice" type="text" placeholder="请输入" />
            </el-col>
            <span>元</span>
          </el-form-item>
        </el-row> -->

        <!-- 按次收费 -->
        <el-form-item v-if="formData.chargeType === 'turn'" label="计费规则" prop="turnPrice">
          <span>每次 </span>
          <el-input v-model="formData.turnPrice" class="meici-span" placeholder="请输入金额" />
          <span> 元</span>
        </el-form-item>

        <!-- 分段收费 -->
        <el-row v-if="formData.chargeType === 'partition'">
          <el-col :span="8">
            <el-form-item label="计费规则" prop="partitionFrameTime">
              <el-input-number v-model="formData.partitionFrameTime" :min="1" class="col-input" controls-position="right" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="span-top">
            <span> 小时内，每小时收费</span>
          </el-col>
          <el-col :span="9" class="input-top">
            <el-form-item prop="partitionFramePrice">
              <el-input v-model="formData.partitionFramePrice" class="meici-span" placeholder="请输入" />
              <span> 元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.chargeType === 'partition'">
          <el-col :span="15">
            <el-form-item prop="partitionIncreaseTime">
              <span>每增加 </span>
              <el-input-number v-model="formData.partitionIncreaseTime" :min="1" class="meici-span" controls-position="right" placeholder="请输入" />
              <span> 小时，增加</span>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="partitionIncreasePrice">
              <el-input v-model="formData.partitionIncreasePrice" class="meici-span" placeholder="请输入" />
              <span> 元</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 分段收费 -->
        <!-- <el-form-item v-show="formData.chargeType === 'partition'" label="计费规则">
          <el-row>
            <el-input-number v-model="formData.partitionFrameTime" class="meici-span" controls-position="right" :min="0" placeholder="请输入" @change="handleChange" />
            <span>小时内，每小时收费</span>
            <el-input v-model="formData.partitionFramePrice" class="meici-span" placeholder="请输入" />
            <span>元</span>
          </el-row>
          <el-row>
            <span>每增加</span>
            <el-input-number v-model="formData.partitionIncreaseTime" class="meici-span" controls-position="right" :min="0" placeholder="请输入" @change="handleChange" />
            <span>小时，增加</span>
            <el-input v-model="formData.partitionIncreasePrice" class="meici-span" placeholder="请输入" />
            <span>元</span>
          </el-row>
        </el-form-item> -->

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="addRule">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRuleListAPI, addRuleAPI, getRuleDetailAPI, editRuleAPI, delRuleAPI } from '@/api/rule'
import { utils, writeFileXLSX } from 'xlsx'
export default {
  name: 'Building',
  data() {
    return {
      ruleList: [], // 规则列表
      // 添加计费规则的相关数据
      formData: {},
      defaultFormData: {
        ruleNumber: '', // 计费规则编号 (必填)
        ruleName: '', // 计费规则名称 (必填)
        freeDuration: null, // 免费时长，单位:分钟
        chargeCeiling: '', // 收费上限
        chargeType: 'duration', // 收费类型，时长收费:duration,按次收费:turn,分段收费:partition (必填)
        durationTime: null, // 时长计费单位时间
        durationPrice: '', // 时长计费单位价格
        durationType: '', // 时长收费类型 minute:分钟，hour:小时
        turnPrice: '', // 按次收费：每次价格
        partitionFrameTime: null, // 分段收费:段内时间
        partitionFramePrice: '', // 分段收费:段内费用
        partitionIncreaseTime: null, // 分段收费:超出时间
        partitionIncreasePrice: '' // 分段收费:超出范围收费价钱
      },
      // 请求参数
      params: {
        page: 1,
        pageSize: 10
      },
      // 规则总数
      total: 0,
      dialogVisible: false,
      rules: {
        ruleNumber: [
          { required: true, message: '请输入计费规则编号', trigger: 'blur' }
        ],
        ruleName: [
          { required: true, message: '请输入计费规则名称', trigger: 'blur' }
        ],
        chargeType: [
          { required: true, message: '请选择计费方式', trigger: 'blur' }
        ],
        chargeCeiling: [
          { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入正确的数字', trigger: 'blur' }
        ],
        durationTime: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '仅支持正整数', trigger: 'blur' }
        ],
        durationType: [
          { required: true, message: '至少选择一种时间类型', trigger: 'blur' }
        ],
        durationPrice: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入正确的数字', trigger: 'blur' }
        ],
        turnPrice: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入正确的数字', trigger: 'blur' }
        ],
        partitionFrameTime: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        partitionFramePrice: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入正确的数字', trigger: 'blur' }
        ],
        partitionIncreaseTime: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        partitionIncreasePrice: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入正确的数字', trigger: 'blur' }
        ]
      }
    }
  },
  // computed: {
  //   dialogTitle() {
  //     return this.formData.id ? '编辑停车计费规则' : '添加停车计费规则'
  //   }
  // },
  mounted() {
    this.getList()
    this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
  },
  methods: {
    dialogTitle() {
      return this.formData.id ? '编辑停车计费规则' : '添加停车计费规则'
    },
    // 适配收费状态
    formatChargeType(type) {
      const TYPEMAP = {
        'duration': '按时长收费',
        'turn': '按次收费',
        'partition': '分段收费'
      }
      return TYPEMAP[type]
    },
    async exportExcel() {
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 创建一个工作表 要求一个对象数组格式
      // 1. 获取当前要导出的table数据
      const res = await getRuleListAPI(this.params)
      // 2. 按照需求调整数据的顺序
      // 表头英文字段key
      const tableHeaderKeys = ['ruleNumber', 'ruleName', 'freeDuration', 'chargeCeiling', 'chargeType', 'ruleNameView']
      // 表头中文字段value
      const tableHeaderValues = ['计费规则编号', '计费规则名称', '免费时长(分钟)', '收费上线(元)', '计费方式', '计费规则']
      // 适配excel表格
      const sheetData = res.data.rows.map(item => {
        const _obj = {}
        tableHeaderKeys.forEach(key => {
          // 赋值
          // 针对计费规则做处理
          if (key === 'chargeType') {
            _obj[key] = this.formatChargeType(item[key])
          } else {
            _obj[key] = item[key]
          }
        })
        return _obj
      })
      const worksheet = utils.json_to_sheet(sheetData)

      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [tableHeaderValues], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
    async getList() {
      const res = await getRuleListAPI(this.params)
      this.ruleList = res.data.rows
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getList()
      // console.log(`每页 ${val} 条`)
    },

    pageChange(page) {
      this.params.page = page
      this.getList()
    },
    openDialog() {
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      // 删除id，避免dialog重置时，id不为空,造成增加功能失效和dialog标题错误
      // delete this.formData.ruleNumber
      delete this.formData.id
      this.$refs.form.resetFields()
    },
    addRule() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (!this.formData.id) {
            const res = await addRuleAPI(this.formData)
            // 提示用户
            res.code === 10000 ? this.$message.success('添加成功') : this.$message.error(res.msg)
          } else {
            const res = await editRuleAPI(this.formData)
            res.code === 10000 ? this.$message.success('修改成功') : this.$message.error(res.msg)
          }
          // 刷新列表
          this.getList()
          // 关闭弹窗
          this.closeDialog()
        }
      })
    },
    async edit(id) {
      this.openDialog()
      const res = await getRuleDetailAPI(id)
      this.formData = res.data
    },
    async del(row) {
      console.log(row)
      this.$confirm(`确认删除当前（${row.ruleName}）计费规则吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRuleAPI(row.id)
        this.getList()
        this.$message.success('删除计费规则成功')
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
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
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
::v-deep .el-dialog__body {
  padding: 20px;
}
.input-number{
  width: 225px;
}
.mei-span{
  width: 165px;
}
.meici-span{
  width: auto;
}
.col-input{
  width: 95%;
}
.span-top{
  margin-top: 50px;
}
.input-top{
  margin-top: 42px;
}

</style>
