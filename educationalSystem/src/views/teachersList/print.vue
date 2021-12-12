<template>
  <div>
    {{this.num}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: this.$route.params.id,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>