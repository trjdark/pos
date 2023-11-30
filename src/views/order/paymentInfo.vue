<template>
    <div>
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-page-order-download">
            <button @click="downloadExcel" class="gym-button-xs gym-button-white">导出</button>
        </div>
        <Table
                v-bind:columns="columns"
                :pageSize="pageSize"
                :pageNo="pageNo"
                :total="totalSize"
                :data-source="dataSourse"

        />
    </div>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import Table from '@c/tableData/tableData.vue';
    import { CommonUtils } from '../../utils/commonUtils';
    import {getPaymentInfoDetail, exportPaymentInfoDetail} from '../../actions/orderActions';
    import moment from 'moment';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class PaymentInfo extends Vue {
        public titles = [
            {
                name: '订货额度',
                link: '',
            },{
                name: '中心欠款余额明细',
                link: '',
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
                label: '收款项目',
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
                label: '账龄（天）',
                prop: 'billAgeStr',
                width: '120',
            },{
                label: '中心应付款',
                prop: 'debitAmount',
                width: '120',
            },{
                label: '中心已付款',
                prop: 'loanAmount',
                width: '120',
            },{
                label: '中心欠款余额',
                prop: 'unwrittenAmount',
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
            };
            getPaymentInfoDetail(param).then((res:any) => {
                this.dataSourse = res;
            });
        }
        private downloadExcel() {
            const param = {
                centerNo: this.centerNo,
            };
            exportPaymentInfoDetail(param);
        }
    }
</script>

<style lang="scss">

</style>