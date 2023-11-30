<!--星级评估-->
<template>
    <div class="gym-page-star">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-star-table">
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
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import moment from 'moment';
    import { getStarList } from '../../actions/starActions';
    import {TableFilter} from '../../filters/tableFilter';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
        },
    })

    export default class Star extends Vue {
        public titles = [
            {
                name: '星级评估',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '中心编号',
                type: 'text',
                name: 'centerNo',
                placeholder: '请输入',
            },{
                label: '评分日期',
                type: 'dates',
                name: 'time',
            },
        ];
        private columns = [
            {
                label: '中心编号',
                prop: 'centerNo',
            }, {
                label: '中心名称',
                prop: 'centerName',
            }, {
                label: '中心星级',
                prop: 'star',
            }, {
                label: '评分日期',
                prop: 'assementDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerNo: string = '';
        private begDate:any = null;
        private endDate:any = null;
        private created() {
            this.queryStarList();
        }
        /**
         * 条件搜索
         * @param value
         */
        private onSearch(value:any) {
            this.centerNo = value.centerNo;
            this.begDate = value.time ? moment(value.time[0]).valueOf(): null;
            this.endDate = value.time ? moment(value.time[1]).valueOf(): null;
            this.queryStarList();
        }
        private queryStarList() {
            const param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                begDate: this.begDate,
                endDate: this.endDate,
            };
            getStarList(param).then((res:any) => {
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
            this.queryStarList();
        }
    }
</script>

<style scoped>

</style>