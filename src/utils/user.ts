/**
 * desc: 用户信息
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/7
 * Time: 上午9:54
 */
/// <reference path='../.h/user.d.ts' />
import {Storage} from '@/utils/storage';

class User {
    private static _key = '_user';
    private static _user:UserModal;
    /**
     * 清空
     */
    public static empty() {
        this._user = {
            employeeUsName: '',
            employeeCode: '',
            employeeName: '',
            unitName:'',
            unitCode:'',
            permissionList: [],
            token: '',
            userName: '',

        };
    }

    /**
     * 设置用户信息
     * @param {UserModal} user
     */
    public static set user(user:UserModal) {
        this._user = user;
        Storage.set(this._key, user);
    }
    /**
     * 获取用户信息
     * @returns {UserModal}
     */
    public static get user():UserModal {
        if(!this._user) {
            this._user = Storage.get(this._key);
        }
        return this._user;
    }

    /**
     * 获取当前员工ID
     * @returns {string}
     */
    public static get userCode() {
        return this.user.employeeCode;
    }
    /**
     * 获取当前员工ID
     * @returns {string}
     */
    public static get employeeName() {
        return this.user.employeeName;
    }
    /**
     * 获取当前员工ID
     * @returns {string}
     */
    public static get employeeUsName() {
        return this.user.employeeUsName;
    }
    /**
     * 获取当前员工部门code
     * @returns {string}
     */
    public static get unitCode() {
        return this.user.unitCode;
    }
    /**
     * 获取当前员工部门名称
     * @returns {string}
     */
    public static get unitName() {
        return this.user.unitName;
    }
    /**
     * 获取当前员工权限列表
     * @returns {Array}
     */
    public static get permissionList() {
        return this.user.permissionList || {};
    }
    /**
     * 获取用户gymid
     * @returns {string}
     */
    public static get userName() {
        return this.user.userName;
    }
    /**
     * 获取当前用户token
     * @returns {string}
     */
    public static get token() {
        return this.user.token;
    }

}

export {User};
