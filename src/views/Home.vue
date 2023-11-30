<template>
  <div class="home">
    <div class="home-img">
      <img src="../assets/home.png" alt="">
      <p class="home-text">欢迎登录POS后台管理系统</p>
    </div>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Vue } from 'vue-property-decorator';
import Icon from '@c/icon/icon.vue';

@Component({
    components: {
        Icon,
    },
})
export default class Home extends Vue {
}
</script>
<style lang="scss">
  @import 'scss/theme.scss';
  .home{
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    &-text{
      font-size: 18px;
      font-weight: bold;
      color: $themeColor;
      text-align: center;
    }
  }
</style>
