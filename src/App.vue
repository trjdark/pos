<template>
  <div id="app">
    <Nav :userName="userName"/>
    <div id="gym-content" class="gym-content">
      <SliderMenu
              :scroll-height="height"
              :permission-list="permissionName"
      />
      <div class="gym-content-main" v-bind:style="{height:height+'px'}">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
/// <reference path='.h/user.d.ts' />
import Nav from '@c/nav/nav.vue';
import SliderMenu from '@c/sliderMenu/sliderMenu.vue';
import { Component, Vue } from 'vue-property-decorator';
import {CommonUtils} from './utils/commonUtils';
import {login} from './actions/basicActions';
import {User} from './utils/user';
import {Storage} from './utils/storage';
import {Cookie} from './utils/cookie';

@Component({
    components: {
        Nav,
        SliderMenu,
    },
})
export default class App extends Vue {
    private height = window.innerHeight - 60;
    private userName:any = `${User.employeeUsName}${User.employeeName}`;
    private permissionList:any[] = User.permissionList;
    private permissionName:any[] = [];
    private created() {
        const code:any = CommonUtils.urlSearchStringToObj('code');
        if(code) {
            login(code).then((res:any) => {
                Storage.set('_token', res.token);
                User.user = {
                    employeeCode: res.employeeCode,
                    employeeName: res.employeeName,
                    employeeUsName: res.employeeUsName,
                    unitCode: res.unitCode,
                    unitName: res.unitName,
                    permissionList: res.menus,
                    token:res.token,
                    userName: res.userName,
                };
                Cookie.setCookie('userName', User.userName, 2);
                this.userName = `${User.employeeUsName}${User.employeeName}`;
                (res.menus||[]).forEach((el:any) => {
                    this.permissionName = this.permissionName.concat(el.menuCode);
                });
                this.permissionList = User.permissionList;
                this.$store.dispatch('queryCenterList');
                this.$router.push('/');
            });
        } else {
            this.permissionName = User.permissionList.map((item:any) => item.menuCode);
            this.$store.dispatch('queryCenterList');
        }
        window.addEventListener('resize', this.onResize);
    }
    private onResize() {
        this.height = window.innerHeight - 60;
    }
}
</script>

<style lang="scss">

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1200px;
}
.gym-content{
  display: flex;
  &-main{
    width: calc(100% - 230px);
    padding: 24px;
    overflow: auto;
  }
}
</style>
