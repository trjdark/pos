<template>
    <div>
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-page-premium-center-warning-buttons">
            <button class="gym-button-xs gym-button-default" v-on:click="exportReport">导出</button>
        </div>
        <div>
            <Table
                v-bind:columns="columns"
                :data-source="dataSourse"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import Table from '@c/table/table.vue';
    import { CommonUtils } from '../../utils/commonUtils';
    import {getArBillDetail, exportArBillDetail} from '../../actions/arBillActions';
    import {TableFilter} from '../../filters/tableFilter';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class ARBillDetail extends Vue {
        public titles = [
            {
                name: '月度AR账单',
                link: '',
            },{
                name: '账单明细',
                link: '',
            },
        ];
        private columns = [
            {
                label: '中心编号',
                prop: 'centerCode',
            }, {
                label: '中心名称',
                prop: 'centerName',
            }, {
                label: '收款公司',
                prop: 'companyName',
            }, {
                label: '收款项目',
                prop: 'projectName',
            }, {
                label: '到期日',
                prop: 'endDate',
            }, {
                label: '清帐日期',
                prop: 'augDate',
            }, {
                label: '帐龄（天）',
                prop: 'billAge',
            }, {
                label: '金额',
                prop: 'credit',
                tp: true,
                render:(record:any) => `<span>`+TableFilter.toThousands(record.credit)+`</span>`,
            },{
                label: '摘要',
                prop: 'desc',
            },
        ];

        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerNo:string = '';
        private endMonth:number = 0;
        private companyCode:string = '';

        private created() {
            const {endMonth, centerNo, companyCode} = CommonUtils.parse(this.$route);
            const param = {
                endMonth, centerNo, companyCode,
            };
            getArBillDetail(param).then((res) => {
                this.dataSourse = res;
            });
        }
        private exportReport() {
            const {endMonth, centerNo, companyCode} = CommonUtils.parse(this.$route);
            const param = {
                endMonth, centerNo, companyCode,
            };
            exportArBillDetail(param);
        }
    }
</script>

<style lang="scss">

</style>