<template>
  <div>
    <el-button type="danger">this is Login</el-button>
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