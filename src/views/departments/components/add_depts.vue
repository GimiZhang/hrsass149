<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <!-- el-form form表单 -->
    <el-form ref="addFrom" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employees" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>

    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitDepts">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSimpleUserListApi } from '@/api/employees'
import { addDepartmentApi } from '@/api/departments'
export default {
  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true,
      default: () => {}
    },
    departList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      employees: [],
      rules: {
        name: [
          { required: true, message: '部门名称不可为空', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '部门名称字符长度为1-10', trigger: ['blur', 'change'] },
          { validator: this.validatDeptNameIsRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不可为空', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '部门编码字符长度为1-10', trigger: ['blur', 'change'] },
          { validator: this.validatDeptCodeIsRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不可为空', trigger: ['change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不可为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍字符长度为1-300', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialogFn', false)
    },
    validatDeptNameIsRepeat(rule, value, callback) {
      const children = this.departList.filter(item => item.pid === this.nodeData.id)
      const isRpeat = children.some(item => item.name === value)
      isRpeat ? callback(new Error('当前部门已经存在')) : callback()
    },
    validatDeptCodeIsRepeat(rule, value, callback) {
      const isRpeat = this.departList.some(item => item.code === value)
      isRpeat ? callback(new Error('部门编码已经存在')) : callback()
    },
    async getSimpleUserList() {
      const { data } = await getSimpleUserListApi()
      this.employees = data
    },
    submitDepts() {
      this.$refs.addFrom.validate(async flag => {
        // 确定提交时再次校验表单
        if (!flag) return
        addDepartmentApi({ ...this.form, pid: this.nodeData.id })
        this.$message.success('添加成功')
        this.closeDialog()
        this.$emit('add-depts-success')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
