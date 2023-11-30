<!--权益金冲销111-->
<template>
    <div class="gym-page-premium-verify">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-premium-verify-buttons">
            <router-link :to="route.添加权益金冲销.path">
                <button class="gym-button-xs gym-button-default" v-if="buttonCode.includes('PBT004')">新增</button>
            </router-link>
        </div>
        <div class="gym-page-premium-verify-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSourse"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="jumpDetail"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {getEquityChargeList} from '../../actions/premiumVerifyActions';
    import {RouterMap} from '../../router/routerMap';
    import {TableFilter} from '../../filters/tableFilter';
    import {CommonUtils} from '../../utils/commonUtils';
    import {User} from '../../utils/user';


    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
        },
    })
    export default class PremiumVerify extends Vue {
        public titles = [
            {
                name: '权益金冲销',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '单据编号',
                type: 'text',
                name: 'chargeCode',
                placeholder: '请输入',
            },
        ];
        private columns = [
            {
                label: '冲销单号',
                prop: 'chargeCode',
            }, {
                label: '申请时间',
                prop: 'applyDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            },{
                label: '权益金冲销日期',
                prop: 'applyDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            }, {
                label: '冲销过账日期',
                prop: 'equityDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            }, {
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) => `<span class="high-light">查看</span>`,
            },
        ];
        private route:any = RouterMap;
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private code:string = '';
        private buttonCode:any = []; // btn名称


        private created() {
            (User.permissionList||[]).forEach((el:any) => {
                const a = el.buttonMenus&&el.buttonMenus.map((item:any) => {
                    this.buttonCode = this.buttonCode.concat(item.buttonCode);
                });
            });
            this.queryEquityVerifyList();
        }
        private queryEquityVerifyList() {
            getEquityChargeList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                chargeCode: this.code,
            }).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 条件搜索
         * @param value
         */
        private onSearch(value:any) {
            // todo ...
            this.pageNo = 1;
            this.code = value.chargeCode;
            this.queryEquityVerifyList();
        }

        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryEquityVerifyList();
        }

        /**
         * 跳转详情页面
         */
        private jumpDetail({row}:any) {
            this.$router.push(`${RouterMap.权益金冲销详情.link}${CommonUtils.stringify({chargeCode: row.chargeCode})}`);
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-premium-verify{
        &-buttons{
            margin-bottom: 20px;
            button{
                margin-right: 15px;
            }
        }
    }
</style>
