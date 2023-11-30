/**
 * desc:活动管理页
 * User:Vicky
 * Date: 2020/6/4
 * Time: 上午10:20
 */
import {Fetch} from '@/service/fetch';
import {activityManageApi} from '@/api/activityManage';

/**
 * 获取权益金冲销列表
 * @param params
 * @returns {Promise<any>}
 */
export const getActivityList = (params?:any):Promise<any> => {
    const param = {
        url: activityManageApi.活动列表查,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 根据核算单号，查询明细
 * @returns {Promise<any>}
 */
export const getActivityById = (id:any):Promise<any> => {
    const param = {
        url: `${activityManageApi.活动详情}${id}`,
    };
    return Fetch.get(param);
};

/**
 * 获取参赛活动中心
 * @returns {Promise<any>}
 */
export const getActivityCities = ():Promise<any> => {
    const param = {
        url: activityManageApi.参赛活动中心列表,
    };
    return Fetch.get(param);
};

/**
 * 照片上下架
 * @returns {Promise<any>}
 */
export const getEditPhoto = (param:any):Promise<any> => {
    const params = {
        url: activityManageApi.照片上下架,
        data: param,
    };
    return Fetch.post(params);
};

/**
 * 照片审核
 * @returns {Promise<any>}
 */
export const approvePhoto = (param:any):Promise<any> => {
    const params = {
        url: activityManageApi.照片审核,
        data: param,
    };
    return Fetch.post(params);
};

/**
 * 照片上传updatePhoto
 * @returns {Promise<any>}
 */
export const uploadFile = (param:any, openid:any):Promise<any> => {
    const params = {
        url: activityManageApi.上传照片,
        data: param,
        header: {openid},
    };
    return Fetch.post(params);
};
/**
 * 照片跟新
 * @returns {Promise<any>}
 */
export const updatePhoto = (param:any):Promise<any> => {
    const params = {
        url: activityManageApi.更新照片,
        data: param,
    };
    return Fetch.post(params);
};

