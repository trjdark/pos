/**
 * desc: Ar 月度账单
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2022/10/8
 * Time: 下午6:03
 */
enum ArBillApi {
    查询AR账单 = '/mate-pos/home/monthlyArBill/getMonthlyArBill',
    导出AR账单 = '/mate-pos/home/monthlyArBill/export',
    查询AR账单明细 = '/mate-pos/home/monthlyArBillDetail/getMonthlyArBillDetail',
    导出AR账单明细 = '/mate-pos/home/monthlyArBillDetail/export',
    AR账单收款公司 = '/mate-pos/home/monthlyArBillDetail/getCompaniesInfo',
}

export {ArBillApi};
