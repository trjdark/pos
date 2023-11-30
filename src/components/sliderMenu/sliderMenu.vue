<template>
    <div class="gym-slider-menu">
        <el-menu
                v-bind:style="{height: scrollHeight + 'px'}"
                class="el-menu-vertical-demo"
                :default-active="$route.path"
                router
            >
            <router-link :to="router.订货额度.path" v-if="permissionList.includes('POS_ORDER_LIMIT')">
                <el-menu-item :index="router.订货额度.path">
                    <Icon type="icondinghuoedu" class="gym-slider-menu-icon"/><span>订货额度</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.星级评估.path" v-if="permissionList.includes('POS_STAR_RATE')">
                <el-menu-item :index="router.星级评估.path">
                    <Icon type="iconxingji" class="gym-slider-menu-icon"/><span>星级评估</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.应急额度.path" v-if="permissionList.includes('POS_EMERGENCY_LIMIT')">
                <el-menu-item :index="router.应急额度.path">
                    <Icon type="iconyingjiguanli" class="gym-slider-menu-icon"/><span>应急额度</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.中心月度AR账单.path" v-if="permissionList.includes('MONTHLY_AR_BILL')">
                <el-menu-item :index="router.中心月度AR账单.path">
                    <i class="el-icon-tickets"></i><span>月度AR账单</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.权限管理.path" v-if="permissionList.includes('AUTHORITY_MANAGE')">
                <el-menu-item :index="router.权限管理.path">
                    <Icon type="iconquanxian" class="gym-slider-menu-icon"/><span>权限管理</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.权益金比例.path" v-if="permissionList.includes('POS_PREMIUM_RATE')">
                <el-menu-item :index="router.权益金比例.path">
                    <Icon type="iconquanyijinbili" class="gym-slider-menu-icon"/><span>权益金比例</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.权益金核算.path" v-if="permissionList.includes('POS_PREMIUM_ACCOUNT')">
                <el-menu-item :index="router.权益金核算.path">
                    <Icon type="iconquanyijinhesuan" class="gym-slider-menu-icon"/>
                    <span slot="title">权益金核算</span>
                </el-menu-item>
            </router-link>
            <router-link :to="router.权益金冲销.path" v-if="permissionList.includes('POS_PREMINUM_VERIFY')">
                <el-menu-item :index="router.权益金冲销.path">
                    <Icon type="iconchongxiao" class="gym-slider-menu-icon"/>
                    <span slot="title">权益金冲销</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="1" v-if="permissionList.includes('CENTER_WARNING_MANAGE')">
                <template slot="title">
                    <Icon type="iconzhongxinyujing" class="gym-slider-menu-icon"/>
                    <span>中心预警管理</span>
                </template>
                <router-link :to="router.中心关键数据预警设置.path" v-if="permissionList.includes('CENTER_WARNING_MANAGE')">
                    <el-menu-item-group>
                        <el-menu-item :index="router.中心关键数据预警设置.path">关键数据预警设置</el-menu-item>
                    </el-menu-item-group>
                </router-link>

            </el-submenu>
            <router-link :to="router.活动管理页.path" v-if="permissionList.includes('ACTIVITY_MANAGE')">
                <el-menu-item :index="router.活动管理页.path">
                    <span slot="title">活动管理页</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { RouterMap } from '../../router/routerMap';
    import Icon from '@c/icon/icon.vue';
    import {User} from '@/utils/user';
    // import {PermissionEnum} from '../../common/permissonEnum';

    @Component({
        components:{
            Icon,
        },
    })
    export default class SliderMenu extends Vue {
        @Prop({ default: 0 }) public scrollHeight !: number;
        @Prop({ default: [] }) public permissionList !: any;
        // private permission = PermissionEnum;
        private router = RouterMap;
        // private permissionList:any = User.permissionList;
        // private PermissionCodeList:any = [];
        private created() {
            // (this.permissionList||[]).forEach((el:any) => {
            //     this.PermissionName = this.PermissionName.concat(el.menuCode);
            // });
        }
    }
</script>

<style lang="scss">
    @import 'scss/theme.scss';
    .gym-slider-menu{
        width: 190px;
        overflow: auto;
        padding: 1px 0;
        &-icon{
            margin: 0px 5px;
        }
        .el-menu-item.is-active{
            background: $themeColor;
            color: $white;
        }
    }

</style>
