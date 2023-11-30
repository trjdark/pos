/**
 * desc: 权限枚举
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/19
 * Time: 上午9:19
 */
enum PermissionEnum {
    应急额度 = 'POS_EMERGENCY_LIMIT',
    中心预警管理 = 'CENTER_WARNING_MANAGE',
    订货额度 = 'POS_ORDER_LIMIT',
    星级评估 = 'POS_STAR_RATE',
    权益金比例 = 'POS_PREMIUM_RATE',
    权益金冲销 = 'POS_PREMINUM_VERIFY',
    权益金核算 = 'POS_PREMIUM_ACCOUNT',
    权限管理 = 'POS_AUTHORITY_LIMIT',
    h5活动管理 = 'CAMPAIGN_ACTIVITY_APPROVE',
    月度AR账单 = 'MONTHLY_AR_BILL',
}

export {PermissionEnum};
