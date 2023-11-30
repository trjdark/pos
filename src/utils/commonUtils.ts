/**
 * desc: 工具类
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2019/12/30
 * Time: 上午10:22
 */
import {Base64Util} from './crypto';
import moment from 'moment';

class CommonUtils {
    /**
     * 路由参数加密
     * @param {object} params
     * @returns {string}
     */
    public static stringify(params: object) {
        return Base64Util.stringify(JSON.stringify(params));
    }
    /**
     * 路由参数解密
     * @param props
     * @returns {any}
     */
    public static parse(route: any) {
        const params = Base64Util.parse(route.params.params);
        return JSON.parse(params);
    }
    /**
     * url search string to obj
     * @param {String<any>} str
     * @returns {Object}
     * @constructor
     */
    public static urlSearchStringToObj(str:string) {
        const query = window.location.search.substring(1);
        const searchArr = query.split('&');
        for (let i = 0, l = searchArr.length ;i < l;i++) {
            const pair = searchArr[i].split('=');
            if(pair[0] === str) {
                return pair[1];
            }
        }
        return false;
    }
    /**
     * 数字格式化
     * @param {number} num
     */
    public static toThousands(num:any) {
        const _num = (Number.parseFloat(num) || 0).toFixed(2).toString();
        let integter = _num.slice(0,_num.indexOf('.'));
        const float = _num.slice(_num.indexOf('.')+1);
        let result = '';
        while (integter.length > 3) {
            result = ',' + integter.slice(-3) + result;
            integter = integter.slice(0, integter.length - 3);
        }
        if(integter) {
            result = `${integter + result}.${float}`;
        }
        return result;
    }
}

export {CommonUtils};
