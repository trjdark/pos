/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2019/12/30
 * Time: 上午10:02
 */
import {Crypto} from './crypto';
import MD5 from 'crypto-js/md5';

class Storage {
    /**
     * 获取
     * @param {string} key
     * @returns {any}
     */
    public static get(key: string) {
        const _key = MD5(key).toString();
        const ciphertext = localStorage.getItem(_key);
        return JSON.parse(!!ciphertext ? Crypto.decrypt(ciphertext) : '{}');
    }

    /**
     * 设置
     * @param {string} key
     * @param {object | string} data
     */
    public static set(key: string, data: any) {
        const _key = MD5(key).toString();
        localStorage.setItem(_key, Crypto.encrypt(JSON.stringify(data)));
    }

    /**
     * 批量设置
     * @param {Array<any>} list
     */
    public static multSet(lists:any) {
        for(const key in lists) {
            if (lists.hasOwnProperty(key)) {
                this.set(key, lists[key]);
            }
        }
    }
    /**
     * 删除
     * @param {string} key
     */
    public static remove(key: string) {
        const _key = MD5(key).toString();
        localStorage.removeItem(_key);
    }

    /**
     * 清除
     */
    public static clear() {
        localStorage.clear();
    }

    /**
     * 是否存在
     * @param {string} key
     * @returns {boolean}
     */
    public static exist(key: string) {
        const _key = MD5(key).toString();
        return !!localStorage.getItem(_key);
    }

    /**
     * 修改
     * @param {string} key
     * @param {object} data
     */
    public static assign(key:string, data: object) {
        const beforeDate = this.get(key);
        const afterDate = Object.assign({}, beforeDate, data);
        this.set(key, afterDate);
    }
}

export {Storage};
