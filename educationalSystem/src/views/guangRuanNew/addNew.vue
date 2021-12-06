<template>
  <div>
    <h3>发布新闻</h3>
    <!-- <editor-bar
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></editor-bar> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClear: false,
      detail: "",
    };
  },

  mounted() {},

  methods: {
    change(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>