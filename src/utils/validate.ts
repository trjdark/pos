/**
 * desc: 验证类
 * User: Vicky
 * Date: 2019/2/9
 * Time: 下午15:30
 */


class ValidateRegEx {
    public static 账号=/^[A-Za-z0-9,.;~!@#$%^*()_+\-=/]{6,18}$/;  // 账号长度6-18位
    public static 卡号 = /^[0-9]+$/;
    public static 电话 = /^([0-9]|-)*$/;
    public static 银行账户 = /^([0-9])*$/;
    public static 正浮点数 = /^([1-9]\d*.?|0.)\d*$/;
    public static 正整数 = /^\d+$/;
}

export {ValidateRegEx};
