/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/10/21
 * Time: 下午2:09
 */
class Cookie {
    /**
     * 读取cookie
     * @param {string} name
     * @returns {any}
     */
    public static getCookie(name:string) {
        const reg = new RegExp('(^| )'+name+'=([^;]*)(;|$)');
        const arr = document.cookie.match(reg);
        if( arr) {
            return (arr[2]);
        } else {
            return null;
        }
    }

    /**
     * 设置cookie
     * @param {string} name
     * @param {string} val
     * @param {number} exdays
     */
    public static setCookie(name:string, val:string, exdays?:number) {
        Cookie.delCookie(name);
        let expires = '';
        if(exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            expires = 'expires=' + d.toUTCString();
        } else {
            expires = 'expires=Session';
        }
        document.cookie = `${name}=${val};${expires}; path=/`;
    }

    /**
     * 删除cookie
     * @param {string} name
     */
    public static delCookie(name:string) {
        const exp:any = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.getCookie(name);
        if(cval != null) {
            document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
        }
    }
}

export {Cookie};
