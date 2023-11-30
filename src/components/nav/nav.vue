<template>
    <div id="gym-nav" class="gym-nav">
        <router-link to="/">
            <div class="gym-nav-logo">
                <img src="../../assets/logo.jpg" alt="">
            </div>
        </router-link>
        <div class="gym-nav-menu">
            <span class="gym-nav-menu-name">{{userName}}</span>
            <span class="gym-nav-menu-logout" @click="logout">退出</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {User} from '../../utils/user';
    import {Storage} from '../../utils/storage';

    @Component

    export default class Nav extends Vue {

        @Prop ({default: ''}) private userName:any;

        private logout() {
            User.empty();
            Storage.clear();
            window.location.href = process.env.VUE_APP_LOGIN_URL;
        }
    }
</script>

<style lang="scss">
    @import '@/scss/theme.scss';

    .gym-nav{
        height: 60px;
        background: $themeColor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-logo{
            width: 230px;
            text-align: center;
            img{
                width: 70%;
            }
        }
        &-menu{
            color: $white;
            &-name{
                margin-right: 40px;
            }
            &-logout{
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
</style>