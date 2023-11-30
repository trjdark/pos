/**
 * desc: basic接口
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/6
 * Time: 下午3:08
 */
enum BasicApi {
    登录 = '/mate-pos/home/login',
    获取所有中心列表 = '/mate-pos/home/common/getCenterList',
    // todo...
    获取角色中心列表 = '/mate-pos/home/warning/findCenterByuserid',
    获取公司列表 = '/mate-pos/home/common/getCompanyList',
    初始化菜单= '/mate-pos/menu/all',
}

export {BasicApi};
