<template>
    <div>
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSumbit"/>
        <div class="gym-page-order-download">
            <button @click="downloadExcel" class="gym-button-xs gym-button-white">导出</button>
        </div>
        <Table
                v-bind:columns="columns"
                :pageSize="pageSize"
                :pageNo="pageNo"
                :total="totalSize"
                :data-source="dataSourse"
                v-on:handle-change="handleChangePage"
        />
    </div>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import { CommonUtils } from '../../utils/commonUtils';
    import {getCreditBillDetail, exportBillDetail} from '../../actions/orderActions';
    import moment from 'moment';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            // TableData,
        },
    })
    export default class OrderInfo extends Vue {
        public titles = [
            {
                name: '对账单',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '起效日期',
                type: 'dates',
                name: 'time',
                placeholder: '请输入',
            },
        ];
        private columns = [
            {
                label: '中心编号',
                prop: 'centerNo',
                width: '100',
            }, {
                label: '收款公司',
                prop: 'companyName',
                width: '180',
            }, {
                label: '收支项目',
                prop: 'project',
                width: '120',
            }, {
                label: '单据编号',
                prop: 'billNumber',
                width: '120',
            }, {
                label: '到期日',
                prop: 'startDate',
                width: '120',
            }, {
                label: '应收金额',
                prop: 'debitAmount',
                width: '120',
            },{
                label: '付款金额',
                prop: 'loanAmount',
                width: '120',
            },{
                label: '摘要',
                prop: 'desc',
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerNo:string = '';
        private endDate:any = null;
        private startDate:any = null;
        private created() {
            const {code} = CommonUtils.parse(this.$route);
            this.centerNo = code;
            this.queryCreditBillDetail();
        }
        private queryCreditBillDetail() {
            const param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                endDate: this.endDate,
                startDate: this.startDate,
            };
            getCreditBillDetail(param).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 条件搜索
         * @param value
         */
        private onSumbit(value:any) {
            // todo ...
            this.startDate = value.time ? moment(value.time[0]).valueOf(): null;
            this.endDate = value.time ? moment(value.time[1]).valueOf(): null;
            this.queryCreditBillDetail();
        }
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryCreditBillDetail();
        }
        private downloadExcel() {
            const param = {
                centerNo: this.centerNo,
                endDate: this.endDate,
                startDate: this.startDate,
            };
            exportBillDetail(param);
        }
    }
</script>

<style lang="scss">

</style>
