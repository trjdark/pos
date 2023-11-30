/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2020/1/8
 * Time: 下午2:44
 */
import moment from 'moment';

class TableFilter {
  public static dateFormat(date: number) {
    return date ? moment(date).format('YYYY-MM-DD') : null;
  }
  /**
   * 数字格式化 保留两位
   * @param {number} num
   */
  public static toThousands(num: any): any {
    if (num > 0) {
      const _num = (Number.parseFloat(num) || 0).toFixed(2).toString();
      let integter = _num.slice(0, _num.indexOf('.'));
      const float = _num.slice(_num.indexOf('.') + 1);
      let result: string = '';
      while (integter.length > 3) {
        result = ',' + integter.slice(-3) + result;
        integter = integter.slice(0, integter.length - 3);
      }
      if (integter) {
        result = `${integter + result}.${float}`;
      }
      return result;
    } else {
      const _num = (Number.parseFloat(Math.abs(num).toString()) || 0)
        .toFixed(2)
        .toString();
      let integter = _num.slice(0, _num.indexOf('.'));
      const float = _num.slice(_num.indexOf('.') + 1);
      let result: string = '';
      while (integter.length > 3) {
        result = ',' + integter.slice(-3) + result;
        integter = integter.slice(0, integter.length - 3);
      }
      if (integter) {
        result = `${-+integter + result}.${float}`;
      }
      return result;
    }
  }

  /**
   * 审核状态
   * @param {number} status
   * @returns {string}
   */
  public static approveStatus(status: number) {
    return status === 1 ? '已审核' : '未审核';
  }
  /**
   * 照片状态
   * @param {number} status
   * @returns {string}
   */
  public static photoStatus(status: number) {
    return status === 1 ? '上架' : '下架';
  }
  /**
   * 会员状态
   * @param {number} status
   * @returns {string}
   */
  public static memberFlag(status: number) {
    return status === 1 ? '会员' : '非会员';
  }

  /**
   * 商城订货渠道
   */
  public static companyType(type: string) {
    const map = new Map([
      ['3000', '金宝贝商城'],
      ['2050', '西格玛商城'],
      ['default', '未知'],
    ]);
    return map.get(type) ? map.get(type) : map.get('default');
  }
}

export {TableFilter};
