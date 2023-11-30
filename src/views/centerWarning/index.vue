<!--关键数据预警-->
<template>
    <div class="gym-page-center-warning">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-premium-center-warning-buttons">
            <router-link :to="link">
                <button class="gym-button-xs gym-button-default">新增</button>
            </router-link>
        </div>
        <div class="gym-page-premium-center-warning-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSourse"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="actionNode"
            />
            <Modal
                :dialog-visible="visible"
                v-on:handle-cancel="closeModal"
                v-on:handle-ok="handleSubmit"
                :contentBorder="false"
            >
                <p class="">是否删除本条预警设置？</p>
            </Modal>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {getWarningList, removeWarning, getWarningColumnInfo} from '../../actions/warningActions';
    import {RouterMap} from '../../router/routerMap';
    import moment from 'moment';
    import {CommonUtils} from '../../utils/commonUtils';
    import {Message} from 'element-ui';
    import Modal from '@c/modal/modal.vue';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
        },
    })
    export default class CenterWarning extends Vue {
        private titles = [
            {
                name: '中心预警管理',
                link: '',
            }, {
                name: '关键数据预警设置',
                link: '',
            },
        ];
        private get searchItems() {
            return [
                {
                    label: '中心',
                    type: 'select',
                    name: 'centerId',
                    options:(this.$store.state.basic.myCenterList || []).map((item:any) => ({
                        label: item.centerName,
                        value:item.centerId,
                    })),
                }, {
                    label: '省份',
                    type: 'select',
                    name: 'provinceCode',
                    options: this.provinceList,
                },{
                    label: '城市',
                    type: 'select',
                    name: 'cityCode',
                    options: this.cityList,
                },{
                    label: 'GI',
                    type: 'select',
                    name: 'GI',
                    options: this.giList,
                },{
                    label: '预警指标',
                    type: 'select',
                    name: 'warningType',
                    options:[
                        {
                            label: '当月leads数预警',
                            value: '81001',
                        },{
                            label: '当月OPP数预警',
                            value: '81002',
                        },{
                            label: '当月OPP-PAY转换率预警',
                            value: '81003',
                        },{
                            label: '当前待分配数预警',
                            value: '81004',
                        },{
                            label: '当前已分配数预警',
                            value: '81005',
                        },{
                            label: '当前已领取数预警',
                            value: '81006',
                        },{
                            label: '业绩进度预警',
                            value: '81007',
                        },
                    ],
                },{
                    label: '预警日期',
                    type: 'month',
                    name: 'yearMonth',
                },
            ];
        }
        private columns = [
            {
                label: '中心',
                prop: 'centerId',
            }, {
                label: '省份',
                prop: 'province',
            }, {
                label: '城市',
                prop: 'city',
            }, {
                label: 'GI',
                prop: 'gi',
            }, {
                label: '预警指标',
                prop: 'warningType',
            },{
                label: '预警数',
                prop: 'warningNum',
            },{
                label: '年月',
                prop: 'warningYearMonth',
            },{
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) =>
                    `<span class="high-light mr10" data-type="edit">编辑</span>
                    <span class="high-light mr10" data-type="remove">删除</span>
                    <span class="high-light" data-type="continue">下月延用</span>`,
            },
        ];
        private link = RouterMap.中心关键数据预警设置新增.path;
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerId:string = '';
        private warningType:string = '';
        private yearMonth:string = '';
        private visible:boolean = false;
        private deleteRowId:string = '';
        private cityList:any[] = [];
        private provinceList:any[] = [];
        private giList:any[] = [];
        private cityCode:any = null;
        private provinceCode:any = null;
        private GI:any = null;

        private created() {
            const warningListParam = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            this.queryWarningList();
            getWarningColumnInfo().then((res:any) => {
                this.cityList = res.cityList.map((item:any) => ({label:item.city, value: item.cityCode}));
                this.provinceList = res.provinceList.map((item:any) => ({label: item.province, value: item.provinceCode}));
                this.giList = res.giList.map((item:any) => ({label:item, value: item}));
            });
        }
        /**
         * 条件搜索
         * @param value
         */
        private onSearch(value:any) {
            this.pageNo = 1;
            this.centerId = value.centerId;
            this.warningType = value.warningType;
            this.yearMonth = value.yearMonth ? moment(value.yearMonth).format('YYYY-MM'): '';
            this.cityCode = value.cityCode;
            this.provinceCode = value.provinceCode;
            this.GI = value.GI;
            this.queryWarningList();
        }
        /**
         * 获取设置列表
         */
        private queryWarningList():void {
            getWarningList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerId: this.centerId,
                warningType: this.warningType,
                yearMonth: this.yearMonth,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode,
                GI: this.GI,
            }).then((res:any) => {
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
            this.queryWarningList();
        }
        /**
         * 显示确认框
         */
        private showConfirm() {
            this.visible = true;
        }
        private closeModal() {
            this.visible = false;
        }
        private handleSubmit() {
            const param = {id: this.deleteRowId};
            removeWarning(param).then((res:any) => {
                Message.success('删除成功！');
                this.queryWarningList();
            });
            this.visible = false;
        }
        /**
         * 操作单据
         */
        private actionNode({row, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'edit':
                    this.$router.push(`${RouterMap.中心关键数据预警设置编辑.link}${CommonUtils.stringify({id: row.id})}`);
                    break;
                case 'remove':
                    this.deleteRowId = row.id;
                    this.showConfirm();
                    break;
                case 'continue':
                    this.$router.push(`${RouterMap.中心关键数据预警设置延用.link}${CommonUtils.stringify({id: row.id})}`);
                    break;
            }
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-premium-center-warning{
        &-buttons{
            margin-bottom: 20px;
            button{
                margin-right: 15px;
            }
        }
        .mr10{
            margin-right: 10px;
            cursor: pointer;
        }
    }
</style>
