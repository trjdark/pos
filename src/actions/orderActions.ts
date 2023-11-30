/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/7
 * Time: 上午11:17
 */
import {Fetch} from '@/service/fetch';
import {OrderApi} from '@/api/orderApi';

/**
 * 获取订货额度
 * @param params
 * @returns {Promise<any>}
 */
export const getOrderList = (params?:any):Promise<any> => {
    const param = {
        url: OrderApi.查询订货额度,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 导出订货额度
 * @param params
 */
export const exportOrderList = (params?:any):void => {
    const param = {
        url: OrderApi.导出订货额度,
        data: params,
    };
    Fetch.postBinary(param);
};
/**
 * 获取对账单
 * @param params
 * @returns {Promise<any>}
 */
export const getCreditBillDetail = (params?:any):Promise<any> => {
    const param = {
        url: OrderApi.对账单查询,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 获取对账单导出
 * @param params
 * @returns {Promise<any>}
 */
export const exportBillDetail = (params?:any) => {
    const param = {
        url: OrderApi.对账单导出,
        data: params,
    };
    Fetch.postBinary(param);
};

/**
 * 获取中心欠款余额明细
 * @param params
 * @returns {Promise<any>}
 */
export const getPaymentInfoDetail = (params?:any):Promise<any> => {
    const param = {
        url: OrderApi.中心欠款余额明细,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 导出中心欠款余额明细
 * @param params
 * @returns {Promise<any>}
 */
export const exportPaymentInfoDetail = (params?:any) => {
    const param = {
        url: OrderApi.导出中心欠款余额明细,
        data: params,
    };
    return Fetch.postBinary(param);
};

/**
 * 获取未到期余额明细
 * @param params
 * @returns {Promise<any>}
 */
export const getUnexpiredInfoDetail = (params?:any):Promise<any> => {
    const param = {
        url: OrderApi.未到期余额明细,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 导出未到期余额明细
 * @param params
 * @returns {Promise<any>}
 */
export const exportUnexpiredInfoDetail = (params?:any) => {
    const param = {
        url: OrderApi.导出未到期余额明细,
        data: params,
    };
    return Fetch.postBinary(param);
};

/**
 * 获取未发货订单明细
 * @param params
 * @returns {Promise<any>}
 */
export const getUnshippedInfoDetail = (params?:any):Promise<any> => {
    const param = {
        url: OrderApi.未发货订单明细,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 导出未发货订单明细
 * @param params
 * @returns {Promise<any>}
 */
export const exportUnshippedInfoDetail = (params?:any) => {
    const param = {
        url: OrderApi.导出未发货订单明细,
        data: params,
    };
    return Fetch.postBinary(param);
};

/**
 * 获取区域和GI
 * @param params
 * @returns {Promise<any>}
 */
// export const getAreaGI = (params?: any): Promise<any> => {
//     const param = {
//         url: OrderApi.获取区域和GI,
//         data: params,
//     };
//     return Fetch.post(param);
// };
/**
 * 获取预警下拉框中心列表
 * @returns {Promise<any>}
 */
export const getAreaGI = (): Promise<any> => {
    const param = {
        url: OrderApi.获取区域和GI,
    };
    return Fetch.post(param);
};

