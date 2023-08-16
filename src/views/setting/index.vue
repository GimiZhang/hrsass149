<template>
  <div class="setting-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="角色管理">
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
                <el-button size="small" type="primary">编辑</el-button>
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
        <el-tab-pane label="公司信息">配置管理</el-tab-pane>
      </el-tabs>
      <el-dialog :visible="showDialog" title="新增角色" :close-on-click-modal="false" @close="closeDialog">
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
import { getRoleListApi, delRolApi, addRolApi } from '@/api/setting'
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
    },
    addRol() {
      this.$refs.roleForm.validate(async flag => {
        if (!flag) return
        await addRolApi(this.form)
        this.closeDialog()
        this.getRoleList()
      })
    }
  }
}
</script>

  <style>

  </style>
