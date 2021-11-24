<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览弹层 -->
    <el-dialog
      title="图片"
      :visible.sync="showDialog"
    >
      <img
        :src="imgUrl"
        style="width:100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  data() {
    return {
      // 图片地址
      fileList: [],
      // 控制显示弹层
      showDialog: false,
      imgUrl: "",
    };
  },

  mounted() {},

  methods: {
    //  预览图片
    preview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    // 图片删除
    handleRemove(file){
        // file是点击删除的文件
        // 将原来的文件给排除掉，剩下的就是最新的数组了
        this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>