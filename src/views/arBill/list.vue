<template>
    <div class="gym-page-bill">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-bill-buttons">
            <button class="gym-button-xs gym-button-default" v-on:click="exportReport">导出</button>
            <span v-if="endTime" class="high-light">此数据截止到{{endTime}}</span>
        </div>
        <div class="gym-page-premium-center-warning-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSource"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="actionNode"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {TableFilter} from '../../filters/tableFilter';
    import {getArBill, exportArBill, getArBillCompanyList} from '../../actions/arBillActions';
    import moment from 'moment';
    import {CommonUtils} from '../../utils/commonUtils';
    import {RouterMap} from '../../router/routerMap';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
        },
    })
    export default class ARBill extends Vue {
        public titles = [
            {
                name: '月度AR账单',
                link: '',
            },
        ];
        private columns = [
            {
                label: '中心编号',
                prop: 'centerNo',
            }, {
                label: '中心名称',
                prop: 'centerName',
            }, {
                label: '收款公司',
                prop: 'companyName',
            }, {
                label: '中心欠款余额',
                prop: 'arBalance',
                tp: true,
                render:(record:any) => `<span class="high-light mr10" data-type="account" >`
                    +TableFilter.toThousands(record.arBalance)+`</span>`,
            }, {
                label: '区域',
                prop: 'areaName',
            },{
                label: 'GI',
                prop: 'GI',
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private companyList:any = [];
        private dataSource: any = [];
        private totalSize:number = 0;
        private companyCode:string = '';
        private areaList:any = [];
        private GI:any = [];
        private centerNo:string = '';
        private centerName:string = '';
        private endMonth:any = null;
        private endTime:string = '';

        private get searchItems() {
            return [
                {
                    label: '收款公司',
                    type: 'select',
                    name: 'companyCode',
                    options:this.companyList,
                },{
                    label: '区域',
                    type: 'select',
                    name: 'areaList',
                    multiple: true,
                    options: (this.$store.state.basic.areaList.areaList || []).map((item:any) => ({
                        label: item.areaName,
                        value:item.areaId,
                    })),
                },{
                    label: 'GI',
                    type: 'select',
                    name: 'GI',
                    options: (this.$store.state.basic.areaList.giList || []).map((item:any) => ({
                        label: item.userName,
                        value:item.id,
                    })),
                },{
                    label: '中心编号',
                    type: 'text',
                    name: 'centerNo',
                    placeholder: '请输入',
                },{
                    label: '中心名称',
                    type: 'text',
                    name: 'centerName',
                    placeholder: '请输入',
                },{
                    label: '截止月份',
                    type: 'month',
                    name: 'endMonth',
                    defaultValue: new Date(),
                    pickerOptions: {
                        disabledDate(time:any) {
                            return time.getTime() > Date.now() || time.getTime() < new Date('2020-01-01');
                        },
                    },
                },
            ];
        }
        private created() {
            getArBillCompanyList({}).then((res:any) => {
                this.companyList = res.map((item:any) => ({label:item.companyName, value:item.companyCode}));
            });
        }
        /**
         * 查询
         */
        private onSearch(value:any) {
            this.pageNo = 1;
            this.companyCode = value.companyCode;
            this.areaList = value.areaList;
            this.GI = value.GI ? [value.GI] : [];
            this.centerNo = value.centerNo;
            this.centerName = value.centerName;
            this.endMonth = value.endMonth;
            this.queryList();
        }
        /**
         * 导出
         */
        private exportReport() {
            const param = {
                companyCode: this.companyCode,
                areaList: this.areaList,
                GI: this.GI,
                centerNo: this.centerNo,
                centerName: this.centerName,
                endMonth: this.endMonth,
            };
            exportArBill(param);
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryList();
        }
        /**
         * 操作单据
         */
        private actionNode({row, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'account':
                    window.open(`${RouterMap.中心月度AR账单明细.link}${CommonUtils.stringify({
                        endMonth: moment(this.endMonth).valueOf(),
                        centerNo: row.centerNo,
                        companyCode: row.companyCode,
                    })}`, '_blank');
                    break;
            }
        }

        /**
         * 查询数据
         */
        private queryList() {
            getArBill({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                companyCode: this.companyCode,
                areaList: this.areaList,
                GI: this.GI,
                centerNo: this.centerNo,
                centerName: this.centerName,
                endMonth: this.endMonth ? moment(this.endMonth).valueOf(): null,
            }).then((res:any) => {
                this.dataSource = res.list;
                this.totalSize = res.totalSize;
                this.endTime = res.endTime ? moment(res.endTime).format('YYYY-MM-DD') : '';
            });
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-bill-buttons{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
</style>