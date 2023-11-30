<!--搜索-->
<template>
    <div class="gym-part-search-form">
        <el-form class="gym-part-search-form-items" ref="form" :model="form">
            <div class="gym-part-search-form-item"
                v-for="(item, index) in items"
                :key="`search_item_${index}`"
                v-bind:class="{lang: item.type === 'dates'}"
            >
                <span class="gym-part-search-form-item-label">{{item.label}}：</span>
                <el-input
                    v-if="item.type === 'text' "
                    class="gym-part-search-form-item-input"
                    size="small"
                    :placeholder="item.placeholder"
                    :name="item.name"
                    v-model="form[item.name]"
                >
                </el-input>

                <el-date-picker
                        v-else-if="item.type === 'date' "
                        class="gym-part-search-form-item-date"
                        type="date"
                        size="small"
                        v-model="form[item.name]"
                        :name="item.name"
                        placeholder="选择日期">
                </el-date-picker>

                <el-date-picker
                        v-else-if="item.type === 'dates'"
                        class="gym-part-search-form-item-date-range"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        v-model="form[item.name]"
                        :name="item.name">
                </el-date-picker>

                <el-date-picker
                        v-else-if="item.type === 'month'"
                        class="gym-part-search-form-item-date-range"
                        type="month"
                        size="small"
                        v-model="form[item.name]"
                        :name="item.name"
                        :picker-options="item.pickerOptions"
                        :clearable="false"
                        placeholder="选择日期">
                </el-date-picker>

                <el-select
                        v-else-if="item.type === 'select'"
                        class="gym-part-search-form-item-select"
                        size="small"
                        filterable
                        :multiple="item.multiple"
                        v-model="form[item.name]"
                        placeholder="请选择">
                    <el-option
                            v-for="item1 in item.options"
                            :key="item1.value"
                            :label="item1.label"
                            :value="item1.value">
                    </el-option>
                </el-select>
            </div>
            <div
                class="gym-part-search-form-item"
                v-bind:class="{
                    button: items.length % 3 === 0,
                    button1: items.length % 3 === 1,
                    button2: items.length % 3 === 2
                }"
            >
                <button
                    class="gym-button-default gym-button-lg mr10"
                    v-on:click="handleSubmit"
                >查询</button>
                <button
                        class="gym-button-white gym-button-lg"
                        v-on:click="reset"
                >重置</button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

    @Component

    export default class SearchForm extends Vue {
        @Prop({default: []}) private items:any;
        private form = {};
        @Emit()
        public handleSubmit(e:any) {
            e.preventDefault();
            return this.form;
        }
        private created() {
            this.items.forEach((item:any) => {
                this.form = Object.assign({}, this.form, {[item.name]: item.defaultValue || null});
            });
        }
        private reset(e:any) {
            e.preventDefault();
            this.items.forEach((item:any) => {
                this.form = Object.assign({}, this.form, {[item.name]: item.defaultValue || null});
            });
            return this.form;
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
                text-align: right;
            }
            &.lang{
                width: 30%;
            }
            &.button{
                width: calc(90% + 60px);
                justify-content: flex-end;
            }
            &.button1{
                width: calc(60% + 30px);
                justify-content: flex-end;
            }
            &.button2{
                width: 30%;
                justify-content: flex-end;
            }
            &-input, &-date, &-date-range, &-selext, .el-input{
                width: 200px;
            }

        }
    }
</style>
