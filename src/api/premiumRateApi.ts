/**
 * desc: 权益金比例接口
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:36
 */

enum PremiumRateApi {
    权益金比例列表 = '/mate-pos/home/queryEquityRatioList',
    编辑权益金比例 = '/mate-pos/home/editEquityRatio',
    新增权益金比例 = '/mate-pos/home/addEquityRatio',
    下载权益金比例模版 = '/mate-pos/file/template/download',
    批量导入excel = '/mate-pos/home/getExcel',

}

export {PremiumRateApi};

