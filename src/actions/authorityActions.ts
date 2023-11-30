/**
 * desc: 角色权限（事件）
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:22
 */
import {Fetch} from '@/service/fetch';
import {AuthorityApi} from '@/api/authorityApi';

/**
 * 获取角色列表
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getRoleList = (params:any):Promise<any> => {
    const param = {
        url: AuthorityApi.角色列表,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 获取树列表
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getTree = (params:any):Promise<any> => {
    const param = {
        url: AuthorityApi.树列表,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 设置角色人员
 * @param {string} code
 * @returns {Promise<any>}
 */
export const updateRolePerson = (params:any):Promise<any> => {
    const param = {
        url: AuthorityApi.设置角色人员,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 获取所有启用区域
 * @returns {Promise<any>}
 */
export const getArea = (params: any): Promise<any> => {
    const param = {
        url: AuthorityApi.获取启用区域,
        data: params,
    };
    return Fetch.post(param);
};
/**
 * 新增权限
 * @returns {Promise<any>}
 */
export const addAuthority = (params: any): Promise<any> => {
    const param = {
        url: AuthorityApi.新增权限,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 编辑权限
 * @returns {Promise<any>}
 */
export const editAuthority = (params: any): Promise<any> => {
    const param = {
        url: AuthorityApi.编辑权限角色,
        data: params,
    };
    return Fetch.post(param);
};

/**
 * 权限详情
 * @returns {Promise<any>}
 */
export const authorityDetail = (params: any): Promise<any> => {
    const param = {
        url: AuthorityApi.权限详情,
        data: params,
    };
    return Fetch.post(param);
};
