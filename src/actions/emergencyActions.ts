/**
 * desc: 应急额度（事件）
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:10
 */
import {Fetch} from '@/service/fetch';
import {EmergencyApi} from '@/api/emergencyApi';

/**
 * 获取应急额度列表
 * @param params
 * @returns {Promise<any>}
 */
export const getEmergencyList = (params?:any):Promise<any> => {
    const param = {
        url: EmergencyApi.应急额度列表,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 新增应急额度
 * @param params
 * @returns {Promise<any>}
 */
export const addEmergency = (params:any):Promise<any> => {
    const param = {
        url: EmergencyApi.新增应急额度,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 编辑应急额度
 * @param params
 * @returns {Promise<any>}
 */
export const editEmergency = (params:any):Promise<any> => {
    const param = {
        url: EmergencyApi.编辑应急额度,
        data: params,
    };
    return Fetch.post(param);
};
