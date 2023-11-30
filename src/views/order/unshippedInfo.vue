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
    import Table from '@c/table/table.vue';
    import { CommonUtils } from '../../utils/commonUtils';
    import {getUnshippedInfoDetail, exportUnshippedInfoDetail} from '../../actions/orderActions';
    // import moment from 'moment';
    import {TableFilter} from '../../filters/tableFilter';
    import {companyEnum} from '../../common/companyEnum';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class UnshippedInfo extends Vue {
        public titles = [
            {
                name: '订货额度',
                link: '',
            },{
                name: '未发货订单明细',
                link: '',
            },
        ];
        private columns = [
            {
                label: '订单编号',
                prop: 'ppsNumber',
            }, {
                label: '订单日期',
                prop: 'recordDate',
            }, {
                label: '商品编号',
                prop: 'materialNumber',
            }, {
                label: '商品名称',
                prop: 'materialDesc',
            }, {
                label: '商品数量',
                prop: 'count',
            }, {
                label: '商品单价',
                prop: 'price',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            }, {
                label: '商品金额',
                prop: 'excludTaxValue',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerNo:string = '';
        private companyCode: number = companyEnum.default;
        private created() {
            const {code,companyCode} = CommonUtils.parse(this.$route);
            this.centerNo = code;
            this.companyCode = companyCode;
            this.queryCreditBillDetail();
        }
        private queryCreditBillDetail() {
            const param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                companyCode: this.companyCode,
            };
            getUnshippedInfoDetail(param).then((res:any) => {
                this.dataSourse = res;
            });
        }
        private downloadExcel() {
            const param = {
                centerNo: this.centerNo,
                companyCode: this.companyCode,
            };
            exportUnshippedInfoDetail(param);
        }
    }
</script>

<style lang="scss">

</style>