<!--应急额度-->
<template>
    <div class="gym-page-emergency">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-emergency-buttons">
            <button @click="add" class="gym-button-xs gym-button-default" v-if="buttonCode.includes('PBT005')">新增</button>
            <Modal
                :dialog-visible="visible"
                v-on:handle-cancel="closeModal"
                v-on:handle-ok="handleSubmit"
                name="应急额度调整"
            >
                <el-form class="gym-part-search-form-items" ref="form" :model="form">
                    <div class="gym-page-emergency-form-item">
                        <span class="gym-page-emergency-form-item-label">中心编号：</span>
                        <div class="gym-page-emergency-form-item-input">
                            <el-select
                                    size="small"
                                    placeholder="请选择"
                                    v-model="form.centerNo"
                                    filterable
                            >
                                <el-option
                                        v-for="item in centerList"
                                        :key="item.centerCode"
                                        :label="item.centerCode"
                                        :value="item.centerCode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="gym-page-emergency-form-item">
                        <span class="gym-page-emergency-form-item-label">应急额度：</span>
                        <div class="gym-page-emergency-form-item-input">
                            <el-input
                                    size="small"
                                    placeholder="请输入"
                                    v-model="form.emergencyQuota"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="gym-page-emergency-form-item">
                        <span class="gym-page-emergency-form-item-label">截止日期：</span>
                        <div class="gym-page-emergency-form-item-input">
                            <el-date-picker
                                    type="date"
                                    size="small"
                                    v-model="form.endDate"
                                    placeholder="选择日期">
                            ></el-date-picker>
                        </div>
                    </div>
                    <!-- 订货渠道 -->
                    <div class="gym-page-emergency-form-item">
                        <span class="gym-page-emergency-form-item-label">订货渠道：</span>
                        <div class="gym-page-emergency-form-item-input">
                            <el-select
                                    size="small"
                                    placeholder="请选择"
                                    v-model="form.companyCode"
                                    filterable
                                    :disabled='companyDisabled'
                            >
                                <el-option
                                    v-for="item in companyOption"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form>
            </Modal>
        </div>
        <div class="gym-page-emergency-table">
            <Table
                    v-bind:columns="columns"
                    :pageSize="pageSize"
                    :pageNo="pageNo"
                    :total="totalSize"
                    :data-source="dataSourse"
                    v-on:handle-change="handleChangePage"
                    v-on:on-proxy-click="actionNode"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import {getEmergencyList, addEmergency,editEmergency} from '../../actions/emergencyActions';
    import {TableFilter} from '../../filters/tableFilter';
    import Modal from '@c/modal/modal.vue';
    import moment from 'moment';
    import {Message} from 'element-ui';
    import {User} from '../../utils/user';
    import {companyOption} from '../../common/companyEnum';
 
    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
        },
    })

    export default class Emergency extends Vue {
        public titles = [
            {
                name: '应急额度',
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
                label: '失效状态',
                type: 'select',
                name: 'isInvalid',
                options: [{label: '未失效', value: 'Y'},{label: '已失效', value: 'N'}],
                placeholder: '请输入',
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
                label: '订货渠道',
                prop: 'companyCode',
                 formatter: (row:any, record:any, code:string) => TableFilter.companyType(code),
            },{
                label: '应急额度',
                prop: 'emergencyQuota',
                formatter: (row:any, record:any, date:number) => TableFilter.toThousands(date),
            },{
                label: '创建时间',
                prop: 'createDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            },{
                label: '修改时间',
                prop: 'lastUpdateDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            }, {
                label: '截止时间',
                prop: 'endDate',
                formatter: (row:any, record:any, date:number) => TableFilter.dateFormat(date),
            }, {
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) => {
                    const time = moment().format('YYYY-MM-DD');
                    const day = moment(time).valueOf();
                    if (day < record.endDate) {
                       return (
                           `<span class="high-light" data-type="edit">编辑</span>`
                       );
                    }
                },
            },
        ];
        private pageNo: number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize: number = 0;
        private centerNo: string = '';
        private isInvalid: 'Y' | 'N' | '' = 'N';
        private visible: boolean = false;
        private form: any = {};
        private editId: any =''; // 编辑id
        private buttonCode: any = []; // btn名称
        private companyDisabled: boolean = false;

        private companyOption: any = companyOption; // 选项框订货渠道信息
        private get centerList() {
            return this.$store.state.basic.centerList;
        }

        /**
         * 条件搜索
         * @param value
         */
        private onSearch(value:any) {
            this.pageNo = 1;
            this.centerNo = value.centerNo;
            this.isInvalid = value.isInvalid;
            this.queryEmergencyList();
        }
        /**
         * 获取应急额度列表
         */
        private queryEmergencyList():void {
            getEmergencyList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                isInvalid: this.isInvalid,
            }).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        private created() {
            (User.permissionList||[]).forEach((el:any) => {
                const a = el.buttonMenus&&el.buttonMenus.map((item:any) => {
                    this.buttonCode = this.buttonCode.concat(item.buttonCode);
                });
            });
            this.queryEmergencyList();
        }
        /**
         * 打开新增弹窗
         */
        private add() {
            this.companyDisabled = false;
            this.visible = true;
            this.form = {};
            this.editId = '';
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
            this.form = {};
            this.visible = false;
            this.editId = '';
        }
        /**
         * 提交新增
         */
        private handleSubmit() {
            const id = this.editId;
            const {centerNo, emergencyQuota, endDate,companyCode} = this.form;
            if (this.form.centerNo===undefined) {
                Message.warning('请选择中心编号');
                return false;
            }
            if (this.form.emergencyQuota===undefined) {
                Message.warning('请填写应急额度');
                return false;
            }
            if(id) {
                editEmergency({
                    id: this.editId,
                    centerNo,
                    emergencyQuota,
                    endDate: moment(endDate).valueOf(),
            }).then((res:any) => {
                    Message.success('修改成功');
                    this.visible = false;
                    this.queryEmergencyList();
                    this.form = {};
                    this.editId = '';
                });
            } else {
                if (this.form.companyCode===undefined) {
                    Message.warning('请选择订货渠道');
                    return false;
                }
                addEmergency({
                    centerNo,
                    emergencyQuota,
                    companyCode,
                    endDate: moment(endDate).valueOf(),
            }).then((res:any) => {
                    this.queryEmergencyList();
                    Message.success('新增成功！');
                    this.visible = false;
                });
            }
        }
        /**
         * 打开编辑弹层
         */
        private actionNode({row, event}:any) {
            this.companyDisabled = true;
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'edit':
                    if(this.buttonCode.includes('PBT006')) {
                        this.form = {
                        centerNo: row.centerNo,
                        emergencyQuota: row.emergencyQuota,
                        endDate: row.endDate,
                        companyCode:TableFilter.companyType(row.companyCode),
                    };
                        this.visible = true;
                        this.editId = row.id;
                    } else {
                        Message.warning('您没有权限！');
                        return;
                }
            }
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryEmergencyList();
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";

    .gym-page-emergency{
        &-buttons{
            margin-bottom: 20px;
        }
        &-table{
            .high-light{
                color: $themeColor;
            }
        }
        &-form{
            &-item{
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                &-label{
                    width: 100px;
                    text-align: right;
                }
                &-input{
                    width: 220px;
                    div{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
