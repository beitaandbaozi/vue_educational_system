<template>
  <div class="login-container">
    <div class='logo'>
      <img
        src="@/assets/login_images/logo.png"
        alt="logo"
      >
    </div>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">HOME SEIG</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="学号或教师号（管理员账号为admin）"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        round
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "1840916216",
        password: "203036416",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入学号或教师号（管理员账号为admin）",
            trigger: "blur",
          },
          {
            min: 4,
            max: 10,
            message: "长度在 4 到 5 个字符！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, message: "密码至少为6位！", trigger: "blur" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["user/login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(async (isOK) => {
        if (isOK) {
          try {
            this.loading = true;
            // 只有校验通过了 我们才去调用action
            await this["user/login"](this.loginForm);
            // 应该登录成功之后
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功执行的代码
            window.location.href="/"
          } catch (error) {
            console.log(error);
          } finally {
            //  不论执行try 还是catch  都去关闭转圈
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$light_gray: #7940bf; //将输入框颜色改成蓝色
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("~@/assets/login_images/bg.jpg");
  background-position: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__error {
    color: #f00;
  }

  .loginBtn {
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #333;
$light_gray: #7940bf;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .logo {
    position: absolute;
    left: 100px;
    right: auto;
    top: 30px;
    bottom: auto;
    img {
      width: 300px;
      height: 100px;
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
