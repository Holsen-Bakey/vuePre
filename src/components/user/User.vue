<template>
  <div>
    <!-- 1 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2 卡片视图区域 -->
    <el-card>
      <!-- 2.1 input输入框 -->
      <el-row :gutter="20" type="flex">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="inputText" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchTab"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type='success' @click="addTap">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 2.2 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="65">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="140">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="80">
          <template slot-scope="scope">
            <el-tag type="danger" size="medium" v-if='scope.row.role_name==1'>总经理</el-tag>
            <el-tag type="" size="medium" v-else-if='scope.row.role_name==2'>主管</el-tag>
            <el-tag type="" size="medium" v-else-if='scope.row.role_name==3'>主管</el-tag>
            <el-tag type="info" size="medium" v-else-if='scope.row.role_name==4'>专员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="70">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="stateSwitsh(scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button type='success' icon='el-icon-edit' size="mini" @click="editTap(scope.row.id)">编辑</el-button>
            <el-button type='danger' icon='el-icon-share' size="mini" @click="deleteTap(scope.row.id)">删除</el-button>
            <el-button type="warning" icon='el-icon-delete' size="mini" @click="setRoleTap(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 2.3 底部页码步进器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </el-card>

    <!-- 3 添加用户dialog -->
    <el-dialog title="添加用户" :visible.sync="editDialogFormVisible">
      <el-form :model="Editform" label-width="60px" ref="editFormRef" :rules="editFormRules">
        <el-form-item label="名称" prop='username'>
          <el-input v-model="Editform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="Editform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="Editform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile'>
          <el-input v-model="Editform.mobile"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editButtonCancle">取 消</el-button>
        <el-button type="primary" @click="editButtonSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 4 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRolesDialogFormVisible">
      <div>当前的用户：{{currentUser}}</div>
      <div>当前的权限：{{currentRole}}</div>
      <div>
        <span>分配的角色：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleButtonCancle">取 消</el-button>
        <el-button type="primary" @click="roleButtonSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {

    data() {
      //自定义校验规则
      var checkEmail = (rule, value, cb) => { //验证邮箱的规则
        //验证邮箱的正则表达式
        const regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        if (regEmail.test(value)) {
          return cb() //合法的邮箱
        }
        cb(new Error('请输入合法的邮箱')) //非法邮箱
      }

      var checkMobile = () => { //验证手机号
        const regMobile = /0?(13|14|15|18|17)[0-9]{9}/
        if (regMobile.test(value)) {
          return cb() //合法的邮箱
        }
        cb(new Error('请输入合法手机号')) //非法邮箱
      }
      return {
        inputText: '',
        tableData: [{
          "id": 25,
          "username": "tom",
          "mobile": "111111111",
          "type": 1,
          "email": "tom@126.com",
          "create_time": "2019-11-09T20:36:26",
          "mg_state": true,
          "role_name": 1,
        }, {
          "id": 26,
          "username": "tom",
          "mobile": "111111111",
          "type": 1,
          "email": "tom@126.com",
          "create_time": "2019-11-09T20:36:26",
          "mg_state": false,
          "role_name": 2,
        }, {
          "id": 27,
          "username": "tom",
          "mobile": "111111111",
          "type": 1,
          "email": "tom@126.com",
          "create_time": "2019-11-09T20:36:26",
          "mg_state": true,
          "role_name": 3,
        }, {
          "id": 28,
          "username": "tom",
          "mobile": "111111111",
          "type": 1,
          "email": "tom@126.com",
          "create_time": "2019-11-09T20:36:26",
          "mg_state": true,
          "role_name": 4,
        }, ],
        currentPage: 1, //当前页
        queryInfo: {
          query: '',
          pagenum: 1, //当前的页码
          pagesize: 10 //当前每页显示多少条数据
        },
        total: 50, //返回数据的总数
        editDialogFormVisible: false,
        //添加表格绑定数据
        Editform: {
          "id": '005',
          "username": "",
          "password": "",
          "mobile": "",
          "type": 1,
          "email": "123@vip.com",
        },
        //edit表单验证规则
        editFormRules: {
          username: [{
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              validator: checkMobile,
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
        },
        //分配权限对话库开关
        setRolesDialogFormVisible: false,
        currentUser: 'tom',
        currentRole: 'admin',
        options: [{
          value: '选项1',
          label: '董事长'
        }, {
          value: '选项2',
          label: '销售主管'
        }, {
          value: '选项3',
          label: '推广主管'
        }, {
          value: '选项4',
          label: '销售运营'
        }, {
          value: '选项5',
          label: '推广运营'
        }],
        value: ''
      }
    },
    created() {
      // this.getRightsList()
    },
    methods: {
      //添加用户
      addTap() {
        console.log('点击了添加用户')
        this.editDialogFormVisible = true
      },
      //点击了搜索
      searchTab() {
        console.log('点击了搜索')
      },
      //状态栏switch改变
      stateSwitsh(userinfo) {
        console.log(userinfo)
        //发送网路请求，改变状态
      },
      //点击编辑按钮
      editTap(userId) {
        console.log('点击编辑按钮')
        console.log(userId)
        //根据传入Id发送网络请求，返回数据填入dialog

      },
      //点击删除按钮
      deleteTap(userId) {
        console.log('点击删除按钮')
        console.log(userId)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //发送网络请求删除

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      //点击分配权限
      setRoleTap(row) {
        console.log('点击分配权限按钮')
        console.log(row)
        this.setRolesDialogFormVisible = true
      },
      //pageSize 改变时会触发
      handleSizeChange(val) {
        console.log('pageSize 改变' + val)
        this.queryInfo.pagesize = val
        //每页显示数会改变，以新的每页页码数发送网络请求
      },
      //currentPage 改变时会触发，包括加减页和跳转页
      handleCurrentChange(val) {
        console.log('当前页改变' + val)
        this.queryInfo.pagenum = val
        //页码发生改变，发送网络请求翻页数据

      },
      //editButtonSure 表单确认按钮
      editButtonSure() {
        console.log('表单确认按钮')
        //验证表单数据发送网络请求
        this.$refs.editFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error('输入信息不符合规则！')
            return
          } else {
            this.$message.success('提交成功')
            this.editDialogFormVisible = false
            this.$refs.editFormRef.resetFields()

          }
        })

      },
      //editButtonCancel 表单取消按钮
      editButtonCancle() {
        console.log('表单取消按钮')
        this.editDialogFormVisible = false
        //清空表单数据
        this.$refs.editFormRef.resetFields()

      },
      //
      roleButtonSure() {
        console.log(this.value)
        this.setRolesDialogFormVisible = false
      },
      //
      roleButtonCancle() {
        console.log(this.value)
        this.setRolesDialogFormVisible = false
      }


    }
  }
</script>

<style scoped>
  .iconColumn {
    font-size: 22px;
    margin-right: 8px;
  }
</style>