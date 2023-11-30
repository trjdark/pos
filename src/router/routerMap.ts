/**
 * desc: 路由字典
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2019/12/26
 * Time: 上午9:36
 */
import {PermissionEnum} from '@/common/permissonEnum';
import {User} from '@/utils/user';
import Home from '../views/Home.vue';
import Order from '../views/order/index.vue';
import OrderInfo from '../views/order/orderInfo.vue';
import PaymentInfo from '../views/order/paymentInfo.vue';
import UnexpiredInfo from '../views/order/unexpiredInfo.vue';
import UnshippedInfo from '../views/order/unshippedInfo.vue';
import Star from 'views/star/index.vue';
import Emergency from 'views/emergency/index.vue';
import Authority from 'views/authority/index.vue';
import AuthorityEdit from 'views/authority/edit.vue';
import AuthorityDetail from 'views/authority/detail.vue';
import AuthorityAdd from 'views/authority/add.vue';
import PremiumRate from 'views/premiumRate/index.vue';
import PremiumAccount from 'views/premiumAccount/index.vue';
import AddPremiumAccount from 'views/premiumAccount/add.vue';
import PremiumAccountInfo from 'views/premiumAccount/detail.vue';
import PremiumVerify from 'views/premiumVerify/index.vue';
import PremiumVerifyAdd from 'views/premiumVerify/add.vue';
import PremiumVerifyDetail from 'views/premiumVerify/detail.vue';
import CenterWarning from 'views/centerWarning/index.vue';
import CenterWarningAdd from 'views/centerWarning/add.vue';
import CenterWarningEdit from 'views/centerWarning/edit.vue';
import ActivityManage from 'views/activityManage/index.vue';
import ActivityDetail from 'views/activityManage/edit.vue';
import CenterWarningContinue from 'views/centerWarning/continue.vue';
import ARBill from 'views/arBill/list.vue';
import ARBillDetail from 'views/arBill/detail.vue';


