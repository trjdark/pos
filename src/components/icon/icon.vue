<template>
    <span>
        <i class="iconfont"
           v-bind:class="type"
        />
    </span>

</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import './iconfont.css';

    @Component
    export default class Icon extends Vue {
        @Prop ({default: ''}) public type:any;
    }
</script>

<style lang="scss">

</style>