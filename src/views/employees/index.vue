<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showAddEmplyeeDialog">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="getEmploymentText">
            <!-- <template #default="row">

              {{ getEmploymentText(row.formOfEmployment) }}

            </template> -->
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template #default="row">

              {{ row.timeOfEntry | getFormateTime }}

            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="row">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :page-size="size"
            :total="total"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <addEmployee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import { getUserListApi, delEmployeeApi } from '@/api/employees'
import enumObj from '@/constant/employees'
import addEmployee from '@/views/employees/components/add-employee.vue'
// import dayjs from 'dayjs'
export default {
  name: 'Employees',
  // filters: {
  //   getFormateTime(val) {
  //     return dayjs(val).format('YYYY-MM-DD')
  //   }
  // },
  components: {
    addEmployee
  },
  data() {
    return {
      page: 1,
      size: 5,
      list: [],
      total: 10,
      hireType: enumObj.hireType,
      showDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: { rows, total }} = await getUserListApi(this.page, this.size)
      this.list = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getUserList()
    },
    indexMethod(index) {
      return (this.page - 1) * this.size + index + 1
    },
    // getEmploymentText(num) {
    //   return num === 1 ? '正式' : '非正式'
    // }
    // elui提供方法
    getEmploymentText(row, column, cellValue, index) {
      const obj = this.hireType.find(item => item.id === cellValue)
      // return cellValue === 1 ? '正式' : '非正式'
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      await delEmployeeApi(id)
    },
    showAddEmplyeeDialog() {
      this.showDialog = true
    }
  }
}
</script>

  <style>

  </style>
