<template>
  <div>
    <!-- <span>this is home</span> -->
    <el-button type="info">this is home</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //权限列表
        rightsList: []
      }
    },
    created() {
      this.getRightsList()
    },
    methods: {
      //
    }


  }
</script>

<style lang="less" scoped>

</style>