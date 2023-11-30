/**
 * desc: 订货额度
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/7
 * Time: 上午11:17
 */
enum OrderApi {
    查询订货额度 = '/mate-pos/home/getOrderLimit',
    导出订货额度 = '/mate-pos/home/orderLimit/export',
    对账单查询 = '/mate-pos/home/getCreditBillDetail',
    对账单导出 = '/mate-pos/home/getCreditBillDetail/export',
    中心欠款余额明细 = '/mate-pos/home/getCreditArDetail',
    导出中心欠款余额明细 = '/mate-pos/home/getCreditArDetail/export',
    未到期余额明细 = '/mate-pos/home/getCreditPreArDetail',
    导出未到期余额明细 = '/mate-pos/home/getCreditPreArDetail/export',
    未发货订单明细 = '/mate-pos/home/getCreditUnOrderDetail',
    导出未发货订单明细 = '/mate-pos/home/getCreditUnOrderDetail/export',
    获取区域和GI = '/mate-pos/home/getAreaGiList',
}

export {OrderApi};

