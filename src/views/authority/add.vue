<!--权限管理-->
<template>
    <div class="gym-page-authority">
        <BreadCrumb v-bind:titles="titles"/>
        <div class="gym-page-authority-form">
            <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>权限基本信息</p>
                <div class="gym-page-authority-form-item-content">
                    <el-form :model="ruleForm" ref="ruleForm">
                        <el-form-item
                            prop="roleCode"
                            label="角色编码"
                            :rules="{
                                required: true, message: '角色编码不能为空', trigger: 'blur'
                            }"
                        >
                            <el-input v-model="ruleForm.roleCode" maxlength='15' placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="roleName"
                            label="角色名称"
                            :max="20"
                            :rules="{
                                required: true, message: '角色名称不能为空', trigger: 'blur'
                            }"
                        >
                            <el-input v-model="ruleForm.roleName" maxlength='20' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>应用权限</p>
                <div class="gym-page-authority-form-item-content">
                    <el-checkbox-group v-model="checkedMenu">
                        <div v-for="(item, index) in data" :key="index"> 
                            <el-checkbox :label="item.menuId" @change="(param) => handleCheckAll(param, item.menuId,index)">{{item.menuName}}</el-checkbox>
                            <el-checkbox v-for="(item, i) in (item.buttonMenus)"  
                                :label="item.buttonId"  :key="i"
                                @change="handleCheckMenu($event,index,i)"
                                v-model="checkedBtn"
                                >{{item.buttonName}}
                            </el-checkbox>
                        </div>
                    </el-checkbox-group> 
                </div>
            </div> -->
            <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>应用权限</p>
                <div class="gym-page-authority-form-item-content">
                    <div v-for="(item, index) in data" :key="index"> 
                        <el-checkbox-group v-model="checkedMenu">
                            <div>
                                <el-checkbox  @change="(param) => handleCheckAll(param, item.menuId,index)" 
                                    :label="item.menuId"
                                    >{{item.menuName}}
                                </el-checkbox>
                            </div>
                            <div class="gym-page-authority-form-item-content-group">
                                <el-checkbox v-for="(item, i) in (item.buttonMenus)"  
                                    :label="item.buttonId"  :key="i"
                                    @change="(param) => handleCheckMenu(param,item.buttonId,index,i)"
                                    >{{item.buttonName}}
                                </el-checkbox>
                            </div>
                        </el-checkbox-group> 
                    </div>
                </div>
            </div>
            <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>数据权限配置</p>
                <div class="gym-page-authority-form-item-content">
                    <template >   
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllArea" @change="handleCheckAllArea">ALL</el-checkbox>
                        <!-- <template v-for="secondItem in item.buttonMenus"> -->
                        <el-checkbox-group v-model="checkArea" @change="handleCheckArea">
                            <el-checkbox v-for="(item, index) in area"  class="el-group"
                                :index="index" :label="item.id" :key="item.id">{{item.areaName}}
                            </el-checkbox>
                        </el-checkbox-group> 
                    </template>
                </div>
            </div>
            <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>角色人员分配</p>
                <div class="gym-page-authority-form-item-content">
                    <el-button size="small" @click="editRole">
                        角色人员分配
                    </el-button>
                    <div class="gym-page-authority-form-item-content-role">
                        <span v-for="(item, index) in selectedMemeberList"
                            :key="`member_item_${index}`"
                        >
                            <span>{{item.title}}，</span>
                            <!-- <i class="el-icon-close" @click="handleCancelMember(item)"></i> -->
                        </span>
                    </div>
                </div>
            </div>
            <div class="gym-page-authority-form-item-operate">
                <el-button type="small" @click="cancel">取消</el-button>
                <el-button  class="save-btn" type="small" @click="save('ruleForm')">保存</el-button>
            </div>
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
                </div>
            </div>

        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BreadCrumb from '@c/breadCrumb/breadCrumb.vue';
    import { getRoleList, getTree, updateRolePerson, getArea, addAuthority } from '../../actions/authorityActions';
    import { getInitMenu } from '../../actions/basicActions';
    import Modal from '@c/modal/modal.vue';
    import { Message, Tree } from 'element-ui';
    import {RouterMap} from '@/router/routerMap';
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
            Modal,
        },
    })

    export default class AuthorityAdd extends Vue {
        public titles = [
            {
                name: '权限管理',
                link: '',
            },
        ];

        private visible:boolean = false;
        private treeNode:any = [];
        private nodeKey:any = [];
        private menuNode:any = [];
        private menuKey:any = [];
        private selectedMemeberList:any = []; // 成员树
        private defaultCheckKeys:any = [];
        private roleId:string = ''; // 成员树id
        private roleCode:string = '';
        private roleName:string = '';
        private checkedMenu:any = []; // 储存权限选项结果
        private checkedBtn:any = []; // 储存选择按钮选项
        private isIndeterminate:any = false;
        private checkAll:any = false;
        private data:any = []; // 权限树壮数组
        private area:any = []; // 区域数据
        private checkArea:any = []; // 选中的
        private checkAllArea:any = false; // 区域是否全选
        private ruleForm:any = {
            roleCode: '',
            roleName: '',
        };

        private defaultProps:any = {
            children: 'children',
            label: 'title',
        };

        private created() {
            getTree({}).then((res:any) => {
                this.nodeKey = nodeKey(res);
                this.treeNode = res;
            });
            getInitMenu({}).then((res:any) => {
                this.data = res;
                // console.log(menuNode(res));
                // this.menuKey = menuNode(res);
                // this.menuNode = res;
            });
            getArea({}).then((res:any) => {
                // console.log(res);
                this.area = res;
            });
        }
        /**
         * 区域全选
         */
        private handleCheckAllArea(val:any) {
            if(val) {
                    this.area.forEach((items:any) => {
                    this.checkArea.push(items.id);
                });
            }
            // console.log(this.area)
            this.checkArea = val ? this.checkArea : [];
            this.isIndeterminate = false;
        }
        /**
         * 选择区域
         */
        private handleCheckArea(val:any) {
            const count = val.length;
            this.checkAllArea = count === this.area.length;
            this.isIndeterminate = count > 0 && count < this.area.length;
        }
        private handleCheckAll(val:any, menuId:any,index:any) {
            // if(val) {
            //     this.checkedMenu.push(menuId);
            //     console.log(this.checkedMenu);
            //     if (this.data[index].buttonMenus) {
            //     // 遍历当前项的内层节点
            //     this.data[index].buttonMenus.forEach((el:any) => {
            //     // 得到选项结果 是否有内层节点
            //     const hasId = !!this.checkedMenu.find((item:any) => item === el.buttonId);
            //     console.log(hasId);
            //     if (val && !hasId) { // 选中且选项结果没有当前项
            //         // 添加该项
            //         this.checkedMenu.push(el.buttonId);
            //     } else if (!val && hasId) { // 反选且选项结果有当前项
            //     // 删除对应项
            //             this.checkedMenu.splice(this.checkedMenu.findIndex((item:any) => item === el.buttonId), 1);
            //             }
            //         });
            //     }
            // }
        }
        /**
         * 菜单配置选择
         */
        private handleCheckMenu(val:any,buttonId:any,index:any,i:any) {
            if (this.data[index].buttonMenus) {
                this.data[index].buttonMenus.forEach((el:any) => {
                    const hasId = !!this.checkedBtn.find((item:any) => item === el.buttonId);
                    if (val && !hasId) {
                        this.checkedBtn.push(el.buttonId);
                    } else if (!val && hasId) {
                        this.checkedBtn.splice(this.checkedBtn.findIndex((item:any) => item === el.buttonId), 1);
                    }
                });
            }
        }
        /**
         * 编辑角色人员分配
         */
        private editRole() {
            this.visible = true;
        }
        /**
         * 关闭弹层
         */
        private closeModal() {
            this.visible = false;
        }
        private cancel() {
            this.$router.push(`${RouterMap.权限管理.path}`);
        }
        /**
         * 提交
         */
        private handleSubmit() {
            Message.success('添加成功');
            this.visible = false;
            const param = {
                persons: this.selectedMemeberList.map((item:any) => ({userName: item.id})),
            };
            // updateRolePerson(param).then((res:any) => {
            //     console.log(param);
            //     Message.success('修改成功');
            //     this.visible = false;
            //     this.roleId = '';
            //     this.selectedMemeberList = [];
            // });
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
        private save(form:any) {
            const params = {
                roleCode:this.ruleForm.roleCode,
                roleName: this.ruleForm.roleName,
                areaDataAuthList: this.checkArea,
                staffAuthList: this.selectedMemeberList.map((item:any) => (item.id)),
                menuAuthList:this.checkedMenu,
                buttonList:this.checkedBtn,
            };
            (this.$refs[form] as any).validate((valid:any) => {
                if (valid) {
                    addAuthority(params).then((res: any) => {
                        Message.success('新增成功');
                        this.$router.push(`${RouterMap.权限管理.path}`);
                    });
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "scss/theme.scss";
    .gym-page-authority{
        &-form{
            &-item{
                &-title{
                    font-weight: bold;
                    padding: 10px 0 10px 0;
                    span{
                        color: #e06287;
                        cursor: pointer;
                        font-size: 1px;
                    }
                }
                &-content{
                    // padding: 20px 0 0 20px;
                    .el-form{
                        display: flex;
                        width: 100%;
                        &-item{
                            display: flex;
                            width: 50%;
                        }
                    }
                    .el-checkbox{
                        margin-left: 20px;
                    }
                    .el-checkbox{
                        padding: 5px 0;
                    }
                    &-group{
                        padding-left: 20px;
                    }
                    .el-checkbox__inner{
                        border: 1px solid #e06287;
                    }
                    .el-button{
                        color: #e06287;
                        border: 1px solid #e06287;
                    }
                    &-role{
                        margin-top: 20px;
                    }
                }
                &-operate{
                    text-align: center;
                    margin-top: 20px;
                    .el-button{
                        color: #e06287;
                        border: 1px solid #e06287;
                        .save-btn{
                            background: #e06287;
                            color: #FFF;
                        }
                    }
                }
            }
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
