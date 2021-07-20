<template>
  <div class="dashboard-container">
    <div class="dashboard-text">vue-demo</div>
    <div>
      <p>技术栈:</p>
      <span>vue</span>
      <br />
      <span>vuex</span>
      <br />
      <span>vue-router</span>
      <br />
      <span>ES6</span>
      <br />
      <span>axios</span>
      <br />
      <span>element-ui</span>
      <br />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
