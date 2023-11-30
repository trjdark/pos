<template>
    <div>
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-part-search-form">
            <el-form class="gym-part-search-form-items" ref="form" :model="form"  required
            >
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">操作人：</span>
                    <el-input
                            size="small"
                            placeholder="请选择"
                            v-model="code?createByName:operator"
                            disabled
                            class="gym-part-search-form-item-input"
                    >
                    </el-input>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">操作部门：</span>
                    <el-input
                        size="small"
                        placeholder="请选择"
                        v-model="code?unitName:operateName"
                        disabled
                    >
                    </el-input>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">单据编号：</span>
                    <el-input
                        size="small"
                        placeholder="请选择"
                        v-model="code"
                        disabled
                    >
                    </el-input>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">收款公司：</span>
                    <el-select
                        size="small"
                        placeholder="请选择"
                        v-model="companyName"
                        class="gym-part-search-form-item-input"
                        v-bind:disabled="code?'':disabled"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.companyCode"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">操作时间：</span>
                    <el-date-picker
                        type="date"
                        size="small"
                        placeholder="请选择"
                        v-model="operateDate"
                        disabled
                    >
                    </el-date-picker>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">权益金日期：</span>
                    <el-date-picker
                        type="date"
                        size="small"
                        placeholder="请选择"
                        v-model="equityDate"
                        v-bind:disabled="code?'':disabled"
                    >
                    </el-date-picker>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">过账日期：</span>
                    <el-date-picker
                        type="date"
                        size="small"
                        placeholder="请选择"
                        v-model="postingDate"
                        v-bind:disabled="code?'':disabled"
                    >
                    </el-date-picker>
                </div>
                <div class="gym-part-search-form-item">
                    <span class="gym-part-search-form-item-label">税码：</span>
                        <el-input
                            size="small"
                            placeholder="请选择"
                            v-model="taxCode"
                            disabled
                        >
                        </el-input>
                </div>
