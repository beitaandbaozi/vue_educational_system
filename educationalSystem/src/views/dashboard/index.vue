<template>
  <div class="dashboard-container">
    <!-- 头部内容 -->
    <el-card class="header-card">
      <div>
        <div class="fl headL">
          <div
            class="headImg"
            v-if="headFlag"
          >
            <img :src="userInfo.avator">
          </div>
          <!-- 初始头像不存在的情况 -->
          <div
            class="headImg"
            v-else
          >
            <img src="@/assets/common/header.png">
          </div>
          <div class="headInfoTip">
            <p class="firstChild">早安，{{name}}，祝你开心每一天！</p>
            <p class="lastChild">早安，{{name}}，祝你开心每一天！</p>
          </div>
        </div>
        <div class="fr" />
      </div>
    </el-card>
    <!-- 主要内容 -->
    <el-row
      type="flex"
      justify="space-between"
    >
      <!-- 左侧内容 -->
      <el-col
        :span="13"
        style="padding-right:26px"
      >
        <!-- 工作日历 -->
        <el-card class="box-card">
          <div
            slot="header"
            class="header"
          >
            <span>工作日历</span>
          </div>
          <!-- 放置日历组件 -->
          <WorkCalender></WorkCalender>
        </el-card>
        <!-- 公告 -->
        <el-card class="box-card">
          <div class="advContent">
            <div class="title">
              <span>广软快讯</span>
              <span style="display:flex;justify-content:end">
                <el-link
                  type="warning"
                  :underline="false"
                  @click="$router.push('/guangRuanNew')"
                ><i class="el-icon-s-promotion"></i>更多</el-link>
              </span>
            </div>

            <div class="contentItem">
              <ul class="noticeList">
                <li
                  v-for="item in newList"
                  :key="item.id"
                  @click="$router.push(`/guangRuanNew/detail/${item.id}`)"
                >
                  <div class="item">
                    <img src="@/assets/common/header.png">
                    <div>
                      <p><span class="col">{{item.depart_feed}}</span> 发布 {{item.new_title}}</p>
                      <p>{{item.time | dateFormat}}</p>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="11">
        <div>
          <!-- 绩效指数 -->
          <el-card
            class="box-card"
            v-if="roles == 'admin' "
          >
            <div
              slot="header"
              class="header headTit"
            >
              <span>学生数据</span>
            </div>
            <Echarts></Echarts>
          </el-card>
          <!-- 课程任务 -->
          <el-card
            class="box-card"
            v-else
          >
            <div
              slot="header"
              class="header headTit"
            >
              <span>课程通知</span>
            </div>
            <el-scrollbar>
              <el-timeline :reverse="true">
                <el-timeline-item
                  v-for="(item, index) in teachTasks"
                  :timestamp="item.time"
                  placement="top"
                  :color="index===teachTasks.length - 1 ? '#0bbd87' : ''"
                  :key="index"
                >
                  <el-card>
                    <h4 class="task-title">{{ item.title }}</h4>
                    <p class="task-content">{{ item.content }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
            <p class="see-more">
              <el-link
                type="primary"
                icon="el-icon-view"
                @click="$router.push('/teachingTask')"
              >查看更多</el-link>
            </p>
          </el-card>

        </div>
        <!-- 广软一角 -->
        <el-card class="box-card">
          <div
            slot="header"
            class="header headTit"
          >
            <span>校园一角</span>
          </div>
          <el-carousel
            :interval="2000"
            type="card"
            height="120px"
            arrow="hover"
          >
            <el-carousel-item
              v-for="(item, index) in scrollImageList"
              :key="index"
            >
              <img
                :src="item.url"
                style="width:100%;height:100%;"
              />
            </el-carousel-item>
          </el-carousel>
        </el-card>
        <!-- 帮助连接 -->
        <el-card class="box-card">
          <div class="header headTit">
            <span>帮助链接</span>
          </div>
          <div class="sideLink">
            <el-row>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconGuide" />
                  <p>入门指南</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconHelp" />
                  <p>在线帮助手册</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconTechnology" />
                  <p>联系技术支持</p>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WorkCalender from "./components/work-calender.vue";
import Echarts from "./components/echarts.vue";
import { mapGetters } from "vuex";
import { getTeachingTaskLimit, getTeachingTaskByStu } from "@/api/teachingTask";
import { getTeacherInfo } from "@/api/teacherMesg";
import { getStuInfo } from "@/api/stuMesg";
import { getNewByLimit } from "@/api/guangRuanNew";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles", "userId"]),
  },
  components: {
    WorkCalender,
    Echarts,
  },
  data() {
    return {
      // 课程任务
      teachTasks: [
        {
          time: "2020/6/6 6:30",
          title: "欢迎使用该网站",
          content: "暂无教学任务，查看更多可以更新哦！！！",
        },
      ],
      // 用户信息
      userInfo: {},
      // 用户头像标签
      headFlag: false,
      // 快讯信息
      newList: [],
      // 广软一角相片（不从数据库取了）
      scrollImageList: [
        {
          url: "http://attach.seig.edu.cn/attachment/core/label/2020_10/22_14/8b6be371e189fee2.jpg",
        },
        {
          url: "http://attach.seig.edu.cn/attachment/core/label/2020_10/22_14/1a700f6c093c9668.jpg",
        },
        {
          url: "http://attach.seig.edu.cn/attachment/core/label/2020_10/22_14/0226d21804216567.jpg",
        },
        {
          url: "http://attach.seig.edu.cn/attachment/core/label/2020_10/22_14/abae13226bace504.jpg",
        },
      ],
    };
  },
  created() {
    this.getTeachTask();
    this.getUserInfo();
    this.getNewByLimit();
  },
  methods: {
    // 获取教师端的课程任务信息
    async getTeachingTaskLimit() {
      let res = await getTeachingTaskLimit();
      for (let i = 0; i < res.teaching_task.length; i++) {
        this.teachTasks.push({
          title: res.teaching_task[i].title,
          content: res.teaching_task[i].content,
          time: res.teaching_task[i].time,
        });
      }
      if (this.teachTasks.length > 1) {
        this.teachTasks.splice(0, 1);
      }
    },
    // 获取学生端的课程任务信息
    async getTeachingTaskByStu() {
      let res = await getTeachingTaskByStu();
      for (let i = 0; i < res.teaching_task.length; i++) {
        this.teachTasks.push({
          title: res.teaching_task[i].title,
          content: res.teaching_task[i].content,
          time: res.teaching_task[i].time,
        });
      }
      if (this.teachTasks.length > 1) {
        this.teachTasks.splice(0, 1);
      }
    },
    // 获取课程任务信息（教师端和学生端）
    getTeachTask() {
      if (this.roles === "teacher") {
        this.getTeachingTaskLimit();
      } else {
        this.getTeachingTaskByStu();
      }
    },
    // 获取教师端信息
    async getTeacherInfo() {
      let res = await getTeacherInfo();
      this.userInfo = res;
      if (this.userInfo.avator) {
        this.headFlag = true;
      }
    },
    // 获取学生端信息
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
    // 获取快讯信息
    async getNewByLimit() {
      let res = await getNewByLimit();
      this.newList = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  li {
    list-style: none;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}

.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
  .task-content {
    text-indent: 2em;
  }
  .see-more {
    display: flex;
    justify-content: end;
  }
}
.header-card {
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
}

.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding: 18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p {
        padding: 0 0 8px;
      }
    }
  }
}
.noticeList {
  margin: 0;
  padding: 0;
}
.sideNav,
.sideLink {
  padding: 30px 0 12px;
  .sideBtn {
    padding: 16px 26px;
    font-size: 16px;
    margin: 10px 5px;
  }
}
.sideLink {
  text-align: center;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url("./../../assets/common/icon.png") no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
</style>
