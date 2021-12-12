<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- 作品名称-->
    <div class="app-breadcrumb">
      广州软件学院教务管理系统
      <span class="breadBtn">Vue版本</span>
    </div>

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <!-- 右侧下拉菜单 -->
    <div class="right-menu">
      <!-- 全屏插件 -->
      <ScreenFull class="right-menu-item"></ScreenFull>
      <!-- 颜色主题组件 -->
      <ThemePicker class="right-menu-item"></ThemePicker>
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            v-if="headFlag"
            :src="userInfo.avator"
            class="user-avatar"
          >
          <!-- 头像还未定义时的情况 -->
          <img
            v-else
            src="@/assets/common/header.png"
            class="user-avatar"
          >
          <span class="name">{{name}}</span>
          <i
            class="el-icon-caret-bottom"
            style="color:#fff"
          />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item
            divided
            @click.native="updatePassword"
          >
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="showUpPaswdDialog"
      width="40%"
      @close="btnCancel"
    >
      <el-form
        :model="upPaswdForm"
        :rules="upPaswdRules"
        ref="upPaswdRef"
        label-width="80px"
      >
        <el-form-item label="旧密码">
          <el-input
            v-model="upPaswdForm.password"
            :disabled="true"
            size="medium"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            v-model="upPaswdForm.newPassword"
            size="medium"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="btnCancel">取 消</el-button>
        <el-button
          type="primary"
          @click='btnOk'
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePaswd, commitPaswd } from "@/api/user";
import { Message } from "element-ui";
import { getTeacherInfo } from "@/api/teacherMesg";
import { getStuInfo } from "@/api/stuMesg";
export default {
  data() {
    return {
      // 修改密码对话框
      showUpPaswdDialog: false,
      // 修改密码表单
      upPaswdForm: {
        password: "",
        newPassword: "",
      },
      upPaswdRules: {
        newPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, message: "密码至少为6位！", trigger: "blur" },
        ],
      },
      //  用户信息
      userInfo: {},
      //  用户头像标签
      headFlag: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "name", "roles"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    // 关闭修改密码对话框
    btnCancel() {
      // 清空表单
      this.upPaswdForm = {
        password: "",
        newPassword: "",
      };
      // 清空校验规则
      this.$refs.upPaswdRef.resetFields();
      //  关闭对话框
      this.showUpPaswdDialog = false;
    },
    // 获取旧密码和新密码
    async updatePassword() {
      // 打开对话框
      this.showUpPaswdDialog = true;
      // 获取旧密码
      const res = await updatePaswd(this.upPaswdForm);
      // 给表单赋值
      this.upPaswdForm.password = res.password;
    },
    // 对话框提交
    btnOk() {
      // 表单验证
      this.$refs.upPaswdRef.validate(async (valid) => {
        if (valid) {
          try {
            // 连接接口
            await commitPaswd(this.upPaswdForm);
            // 通知消息
            Message.success("修改密码成功！");
            // 关闭对话框
            this.showUpPaswdDialog = false;
          } catch (error) {
            console.log(error);
          }
        }
      });
      // 连接接口
      // 通知消息
      // 关闭对话框
    },
    // 获取教师信息
    async getTeacherInfo() {
      let res = await getTeacherInfo();
      this.userInfo = res;
      if (this.userInfo.avator) {
        this.headFlag = true;
      }
    },
    // 获取学生信息
    async getStuInfo() {
      let res = await getStuInfo();
      this.userInfo = res;
      if (this.userInfo.avator) {
        this.headFlag = true;
      }
    },
    // 获取用户信息（分为教师端、学生端、管理端）
    getUserInfo() {
      if (this.roles === "teacher") {
        this.getTeacherInfo();
      } else if (this.roles == "student") {
        this.getStuInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-image: -webkit-linear-gradient(left, #60a3bc, #82ccdd);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
      .user-dropdown {
        color: #fff;
      }
    }
  }

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }
}
</style>