<!--                </div>-->
            </el-form>
        </div>
        <div class="gym-page-detail-button">
            <button @click="downloadExcelplate" class="gym-button-xs gym-button-white" v-show="code?false:true">下载模版</button>
            <button @click="importData" class="gym-button-xs gym-button-white" v-show="code?false:true">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :on-change="handleChange"
                    multiple="false"
                    type="file"
                    :before-upload="beforeUpload"
                    action="/mate-pos/home/queryEquityAccount"
                    :auto-upload="false"
                    :http-request = "uploadFile"
                    :show-file-list = "false"
                    accept=".xls,.xlsx"
                    :multiple="false">
                    导入
                </el-upload>
            </button>
            <button @click="exportAddData" class="gym-button-xs gym-button-white">导出</button>
            <button @click="add" class="gym-button-xs gym-button-white" v-show="code?false:true">新增</button>
            <button @click="submitSapData" class="gym-button-xs gym-button-white" v-show="code?false:true">提交</button>
            <button @click="pushSap" class="gym-button-xs gym-button-white" v-show="code?true:false">重新推送</button>
        </div>
        <Modal :dialog-visible="visible"
               v-on:handle-cancel="closeModal"
               v-on:handle-ok="handleSubmit"
               :name="'权益金核算单'"
        >
            <el-form class="gym-page-premium-rate-form" ref="form" :model="form">
                <div class="gym-page-premium-rate-form-item">
                    <span class="gym-page-premium-rate-form-item-label">中心编号：</span>
                    <div class="gym-page-premium-rate-form-item-input">
                        <el-select
                            size="small"
                            placeholder="请选择"
                            v-model="form.centerCode"
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
                            size="small"
                            placeholder="请选择"
                            v-model="form.centerName"
                        >
                        </el-input>
                    </div>
                </div>
                <div class="gym-page-premium-rate-form-item">
                    <span class="gym-page-premium-rate-form-item-label">销售额：</span>
                    <div class="gym-page-premium-rate-form-item-input">
                        <el-input
                                size="small"
                                placeholder="请选择"
                                v-model="form.saleAmount"
                        >
                        </el-input>
                    </div>
                </div>
                <div class="gym-page-premium-rate-form-item">
                    <span class="gym-page-premium-rate-form-item-label">权益金到期日：</span>
                    <div class="gym-page-premium-rate-form-item-input">
                        <el-date-picker
                            type="date"
                            size="small"
                            placeholder="请选择"
                            v-model="form.equityEndDate"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="gym-page-premium-rate-form-item">
                    <span class="gym-page-premium-rate-form-item-label">备注：</span>
                    <div class="gym-page-premium-rate-form-item-input">
                        <el-input
                                size="small"
                                placeholder="请选择"
                                v-model="form.ratio"
                        >
                        </el-input>
                    </div>
                </div>
            </el-form>
        </Modal>
        <Table
            v-bind:columns="columns"
            :pageSize="pageSize"
            :pageNo="pageNo"
            :total="totalSize"
            :data-source="dataSource"
            v-on:handle-change="handleChangePage"
            v-on:on-proxy-click="deleteData"
        />
    </div>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
  import SearchForm from '@c/searchForm/searchForm.vue';
  import Table from '@c/table/table.vue';
  import { CommonUtils } from '../../utils/commonUtils';
  import { downLoadEquity, addEquityAccount, pushSapAgain,
        exportEquity, getEquityAccountDetail, submitSap,
        exportAddExcel } from '../../actions/premiumAccountActions';
  import moment from 'moment';
  import {User} from '@/utils/user';
  import Modal from '@c/modal/modal.vue';
  import { Message } from 'element-ui';
  import {RouterMap} from '@/router/routerMap';


  @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
        },
    })
    export default class PremiumAccountInfo extends Vue {
        public titles = [
            {
                name: '权益金核算管理',
                link: '',
            },
            {
                name: '权益金核算单',
                link: '',
            },
        ];

        private form:any = {};
        private companyList:any = (this.$store.state.basic.companyList || []).map((item:any) =>
          ({
            label: item.companyName,
            value:item.companyCode,
        }));
        private columns = [
            {
                label: '中心编号',
                prop: 'centerNo',
                width: '100',
            }, {
                label: '中心名称',
                prop: 'centerName',
                width: '120',
            }, {
                label: '成本中心',
                prop: 'costCenter',
                width: '100',
            }, {
                label: '销售额',
                prop: 'saleAmount',
                width: '120',
            }, {
                label: '权益金比例',
                prop: 'ratio',
                width: '100',
            }, {
                label: '税金系数',
                prop: 'taxCoefficient',
                width: '100',
            },{
                label: '权益金',
                prop: 'equity',
                width: '120',
              },
            {
                label: '权益金到期日',
                prop: 'equityEndDate',
                width: '120',
                formatter: (row:any, record:any, date:number) => moment(date).format('YYYY-MM-DD'),
            },{
                label: '备注',
                prop: 'remark',
            },
            {
                label: '收款凭证',
                prop: 'receiptVoucher',
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSource: any = [];
        private totalSize:number = 0;
        private createByName: any = ''; // search value
        private unitCode: any = ''; // search value
        private companyName: any = ''; // search value
        private companyCode: any = ''; // search value
        private operateDate: any = ''; // search value
        private equityDate: any = ''; // search value
        private postingDate: any = ''; // search value
        private unitName: any = '';
        private taxCode: any = '6% 销项税'; // search value
        private centerNo:string = '';
        private code:string =''; // code明细
        private endDate:any = null;
        private startDate:any = null;
        private visible:boolean = false;
        private index:number = 0;
        private disabled: any = false;
        private operator:string = `${User.employeeUsName} ${User.employeeName}`;
        private operateName:string = User.unitName;
        private get centerList() {
            return this.$store.state.basic.centerList;
        }
        private UploadUrl() {
            return '/mate-pos/home/getExcelData';
        }
        private created() {
            if(this.$route.path.length>10) {
              const {code} =CommonUtils.parse(this.$route);
              this.code = code;
              this.queryEquityAccountDetail();
            }
        }
        private queryEquityAccountDetail() {
          const param = {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            code: this.code,
            endDate: this.endDate,
            startDate: this.startDate,
          };
          getEquityAccountDetail(param).then((res:any) => {
            this.dataSource = res.list;
            this.totalSize = res.totalSize;
            this.createByName = res.createByName;
            this.unitCode = res.unitCode;
            this.unitName = res.unitName;
            this.companyName = res.companyName;
            this.companyCode = res.companyCode;
            this.operateDate = res.operateDate;
            this.equityDate = res.equityDate;
            this.postingDate = res.postingDate;
          });
        }
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryEquityAccountDetail();
        }
        private downloadExcel() {
            const param = {
                centerCode: this.centerNo,
                endDate: this.endDate,
                startDate: this.startDate,
            };
            exportEquity(param);
        }
        /**
         * 新增
         * @param value
         */
        private add() {
            // const time = moment(this.equityDate).add(1, 'months',).startOf('month').format('YYYY-MM-DD');
            if(!this.companyName) {
                Message.warning('请选择收款公司');
            } else if(!this.equityDate) {
                Message.warning('请选择权益金日期');
            } else if(!this.postingDate) {
                Message.warning('请选择过账日期');
            } else {
              this.visible = true;
            }
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
          this.form = {};
          this.visible = false;
        }
        /**
         * 下载模版
         * @param value
         */
        private downloadExcelplate() {
            const params = {
                fileName: '权益金比例模版.xlsx',
            };
            downLoadEquity(params);
        }
        /**
         * 重新推送sap
         * @param value
         */
        private pushSap() {
            pushSapAgain({code:this.code}).then((res)=> {
                Message.warning('重新推送成功');
                this.queryEquityAccountDetail();
            });
        }
        /**
         * 导入权益金核算新增列表
         * @param value
         */
        private importData() {
            if(!this.companyName) {
                Message.warning('请选择收款公司');
            } else if(!this.equityDate) {
                Message.warning('请选择权益金日期');
            } else if(!this.postingDate) {
                Message.warning('请选择过账日期');
            } else {
                this.visible = true;
            }
        }
        private handleChange() {
            // todo
        }
        // private beforeUpload({file}:any) {
        //     console.log(file)
        //     const params = {
        //     code: this.code,
        //     companyCode: this.companyCode,
        //     equityDate: this.equityDate,
        // };
        // this.$http.post('/web/api/uploadFile', fd).then((res) => {
        // },(res) => {
        //     console.log(res)
        //   });
        //   return false;
        // }
        /**
         * 导出权益金核算excel
         * 查看里导出&&新增里有无数据导出
         * @param value
         */
        private exportAddData() {
            if(this.code) {
                const params = {
                    code: this.code,
                };
                exportEquity(params);
            } else {
                const params = this.dataSource;
                if(params.length>0) {
                    exportAddExcel(params);
                } else {
                    Message.success('没有可导出的数据!');
                }
            }
        }
        /**
         * 删除权益金新增页面新增数据
         * @param value
         */
        private deleteData(row:any,index:any) {
            this.form = {
                centerCode: row.row.centerNo,
                centerName: row.row.centerName,
                ratio: row.ratio,
                saleAmount:row.row.saleAmount,
                remark:row.row.remark,
                equityEndDate: row.row.equityEndDate,
            };
            this.visible = true;
        }
        /**
         * 提交sap生成凭证
         * @param value
         */
        private submitSapData() {
            const params = this.dataSource;
            for(const item of params) {
                item.companyCode = this.companyCode;
                // item.companyName = this.companyName;
                item.equityDate = this.equityDate;
                item.postingDate = this.postingDate;
            }
            submitSap(params).then((res)=> {
                // todo 逻辑重新梳理
                const param = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    code: res.code,
                    endDate: this.endDate,
                    startDate: this.startDate,
                };
                this.$router.push(`${RouterMap.查看权益金核算.link}${CommonUtils.stringify({code: res.code})}`);
            });
        }
        // private uploadFile() {
        //     const form = new FormData();
        //     console.log(form)
        //     // form.append('token', this.token);
        //     form.append('file1', item.file);
        //     // updateFile(form).then((res:any) => {
        //     //     let data = res.data;
        //     //     if (data.code == 600) {
        //     //     }
        //     // })
        // }
        /**
         * 确定
         * 提交新增表单
         */
        private handleSubmit() {
            // todo
            // const {code} = CommonUtils.parse(this.$route);
            if(!this.form.saleAmount) {
                Message.warning('请填写销售额');
            } else if(!this.form.equityEndDate) {
              Message.warning('请选择权益金到期日期');
            } else {
                const params = {
                    centerNo: this.form.centerCode,
                    code: this.form.code,
                    saleAmount: this.form.saleAmount,
                    companyCode : this.companyCode,
                    equityEndDate: moment(this.form.equityEndDate).valueOf(),
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    remark: this.form.remark,
                };
                addEquityAccount(params).then((res:any) => {
                    this.dataSource.push(res);
                    Message.warning('新增成功');
                    this.visible = false;
                });
                }
            }
        }
</script>

<style lang="scss">

    .gym-part-search-form{
        &-items{
            display: flex;
            flex-flow: wrap;
        }
        &-item{
            display: flex;
            align-items: center;
            width: 30%;
            margin-right: 30px;
            margin-bottom: 20px;
            &-label{
                width: 100px;
            }
            &.lang{
                width: 30%;
            }
            &.button{
                width: calc(90% + 60px);
                justify-content: flex-end;
                /*background: red;*/
            }
            &-input, &-date, &-date-range, &-selext{
                width: 210px;

            }

        }
    }
    .gym-page-detail-button{
        margin-bottom: 20px;
        .gym-button-xs{
            margin-left: 10px;
        }
    }
    .operate-button{
        span:nth-child(2){
            margin-left: 10px;
        }
    }

</style>
