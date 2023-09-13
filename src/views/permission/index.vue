<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 新增编辑的弹层 -->
      <el-dialog :visible="showDialog" :title="showTitle" @close="showDialog = false">
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-text="启用"
              active-value="1"
              inactive-text="不启用"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeDialog()">取消</el-button>
            <el-button type="primary" @click="clickSubmit()">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="clickAdd(1, '0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type === 1" size="small" type="text" @click="clickAdd(2, row.id)">添加权限点</el-button>
              <el-button size="small" type="text" @click="clickShowEdit(row.id)">查看</el-button>
              <el-button size="small" type="text" @click="clickDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionListApi } from '@/api/permission'
import { getPermissionDetailApi } from '@/api/permission'
import { addPermissionApi } from '@/api/permission'
import { delPermissionApi } from '@/api/permission'
import { updatePermissionApi } from '@/api/permission'
import { tranListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  computed: {
    showTitle() {
      if (this.formData.id) {
        return '添加权限'
      } else {
        return '查看编辑'
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 添加权限
    clickAdd(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    // 提交权限弹窗
    async clickSubmit() {
      if (this.formData.name === '' || this.formData.code === '') {
        this.$message.error('权限名称和权限标识不能为空')
        return
      }
      if (this.formData.id) {
        // 编辑操作
        await updatePermissionApi(this.formData)
      } else {
        // 添加操作
        await addPermissionApi(this.formData)
      }
      this.$message.success('操作成功')
      this.getPermissionList()
      this.closeDialog()
    },
    // 删除权限
    async clickDel(id) {
      this.$confirm('确定要删除该权限吗?', '温馨提示').then(async() => {
        await delPermissionApi(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('取消')
      })
    },
    // 查看权限
    async clickShowEdit(id) {
      // 获取数据回显
      const { data } = await getPermissionDetailApi(id)
      this.formData = data
      this.showDialog = true
    },
    // 关闭权限弹窗时，重置弹窗数据
    closeDialog() {
      this.showDialog = false
      this.formData = {
        enVisible: '0', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      }
    },
    async getPermissionList() {
      const { data } = await getPermissionListApi()
      this.list = tranListToTreeData(data, '0')
      console.log(this.list)
    }
  }
}
</script>
