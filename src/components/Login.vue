<template>
  <!-- 登陆框 -->
  <div class="container">
    <div class="login">
      <!-- 第一行 -->
      <div class="first">
        欢迎使用管理系统
      </div>
      <!-- 第二行 -->
      <el-form label-width="60px" :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
        <!-- 账号输入框 -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="工号/邮箱/手机号"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type='password' placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="buttonLogin">
          <el-button type='primary' @click="loginTap">登陆</el-button>
          <el-button type='success' @click="resetTap">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [{
              required: true,
              message: '请输入登录名称',
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
              message: '请输入登录密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 6,
              message: '长度在3 到 10 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      // this.getRightsList()
    },
    methods: {
      //点击登录
      loginTap() {
        console.log('点击了登陆按钮')
        console.log('账户' + this.loginForm.username)
        console.log('密码' + this.loginForm.password)
        // this.$refs.loginFormRef.validate(async (valid) => {
        //   console.log(valid) //表单验证通过则为true
        //   if (!valid) return
        //   const {
        //     data: res //从返回值data中解构出res
        //   } = await this.$http.post('login', this.loginForm)

        //   if (res.meta.status !== 200) return this.$message.error('fail!')
        //   this.$message.success('success!')
        // })

        // //登陆成功后保存和跳转
        // window.sessionStorage.setItem('token', res.data.token)
        // this.$router.push('/home')

        this.$refs.loginFormRef.validate((valid) => {
          if (!valid) {
            this.$message({
              showClose: true,
              message: '请输入符合验证规则的账号/密码',
              type: 'error'
            });
            return
          } else {
            this.$message.success('登陆成功')
            // 跳转路由,储存token
            this.$router.push('/home')
          }

        })
      },
      //点击了重置按钮
      resetTap() {
        console.log('点击了重置按钮')
        this.$refs.loginFormRef.resetFields()
        console.log('账户' + this.loginForm.username)
        console.log('密码' + this.loginForm.password)
      }
    }


  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    background-color: green;
  }

  .login {
    background-color: #ffffff;
    width: 350px;
    height: 250px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  .first {
    font-size: 30px;
    text-align: center;
    margin: 6px 0 6px 0;
    /* background-color: chocolate; */
  }

  .el-form {
    margin: 18px 10px 0 10px;
    box-sizing: content-box;
    /* background-color: brown; */
  }

  .buttonLogin {
    display: flex;
    justify-content: flex-end;
    /* background-color: brown; */
  }
</style>