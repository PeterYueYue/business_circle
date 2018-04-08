import axios from 'axios';




// only run one 

// npm run build 需要修改

//测试环境部署打包
// let base = 'http://139.196.177.162:80';
// let base = 'http://192.168.1.179:8080';

//正式服务器环境部署打包
// let base = 'http://b.tingzhijun.com';

//本地运行
let base = '';











//登录接口
export const requestLogin = params => {
    return axios.post(`${base}/business/business_circle!login.action`, params).then(res => res.data);
};
//会员列表
export const menberList = params => {
    return axios.post(`${base}/business/business_circle!businessMemberList.action`, params).then(res => res.data);
};
//获取授权情况
export const queryAccredit = () => {
    return axios.get(`${base}/business/business_circle!verifyAuthStatus.action`).then(res => res.data);
};
//获取门店列表
export const getShopLists = params => {
    return axios.post(`${base}/business/business_shop_info!list.action`, params).then(res => res.data);
};
//获取会员积分设置
export const getMemberPoints = () => {
    return axios.get(`${base}/business/business_conver_rate!getRateByCircle.action`).then(res => res.data);
};
//会员积分设置保存
export const saveMember = params => {
    return axios.post(`${base}/business/business_conver_rate!saveRateByCircle.action`, params).then(res => res.data);
};
//积分抵现提交
export const integralNow = params => {
    return axios.post(`${base}/business/business_circle_point!saveCirclePoint.action`, params).then(res => res.data);
};
//活动列表
export const getTicketList = params => {
    return axios.post(`${base}/business/business_circle_point!getCirclePointList.action`, params).then(res => res.data);
};
//查看流水
export const getActiveWater = params => {
    return axios.post(`${base}/business/business_circle_point!getActivityWater.action`, params).then(res => res.data);
};
//积分活动查看详情
export const getActiveDetail = params => {
    return axios.post(`${base}/business/business_circle_point!getActivityDetails.action`, params).then(res => res.data);
};
//获取商户登录状态
export const getLoginStatus = () => {
    return axios.post(`${base}/business/business_circle!ajaxBusinessVerify.action`).then(res => res.data)
};
//获取门店中文名称
export const getChineseName = params => {
    return axios.post(`${base}/business/business_shop_info!getShopList.action`, params).then(res => res.data);
};
//门店查分类
export const getShopClassify = params => {
    return axios.post(`${base}/business/business_shop_info!getCategoryList.action`, params).then(res => res.data)
};
//分类查商品
export const getShopDetail = params => {
    return axios.post(`${base}/business/business_shop_info!goodsList.action`, params).then(res => res.data)
};
//保存单品券信息
export const saveAloneMesssage = params => {
    return axios.post(`${base}/business/business_inner_voucher!saveInnerVoucher.action`, params).then(res => res.data)
};
//获取代金券列表
export const getGoldList = params => {
    return axios.post(`${base}/business/business_inner_voucher!getAllVoucherList.action`, params).then(res => res.data)
};
//单品券列表
export const getProductList = params => {
    return axios.post(`${base}/business/business_inner_voucher!voucherList.action`, params).then(res => res.data)
};
//单品券详情
export const getProductDetail = params => {
    return axios.post(`${base}/business/business_inner_voucher!getVoucherDetail.action`, params).then(res => res.data)
};
//单品券下架
export const productSoldOut = params => {
    return axios.post(`${base}/business/business_inner_voucher!offlineActive.action`, params).then(res => res.data)
};
//代金券创建
export const saveProduct = params => {
    return axios.post(`${base}/business/business_inner_voucher!saveInnerVoucher.action`, params).then(res => res.data)
};
//积分促销创建
export const pointBased = params => {
    return axios.post(`${base}/business/business_point_promotion!savePointPromotion.action`, params).then(res => res.data)
};
//积分促销列表
export const getPointList = params => {
    return axios.post(`${base}/business/business_point_promotion!pointPromotionList.action`, params).then(res => res.data)
};
//积分促销详情
export const getPointPromotion = params => {
    return axios.post(`${base}/business/business_point_promotion!getPointPromotionById.action`, params).then(res => res.data)
};
//积分促销下架
export const pointSoldOut = params => {
    return axios.post(`${base}/business/business_point_promotion!offline.action`, params).then(res => res.data)
};
//创建活动
export const makeActive = params => {
    return axios.post(`${base}/business/reward!saveTurntableReward.action`, params).then(res => res.data);
};
//进入页面请求数据
export const getActive = params => {
    return axios.post(`${base}/business/reward!showTurntable.action`, params).then(res => res.data);
};
//兑换
export const exchange = params => {
    return axios.post(`${base}/business/reward!exchange.action`, params).then(res => res.data);
};
//确认兑换
export const sureExchange = params => {
    return axios.post(`${base}/business/reward!certaintExchange.action`, params).then(res => res.data);
};
//下架按钮
export const underpants = params => {
    return axios.post(`${base}/business/reward!afterActivity.action`, params).then(res => res.data);
};
//核销接口
export const nuclear = () => {
    return axios.post(`${base}/business/reward!afterAward.action`).then(res => res.data);
};
//支付宝红包创建接口
export const getAlipy = params => {
    return axios.post(`${base}/business/ali_cash_activity!saveAliCashActivity.action`, params).then(res => res.data);
};
//支付宝红包列表
export const getAlipyList = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashActivityPager.action`, params).then(res => res.data)
};
//支付宝下架
export const alipyEnd = params => {
    return axios.post(`${base}/business/ali_cash_activity!changeActivityStatus.action`, params).then(res => res.data)
};
//支付宝红包列表详情
export const alipyPointList = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashLogPager.action`, params).then(res => res.data)
};
//支付宝活动详情
export const alipyDetail = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashActivityById.action`, params).then(res => res.data)
};
// ----------------------------分割线-----------------------------------------------------
//获取商户列表
export const getShopList = params => {
    return axios.post(`${base}/business/business_shop_info!list.action`, params).then(res => res.data);
};
//获取最新商户数据
export const getNewShopList = () => {
    return axios.post(`${base}/business/business_shop_info!refreshShopInfo.action`).then(res => res.data);
};
//改变商户每人日积分获得上限
export const changeCode = params => {
    return axios.post(`${base}/business/business_shop_info!updateIntegral.action`, params).then(res => res.data);
};
//获取商圈账单汇总列表
export const getbillList = params => {
    return axios.post(`${base}/business/payment!billSummary.action`, params).then(res => res.data);
};
//获取商圈下活动流水
export const getactiveList = params => {
    return axios.post(`${base}/business/payment!activity.action`, params).then(res => res.data);
};
//获取商圈会员卡模板
export const getmembercade = () => {
    return axios.post(`${base}/business/business_card_template!getCardTemplateByCircle.action`).then(res => res.data);
};
export const sentmembercard = params => {
    return axios.post(`${base}/business/business_card_template!saveCardTemplateByCircle.action`, params).then(res => res.data);
};
//活动列表活动下架
export const downactive = params => {
    return axios.post(`${base}/business/business_circle_point!unableCirclePoint.action`, params).then(res => res.data);
};
//查看流水
export const getWater = params => {
    return axios.post(`${base}/business/business_inner_voucher!selectCircleVoucherDetails.action`, params).then(res => res.data);
};
export const getWaterd = params => {
    return axios.post(`${base}/business/business_inner_voucher!selectVoucherDetails.action`, params).then(res => res.data);
};
//大转盘活动记录列表
export const getActivityList = params => {
    return axios.post(`${base}/business/reward!getActivityList.action`, params).then(res => res.data);
}
//通过抽奖活动获取奖项信息
export const getRewardByActivity = params => {
    return axios.post(`${base}/business/reward!getRewardByActivity.action`, params).then(res => res.data);
}
//查看抽奖活动中奖会员信息
export const getRewardLog = params => {
    return axios.post(`${base}/business/reward!getRewardLog.action`, params).then(res => res.data);
}
//提交招商工具集参数创建活动
export const createVoucher = params => {
    return axios.post(`${base}/business/investment!createVoucher.action`, params).then(res => res.data);
}
//获取口碑招商工具集活动列表
export const getInvestmentPager = params => {
    return axios.post(`${base}/business/investment!getInvestmentPager.action`, params).then(res => res.data);
}
//口碑招商工具集活动下架
export const activeoffline = params => {
    return axios.post(`${base}/business/investment!offline.action`, params).then(res => res.data);
}
//口碑招商工具集活动查看详情
export const getVoucher = params => {
    return axios.post(`${base}/business/investment!getVoucher.action`, params).then(res => res.data);
}
//口碑招商工具集活动列表获取子表列表
export const getSonVoucher = params => {
    return axios.post(`${base}/business/investment!getSonVoucher.action`, params).then(res => res.data);
}
//单品券活动详情根据店铺查看不同商品
export const getGoodsByShop = params => {
    return axios.post(`${base}/business/business_inner_voucher!getGoodsByShop.action`, params).then(res => res.data);
}
//查询礼品兑换记录列表
export const GiftListLog = params =>{
    return axios.post(`${base}/business/gift/listLog.jhtml`, params).then(res => res.data);
}
//根据兑换码显示礼品
export const GiftShowByCode = params =>{
    return axios.post(`${base}/business/gift/showGiftByCode.jhtml`, params).then(res => res.data);
}
//领取礼品
export const receiveGift = params =>{
    return axios.post(`${base}/business/gift/receiveGift.jhtml`, params).then(res => res.data);
}
//新增、编辑礼品
export const savaGift = params =>{
    return axios.post(`${base}/business/gift/savaGift.jhtml`, params).then(res => res.data);
}
//礼品库列表
export const giftLibrary = params =>{
    return axios.post(`${base}/business/gift/giftLibrary.jhtml`, params).then(res => res.data);
}
//查看商品详情
export const selectGift = params =>{
    return axios.post(`${base}/business/gift/selectGift.jhtml`, params).then(res => res.data);
}
//删除商品 
export const deleteGift = params =>{
    return axios.post(`${base}/business/gift/deleteGift.jhtml`, params).then(res => res.data);
}
//上下架商品  
export const afterGift = params =>{
    return axios.post(`${base}/business/gift/afterGift.jhtml`, params).then(res => res.data);
}
//批量上下架商品  
export const afterGifts = params =>{
    return axios.post(`${base}/business/gift/afterGifts.jhtml`, params).then(res => res.data);
}
//获取完整的号码
export const gettruephone = params =>{
    return axios.post(`${base}/business/business_circle!members.action`, params).then(res => res.data);
}
//获取商圈行业积分比例
export const getRateByCircle = params =>{
    return axios.post(`${base}/business/business_circle!members.action`, params).then(res => res.data);
}