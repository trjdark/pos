/**
 * desc: 中心预警管理 （事件）
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/13
 * Time: 上午11:24
 */
import {Fetch} from '@/service/fetch';
import {WarningApi} from '@/api/warningApi';

/**
 * 获取关键数据预警设置列表
 * @param params
 * @returns {Promise<any>}
 */
export const getWarningList = (params?:any):Promise<any> => {
    const param = {
        url: WarningApi.获取关键数据预警设置列表,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 新增预警设置
 * @param params
 * @returns {Promise<any>}
 */
export const addWarning = (params:any):Promise<any> => {
    const param = {
        url: WarningApi.新增预警设置,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 删除预警设置
 * @param params
 * @returns {Promise<any>}
 */
export const removeWarning = (params:any):Promise<any> => {
    const param = {
        url: WarningApi.删除预警设置,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 获取预警设置信息
 * @param params
 * @returns {Promise<any>}
 */
export const getWarningInfo = (params:any):Promise<any> => {
    const param = {
        url: WarningApi.获取关键数据预警设置信息,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 更新预警设置信息
 * @param params
 * @returns {Promise<any>}
 */
export const updateWarningInfo = (params:any):Promise<any> => {
    const param = {
        url: WarningApi.更新关键数据预警设置信息,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 获取配置信息
 * @param params
 * @returns {Promise<any>}
 */
export const getWarningColumnInfo = ():Promise<any> => {
    const param = {
        url: WarningApi.更新预警配置信息,
    };
    return Fetch.post(param);
};
