/**
 * desc: 权益金比例（事件）
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:38
 */
import {Fetch} from '@/service/fetch';
import {PremiumRateApi} from '@/api/premiumRateApi';
import {OrderApi} from '@/api/orderApi';

/**
 * 获取权益金比例列表
 * @param params
 * @returns {Promise<any>}
 */
export const getEquityRatioList = (params?:any):Promise<any> => {
    const param = {
        url: PremiumRateApi.权益金比例列表,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 权益金比例编辑
 * @param params
 * @returns {Promise<any>}
 */
export const editEquityRatio = (params?:any):Promise<any> => {
    const param = {
        url: PremiumRateApi.编辑权益金比例,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 新增权益金比例
 * @param params
 * @returns {Promise<any>}
 */
export const addEquityRatio = (params?:any):Promise<any> => {
    const param = {
        url: PremiumRateApi.新增权益金比例,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 下载权益金比例模版
 * @param params
 * @returns {Promise<any>}
 */
export const downLoad = (params?:any):void => {
    const param = {
        url: PremiumRateApi.下载权益金比例模版,
        data: params,
    };
    Fetch.postBinary(param);
};

/**
 * 权益金比例模版
 * @param params
 * @returns {Promise<any>}
 */
export const importExcel = (params?:any):Promise<any> => {
    const param = {
        url: PremiumRateApi.批量导入excel,
        data: params,
    };
    return Fetch.postFormData(param);
};
