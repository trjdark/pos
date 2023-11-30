/**
 * desc: 权益金核算(事件)
 * User: Vicky
 * Date: 2020/1/14
 * Time: 上午10:45
 */
import {Fetch} from '@/service/fetch';
import {PremiumAccountApi} from '@/api/premiumAccountApi';
import {PremiumRateApi} from '@/api/premiumRateApi';

/**
 * 获取权益金核算列表
 * @param params
 * @returns {Promise<any>}
 */
export const getEquityAccountList = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.权益金核算列表,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 查询权益金核算明细
 * @param params
 * @returns {Promise<any>}
 */
export const getEquityAccountDetail = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.权益金核算明细,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 新增权益金核算
 * @param params
 * @returns {Promise<any>}
 */
export const addEquityAccount = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.新增权益金核算,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 下载权益金核算模版
 * @param params
 * @returns {Promise<any>}
 */
export const downLoadEquity = (params?:any) => {
    const param = {
        url: PremiumAccountApi.权益金模版下载,
        data: params,
    };
    Fetch.postBinary(param);
};
/**
 * 导出权益金核算
 * @param params
 * @returns {Promise<any>}
 */
export const exportEquity = (params?:any) => {
    const param = {
        url: PremiumAccountApi.导出权益金核算,
        data: params,
    };
    Fetch.postBinary(param);
};
/**
 * 导出权益金核算
 * @param params
 * @returns {Promise<any>}
 */
export const pushSapAgain = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.重推sap,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 提交新增权益金核算
 * @param params
 * @returns {Promise<any>}
 */
export const submitSap = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.提交sap生成凭证,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 导出新增权益金核算新增页面excel
 * @param params
 * @returns {Promise<any>}
 */
export const exportAddExcel = (params?:any) => {
    const param = {
        url: PremiumAccountApi.导出权益金核算新增页excel,
        data: params,
    };
    Fetch.postBinary(param);
};
/**
 * d导入权益金核算
 * @param params
 * @returns {Promise<any>}
 */

export const exportEquityAccountData = (params?:any):Promise<any> => {
    const param = {
        url: PremiumAccountApi.导入权益金核算excel,
        data: params,
    };
    return Fetch.postFormData(param);
};

