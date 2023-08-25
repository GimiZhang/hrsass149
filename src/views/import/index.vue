<template>
  <UploadExcel :on-success="handleSuccess" />
</template>

<script>
import { batchAddEmployeeApi } from '@/api/employees'
export default {
  name: 'Import',
  methods: {
    async handleSuccess({ results, header }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      console.log(results)
      results.forEach(item => {
        const userInfo = {}
        for (const key in item) {
          if (['timeOfEntry', 'correctionTime'].includes(userRelations[key])) {
            userInfo[userRelations[key]] = this.formatExcelDate(item[key], '-')
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        }
        arr.push(userInfo)
      })
      console.log(arr)
      await batchAddEmployeeApi(arr)
      this.$router.push('/employees')
    },

    /**
     * 转换excel的日期格式
     */
    formatExcelDate(numb, format) {
      const time = new Date((numb) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
