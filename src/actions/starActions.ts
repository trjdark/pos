/**
 * desc: 星级评估(事件)
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午9:37
 */
import {Fetch} from '@/service/fetch';
import {StarApi} from '@/api/starApi';

/**
 * 获取中心星级列表
 * @param params
 * @returns {Promise<any>}
 */
export const getStarList = (params?:any):Promise<any> => {
    const param = {
        url: StarApi.中心星级列表,
        data: params,
    };
    return Fetch.post(param);
};
