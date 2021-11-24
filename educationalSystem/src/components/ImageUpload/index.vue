<template>
  <div>
    <!-- 放置一个上传组件 -->
    <!-- action这里不写上传地址 因为我们是调用腾讯云cos 不是一个地址可以搞定的 要用自定义的上传 -->
    <el-upload
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      list-type="picture-card"
      action="#"
      :limit="1"
      :class="{disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条 -->
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <!-- 放置一个弹层 -->
    <!-- sync修饰符自动将弹层关闭了 -->
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 引入腾讯云的包
import COS from "cos-js-sdk-v5";
// COS实例化
const cos = new COS({
  SecretId: "AKIDiFXaPyHJ3WjfJgmcARRBeqlQntiFWWFg",
  SecretKey: "C8mAH8i13oIVR6UbR1JK4XliNltkJbdN",
});
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
      // 存储点击的图片地址
      imgUrl: "",
      // 记住当前上传的图片id
      currentFileUid: "",
      percent: 0,
      // 默认不显示进度条
      showPercent: false,
    };
  },
  methods: {
    //  预览图片
    preview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    // 图片删除
    handleRemove(file) {
      // file是点击删除的文件
      // 将原来的文件给排除掉，剩下的就是最新的数组了
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    // 添加图片
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
    },
    // 上传图片检查
    beforeUpload(file) {
      //   先检查文件类型
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.some((item) => item === file.type)) {
        //   如果不存在
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        return false; // 上传终止
      }
      // 检查文件大小  5M 1M = 1024KB 1KB = 1024B
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        //   超过了限制的文件大小
        this.$message.error("上传的图片大小不能大于5M");
        return false;
      }
      //   已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid;
      return true; // 最后一定要return  true
    },
    // 进行上传操作
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: "beita-edu-system-1306077807", // 存储桶
            Region: "ap-guangzhou", // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            console.log(err || data);
            // data中有一个statusCode === 200 的时候说明上传成功
            if (!err && data.statusCode === 200) {
              //   此时说明文件上传成功  要获取成功的返回地址
              // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
              // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
              // 需要知道当前上传成功的是哪一张图片
              this.fileList = this.fileList.map((item) => {
                // 去找谁的uid等于刚刚记录下来的id
                if (item.uid === this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  return { url: "http://" + data.Location, upload: true };
                  // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                  // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
                }
                return item;
              });
              // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
            }
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.disabled .el-upload--picture-card {
  display: none;
}
</style>