/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 下午2:13
 */
import {Fetch} from '@/service/fetch';
import {PremiumVerifyApi} from '@/api/premiumVerifyApi';

/**
 * 获取权益金冲销列表
 * @param params
 * @returns {Promise<any>}
 */
export const getEquityChargeList = (params?:any):Promise<any> => {
    const param = {
        url: PremiumVerifyApi.权益金冲销列表,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 获取核算单列表
 * @returns {Promise<any>}
 */
export const getAccountCodeList = ():Promise<any> => {
    const param = {
        url: PremiumVerifyApi.核算单列表,
        data: {},
    };
    return Fetch.post(param);
};
/**
 * 根据核算单号，查询明细
 * @returns {Promise<any>}
 */
export const getByCode = (params:any):Promise<any> => {
    const param = {
        url: PremiumVerifyApi.根据核算单号查询明细,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 提交明细冲销
 * @param params
 * @returns {Promise<any>}
 */
export const submitCharge = (params:any):Promise<any> => {
    const param = {
        url: PremiumVerifyApi.提交明细冲销,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 提交明细冲销
 * @param params
 * @returns {Promise<any>}
 */
export const getChargeDetail = (params:any):Promise<any> => {
    const param = {
        url: PremiumVerifyApi.权益金冲销明细,
        data: params,
    };
    return Fetch.post(param);
};
