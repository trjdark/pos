<!--权益金核算-->
<template>
    <div class="gym-page-premium-account">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-premium-verify-buttons">
            <router-link :to="route.新增权益金核算.link">
                <button class="gym-button-xs gym-button-default" v-if="buttonCode.includes('PBT003')">新增</button>
            </router-link>
        </div>
        <div class="gym-page-premium-account-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSourse"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="link"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {getEquityAccountList} from '../../actions/premiumAccountActions';
    import Modal from '@c/modal/modal.vue';
    import {RouterMap} from '../../router/routerMap';
    import moment from 'moment';
    import {CommonUtils} from '@/utils/commonUtils';
    import {User} from '../../utils/user';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
        },
    })
    export default class PremiumAccount extends Vue {
        public titles = [
            {
                name: '权益金核算',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '单据编号',
                type: 'text',
                name: 'code',
                placeholder: '请输入',
            },
        ];
        private columns = [
            {
                label: '单据编号',
                prop: 'code',
            }, {
                label: '申请时间',
                prop: 'applyDate',
                formatter: (row:any, record:any, date:number) => moment(date).format('YYYY-MM-DD'),
            },{
                label: '权益金日期',
                prop: 'equityDate',
                formatter: (row:any, record:any, date:number) => moment(date).format('YYYY-MM-DD'),
            }, {
                label: '过账日期',
                prop: 'postingDate',
                formatter: (row:any, record:any, date:number) => moment(date).format('YYYY-MM-DD'),
          }, {
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) => `<router-link :to="/"><span class="high-light">查看</span></router-link>`,
            },
        ];
        private route:any = RouterMap;
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private code:string = '';
        private buttonCode:any = []; // btn名称
        private visible:boolean = false;
        private form:any = {};

        private created() {
            (User.permissionList||[]).forEach((el:any) => {
                const a = el.buttonMenus&&el.buttonMenus.map((item:any) => {
                    this.buttonCode = this.buttonCode.concat(item.buttonCode);
                });
            });
            this.queryEquityAccountList();
        }
        private queryEquityAccountList() {
            getEquityAccountList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                code: this.code,
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
            this.pageNo = 1;
            this.code = value.code;
            this.queryEquityAccountList();
        }
        /**
         * 查看权益金核算
         * @param value
         */
        private link({$index, row, ref, event}:any) {
          this.$router.push(`${RouterMap.查看权益金核算.link}${CommonUtils.stringify({code: row.code})}`);
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
            this.form = {};
            this.visible = false;
        }
        /**
         * 提交表单
         */
        private handleSubmit() {
            // todo
            this.visible = false;
        }

        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryEquityAccountList();
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-premium-account{
        &-buttons{
            margin-bottom: 20px;
            button{
                margin-right: 15px;
            }
        }
        &-form{
            &-items{
                display: flex;
            }
            &-item{
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                &-label{
                    width: 100px;
                    text-align: right;
                }
                &-input{
                    width: 220px;
                    div{
                        width: 100%;
                    }
                    &.long{
                        width:540px;
                    }
                }
            }
        }
    }
</style>
