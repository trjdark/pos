import Vue from 'vue';
import VueRouter from 'vue-router';
import {RouterMap} from '@/router/routerMap';

Vue.use(VueRouter);

const routes = [
  RouterMap.首页,
  RouterMap.订货额度,
  RouterMap.对账单,
  RouterMap.中心欠款余额明细,
  RouterMap.权益金余额明细,
  RouterMap.未发货订单明细,
  RouterMap.星级评估,
  RouterMap.应急额度,
  RouterMap.权限管理,
  RouterMap.新增权限,
  RouterMap.权限管理编辑,
  RouterMap.权限管理查看,
  RouterMap.权益金比例,
  RouterMap.权益金核算,
  RouterMap.新增权益金核算,
  RouterMap.查看权益金核算,
  RouterMap.权益金冲销,
  RouterMap.添加权益金冲销,
  RouterMap.权益金冲销详情,
  RouterMap.中心关键数据预警设置,
  RouterMap.中心关键数据预警设置新增,
  RouterMap.中心关键数据预警设置编辑,
  RouterMap.中心关键数据预警设置延用,
  RouterMap.活动管理页,
  RouterMap.活动详情页,
  RouterMap.中心月度AR账单,
  RouterMap.中心月度AR账单明细,

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((r) => r.meta.requireAuth)) {
    next({path: '/'});
  } else {
    next();
  }
});

export default router;
