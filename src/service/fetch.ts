/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/6
 * Time: 下午2:25
 */
import {Axios} from '../utils/axios';
import {Storage} from '@/utils/storage';
import {StatusCode} from '@/utils/statusCodeEnum';
import { Message } from 'element-ui';
import {Cookie} from '@/utils/cookie';
import {BasicApi} from '@/api/basicApi';


declare interface AxiosParams {
    url: string;
    data?: object;
    header?: object;
    slience?: boolean;
    onProgress?: () => void;
}

class Fetch {
    private static _key = '_token';
    private static UNCHECK_VERSION_API_LIST:string[] = [BasicApi.登录];
    // 用户token 保存在localstorage
    public static get token():any {
        return Storage.exist(this._key) ? { token: Storage.get(this._key) } : null;
    }
    public static get requestURL() {
        return location.protocol + '//' + location.host + '/api';
    }
    public static getUrl(url: string) {
        if(/files/.test(url)) {
            // 上传图片
            return `${location.protocol}//${location.host}${url}`;
        }
        return `${this.requestURL}${url}`;
    }
    /**
     * 检测version是否改变
     * @param version
     * @returns {any}
     */
    public static checkVersion(version: string) {
        if (!version) {
            return;
        }
        const originalVersion = Cookie.getCookie('posWebVersionControl');
        if (!originalVersion || originalVersion !== version) {
            Cookie.setCookie('posWebVersionControl', version, 30*60*60*24);
            window.location.reload();
        }
    }
    /**
     * 获取方法
     * @param params
     * @param {string} url
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    public static get(params:AxiosParams):Promise <any> {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            slience: params.slience,
            header: Object.assign({}, this.token, params.header),
        };
        return Axios.get(body).then((res:any) => {
            if (!this.UNCHECK_VERSION_API_LIST.includes(params.url)) {
                this.checkVersion(res.posWebVersionControl);
            }
            if(res.code === StatusCode.错误) {
                Message.error(res.msg);
                return Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错) {
                Message.warning(res.msg);
                window.location.href = process.env.VUE_APP_LOGIN_URL;
            }
            if(res.code === StatusCode.成功) {
                Promise.resolve(res.data);
                return res.data || true;
            }

        }, (err:any) => {
            Message.error(err.message);
            return Promise.reject(err);
        });
    }
    /**
     * 发送方法
     * @param params
     * @param {string} url
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    public static post(params:AxiosParams):Promise <any> {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            data: params.data || {},
            slience: params.slience,
            header: Object.assign({}, this.token, params.header),
        };
        return Axios.post(body).then((res:any) => {
            if (!this.UNCHECK_VERSION_API_LIST.includes(params.url)) {
                this.checkVersion(res.posWebVersionControl);
            }
            if(res.code === StatusCode.错误) {
                Message.error(res.msg);
                return Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错) {
                Message.warning(res.msg);
                window.location.href = process.env.VUE_APP_LOGIN_URL;
            }
            if(res.code === StatusCode.成功) {
                Promise.resolve(res.data);
                return res.data || true;
            }

        }, (err:any) => {
            Message.error(err.message);
            return Promise.reject(err);
        });
    }

    /**
     * 下载二进制流
     * @param {AxiosParams} params
     * @returns {any}
     */
    public static postBinary(params:AxiosParams):void {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            data: params.data || {},
            slience: params.slience,
            header: Object.assign({}, this.token, params.header),
        };
        Axios.postBinary(body);
    }
    public static postFormData(params: AxiosParams): Promise<any> {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            slience: params.slience,
            data: params.data || {},
            header: Object.assign({}, this.token, params.header),
        };

        return Axios.postFormData(body).then(
            (res: any) => {
                if (res.code === StatusCode.错误) {
                    Message.error(res.msg);
                    return Promise.reject(res);
                }
                if (res.code === StatusCode.成功) {
                    Promise.resolve(res.data);
                    return res.data || true;
                }
                if (res.code === StatusCode.权限出错) {
                    Message.warning(res.msg);
                    // 跳转到登录页面，地址在环境变量里配置
                    window.location.href = process.env.VUE_APP_LOGIN_URL;
                }
            },
            (err: any) => {
                const errMsg = err.message.includes('timeout') ? '网络请求超时，请稍后再试' : err.message;
                Message.error(errMsg);
                return Promise.reject(err);
            },
        );
    }
}

export {Fetch};
