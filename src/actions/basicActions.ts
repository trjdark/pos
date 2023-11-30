/**
 * desc: 基本事件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/6
 * Time: 下午5:25
 */
import {Fetch} from '@/service/fetch';
import {BasicApi} from '@/api/basicApi';

/**
 * 登录
 * @param {string} code
 * @returns {Promise<any>}
 */
export const login = (code:string):Promise<any> => {
    const param = {
        url: BasicApi.登录,
        data: {code},
    };
    return Fetch.post(param);
};
/**
 * 获取所有中心列表
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getCenterList =  ():Promise<any> => {
    const param = {
        url: BasicApi.获取所有中心列表,
        data: {},
    };
    return Fetch.post(param);
};

/**
 * 获取预警下拉框中心列表
 * @returns {Promise<any>}
 */
export const getMyCenterList = ():Promise<any> => {
    const param = {
        url: BasicApi.获取角色中心列表,
    };
    return Fetch.post(param);
};
/**
 * 获取公司列表
 * @returns {Promise<any>}
 */
export const getCompanyList = ():Promise<any> => {
    const param = {
        url: BasicApi.获取公司列表,
    };
    return Fetch.post(param);
};
/**
 * 获取初始化菜单
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getInitMenu = (params: any): Promise<any> => {
    const param = {
        url: BasicApi.初始化菜单,
        data: params,
    };
    return Fetch.post(param);
};
