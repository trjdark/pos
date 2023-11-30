<!--延用关键数据预警-->
<template>
    <div id="gym-page-center-warning-add" class="gym-page-center-warning-add">
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-page-center-warning-add-form">
            <div class="gym-page-center-warning-add-form-items">
                <p class="gym-page-center-warning-add-form-items-title">
                    <span class="high-light">·</span>中心关键数据设置
                </p>
                <div class="gym-page-center-warning-add-form-items-item">
                    <span class="gym-page-center-warning-add-form-items-item-label">选择年月：</span>
                    <el-date-picker
                            class="gym-page-center-warning-add-form-items-item-input"
                            type="month"
                            size="small"
                            disabled
                            value-format="yyyy-MM"
                            v-model="warningInfo.yearMonth"
                            placeholder="选择日期"
                            @change="handleChangeYearMonth"
                    >
                    </el-date-picker>
                </div>
                <div class="gym-page-center-warning-add-form-items-item">
                    <span class="gym-page-center-warning-add-form-items-item-label">中心：</span>
                    <el-select
                            size="small"
                            filterable
                            disabled
                            v-model="warningInfo.centerId"
                            placeholder="请选择">
                        <el-option
                                v-for="item in myCenterList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gym-page-center-warning-add-form-items-item">
                    <span class="gym-page-center-warning-add-form-items-item-label">预警指标：</span>
                    <el-select
                            size="small"
                            filterable
                            placeholder="请选择"
                            disabled
                            v-model="warningInfo.warningType"
                            @change="handleChangeType"
                    >
                        <el-option
                                v-for="item in warningEnum"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gym-page-center-warning-add-form-items-item">
                    <span class="gym-page-center-warning-add-form-items-item-label">预警数：</span>
                    <el-input-number
                            class="warning-input"
                            v-model="warningInfo.warningNum"
                            size="small"
                            :min="0"
                            :max="maxWarningNumber"
                    />
                </div>
            </div>
            <div class="gym-page-center-warning-add-form-items">
                <p class="gym-page-center-warning-add-form-items-title">
                    <span class="high-light">·</span>每周预警分配
                </p>
                <div class="gym-page-center-warning-add-form-items-content">
                    <div
                            class="gym-page-center-warning-add-form-items-week-warning"
                            v-for="(item, index) in warningInfo.detailList"
                            :key="'detaList_'+index"
                    >
                        <div class="gym-page-center-warning-add-form-items-week-warning-item">
                            <span class="gym-page-center-warning-add-form-items-week-warning-item-label">
                                {{warningInfo.yearMonth}}第{{index + 1}}周
                            </span>
                        </div>
                        <div class="gym-page-center-warning-add-form-items-week-warning-item">
                            <span class="gym-page-center-warning-add-form-items-week-warning-item-label">日期:</span>
                            <el-date-picker
                                    class="gym-page-center-warning-add-form-items-week-warning-item-input"
                                    type="daterange"
                                    size="small"
                                    v-model="item['date']"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="item['pickerOptions']"
                                    @change="handleChangeWarningDate"
                            >
                            </el-date-picker>
                        </div>
                        <div class="gym-page-center-warning-add-form-items-week-warning-item">
                            <span class="gym-page-center-warning-add-form-items-week-warning-item-label">预警数:</span>
                            <el-input-number
                                    class="gym-page-center-warning-add-form-items-week-warning-item-input"
                                    size="small"
                                    v-model="item['warningRate']"
                                    :min="0"
                                    :max="100"
                            />
                            <span>%</span>
                        </div>
                        <div class="gym-page-center-warning-add-form-items-week-warning-item">
                            <button class="gym-button-default gym-button-lg button" @click="handleDelete(index)">删除</button>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <button
                        @click="add"
                        class="gym-button-grey gym-button-xs"
                        v-bind:class="{'active': ['81001', '81002', '81007'].includes(warningInfo.warningType) && warningInfo.yearMonth}"
                        :disabled="!(['81001', '81002', '81007'].includes(warningInfo.warningType) && warningInfo.yearMonth)"
                >新增</button>
            </div>
            <div class="gym-page-center-warning-add-form-buttons">
                <button class="gym-button-lg gym-button-white mr15" @click="goBack">返回</button>
                <button class="gym-button-lg gym-button-default" @click="handleSubmit">保存</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import moment from 'moment';
    import {addWarning, getWarningInfo} from '../../actions/warningActions';
    import {Message} from 'element-ui';
    import {CommonUtils} from '../../utils/commonUtils';

    @Component({
        components: {
            BreadCrumb,
        },
    })
    export default class CenterWarningContinue extends Vue {
        private titles = [
            {
                name: '中心预警管理',
                link: '',
            }, {
                name: '关键数据预警设置',
                link: '',
            }, {
                name: '延用',
                link: '',
            },
        ];
        private warningEnum:any = [
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
        ];
        private id:string = '';
        private warningInfo:any = {};
        private disabledStartTime:any = '';
        private disabledEndTime:any = '';
        private maxWarningNumber:any = 9999999;


        private get myCenterList() {
            return (this.$store.state.basic.myCenterList || []).map((item:any) => ({
                label: item.centerName,
                value:item.centerId,
            }));
        }
        private created() {
            const {id} = CommonUtils.parse(this.$route);
            const param = {id};
            this.id = id;
            getWarningInfo(param).then((res:any) => {
                this.warningInfo = Object.assign({}, res, {
                    yearMonth: moment(res.yearMonth).add(1, 'months').format('YYYY-MM'),
                    detailList: [],
                });
                // 如果是当月OPP-PAY转换率预警,最大值不能超过100
                if(this.warningInfo.warningType === '81003') {
                    this.maxWarningNumber = 100;
                }
                // 设置日期选择范围
                this.disabledStartTime = moment(this.warningInfo.yearMonth).startOf('month').valueOf();
                this.disabledEndTime = moment(this.warningInfo.yearMonth).endOf('month').valueOf();
                // 添加每周日期选择
                if(['81001', '81002', '81007'].includes(this.warningInfo.warningType)) {
                    let date = moment(this.warningInfo.yearMonth).startOf('month').clone();
                    const that = this;
                    while(moment(date).format('YYYY-MM') === moment(this.warningInfo.yearMonth).format('YYYY-MM')) {
                        this.warningInfo.detailList.push({
                            date: [
                                moment(date),
                                moment(date)
                                    .endOf('week')
                                    .add(1, 'd')
                                    .format('MM') !== moment(this.warningInfo.yearMonth).format('MM')
                                    ? moment(date).endOf('month')
                                    : moment(date).startOf('week').format('MM-DD') === moment(date).format('MM-DD')
                                        ? moment(date)
                                        : moment(date).endOf('week').add(1, 'd'),
                            ],
                            pickerOptions: {
                                disabledDate(time:any) {
                                    return time.getTime() < that.disabledStartTime || time.getTime() > that.disabledEndTime;
                                },
                            },
                        });
                        // 如果1号位周日
                        date = moment(date).startOf('week').format('MM-DD') === moment(date).format('MM-DD')
                                ?  moment(date).add(1, 'd')
                                : moment(date).endOf('week').add(1, 'd').add(1, 's');
                    }
                }

            });
        }
        /**
         * 修改年月
         */
        private handleChangeYearMonth(value:any) {
            this.warningInfo.detailList = [];
            this.disabledStartTime = moment(value).startOf('month').valueOf();
            this.disabledEndTime = moment(value).endOf('month').valueOf();
        }
        /**
         * 新增
         */
        private add() {
            const startTime = this.disabledStartTime;
            const endTime = this.disabledEndTime;
            this.warningInfo.detailList.push({
                date:null,
                warningRate:null,
                pickerOptions: (startTime) ? {
                    disabledDate(time:any) {
                        return time.getTime() < startTime || time.getTime() > endTime;
                    },
                } : {},
            });
        }

        /**
         * 返回
         */
        private goBack() {
            this.$router.go(-1);
        }

        /**
         * 提交表单
         */
        private handleSubmit() {
            const param = {
                yearMonth: this.warningInfo.yearMonth,
                centerId: this.warningInfo.centerId,
                warningType: this.warningInfo.warningType,
                warningNum: this.warningInfo.warningNum,
                detailList: this.warningInfo.detailList.map((item:any) => ({
                    warningRate: item.warningRate,
                    startDate: moment(item.date[0]).valueOf(),
                    endDate:  moment(item.date[1]).endOf('day').valueOf(),
                })),
            };
            this.warningInfo.detailList.map((item:any) => {
                if(item.date === null) {
                    Message.warning('请填写完整！');
                }
            });
            addWarning(param).then((res:any) => {
                this.$router.go(-1);
                Message.success('添加成功！');
            });
        }

        /**
         * 改变预警指标
         * @param {string} value
         */
        private handleChangeType(value:string) {
            const arr = ['81001', '81002', '81003'];
            if(!arr.includes(value)) {
                this.warningInfo.detailList = [];
            }
            // 如果是当月OPP-PAY转换率预警,最大值不能超过100
            if(value === '81003') {
                this.maxWarningNumber = 100;
            } else {
                this.maxWarningNumber = 9999999;
            }
        }
        /**
         * 删除每周预警分配
         * @param {number} i
         */
        private handleDelete(i:number) {
            this.warningInfo.detailList = this.warningInfo.detailList.filter((item:any, index:number) => index !== i);
            if(this.warningInfo.detailList.length === 0) {
                this.disabledStartTime = moment(this.warningInfo.yearMonth).valueOf();
            } else {
                const index = this.warningInfo.detailList.length - 1;
                this.disabledStartTime = moment(this.warningInfo.detailList[index].date[1]).add(1, 'm').valueOf();
            }

        }

        /**
         * 添加
         * @param value
         */
        private handleChangeWarningDate(value:any) {
            this.disabledStartTime = moment(value[1]).add(1, 'm').valueOf();
            this.disabledEndTime = moment(value[0]).endOf('month').valueOf();
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-center-warning-add{
        &-form{
            &-items{
                display: flex;
                flex-flow: wrap;
                &-title{
                    width: 100%;
                    color: #151515;
                    font-weight: bold;
                    margin-bottom: 30px;
                }
                &-item{
                    width: 33%;
                    margin-bottom: 15px;
                    &-label{
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                    }
                }
                &-week-warning{
                    display: flex;
                    margin-bottom: 15px;
                    &-item{
                        display: flex;
                        align-items: center;
                        &-label{
                            display: inline-block;
                            width: 100px;
                            text-align: right;
                            margin-right: 10px;
                        }
                    }
                }
                &-content{
                    display: flex;
                    flex-direction: column;
                    height: 300px;
                    overflow: auto;
                    flex-flow: column;
                }
            }

            &-buttons{
                text-align: center;
            }
            .gym-button-grey{
                &.active{
                    border: 1px solid $themeColor;
                    background: $themeColor;
                    color: $white;
                    cursor: pointer;
                }
            }
            .warning-input{
                width: 180px;
            }
        }
    }
</style>