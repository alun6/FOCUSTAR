<template>
  <vue-office-excel :src="src" @rendered="rendered" />
</template>
  
<script>

import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
  components: {
    VueOfficeExcel
  },
  props: ['src', 'fileType'],
  name: 'excelPew',
  data() {
    return {
    }
  },
  methods: {
    rendered() {
      console.log("渲染完成")
    }
  }
}
</script>
 
<style scoped>
.file-pre {
  height: calc(100vh - 20px);
  padding: 0px 20px 20px 20px;
}

.file-pre /deep/ table {
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
  border-collapse: collapse;
  margin: auto;
}

.file-pre /deep/ table td {
  border-left: 1px solid #e8eaec;
  border-top: 1px solid #e8eaec;
  white-space: wrap;
  text-align: left;
  min-width: 100px;
  padding: 4px;
}

.file-pre /deep/ table {
  border-top: 1px solid #EBEEF5;
  border-left: 1px solid #EBEEF5;
  width: 100%;
  overflow: auto;
}

.file-pre /deep/ table tr {
  height: 44px;
}

.file-pre /deep/ table td {
  min-width: 200px;
  max-width: 400px;
  padding: 4px 8px;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}

.code-area {
  width: 95%;
  padding: 20px;
  white-space: break-spaces;
}
</style>