class RouterMap {
    public static 首页 = {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requireAuth: true,
        },
    };
    public static 订货额度 = {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            requireAuth: () => PermissionEnum.订货额度,
        },
    };
    public static 对账单 = {
        path: '/order/:params',
        link: '/order/',
        name: 'OrderInfo',
        component: OrderInfo,
        meta: {
            requireAuth: () => PermissionEnum.订货额度,
        },
    };
    public static 中心欠款余额明细 = {
        path: '/payment/:params',
        link: '/payment/',
        name: 'PaymentInfo',
        component: PaymentInfo,
        meta: {
            requireAuth: () => PermissionEnum.订货额度,
        },
    };
    public static 权益金余额明细 = {
        path: '/unexpired/:params',
        link: '/unexpired/',
        name: 'Unexpired',
        component: UnexpiredInfo,
        meta: {
            requireAuth: () => PermissionEnum.订货额度,
        },
    };
    public static 未发货订单明细 = {
        path: '/unshipped/:params',
        link: '/unshipped/',
        name: 'Unshipped',
        component: UnshippedInfo,
        meta: {
            requireAuth: () => PermissionEnum.订货额度,
        },
    };
    public static 星级评估 = {
        path: '/star',
        name: 'star',
        component: Star,
        meta: {
            requireAuth: () => PermissionEnum.星级评估,
        },
    };
    public static 应急额度 = {
        path: '/emergency',
        name: 'emergency',
        component: Emergency,
        meta: {
            requireAuth: () => PermissionEnum.应急额度,
        },
    };
    public static 新增权限 = {
        path: '/authority/add',
        name: 'authority_add',
        link: 'authority/add',
        component: AuthorityAdd,
        meta: {
            requireAuth: PermissionEnum.权限管理,
        },
    };
    public static 权限管理 = {
        path: '/authority',
        name: 'authority',
        component: Authority,
        meta: {
            requireAuth: () => PermissionEnum.权限管理,
        },
    };
    public static 权限管理编辑 = {
        path: '/authority/edit/:params',
        name: 'authority_edit',
        link: 'authority/edit/',
        component: AuthorityEdit,
        meta: {
            requireAuth: PermissionEnum.权限管理,
        },
    };
    public static 权限管理查看 = {
        path: '/authority/detail/:params',
        link: '/authority/detail/',
        name: 'authority_detail',
        component: AuthorityDetail,
        meta: {
            requireAuth: PermissionEnum.权限管理,
        },
    };
    public static 权益金比例 = {
        path: '/premium_rate',
        name: 'premium_rate',
        component: PremiumRate,
        meta: {
            requireAuth: PermissionEnum.权益金比例,
        },
    };
    public static 权益金核算 = {
        path: '/premium_account',
        name: 'premium_account',
        component: PremiumAccount,
        meta: {
            requireAuth: PermissionEnum.权益金核算,
        },
    };
    public static 新增权益金核算 = {
        path: '/premium_account/add',
        name: 'premium_account_add',
        link: '/premium_account/add/',
        component: AddPremiumAccount,
        meta: {
            requireAuth: PermissionEnum.权益金核算,
        },
    };
    public static 查看权益金核算 = {
        path: '/detail/:params',
        link: '/detail/',
        name: 'detail',
        component: PremiumAccountInfo,
        meta: {
            requireAuth: PermissionEnum.权益金核算,
        },
    };
    public static 权益金冲销 = {
        path: '/premium_verify',
        name: 'premium_verify',
        component: PremiumVerify,
        meta: {
            requireAuth: PermissionEnum.权益金冲销,
        },
    };
    public static 添加权益金冲销 = {
        path: '/premium_verify/add',
        name: 'premium_verify_add',
        component: PremiumVerifyAdd,
        meta: {
            requireAuth: PermissionEnum.权益金冲销,
        },
    };
    public static 权益金冲销详情 = {
        path: '/premium_verify/detail/:params',
        link: '/premium_verify/detail/',
        name: 'premium_verify_detail',
        component: PremiumVerifyDetail,
        meta: {
            requireAuth: PermissionEnum.权益金冲销,
        },
    };
    public static 中心关键数据预警设置 = {
        path: '/center_warning',
        name: 'center_warning',
        component: CenterWarning,
        meta: {
            requireAuth: PermissionEnum.中心预警管理,
        },
    };
    public static 中心关键数据预警设置新增 = {
        path: '/center_warning/add',
        name: 'center_warning_add',
        component: CenterWarningAdd,
        meta: {
            requireAuth: PermissionEnum.中心预警管理,
        },
    };
    public static 中心关键数据预警设置编辑 = {
        path: '/center_warning/edit/:params',
        link: '/center_warning/edit/',
        name: 'center_warning_edit',
        component: CenterWarningEdit,
        meta: {
            requireAuth: PermissionEnum.中心预警管理,
        },
    };
    public static 中心关键数据预警设置延用 = {
        path: '/center_warning/continue/:params',
        link: '/center_warning/continue/',
        name: 'center_warning_continue',
        component: CenterWarningContinue,
        meta: {
            requireAuth: PermissionEnum.中心预警管理,
        },
    };
    public static 活动管理页 = {
        path: '/activityManage',
        name: 'activityManage',
        component: ActivityManage,
        meta: {
            requireAuth: PermissionEnum.h5活动管理,
        },
    };
    public static 活动详情页 = {
        path: '/activityDetail/:params',
        link: '/activityDetail/',
        name: 'activityDetail',
        component: ActivityDetail,
        meta: {
            requireAuth: PermissionEnum.h5活动管理,
        },
    };
    public static 中心月度AR账单 = {
        path: '/bill',
        link: 'bill',
        name: 'ARBill',
        component: ARBill,
        meta: {
            requireAuth: PermissionEnum.月度AR账单,
        },
    };
    public static 中心月度AR账单明细 = {
        path: '/bill/detail/:params',
        link: '/bill/detail/',
        name: 'bill_detail',
        component: ARBillDetail,
        meta: {
            requireAuth: PermissionEnum.月度AR账单,
        },
    };
}

export {RouterMap};
