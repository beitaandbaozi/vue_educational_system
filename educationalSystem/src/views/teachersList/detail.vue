<template>
  <div>
      {{this.num}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      //路由信息中取下来的id值
      num: this.$route.params.id,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>