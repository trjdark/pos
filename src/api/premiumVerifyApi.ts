/**
 * desc: 权益金冲销 接口
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 下午2:11
 */
enum PremiumVerifyApi {
    权益金冲销列表 = '/mate-pos/home/queryChargeList',
    核算单列表 = '/mate-pos/home/queryCodeList',
    根据核算单号查询明细 = '/mate-pos/home/queryByCode',
    提交明细冲销 = '/mate-pos/home/submitCharge',
    权益金冲销明细 = '/mate-pos/home/queryChargeDetailList',
}

export {PremiumVerifyApi};
