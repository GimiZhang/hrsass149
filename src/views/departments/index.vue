<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card>
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" :is-root="true" @add-depts="showAddDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <template #default="{data}">
            <!-- // 子类调用父类方法 del-depts，删除或者修改完数据后，调用此方法刷新列表 -->
            <treeTools :node-data="data" @del-depts="getDepartMentsList" @add-depts="showAddDepts" />

          </template>
        </el-tree>
      </el-card>
      <add-depts ref="addDepts" :show-dialog="showDialog" :depart-list="departList" :node-data="nodeData" @add-depts-success="getDepartMentsList" @closeDialogFn="closeDialog" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import addDepts from './components/add_depts.vue'
import { getDepartmentListApi } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: { treeTools, addDepts },
  data() {
    return {
      departList: [],
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      company: {
        name: '',
        manager: '负责人',
        id: ''
      },
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      nodeData: {}
    }
  },
  created() {
    this.getDepartMentsList()
  },
  methods: {
    async getDepartMentsList() {
      const { data } = await getDepartmentListApi()
      this.departList = data.depts
      this.departs = tranListToTreeData(data.depts, '')
      this.company.name = data.companyName
    },
    closeDialog() {
      this.showDialog = false
    },
    showAddDepts(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      console.log(this.nodeData)
      this.$refs.addDepts.getSimpleUserList()
    }
  }
}
</script>

  <style lang="scss" scoped>
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
  </style>
