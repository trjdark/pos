<!--订货额度-->
<template>
    <div class="gym-page-order">
        <BreadCrumb v-bind:titles="titles"/>
        <!-- <SearchForm :items="searchItems" v-on:handle-submit="onSumbit" /> -->
        <div class="gym-page-order-items">
            <div class="gym-page-order-items-item">
                <span class="gym-page-order-items-item-label">订货渠道：</span>
                <el-select
                    class = "gym-page-order-items-item-select"
                    size="small"
                    filterable
                    v-model="companyCode"
                    placeholder="请选择"
                    @change="dataChange()">
                    <el-option
                        v-for="item in companyOption"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="gym-page-order-items-item">
                <span class="gym-page-order-items-item-label">区域：</span>
                <el-select
                    class = "gym-page-order-items-item-select"
                    size="small"
                    filterable
                    v-model="area"
                    multiple
                    placeholder="请选择">
                    <el-option
                        v-for="item in getAreasList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="gym-page-order-items-item">
                <span class="gym-page-order-items-item-label">GI：</span>
                <el-select
                    class = "gym-page-order-items-item-select"
                    size="small"
                    filterable
                    v-model="GI"
                    multiple
                    placeholder="请选择">
                    <el-option
                        v-for="item in getGIList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="gym-page-order-items-item">
                <span class="gym-page-order-items-item-label">中心编号：</span>
                <el-input
                    class = "gym-page-order-items-item-input"
                    size="small"
                    filterable
                    v-model="centerNo"
                    @keyup.enter.native='onSumbit'
                    placeholder="请选择">
                </el-input>
            </div>
            <div class="gym-page-order-items-item">
                <span class="gym-page-order-items-item-label">中心名称：</span>
                <el-input
                    class = "gym-page-order-items-item-input"
                    size="small"
                    v-model="centerName"
                    multiple
                    @keyup.enter.native='onSumbit'
                    placeholder="请选择">
                </el-input>
            </div>
        </div>
        <div class="gym-part-search-form-item">
            <button
                class="gym-button-default gym-button-lg mr10"
                v-on:click="onSumbit"
            >查询
            </button>
             <button
                class="gym-button-white gym-button-lg"
                v-on:click="reset"
            >重置</button>
        </div>
        <div class="gym-page-order-download">
            <button @click="downloadExcel" class="gym-page-order-download-btn gym-button-xs gym-button-white">导出</button>
                <span class="gym-page-order-download-text" v-show='companyCode === companyEnum.金宝贝商城'>订货额度=金宝贝（中国）商贸有限公司AR+金宝贝（中国）商贸有限公司未到期余额-金宝贝（中国）商贸有限公司未发货订单-金宝贝（中国）商贸有限公司审核中订单+金宝贝（中国）商贸有限公司应急额度</span>
                <span class="gym-page-order-download-text" v-show='companyCode === companyEnum.西格玛商城'>订货额度=上海劲跑教育科技有限公司产品收入AR+上海劲跑教育科技有限公司产品收入未到期余额-上海劲跑教育科技有限公司未发货订单-上海劲跑教育科技有限公司审核中订单+上海劲跑教育科技有限公司应急额度</span>
            
        </div>
        <div class="gym-page-order-table">
            <Table
                v-bind:columns="columns"
                :pageSize="pageSize"
                :pageNo="pageNo"
                :total="totalSize"
                :data-source="dataSourse"
                v-on:handle-change="handleChangePage"
                v-on:on-proxy-click="jumpLink"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {getOrderList, exportOrderList, getAreaGI} from '../../actions/orderActions';
    import {RouterMap} from '../../router/routerMap';
    import {CommonUtils} from '../../utils/commonUtils';
    import {TableFilter} from '../../filters/tableFilter';
    import {companyEnum,companyOption} from '../../common/companyEnum';
    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
        },
    })
    export default class Order extends Vue {
        public titles = [
            {
                name: '订货额度',
                link: '',
            },
        ];
        private columns = [
            {
                label: '中心编号',
                prop: 'centerNo',
                width: '100',
            }, {
                label: '中心名称',
                prop: 'centerName',
                width: '200',
            }, {
                label: '中心欠款余额',
                prop: 'arBalance',
                width: '120',
                tp: true,
                render: (record:any, row:any) =>
                    `<span class="high-light" data-type="payment">`+ TableFilter.toThousands(record.arBalance) +`</span>`,
            }, {
                label: '中心未到期余额',
                prop: 'preAr',
                width: '120',
                tp: true,
                render: (record:any, row:any) =>
                    `<span class="high-light" data-type="unexpired">`+ TableFilter.toThousands(record.preAr) +`</span>`,
            }, {
                label: '转课欠费',
                prop: 'centerTransfersDebt',
                width: '100',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            },{
                label: '未发货订单',
                prop: 'unshippedOrder',
                width: '100',
                tp: true,
                render: (record:any, row:any) =>
                    `<span class="high-light" data-type="unshipped">`+ TableFilter.toThousands(record.unshippedOrder) +`</span>`,
            },{
                label: '审批中订单',
                prop: 'paymentMoney',
                width: '120',
            },{
                label: '应急额度',
                prop: 'emergencyQuota',
                width: '100',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            },{
                label: '订货额度',
                prop: 'total',
                width: '100',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            },
            {
                label: '区域',
                prop: 'areaName',
                width: '120',
            },
            {
                label: 'GI',
                prop: 'giName',
                width: '120',
            },
            {
                label: '对账单',
                prop: 'action',
                tp: true,
                render: (record:any) => `<span class="high-light" data-type="account">对账单</span>`,
            },
        ];
        private pageNo: number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize: number = 0;
        private centerNo: string = '';
        private centerName: string = '';
        private area: any = []; // 区域
        // private centerList = []; // 中心名称
        private GI: any = []; // gi
        private giList: any = []; // gi列表
        private selectedKey: any = []; // 选中的区域
        private companyOption: any = companyOption; // 所有订货渠道信息
        private companyEnum: any = companyEnum; // 订货渠道code码
        private companyCode: number = companyEnum.default; // 选项框订货渠道code码

        private get getAreasList() {
            return (this.$store.state.basic.areaList.areaList || []).map((item:any) => ({
                label: item.areaName,
                value:item.areaId,
            }));
        }
        private get getGIList() {
            return (this.$store.state.basic.areaList.giList || []).map((item:any) => ({
                label: item.userName,
                value:item.id,
            }));
        }
        private created() {
            this.queryOrderList();
        }
        private queryOrderList() {
            getOrderList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                centerName: this.centerName,
                companyCode:this.companyCode,
                areaList: this.area,
                giList: this.GI,
            }).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 选择区域
         * @param value
         */
        // private handleChange(value:any) {
        //     console.log(value);
        //     const key = parseFloat(value.toString());
        //     console.log(typeof(key));
        //     console.log(key);
        //     const resdata=JSON.parse(JSON.stringify(this.$store.state.basic.areaList));
        //     console.log(typeof(resdata));
        //     this.selectedKey = resdata.filter((item:any) => item.areaId === key);
        //     console.log(typeof(this.selectedKey));
        //     this.giList = JSON.parse(JSON.stringify(this.selectedKey[0].giList));
        //     console.log(typeof(this.giList));
        // }
        /**
         * 条件搜索
         * @param value
         */
        private onSumbit(form:any) {
            this.pageNo = 1;
            // this.areasList = value.areasList,
            // this.giList = value.giList,
            this.queryOrderList();
        }

        /**
         * 渠道改变执行查询操作
         */
        private dataChange() {
            this.queryOrderList();
        }

        /**
         * 跳转对账单
         */
        private jumpLink({$index, row, ref, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'account':
                    this.$router.push(`${RouterMap.对账单.link}${CommonUtils.stringify({code: row.centerNo})}`);
                    break;
                case 'payment':
                    window.open(`${RouterMap.中心欠款余额明细.link}${CommonUtils.stringify({code: row.centerNo})}`);
                    break;
                case 'unexpired':
                    window.open(`${RouterMap.权益金余额明细.link}${CommonUtils.stringify({code: row.centerNo})}`);
                    break;
                case 'unshipped':
                    window.open(`${RouterMap.未发货订单明细.link}${CommonUtils.stringify({code: row.centerNo , companyCode:this.companyCode})}`);
                    break;
            }
        }
        /**
         * 导出报表
         */
        private downloadExcel():void {
            const params = {
                companyCode:this.companyCode,
            };
            exportOrderList(params);
        }
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryOrderList();
        }
        private reset(e:any) {
            e.preventDefault();
            this.area = [];
            this.GI = [];
            this.centerNo = '';
            this.centerName = '';
            this.companyCode = companyEnum.default;
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-order{
        &-items{
            display: flex;
            &-item{
                flex: 1;
                &>span{
                   line-height: 30px;
                }
            }
        }
        &-download{
            display: flex;
            align-items: center;
            color: $grey999;
            margin-bottom: 20px;
            &-text{
                margin-left: 24px;
                width: 90%;
            }
        }
        &-table{
            .high-light{
                color: $themeColor;
            }
        }
        .gym-page-order-items-item-select,
        .gym-page-order-items-item-input{
            width: 60%;
        }
        .gym-part-search-form-item{
            display: flex;
            justify-content: flex-end;
            width:97%;
            margin-top: 10px;
        }
    }
</style>
