<!--活动管理页-->
<template>
    <div class="gym-page-premium-verify">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
<!--        <div class="gym-page-premium-verify-buttons">-->
<!--            <router-link :to="route.添加权益金冲销.path">-->
<!--                <button class="gym-button-xs gym-button-default">新增</button>-->
<!--            </router-link>-->
<!--        </div>-->
        <div class="gym-page-premium-verify-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSourse"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="jumpDetail"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import moment from 'moment';
    import {getActivityList, getActivityCities, getEditPhoto} from '../../actions/activityManage';
    import {RouterMap} from '../../router/routerMap';
    import {TableFilter} from '../../filters/tableFilter';
    import {CommonUtils} from '../../utils/commonUtils';
    import {Message} from 'element-ui';


    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
        },
    })
    export default class ActivityManage extends Vue {
        public titles = [
            {
                name: '活动管理页',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '参赛日期',
                type: 'dates',
                name: 'time',
            },{
                label: '会员标志',
                type: 'select',
                name: 'memberFlag',
                options: [{label: '会员', value: 1},{label: '非会员', value: 0}],
            },{
                label: '照片状态',
                type: 'select',
                name: 'photoStatus',
                options: [{label: '上架', value: 1},{label: '下架', value: 0}],
            },{
                label: '审核状态',
                type: 'select',
                name: 'approveStatus',
                options: [{label: '已审核', value: 1},{label: '未审核', value: 0}],
            },{
                label: '手机号',
                type: 'text',
                name: 'contactMobile',
            },
        ];
        private columns = [
            {
                label: '中心号',
                prop: 'centerCode',
            }, {
                label: '城市',
                prop: 'city',
            },{
                label: '宝宝姓名',
                prop: 'babyName',
            }, {
                label: '联系人',
                prop: 'contactName',
            },{
                label: '联系人手机',
                prop: 'contactMobile',
            }, {
                label: '缩略图',
                prop: 'photoPreviewUrl',
                tp: true,
                render: (record:any) => `<img class="gym-page-premium-verify-thumbnail" src=`+record.photoPreviewUrl +` />`,
            }, {
                label: '选手编号',
                prop: 'userCode',
            },{
                label: '参赛日期',
                prop: 'entryTime',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            },{
                label: '会员标志',
                prop: 'memberFlag',
                formatter: (row:any, record:any, date:number) => TableFilter.memberFlag(date),
            },{
                label: '照片状态',
                prop: 'photoStatus',
                // formatter: (row:any, record:any, date:number) => TableFilter.photoStatus(date),
                tp: true,
                render: (record:any) => `<span class="high-light" data-type="trigger">`+
                    TableFilter.photoStatus(record.photoStatus) +`</span>`,
            },{
                label: '审批状态',
                prop: 'approveStatus',
                formatter: (row:any, record:any, date:number) => TableFilter.approveStatus(date),
            },{
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) => `<span class="high-light" data-type="edit">查看</span>`,
            },
        ];
        private route:any = RouterMap;
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private code:string = '';
        private centerCode:any = null;
        private city:any = null;
        private entryStartTime:any = null;
        private entryEndTime:any = null;
        private memberFlag:any = null; // 会员标识
        private approveStatus:any = null; // 审核状态
        private photoStatus:any = null; // 照片状态
        private contactMobile:any = null; // 手机号

        private created() {
            this.queryActivityList();
            getActivityCities().then((res:any) => {
                const cities = [...new Set(res.map((item:any) => item.city))];
                this.searchItems = [{
                    label: '中心号',
                    type: 'select',
                    name: 'centerCode',
                    options: res.map((item:any) => ({
                        label: `${item.centerCode}-${item.centerName}`,
                        value: item.centerCode,
                    })),
                }, {
                    label: '城市',
                    type: 'select',
                    name: 'city',
                    options: cities.map((item:any) => ({
                        label: item,
                        value: item,
                    })),
                }, ...this.searchItems];
            });
        }
        private queryActivityList() {
            getActivityList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerCode: this.centerCode,
                city: this.city,
                memberFlag: this.memberFlag,
                approveStatus: this.approveStatus,
                photoStatus: this.photoStatus,
                entryStartTime: this.entryStartTime,
                entryEndTime: this.entryEndTime,
                contactMobile: this.contactMobile,
            }).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 条件搜索
         * @param value
         */
        private onSearch(value:any) {
            // todo ...
            this.pageNo = 1;
            this.entryStartTime = value.time ? moment(value.time[0]).valueOf(): null;
            this.entryEndTime = value.time ? moment(value.time[1]).valueOf(): null;
            this.centerCode = value.centerCode;
            this.memberFlag = value.memberFlag;
            this.approveStatus = value.approveStatus;
            this.photoStatus = value.photoStatus;
            this.city = value.city;
            this.contactMobile = value.contactMobile;
            this.queryActivityList();
        }

        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryActivityList();
        }

        /**
         * 跳转详情页面
         */
        private jumpDetail({row, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'edit':
                    const routeUrl = this.$router.resolve({
                        path: `${RouterMap.活动详情页.link}${CommonUtils.stringify({id: row.id})}`,
                    });
                    window.open(routeUrl .href, '_blank');
                    break;
                case 'trigger':
                    const param = {
                        id: row.id,
                        photoStatus: row.photoStatus === 1 ? 0 : 1,
                    };
                    getEditPhoto(param).then(() => {
                        Message.success('更新成功！');
                        this.queryActivityList();
                    });
                    break;
            }
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-premium-verify{
        &-buttons{
            margin-bottom: 20px;
            button{
                margin-right: 15px;
            }
        }
        &-thumbnail{
            width: 60px;
        }
    }
</style>
