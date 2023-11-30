<!--权限管理-->
<template>
    <div class="gym-page-authority">
        <BreadCrumb v-bind:titles="titles"/>
        <SearchForm :items="searchItems" v-on:handle-submit="onSearch"/>
        <div class="gym-page-emergency-table">
            <button @click="add" class="gym-button-xs gym-button-default gym-button-add" v-if="buttonCode.includes('PBT007')">新增</button>
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
        <Modal
                width="600px"
                :dialog-visible="visible"
                v-on:handle-cancel="closeModal"
                v-on:handle-ok="handleSubmit"
                :name="'编辑成员权限设置'"
        >
            <div class="gym-page-authority-modal-form">
                <el-tree
                    class="gym-page-authority-modal-form-tree"
                    :data="treeNode"
                    :props="defaultProps"
                    node-key="id"
                    show-checkbox
                    :default-expanded-keys="nodeKey"
                    :default-checked-keys="defaultCheckKeys"
                    ref="tree"
                    @check-change="handleCheckChange">
                </el-tree>
                <div class="gym-page-authority-modal-form-list">
                    <div v-for="(item, index) in selectedMemeberList"
                         :key="`member_item_${index}`"
                         class="gym-page-authority-modal-form-list-item"
                    >
                        <span>{{item.title}}</span>
                        <i class="el-icon-close" @click="handleCancelMember(item)"></i>
                    </div>
                    <el-popover></el-popover>
                </div>
            </div>

        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import SearchForm from '@c/searchForm/searchForm.vue';
    import Table from '@c/table/table.vue';
    import { getRoleList, getTree, updateRolePerson } from '../../actions/authorityActions';
    import Modal from '@c/modal/modal.vue';
    import { Message, Tree, Form } from 'element-ui';
    import {RouterMap} from '@/router/routerMap';
    import {CommonUtils} from '@/utils/commonUtils';
    import {User} from '../../utils/user';

    /**
     * 格式化树状结构展开的key
     * @param arr
     * @returns {any[]}
     */
    const nodeKey = (arr:any) => {
        let result:any = [];
        for(const val of arr) {
            if(val.children) {
                result = [...result, ...nodeKey(val.children)];
            }
            if(val.level === 1) {
                result.push(val.id);
            }
        }
        return result;
    };


    @Component({
        components: {
            BreadCrumb,
            SearchForm,
            Table,
            Modal,
            Form,
        },
    })

    export default class Authority extends Vue {
        public titles = [
            {
                name: '权限管理',
                link: '',
            },
        ];
        private searchItems = [
            {
                label: '角色名称',
                type: 'text',
                name: 'description',
                placeholder: '请输入',
            },
        ];
        private columns = [
            {
                label: '角色编码',
                prop: 'code',
                width: 200,
            }, {
                label: '角色名称',
                prop: 'description',
                width: 200,
            },
            {
                label: '数据分配',
                prop: 'areas',
                width: 350,
                render: (record:any) =>
                    `<span>{record}</span>`,
            },
            {
                label: '成员',
                prop: 'members',
                width: 300,
            }, {
                label: '操作',
                prop: 'id',
                tp: true,
                width: 100,
                render: (record:any) =>
                    `<span class="high-light mr10" data-type="detail">查看</span>
                    <span class="high-light" data-type="edit">编辑</span>`,
            },
        ];
        private pageNo:number = 1;
        private pageSize: number = 10;
        private dataSourse: any = [];
        private totalSize:number = 0;
        private visible:boolean = false;
        private treeNode:any = [];
        private nodeKey:any = [];
        private selectedMemeberList:any = [];
        private defaultCheckKeys:any = [];
        private roleId:string = '';
        private description:string = '';
        private buttonCode:any = []; // btn名称
        private defaultProps:any = {
            children: 'children',
            label: 'title',
        };

        private created() {
            (User.permissionList||[]).forEach((el:any) => {
                const a = el.buttonMenus&&el.buttonMenus.map((item:any) => {
                    this.buttonCode = this.buttonCode.concat(item.buttonCode);
                });
            });
            getTree({}).then((res:any) => {
                this.nodeKey = nodeKey(res);
                this.treeNode = res;
            });
            this.queryRoleList();
        }
        /**
         * 角色名称搜索
         * @param value
         */
        private onSearch(value:any) {
            this.pageNo = 1;
            this.description = value.description;
            this.queryRoleList();
        }
        private queryRoleList() {
            getRoleList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                description: this.description,
            }).then((res:any) => {
                this.dataSourse = res.list;
                this.totalSize = res.totalSize;
            });
        }
        /**
         * 打开编辑弹层
         */
        private edit({row}:any) {
            this.roleId = row.id;
            this.selectedMemeberList = row.member ? row.member.split('').map((item:any) => ({id: item, title: item})): [];
            this.defaultCheckKeys = row.member ? row.member.split(' '): [];
            this.visible = true;
        }
        /**
         * 操作表单
         */
        private actionNode({row, event}:any) {
            const type = event.target.getAttribute('data-type');
            switch (type) {
                case 'edit':
                    if(this.buttonCode.includes('PBT008')) {
                        this.$router.push(`${RouterMap.权限管理编辑.link}${CommonUtils.stringify({id: row.id})}`);
                        break;
                    } else {
                        Message.warning('您没有权限！');
                        return;
                    }
                case 'detail':
                    this.$router.push(`${RouterMap.权限管理查看.link}${CommonUtils.stringify({id: row.id})}`);
                    break;
            }
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
            this.visible = false;
        }
        /**
         * 分页
         * @param pageInfo
         */
        private handleChangePage(pageInfo:any) {
            this.pageNo = pageInfo.pageNo;
            this.pageSize = pageInfo.pageSize;
            this.queryRoleList();
        }
        /**
         * 提交
         */
        private handleSubmit() {
            const param = {
                roleId: this.roleId,
                persons: this.selectedMemeberList.map((item:any) => ({nodeId: item.id})),
            };
            updateRolePerson(param).then((res:any) => {
                Message.success('修改成功');
                this.visible = false;
                this.roleId = '';
                this.selectedMemeberList = [];
                this.queryRoleList();
            });
        }
        /**
         * 选中人员
         * @param row
         * @param node
         * @param event
         */
        private handleCheckChange(row:any, node:any, event:any) {
            if(node && !row.children) {
                this.selectedMemeberList.push(row);
            }
            if(!node && !row.children) {
                this.selectedMemeberList = this.selectedMemeberList.filter((item:any) => item.id !== row.id);
            }
        }
        /**
         * 删除
         */
        private handleCancelMember(row:any) {
            this.selectedMemeberList = this.selectedMemeberList.filter((item:any) => item.id !== row.id);
            (<Tree>this.$refs.tree).setCheckedNodes(this.selectedMemeberList);
        }
        /**
         * 新增权限
         */
        private add() {
            window.open(`${RouterMap.新增权限.link}`);
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-authority{
        .gym-button-add{
           margin-bottom: 10px;
        }
        &-modal{
            &-form{
                display: flex;
                &-tree{
                    width: 270px;
                    border-right: 1px solid $borderColor;
                    height:360px;
                    overflow: auto;
                }
                &-list{
                    width: calc(100% - 270px);
                    height:360px;
                    overflow: auto;
                    padding: 12px;
                    &-item{
                        border-radius: 5px;
                        background: #E9E9E9;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 40px;
                        padding: 0 15px;
                        margin-bottom: 12px;
                    }
                }
                .el-dialog__body{
                    padding: 0px 20px;
                }
                &-tree{
                    .el-tree-node{
                        .is-leaf + .el-checkbox .el-checkbox__inner{
                            display: inline-block;
                        }
                        .el-checkbox__input>.el-checkbox__inner{
                            display: none;
                        }
                    }
                }
            }
        }
        .el-dialog__body{
            padding: 0 20px;
        }
    }
</style>
