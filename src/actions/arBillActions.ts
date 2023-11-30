/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2022/10/8
 * Time: 下午6:02
 */
import {Fetch} from '@/service/fetch';
import {ArBillApi} from '@/api/arBillApi';

/**
 * 获取Ar账单的收款公司
 * @param params
 * @returns {Promise<any>}
 */
export const getArBillCompanyList = (params:any):Promise<any> => {
    const param = {
        url: ArBillApi.AR账单收款公司,
        data: params,
    };
    return Fetch.post(param);
};
/**
 *
 * @param params
 * @returns {Promise<any>}
 */
export const getArBill = (params:any):Promise<any> => {
    const param = {
        url: ArBillApi.查询AR账单,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 导出Ar账单
 * @param params
 * @returns {Promise<any>}
 */
export const exportArBill = (params:any) => {
    const param = {
        url: ArBillApi.导出AR账单,
        data: params,
    };
    Fetch.postBinary(param);
};

/**
 * 查询Ar账单明细
 * @param params
 * @returns {Promise<any>}
 */
export const getArBillDetail = (params:any):Promise<any> => {
    const param = {
        url: ArBillApi.查询AR账单明细,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 导出Ar账单明细
 * @param params
 * @returns {Promise<any>}
 */
export const exportArBillDetail = (params:any) => {
    const param = {
        url: ArBillApi.导出AR账单明细,
        data: params,
    };
    Fetch.postBinary(param);
};
