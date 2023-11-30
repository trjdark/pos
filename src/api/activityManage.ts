/**
 * desc: 活动管理页 接口
 * User: Vicky
 * Date: 2020/6/4
 * Time: 上午10:20
 */
enum activityManageApi {
    活动列表查= '/mate-pos/campaign/user/list',
    活动详情 = '/mate-pos/campaign/user/info/',
    参赛活动中心列表 = '/mate-pos/campaign/user/center_city/list',
    照片上下架 = '/mate-pos/campaign/user/shelf/edit',
    上传照片 = '/files/file/upload',
    照片审核 = '/mate-pos/campaign/user/approve',
    更新照片 = '/mate-pos/campaign/user//photo/reupload',

}

export {activityManageApi};
