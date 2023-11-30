/**
 * desc: 权益金核算
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:44
 */
enum PremiumAccountApi {
    权益金核算列表 = '/mate-pos/home/queryEquityAccount',
    权益金核算明细 = '/mate-pos/home/getDetailByCode',
    权益金模版下载 = '/mate-pos/file/template/download',
    提交sap生成凭证 = '/mate-pos/home/submit',
    新增权益金核算 = '/mate-pos/home/addEquityAccount',
    重推sap = '/mate-pos/home/retrySap',
    导入权益金核算excel = '/mate-pos/home/getExcelData',
    导出权益金核算 = '/mate-pos/home/importExcel',
    导出权益金核算新增页excel = '/mate-pos/home/importAccountList',


}

export {PremiumAccountApi};

