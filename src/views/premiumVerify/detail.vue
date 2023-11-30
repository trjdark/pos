<!--权益金冲销单详情-->
<template>
    <div class="gym-page-premium-verify-detail">
        <BreadCrumb v-bind:titles="titles"/>
        <el-form class="gym-page-premium-verify-detail-form" ref="form" :model="form">
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">操作人：</span>
                <span>{{info.createByName}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">操作部门：</span>
                <span>{{info.unitName}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">操作时间：</span>
                <span>{{info.operateDate}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">原单号：</span>
                <span>{{info.code}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">收款公司：</span>
                <span>{{info.companyName}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">权益金日期：</span>
                <span>{{info.equityDate}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">过账日期：</span>
                <span>{{info.postingDate}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">冲销单号：</span>
                <span>{{info.chargeCode}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">冲销过账日期：</span>
                <span>{{info.chargePostingDate}}</span>
            </div>
            <div class="gym-page-premium-verify-detail-form-item">
                <span class="gym-page-premium-verify-detail-form-item-label">冲销中心：</span>
                <span>{{info.centerNoList}}</span>
            </div>
        </el-form>
        <div>
            <Table
                v-bind:columns="columns"
                :pageSize="pageSize"
                :pageNo="pageNo"
                :total="totalSize"
                :data-source="dataSourse"
                v-on:handle-change="handleChangePage"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import {User} from '../../utils/user';
    import {getChargeDetail} from '../../actions/premiumVerifyActions';
    import Table from '@c/table/table.vue';
    import moment from 'moment';
    import {Message} from 'element-ui';
    import {CommonUtils} from '../../utils/commonUtils';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class PremiumVerifyDetail extends Vue {
        private titles = [
            {
                name: '权益金冲销',
                link: '',
            },
            {
                name: '详情',
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
            },{
                label: '成本中心',
                prop: 'costCenter',
            },{
                label: '销售额',
                prop: 'saleAmount',
            },{
                label: '权益金比例',
                prop: 'ratio',
            },{
                label: '税金系数',
                prop: 'taxCoefficient',
            }, {
                label: '权益金',
                prop: 'equity',
            }, {
                label: '备注',
                prop: 'remark',
            }, {
                label: '冲销凭证',
                prop: 'chargeReceiptVoucher',
            },
        ];
        private operate:string = `${User.employeeUsName} ${User.employeeName}`;
        private unitName:string = User.unitName;
        private codeList:any = [];               // 原核算单号列表
        private selectedCode:string = '';        // 选中核算单号
        private selectedPremiumAccount:any = {};
        private centerList:any = [];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private form:any = {};

        private chargeCode:string = '';
        private info:any = {};
        private created() {
            this.queryChargeDetail();
        }
        /**
         * 获取信息
         */
        private queryChargeDetail() {
            const {chargeCode} = CommonUtils.parse(this.$route);
            this.chargeCode = chargeCode;
            const param = {
                chargeCode,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            getChargeDetail(param).then((res:any) => {
                this.info = Object.assign({}, res, {
                    operateDate: moment(res.operateDate).format('YYYY-MM-DD'),
                    equityDate: moment(res.equityDate).format('YYYY-MM-DD'),
                    postingDate: moment(res.postingDate).format('YYYY-MM-DD'),
                    chargePostingDate: moment(res.chargePostingDate).format('YYYY-MM-DD'),
                });
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryChargeDetail();
        }
    }
</script>

<style lang="scss">
    .gym-page-premium-verify-detail{
        &-form{
            display: flex;
            flex-flow: wrap;
            &-item{
                width: 33%;
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                &-label{
                    width: 100px;
                    text-align: right;
                }
                .el-input .el-input__inner, .el-input.is-disabled .el-input__inner{
                    width: 200px;
                }
                &.lang{
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                }
            }
        }
    }
</style>