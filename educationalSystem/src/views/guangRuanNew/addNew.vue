<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-form
        :model="addNewForm"
        :rules="addNewRules"
        ref="addNewRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="新闻标题"
          prop="new_title"
        >
          <el-input v-model="addNewForm.new_title"></el-input>
        </el-form-item>
        <el-form-item
          label="供稿部门"
          prop="depart_feed"
        >
          <el-input v-model="addNewForm.depart_feed"></el-input>
        </el-form-item>
        <el-form-item label="供稿人">
          <el-input v-model="addNewForm.contributor"></el-input>
        </el-form-item>
        <el-form-item label="摄影">
          <el-input v-model="addNewForm.photographer"></el-input>
        </el-form-item>
        <el-form-item
          label="编辑"
          prop="edit"
        >
          <el-input v-model="addNewForm.edit"></el-input>
        </el-form-item>
        <el-form-item
          label="初审"
          prop="first_trial"
        >
          <el-input v-model="addNewForm.first_trial"></el-input>
        </el-form-item>
        <el-form-item
          label="复审"
          prop="recheck"
        >
          <el-input v-model="addNewForm.recheck"></el-input>
        </el-form-item>
        <el-form-item
          label="审核"
          prop="audit"
        >
          <el-input v-model="addNewForm.audit"></el-input>
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <quill-editor
            class="editor"
            ref="myTextEditor"
            v-model="addNewForm.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item
          label="时间"
          prop="time"
          style="margin-top:80px"
        >
          <el-date-picker
            v-model="addNewForm.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 发布操作 -->
      <el-row
        type="flex"
        justify="end"
      >
        <el-button
          type="success"
          plain
          @click="issueNew"
        >发布快讯</el-button>
      </el-row>
      <!-- 回顶 -->
      <el-backtop :bottom="60">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
          Top
        </div>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { issueNew } from "@/api/guangRuanNew";
import { Message } from "element-ui";
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: "请输入新闻内容", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
      addNewForm: {
        new_title: "",
        depart_feed: "",
        contributor: "",
        photographer: "",
        edit: "",
        first_trial: "",
        recheck: "",
        audit: "",
        time: "",
      },
      addNewRules: {
        new_title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
        ],
        depart_feed: [
          { required: true, message: "请输入供稿部门", trigger: "blur" },
        ],
        edit: [{ required: true, message: "请输入编辑人员", trigger: "blur" }],
        first_trial: [
          { required: true, message: "请输入初审人员", trigger: "blur" },
        ],
        recheck: [
          { required: true, message: "请输入复审人员", trigger: "blur" },
        ],
        audit: [{ required: true, message: "请输入审核人员", trigger: "blur" }],
        content: [
          { required: true, message: "请输入新闻内容", trigger: "blur" },
        ],
        time: [
          {
            required: true,
            message: "请输入发表时间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 发布快讯
    async issueNew() {
      this.$refs.addNewRef.validate(async (valid) => {
        if (!valid) return;
        await issueNew(this.addNewForm);
        Message.success("发布快讯成功！");
        //清空表单
        this.addNewForm = {
          title: "",
          depart_feed: "",
          contributor: "",
          photographer: "",
          edit: "",
          first_trial: "",
          recheck: "",
          audit: "",
          time: "",
        };
      });
    },
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
};
</script>

<style>
.editor {
  line-height: normal !important;
  height: 800px;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>