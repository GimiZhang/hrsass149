<template>
  <div class="setting-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="role">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="showAddRoleDialog"
          >新增角色</el-button>
          <el-table :data="list">
            <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
            <el-table-column label="角色名称" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="showEditRoleDialog(scope.row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRol(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px; display: flex; justify-content: flex-end;">
            <el-pagination
              :current-page="page"
              :page-sizes="[1, 2, 3, 4]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="company"> <!-- 警告信息 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <!-- 表单 -->
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyForm.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form></el-tab-pane>
      </el-tabs>
      <el-dialog :visible="showDialog" :title="showTitle" :close-on-click-modal="false" @close="closeDialog">
        <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>

        <template #footer>

          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="addRol">确认</el-button>

        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleListApi, delRolApi, addRolApi, getRolDetailApi, editRolApi } from '@/api/setting'
import { getCompanyInfoApi } from '@/api/company'
import { mapState } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      page: 1,
      pagesize: 2,
      list: [],
      total: 0,
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不可为空', trigger: ['blur', 'change'] }]
      },
      activeName: 'role',
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      }
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '编辑角色' : '新增角色'
    },
    ...mapState('user', ['userInfo'])
  },
  watch: {
    activeName(newVal) {
      if (newVal === 'company') {
        this.getCompanyInfo()
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: { rows, total }} = await getRoleListApi(this.page, this.pagesize)
      this.list = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.page = 1
      this.pagesize = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoleList()
    },
    indexMethod(index) {
      return (this.page - 1) * this.pagesize + index + 1
    },
    delRol(id) {
      this.$confirm('是否删除当前角色信息？').then(async() => {
        await delRolApi(id)
        if (this.page > 1 && this.list.length === 0) {
          this.page--
        }
        this.getRoleList()
      }).catch(() => {})
    },
    showAddRoleDialog() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    addRol() {
      this.$refs.roleForm.validate(async flag => {
        if (!flag) return
        if (this.form.id) {
          await editRolApi(this.form)
        } else {
          await addRolApi(this.form)
        }

        this.closeDialog()
        this.getRoleList()
      })
    },
    async  showEditRoleDialog(id) {
      this.showDialog = true
      const { data } = await getRolDetailApi(id)
      this.form = data
    },
    async getCompanyInfo() {
      const { data } = await getCompanyInfoApi(this.userInfo.companyId)
      this.companyForm = data
    }
  }
}
</script>

  <style>

  </style>
