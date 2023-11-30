<template>
    <div class="gym-activity">
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-activity-wrap">
            <div class="gym-activity-wrap-img">
                <p>请上传 750 * 1334尺寸大小的图片，10M以内的图片</p>
                <img :src="photoId" alt="">
                <div class="gym-activity-wrap-img-upload">
                    <button
                            class="gym-button-xs gym-button-default"
                            @click="showChoosePhoto"
                    >修改照片</button>
                    <input type="file" ref="input" @change="upload">
                </div>

            </div>
            <div>
                <div>照片状态：<span >{{photoStatus | filterPhotoStatus}}</span></div>
                <div>审核状态：<span >{{approveStatus | filterApproveStatus}}</span></div>
                <div>
                    <button
                        class="gym-button-xs gym-button-default mr10"
                        v-bind:class="{'active': !photoStatus}"
                        @click="trigger"
                    >{{(!photoStatus ) | filterPhotoStatus}}</button>
                    <button
                            class="gym-button-xs gym-button-default"
                            v-bind:class="{'disabled': approveStatus}"
                            :disabled="approveStatus === 1"
                            @click="approve"
                    >审核</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import {CommonUtils} from '../../utils/commonUtils';
    import {getActivityById, getEditPhoto, uploadFile, approvePhoto} from '../../actions/activityManage';
    import {User} from '../../utils/user';
    import {Message} from 'element-ui';

    @Component({
        components: {
            BreadCrumb,
        },
        filters: {
            filterPhotoStatus(value: number|boolean) {
                return (value === 1 || value ) ? '上架' : '下架';
            },
            filterApproveStatus(value: number) {
                return value === 1 ? '已审核' : '未审核';
            },
        },
    })
    export default class ActivityDetail extends Vue {
        public titles = [
            {
                name: '活动详情',
                link: '',
            },
        ];
        private id:any = null;
        private openid:any = null;
        private photoId:string = '';
        private approveStatus:any = null;
        private photoStatus:any = null;
        /**
         * 初始化
         */
        private created() {
            this.id = CommonUtils.parse(this.$route).id;
            getActivityById(this.id).then((res:any) => {
                this.photoId = res.photoUrl;
                this.approveStatus = res.approveStatus;
                this.photoStatus = res.photoStatus;
                this.openid = res.openId;
            });
        }

        /**
         * 上下架
         */
        private trigger() {
            const param = {
                id: this.id,
                photoStatus: this.photoStatus === 1 ? 0 : 1,
            };
            getEditPhoto(param).then(() => {
                Message.success('更新成功！');
                getActivityById(this.id).then((res:any) => {
                    this.approveStatus = res.approveStatus;
                    this.photoStatus = res.photoStatus;
                });
            });
        }

        /**
         * 上传照片
         */
        private showChoosePhoto() {
            const input:any = this.$refs.input;
            input.click();
        }
        /**
         * 上传成功
         */
        private upload() {
            const input:any = this.$refs.input;
            const file:any = input.files[0];
            const param = {
                id: this.id,
                userId: User.userName,
                file,
            };
            uploadFile(param, this.openid).then((res:any) => {
                Message.success('上传成功！');
                this.photoId = res.fileUrl;
            });
        }

        /**
         * 照片审核
         */
        private approve() {
            const param = {
                id: this.id,
                approveStatus: 1,
            };
            approvePhoto(param).then(() => {
                Message.success('更新成功！');
                getActivityById(this.id).then((res:any) => {
                    this.approveStatus = res.approveStatus;
                });
            });
        }
    }
</script>

<style lang="scss">
    .gym-activity{
        &-wrap{
            display: flex;
            &-img{
                width: 400px;
                img{
                    width: 100%;
                }
                &-upload{
                    width: 88px;
                    height: 24px;
                    margin: auto;
                    overflow: hidden;
                }
            }
        }
        .gym-button-default{
            background: #f56c6c;
            border: 1px solid #f56c6c;
            &.active{
                background: #67c23a;
                border: 1px solid #67c23a;
            }
            &.disabled{
                background: grey;
                border: 1px solid grey;
            }
        }
    }
</style>