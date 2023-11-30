import Vue from 'vue';
import Vuex from 'vuex';
import { getMyCenterList, getCompanyList, getCenterList} from '@/actions/basicActions';
import { getAreaGI } from '@/actions/orderActions';

Vue.use(Vuex);


const moduleA = {
    state: {
        centerList:[],
        myCenterList:[],
        companyList: [],
        areaList: [], // 区域列表
    },
    mutations: {
        setCenterList(state:any, param:any) {
            state.centerList = param;
        },
        setMyCenterList(state:any, param:any) {
            state.myCenterList = param;
        },
        setCompanyList(state:any, param:any) {
            state.companyList = param;
        },
        setAreaList(state:any, param:any) {
            state.areaList = param;
        },
    },
    actions: {
        queryCenterList({commit}:any, param:any) {
            getCenterList().then((res:any) => {
                commit('setCenterList', res);
            });
            getMyCenterList().then((res:any) => {
                commit('setMyCenterList', res);
            });
            getCompanyList().then((res:any) => {
                commit('setCompanyList',res);
            });
            getAreaGI().then((res: any) => {
                commit('setAreaList', res);
            });
        },
    },
    modules: {
    },
};

export default new Vuex.Store({
    modules: {
        basic: moduleA,
    },
});
