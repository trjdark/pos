/**
 * desc: 封装axios
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午3:30
 */
import axios from 'axios';
import {Loading} from 'element-ui';

declare interface AxiosParams {
    url: string;
    data?: object;
    header?: any;
    slience?: boolean;
    onProgress?: () => void;
}


class Axios {
    private static timeout:number = 10000;
    private static loadingInstance:any;
    /**
     * get 方法
     * @param {AxiosParams} params
     * @returns {any}
     */
    public static get = (params:AxiosParams) => {
        const {url, header, slience, onProgress} = params;
        if(!slience) {
            Axios.loadingInstance = Loading.service({});
        }
        // Todo 传递文件
        const headers = {
            'Content-Type':'application/json',
        };
        return axios.get(url, {
            responseType: 'json',
            timeout:Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress,
        }).then((res:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
            return Promise.resolve(res.data);
        },(err:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
            return Promise.reject({
                code:err.code,
                message:err.message,
            });
        });
    }
    /**
     * post 方法
     * @param {AxiosParams} params
     * @returns {any}
     */
    public static post = (params:AxiosParams) => {
        const {url, header, slience, onProgress}:any = params;
        let {data}:any = params;
        if(!slience) {
            Axios.loadingInstance = Loading.service({});
        }
        // Todo 传递文件
        let headers = {
            'Content-Type':'application/json',
        };
        if (data) {
            if ('file' in data) {
                const formData:any = new FormData();
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        formData.append(key, data[key]);
                    }
                }
                const k = 'file';
                formData.append(name, data[k].filename);
                data = formData;
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
            }
        }
        return axios.post(url, data || {}, {
            responseType: 'json',
            timeout:Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress,
        }).then((res:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
            return Promise.resolve(res.data);
        },(err:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
            return Promise.reject({
                code:err.code,
                message:err.message,
            });
        });
    }
    /**
     * post 返回二进制柳文件
     * @param {AxiosParams} params
     * @returns {any}
     */
    public static postBinary = (params:AxiosParams) => {
        const {url, data, header, slience, onProgress} = params;
        if(!slience) {
            Axios.loadingInstance = Loading.service({});
        }
        const headers = {
            // 'Content-Type':'application/json',
        };
        return axios.post(url, data || {}, {
            responseType: 'blob',
            timeout:Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress,
        }).then((res:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
            const blob = new Blob([res.data]);
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a');
                const key:string = 'file';
                const fileName = res.headers[key];
                elink.style.display = 'none';
                elink.setAttribute('target', '_blank');
                elink.href = window.URL.createObjectURL(blob);
                elink.download = decodeURI(fileName);
                document.body.appendChild(elink);
                elink.click();
                window.URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            }
        },(err:any) => {
            if(!slience) {
                Axios.loadingInstance.close();
            }
        });
    }
    public static postFormData = (params: AxiosParams) => {
        const {url, data, header, slience, onProgress} = params;
        if (!slience) {
            Axios.loadingInstance = Loading.service({});
        }

        const headers = {};
        return axios.post(url, data || {}, {
            responseType: 'json',
            timeout: Axios.timeout,
            withCredentials: false,
            headers: Object.assign({}, headers, header),
            onUploadProgress: onProgress,
        }).then(
            (res: any) => {
                if (!slience) {
                    Axios.loadingInstance.close();
                }
                return Promise.resolve(res.data);
            },
            (err: any) => {
                if (!slience) {
                    Axios.loadingInstance.close();
                }
                return Promise.reject(err);
            },
        );
    }
}

export {Axios};

