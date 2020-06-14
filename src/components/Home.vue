<template>
  <!-- 布局 -->
  <el-container class="homeContainer">
    <!-- header  -->
    <el-header>欢迎使用管理系统
      <!-- <div>
        <el-button type='danger'>退出</el-button>
      </div> -->
    </el-header>
    <!-- 主体 -->
    <el-container class="downContainer">
      <!-- 侧边栏 -->
      <el-aside width="150px">
        <!-- 导航菜单容器  el-menu-->
        <el-menu unique-opened router background-color="#545c64" text-color="#fff">
          <!-- 一级标题 el-submenu -->
          <!-- 1 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 二级标题 el-menu-item-->
            <el-menu-item index="/users">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级标题 el-submenu -->
          <!-- 2 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 二级标题 el-menu-item-->
            <!-- 2.1 角色管理 -->
            <el-menu-item index="/roles">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">角色管理</span>
              </template>
            </el-menu-item>
            <!-- 2.2 权限管理 -->
            <el-menu-item index="/rights">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">权限管理</span>
              </template>
            </el-menu-item>

          </el-submenu>
          <!-- 一级标题 el-submenu -->
          <!-- 3 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <!-- 二级标题 el-menu-item-->
            <!-- 3.1 商品列表 -->
            <el-menu-item index="goods">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">商品列表</span>
              </template>
            </el-menu-item>
            <!-- 3.2 分类参数 -->
            <el-menu-item index="/params">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </template>
            </el-menu-item>
            <!-- 3.3 商品分类 -->
            <el-menu-item index="/categories">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级标题 el-submenu -->
          <!-- 4 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <!-- 二级标题 el-menu-item-->
            <!-- 4.1 订单列表 -->
            <el-menu-item index="/orders">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级标题 el-submenu -->
          <!-- 5 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <!-- 二级标题 el-menu-item-->
            <!-- 5.1 数据统计 -->
            <el-menu-item index="/report">
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">数据统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main区域 -->
      <el-main>
        <!-- 放置路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

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
      // this.getRightsList()
    },
    methods: {
      //
    }


  }
</script>

<style scoped>
  .homeContainer {
    height: 100%;
  }

  .downContainer {
    /* height: 100%; */
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    font-size: 34px;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    /* height: 100%; */
    /* text-align: center; */
    /* line-height: 200px; */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }
</style>