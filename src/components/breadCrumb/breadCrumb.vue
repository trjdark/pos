<!--面包屑组建-->
<template>
    <div id="gym-part-bread-crumb" class="gym-part-bread-crumb">
        <div class="gym-part-bread-crumb-content">
            <div
                v-for="(item, index) in titles"
                :key="`bread_crumb_${index}`"
            >
                <span>{{item.name}}</span>
                <span
                    v-if="index !== titles.length - 1"
                    class="gym-part-bread-crumb-content-separator">/</span>
            </div>
        </div>
        <el-divider/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class BreadCrumb extends Vue {
        @Prop ({default: []}) public titles:any;
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-part-bread-crumb{

        &-content{
            border-left: 3px solid $themeColor;
            padding-left: 7px;
            display: flex;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            &-separator{
                margin: 0 5px;
            }
        }
    }
</style>