<!--弹层-->
<template>
    <div v-bind:class="{border: contentBorder}">
        <el-dialog
                :visible.sync="dialogVisible"
                :width="width"
                :before-close="handleCancel"
                :destroy-on-close="destroyOnClose"
        >
            <div slot="title" class="gym-modal-header-title">
                <span v-show="name" class="title-name">{{ name }}</span>
            </div>
            <slot></slot>
            <span slot="footer" class="dialog-footer">
            <button @click="handleCancel" class="gym-button-white gym-button-xs mr10">取 消</button>
            <button @click="handleOk" class="gym-button-default gym-button-xs">确 定</button>
        </span>
        </el-dialog>
    </div>

</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

    @Component
    export default class Modal extends Vue {
        @Prop ({default: false}) public dialogVisible:boolean = false;
        @Prop ({default: '400px'}) public width:any;
        @Prop ({default: ''}) public name:any;
        @Prop ({default: true}) public contentBorder!:boolean;
        @Prop ({default: true}) public destroyOnClose!:boolean;

        @Emit()

        private handleCancel() {
            return false;
        }

        @Emit()

        private handleOk() {
            return false;
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-modal{
        &-header-title{
            border-left: 3px solid $themeColor;
            padding-left: 7px;

        }
    }

    .mr10{
        margin-right: 10px;
    }
    .border{
        .el-dialog__body{
            border-bottom: 1px solid $borderColor;
            border-top: 1px solid $borderColor;
        }
    }

</style>