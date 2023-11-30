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
                            <el-input v-model="ruleForm.roleCode" maxlength="15" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="roleName"
                            label="角色名称"
                            :rules="{
                                required: true, message: '角色名称不能为空', trigger: 'blur'
                            }"
                        >
                            <el-input v-model="ruleForm.roleName" maxlength="20" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>应用权限</p>
                <div class="gym-page-authority-form-item-content">
                        <el-checkbox-group v-model="checkedMenu"> -->
                            <!-- <div v-for="(item, index) in data" :key="index">  -->
                                <!-- <el-checkbox :label="item.menuId" @change="handleCheckAllold($event, index)">{{item.menuName}}</el-checkbox> -->
                                <!-- <el-checkbox :label="item.menuId" @change="(param) => handleCheckAll(param, item.menuId,index)">{{item.menuName}}</el-checkbox>
                                <el-checkbox v-for="(item, i) in (item.buttonMenus)"  
                                    :label="item.buttonId"  :key="i"
                                    @change="handleCheckMenu($event,index,i)"
                                    v-model="checkedBtn"
                                    >{{item.buttonName}} -->
                                <!-- </el-checkbox> -->
                            <!-- </div> -->
                            
                        <!-- <template v-for="secondItem in item.buttonMenus"> -->
                            <!-- <el-checkbox v-for="secondItem in item.buttonMenus"  
                                :index="secondItem.index" :label="secondItem.buttonId">{{secondItem.buttonName}}
                            </el-checkbox> -->
                        <!-- </el-checkbox-group>  -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </div> -->
            <div class="gym-page-authority-form-item">
                <p class="gym-page-authority-form-item-title"><span>+</span>应用权限</p>
                <div class="gym-page-authority-form-item-content">
                    <template v-for="(item, index) in data"> 
                       <el-row class="menu-list">
                           <el-row>
                            <el-checkbox  v-model="item.checked === 1" @change="param => changeMenu(param, index)" :key="item.menuId">{{item.menuName}}</el-checkbox>
                        </el-row>
                        <el-row>
                             <el-checkbox v-for="(param ,k) in item.buttonMenus" :label="param.buttonId" :key="param.buttonId" v-model="param.checked === 1" @change="param => changeBtn(param, index, k)">{{param.buttonName}}</el-checkbox> 
                        </el-row>
                       </el-row>
                    </template>
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
                            <span>{{item.id}}，</span>
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
                        <span>{{item.id}}</span>
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
    import { getRoleList, getTree, updateRolePerson, getArea, addAuthority, editAuthority, authorityDetail } from '../../actions/authorityActions';
    import { getInitMenu } from '../../actions/basicActions';
    import Modal from '@c/modal/modal.vue';
    import { Message, Tree } from 'element-ui';
    import {RouterMap} from '@/router/routerMap';
    import { CommonUtils } from '../../utils/commonUtils';

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
    /**
     * 格式化菜单栏展开的key
     * @param arr
     * @returns {any[]}
     */
    // const buttonKey = (arr:any) => {
    //     console.log(arr);
    //     let result:any = [];
    //     for(const val of arr) {
    //         if(val.buttonMenus) {
    //             result = [...result, ...buttonKey(val.buttonMenus)];
    //         }
    //         // if(val.buttonName) {
    //         //     result.push(val.buttonId);
    //         // }
    //     }
    //     console.log(result);
    //     return result;
    // };
    @Component({
        components: {
            BreadCrumb,
            Modal,
        },
    })

    export default class AuthorityEdit extends Vue {
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
        private checkAll:any = false;
        private data:any = []; // 权限树壮数组
        private dataChecked = []; // 选中的权限树
        private isIndeterminate:any = false;
        private buttonKey = [];
        private area:any = []; // 区域数据
        private checkArea:any = []; // 选中的
        private checkAllArea:any = false; // 区域是否全选
        private id:any = ''; // 路由id
        private areaList:any = ''; // 返回的区域
        private ruleForm:any = {
            roleCode: '',
            roleName: '',
        };


        private defaultProps:any = {
            children: 'children',
            label: 'title',
        };

        private created() {
            // getInitMenu({}).then((res:any) => {
            //     this.data = res;
            // });
            getTree({}).then((res:any) => {
                this.nodeKey = nodeKey(res);
                this.treeNode = res;
            });
            // getArea({}).then((res:any) => {
            //     this.area = res;
            // });
        }
        private mounted() {
            const {id} = CommonUtils.parse(this.$route);
            this.id = id;
            Promise.all([
                getInitMenu({}),
                getArea({}),
            ]).then((result:any) => {
                const [data, area] = result;
                this.data = data;
                this.area = area;
                authorityDetail({roleId: this.id}).then((res:any) => {
                    let ids:any = [];
                    res.checkedMenuAuthList.map((item:any) => {
                        const { menuId, checked } = item;
                        const key:any = 'buttonMenus';
                        const d = checked === 1 && ids.push(menuId);
                        const a = item[key] && item[key].forEach((param:any) => {
                            const b = param.checked === 1 && ids.push(param.buttonId);
                        });
                    });
                    ids = [...new Set(ids)];
                    this.data.forEach((element:any) => {
                        const { menuId } = element;
                        this.$set(element, 'checked',  ids.includes(menuId) ? 1: 0);
                        const key:any = 'buttonMenus';
                        const c = element[key] && element[key].forEach((k:any) => {
                            this.$set(k, 'checked', ids.includes(k.buttonId) ? 1: 0);
                        });
                    });
                    this.ruleForm.roleCode = res.roleCode;
                    this.ruleForm.roleName = res.description;
                    this.selectedMemeberList = res.memberList;
                    this.checkArea = res.checkedAreaDataAuthList.map((item:any) => item.areaId);
                    const count = res.checkedAreaDataAuthList.length;
                    this.checkAllArea = count === this.area.length;
                    this.isIndeterminate = count > 0 && count < this.area.length;
                    // this.checkedMenu = res.checkedMenuAuthList.map((item:any) => item.menuId);
                    this.checkedBtn = res.checkedMenuAuthList.map((item:any) => {
                        const { menuId, buttonMenus } = item;
                        const btnIds = buttonMenus&&buttonMenus.map((param:any) => param.buttonId);
                        this.checkedMenu.push(menuId);
                        this.checkedMenu.concat(btnIds);
                    });
                    // console.log(this.checkedMenu);
                    // this.dataChecked = res.checkedMenuAuthList;
                    // this.getButtonId();
                    // console.log(this.checkedBtn);
                });
            });
        }
        /**
         * 详情按钮菜单
         */
        private getButtonId() {
            this.dataChecked.forEach((items:any) => {
                // console.log(items.buttonMenus)
                (items.buttonMenus||[]).forEach((el:any) => {
                    this.checkedBtn.push(el.buttonId);

                });
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
        private changeMenu(status:any, key:any) {
           this.$set(this.data[key], 'checked', status ? 1 : 0);
        }
        private changeBtn(status:any, pKey:any, cKey:any) {
            const key:any = 'buttonMenus';
            this.$set(this.data[pKey][key][cKey], 'checked', status ? 1 : 0);
        }
        /**
         * 菜单配置选择
         */
        private handleCheckMenu(val:any,buttonId:any,index:any,i:any) {
            // console.log(buttonId);
            // if (this.data[index].buttonMenus) {
            //     this.data[index].buttonMenus.forEach((el:any) => {
            //         const hasId = !!this.checkedBtn.find((item:any) => item === el.buttonId);
            //         console.log(hasId);
            //         if (val && !hasId) {
            //             this.checkedBtn.push(el.buttonId);
            //         } else if (!val && hasId) {
            //             this.checkedBtn.splice(this.checkedBtn.findIndex((item:any) => item === el.buttonId), 1);
            //         }
            //     });
            // }
            // console.log(this.checkedBtn);
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
            Message.success('设置成功');
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
         * 编辑权限
         */
        private save(form:any) {
            const  btnIds:any =  [];
            this.data.forEach((item:any) => {
                const key:any = 'buttonMenus';
                if (item[key]) {
                    item[key].map((param:any)=> {
                      if (param.checked === 1) {
                        btnIds.push(param.buttonId);
                      }
                   });
                }
            });
            const params = {
                roleId: this.id,
                roleCode:this.ruleForm.roleCode,
                roleName: this.ruleForm.roleName,
                areaDataAuthList: this.checkArea,
                staffAuthList: this.selectedMemeberList.map((item:any) => (item.id)),
                menuAuthList:this.data.filter((item:any) => item.checked !== 0).map((param:any) => param.menuId),
                buttonList: btnIds,
            };
            (this.$refs[form] as any).validate((valid:any) => {
                if (valid) {
                    editAuthority(params).then((res: any) => {
                        Message.success('编辑成功');
                        this.$router.push(`${RouterMap.权限管理.path}`);
                    });
                }
            });
        }
    }
</script>
<style lang="scss">
    @import "scss/theme.scss";
    .menu-list .el-row{
        display: block;
    }
    .menu-list .el-row:nth-child(2){
        padding-bottom: 15px;
        padding-left: 15px;
    }
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
                    // .el-group{
                    //     margin-left: 20px;
                    // }
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
