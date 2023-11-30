/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/13
 * Time: 上午11:23
 */
enum WarningApi {
    获取关键数据预警设置列表 = '/mate-pos/home/warning/list',
    新增预警设置 = '/mate-pos/home/warning/save',
    删除预警设置 = '/mate-pos/home/warning/delete',
    获取关键数据预警设置信息 = '/mate-pos/home/warning/find',
    更新关键数据预警设置信息 = '/mate-pos/home/warning/update',
    更新预警配置信息 = '/mate-pos/home/warning/center/infos',
}

export {WarningApi};
