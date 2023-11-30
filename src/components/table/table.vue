<!--表格-->
<template>
    <div>
        <div class="gym-part-table">
            <el-table
                    :data="dataSource"
                    style="width: 100%">
                <template v-for="(item, index) in columns">
                    <el-table-column
                            v-if="!item.tp"
                            :key="`table_column_${index}`"
                            v-bind="item"
                    ></el-table-column>
                    <el-table-column v-else :key="`table_column_${index}`" v-bind="item">
                        <template slot-scope="{$index,row}">
                            <div v-html="item.render(row)" @click="onProxyClick($index,row,'tablePoster',$event)">1</div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>

        <div class="gym-part-pagination" v-if="total">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

    @Component
    export default class Table extends Vue {
        @Prop({default: []}) private columns!:any;
        @Prop({default: 10}) private pageSize!:number;
        @Prop({default: 1}) private pageNo!:number;
        @Prop({default: 0}) private total!:number;
        @Prop({default: []}) private dataSource!:any;

        @Emit()
        public handleChange(pageInfo:any) {
            return pageInfo;
        }

        @Emit()
        private onProxyClick($index:any,row:any,ref:any,event:any) {
            return {$index, row, ref, event};
        }
        /**
         * 调整最大页数
         */
        private handleSizeChange(size:number) {
            // Todo
            // const param = {
            //     pageNo: this.pageNo,
            //     pageSize: size,
            // };
            // this.handleChange(param);
            this.handleCurrentChange(1, size);
        }

        /**
         * 分页
         */
        private handleCurrentChange(val:number, size:number = this.pageSize ) {

            //
            const param = {
                pageNo: val,
                pageSize: size,
            };
            this.handleChange(param);
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-part-table{
        border: 1px solid $borderColor;
        border-radius: 4px;
        margin-bottom: 20px;
        th{
            background: #F6F6F6;
        }
        tr:last-child td{
            border-bottom: none;
        }
        td {
            font-size: 12px;
        }
    }
    .gym-part-pagination{
        display: flex;
        justify-content: flex-end;
    }
</style>