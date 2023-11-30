/**
 * desc: 角色权限列表
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 上午10:21
 */
enum AuthorityApi {
    角色列表 = '/mate-pos/home/authority/getRoleList',
    树列表 = '/mate-pos/home/authority/memberTree',
    设置角色人员 = '/mate-pos/home/setRolePerson',
    权限配置树 = '/mate-pos/home/authority/memberTree',
    获取启用区域 = '/mate-pos/home/authority/areaList',
    新增权限 = '/mate-pos/home/authority/add',
    编辑权限角色 = '/mate-pos/home/authority/edit',
    权限详情 = '/mate-pos/home/authority/info',
}

export {AuthorityApi};

