<!--添加权益金冲销单-->
<template>
    <div class="gym-page-premium-verify-add">
        <BreadCrumb v-bind:titles="titles"/>
        <el-form class="gym-page-premium-verify-add-form" ref="form" :model="form">
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">操作人：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-input size="small" v-model="operate" disabled=""/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">操作部门：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-input size="small" v-model="unitName" disabled=""/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">操作时间：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-input size="small" value="" disabled=""/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">原单号：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-select size="small" v-model="form.code" filterable @change="selectPremiumAccount">
                        <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.code"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">收款公司：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-input size="small" v-model="selectedPremiumAccount.companyName" disabled=""/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">权益金日期：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-date-picker
                            type="date"
                            size="small"
                            disabled
                            v-model="selectedPremiumAccount.equityDate"/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">过账日期：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-date-picker
                            type="date"
                            size="small"
                            disabled
                            v-model="selectedPremiumAccount.postingDate"/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">冲销单号：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-input
                        size="small"
                        v-model="selectedPremiumAccount.chargeCode"
                        disabled/>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">冲销过账日期：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-date-picker
                            type="date"
                            size="small"
                            v-model="form.chargePostingDate"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="gym-page-premium-verify-add-form-item">
                <span class="gym-page-premium-verify-add-form-item-label">冲销中心：</span>
                <div class="gym-page-premium-verify-add-form-item-input">
                    <el-select
                            size="small"
                            v-model="form.centerNoList"
                            multiple
                            filterable
                            @change="selectVerifyCenter">
                        <el-option
                                v-for="(item, index) in centerList"
                                :key="item + index"
                                :label="item"
                                :value="index">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </el-form>
        <div class="gym-page-premium-verify-add-form-item lang">
            <button class="gym-button-default gym-button-xs" @click="submit">提交</button>
        </div>
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
    import {getAccountCodeList, getByCode, submitCharge} from '../../actions/premiumVerifyActions';
    import Table from '@c/table/table.vue';
    import moment from 'moment';
    import {Message} from 'element-ui';

    @Component({
        components: {
            BreadCrumb,
            Table,
        },
    })
    export default class PremiumVerifyAdd extends Vue {
        private titles = [
            {
                name: '权益金冲销',
                link: '',
            },
            {
                name: '新增',
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
        private verifyCenterList:any = [];
        private dataSourse: any = [];
        private totalSize:number = 0;
        private form:any = {};
        private created() {
            getAccountCodeList().then((res:any) => {
                this.codeList = res.list;
            });
        }
        // 选中核算单
        private selectPremiumAccount(code:string) {
            this.selectedCode = code;
            this.selectedPremiumAccount = this.codeList.filter((item:any) => item.code === code)[0];
            // 数据清空
            this.form = Object.assign({}, this.form, {centerNoList: []});
            this.verifyCenterList = [];
            this.dataSourse = [];
            this.totalSize = 0;
            this.queryByCode();
        }
        // 根据核算单号查询冲销明细
        private queryByCode() {
            const param = {
                code:this.selectedCode,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            getByCode(param).then((res:any) => {
                this.centerList = res.centerAllNoList;
                this.verifyCenterList = res.list;
            });
        }
        /**
         * 选择冲销中心
         */
        private selectVerifyCenter(indexs: number[]) {
            this.dataSourse = this.verifyCenterList.filter((item:any, index:number) => indexs.includes(index));
            this.totalSize = indexs.length;
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryByCode();
        }

        /**
         * 提交
         */
        private submit() {
            const {centerNoList, code, chargePostingDate} = this.form;
            const centerList = this.centerList.filter((item:any, index:number) => centerNoList.includes(index));
            const param = {
                centerNoList: centerList.join(','),
                code,
                chargePostingDate: moment(chargePostingDate).valueOf(),
                unitCode: User.unitCode,
                unitName: this.unitName,
            };
            submitCharge(param).then((res:any) => {
                Message.success('添加成功！');
                // this.$router.go(-1);
            });
        }
    }
</script>

<style lang="scss">
    .gym-page-premium-verify-add{
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
