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
    import {getUnexpiredInfoDetail, exportUnexpiredInfoDetail} from '../../actions/orderActions';
    import moment from 'moment';
    import {TableFilter} from '../../filters/tableFilter';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class UnexpiredInfo extends Vue {
        public titles = [
            {
                name: '订货额度',
                link: '',
            },{
                name: '未到期余额明细',
                link: '',
            },
        ];
        private columns = [
            {
                label: '凭证号码',
                prop: 'billNumber',
            }, {
                label: '到期日',
                prop: 'endDate',
            }, {
                label: '金额',
                prop: 'unwrittenAmount',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            }, {
                label: '备注',
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
            getUnexpiredInfoDetail(param).then((res:any) => {
                this.dataSourse = res;
            });
        }
        private downloadExcel() {
            const param = {
                centerNo: this.centerNo,
            };
            exportUnexpiredInfoDetail(param);
        }
    }
</script>

<style lang="scss">

</style>