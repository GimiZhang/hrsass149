<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">修改部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentApi } from '@/api/departments'
export default {
  props: {
    nodeData: {
      // 必须传入值
      require: true,
      // 传入类型是对象
      type: Object,
      // 默认返回空对象
      default: () => {}
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(cmd) {
      // if (cmd === 'add') {
      //   console.log('添加')
      // }

      switch (cmd) {
        case 'add':
          this.$emit('add-depts', this.nodeData)
          break
        case 'del':
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            await delDepartmentApi(this.nodeData.id)
            this.$message.success('删除成功')
            // 删除成功，刷新列表 调用父类中的刷新接口 子传父方法
            this.$emit('del-depts')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
        case 'edit':
          this.$emit('edit-depts', this.nodeData)
          break
      }
    }
  }
}
</script>
