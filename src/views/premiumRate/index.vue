<!--权益金比例-->
<template>
    <div class="gym-page-premium-rate">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-premium-rate-buttons">
            <button @click="add" class="gym-button-xs gym-button-default" data-type="add" v-if="buttonCode.includes('PBT001')">新增</button>
            <button @click="download" class="gym-button-xs gym-button-white">下载模版</button>
            <button class="gym-button-xs gym-button-white" type="file">
                <el-upload
                    action="upload"
                    :before-upload="beforeUpload"
                    ref="upload"
                    multiple
                    accept=".xlsx, .xls"
                    :on-change="onUploadChange"
                    :show-file-list="false"
                >
                    批量导入
                </el-upload>
            </button>
            <Modal :dialog-visible="visible"
                v-on:handle-cancel="closeModal"
                v-on:handle-ok="handleSubmit"
                :name="'权益金比例'"
            >
                <el-form class="gym-page-premium-rate-form" ref="form" :model="form">
                    <div class="gym-page-premium-rate-form-item">
                        <span class="gym-page-premium-rate-form-item-label">中心编号：</span>
                        <div class="gym-page-premium-rate-form-item-input">
                            <el-select
                                    ref="disEdit"
                                    size="small"
                                    placeholder="请选择"
                                    v-model="form.centerCode"
                                    @change="selectCenterCode"
                                    :disabled="isDisabled"
                                    filterable
                            >
                                <el-option
                                        v-for="item in centerList"
                                        :key="item.centerCode"
                                        :label="item.centerCode"
                                        :value="item.centerCode"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="gym-page-premium-rate-form-item">
                        <span class="gym-page-premium-rate-form-item-label">中心名称：</span>
                        <div class="gym-page-premium-rate-form-item-input">
                            <el-input
                                    ref="disEdit"
                                    size="small"
                                    placeholder="请选择"
                                    v-model="selectCenter.centerName?selectCenter.centerName:form.centerName"
                                    :disabled="isDisabled"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="gym-page-premium-rate-form-item">
                        <span class="gym-page-premium-rate-form-item-label">权益金比例：</span>
                        <div class="gym-page-premium-rate-form-item-input">
                            <el-input
                                    size="small"
                                    placeholder="请输入"
                                    v-model="form.ratio"
                            >
                            </el-input>
                        </div>
                    </div>
                </el-form>
            </Modal>
        </div>
        <div class="gym-page-premium-rate-table">
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
    import { Message } from 'element-ui';
    import {
        getEquityRatioList, editEquityRatio,
        addEquityRatio, downLoad, importExcel,
    } from '../../actions/premiumRateActions';
    import Modal from '@c/modal/modal.vue';
    import axios from 'axios';
    import {PremiumRateApi} from '../../api/premiumRateApi';
    import {User} from '@/utils/user';

    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
        },
    })
    export default class PremiumRate extends Vue {
        public titles = [
            {
                name: '权益金比例',
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
                label: '中心名称',
                type: 'text',
                name: 'centerName',
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
                label: '权益金比例',
                prop: 'ratio',
            }, {
                label: '操作',
                prop: 'action',
                tp: true,
                render: (record:any) => `<span class="high-light" data-type="edit">编辑</span>`,
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private centerNo:string = '';
        private centerName:string = '';
        private ratio:string = '';
        private visible:boolean = false;
        private fileList:any = [];
        private selectCenter:any = {}; // 选择中心
        private isDisabled:any = true; // 是否不可修改
        private buttonCode:any = []; // btn名称
        // private upload_url:any = 'mate-pos/api/up/file';
        private excel:any ='';
        private editId:any =''; // 编辑id
        private headersToken:any = User.token;
        private form:any = {};

        private get centerList() {
            return this.$store.state.basic.centerList;
        }

        private created() {
            (User.permissionList||[]).forEach((el:any) => {
                const a = el.buttonMenus&&el.buttonMenus.map((item:any) => {
                    this.buttonCode = this.buttonCode.concat(item.buttonCode);
                });
            });
            this.queryEquityRatioList();
        }
        private queryEquityRatioList() {
            getEquityRatioList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                centerNo: this.centerNo,
                centerName: this.centerName,
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
            this.pageNo = 1;
            this.centerNo = value.centerNo;
            this.centerName = value.centerName;
            this.queryEquityRatioList();
        }
        private selectCenterCode(centerCode:any) {
            this.centerNo = centerCode;
            this.selectCenter = this.centerList.filter((item:any) => item.centerCode === centerCode)[0];
        }
        /**
         * 新增
         * @param value
         */
        private add() {
            this.isDisabled = false;
            this.visible = true;
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
            this.form = {};
            this.visible = false;
        }
        private actionNode({row, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'edit':
                    if(this.buttonCode.includes('PBT002')) {
                        this.form = {
                            centerCode: row.centerNo,
                            centerName: row.centerName,
                            ratio: row.ratio,
                        };
                        this.isDisabled = true;
                        this.visible = true;
                        this.editId = row.centerNo;
                    } else {
                        Message.warning('您没有权限！');
                        return;
                    }
                }
            }
        /**
         * 提交表单
         */
        private handleSubmit({event}:any) {
            const id = this.editId;
            if (this.form.centerCode === undefined) {
                Message.warning('请选择中心编号');
                return false;
            }
            const params = {
                centerNo:this.form.centerCode,
                centerName: this.selectCenter.centerName?this.selectCenter.centerName:this.form.centerName,
                ratio: this.form.ratio,
            };
            if(id) {
                editEquityRatio(params).then((res:any) => {
                    Message.success('修改成功');
                    this.visible = false;
                    this.queryEquityRatioList();
                    this.form = {};
                });
            } else {
                addEquityRatio(params).then((res:any) => {
                    Message.success('新增成功');
                    this.queryEquityRatioList();
                });
            }
        }
        /**
         * 下载模版
         * @param value
         */
        private download(value:any) {
            const params = {
                fileName: '权益金比例模版.xlsx',
            };
            downLoad(params);
        }
        /**
         * 批量导入
         * @param value
         */
        private beforeUpload(file:any) {
            return false;
        }
        private onUploadChange(file:any) {
            const fd = new FormData();
            fd.append('upload', file.raw);// 传文件
            importExcel(fd).then((res:any) => {
                Message.success('上传成功');
            });
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryEquityRatioList();
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-premium-rate{
        &-buttons{
            margin-bottom: 20px;
            button{
                margin-right: 15px;
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
