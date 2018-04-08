import Login from './views/Login.vue';
import NotFound from './views/404.vue';
import Home from './views/Home.vue';
//授权页面
import Accredit from './views/Accredit.vue';
// 商圈登录页
import Loginsq from './views/login_sq.vue';

/*会员营销*/
//会员卡管理
import MemberCardManage from './views/member-marketing/membercard-manage/MemberCardManage.vue';
//会员列表
import MemberList from './views/member-marketing/member-list/MemberList.vue';

/*商圈用户管理*/
//商户列表
import BusinessList from './views/business-user-manage/business-list/BusinessList.vue';
//邀请记录
import InviteRecord from './views/business-user-manage/invite-record/InviteRecord.vue';

/*营销活动*/
//支付宝红包
import Redpacket from './views/marketing-activity/alipay-active/alipay-list';
//口碑招商活动
import Addbusiness from './views/marketing-activity/publicpraise-activity/addbusiness.vue';
import Activitytype from './views/marketing-activity/publicpraise-activity/activitytype.vue';
import Listactivity from './views/marketing-activity/publicpraise-activity/listactivity.vue';
import Consume from './views/marketing-activity/publicpraise-activity/consume.vue';
import Consumedetail from './views/marketing-activity/publicpraise-activity/consumedetail.vue';
import Scancode from './views/marketing-activity/publicpraise-activity/scancode.vue';
import Scancodedetail from './views/marketing-activity/publicpraise-activity/scancodedetail.vue';
//积分换礼
import codeGiftMain from './views/marketing-activity/code-exchange-gift/codeGiftMain.vue';
import exchangeGifePage from './views/marketing-activity/code-exchange-gift/exchangeGifePage.vue';
import exchangeGiftRecord from './views/marketing-activity/code-exchange-gift/exchangeGiftRecord.vue';
import presentLibrary from './views/marketing-activity/code-exchange-gift/presentLibrary.vue';
//积分大转盘
import TurntableSetting from './views/marketing-activity/turntable/turntableSetting';
import Setting from './views/marketing-activity/turntable/setting.vue';
import Record from './views/marketing-activity/turntable/record.vue';
import Cancel from './views/marketing-activity/turntable/cancel.vue';
import RecordContent from './views/marketing-activity/turntable/recordContent.vue';
import RecordDetail from './views/marketing-activity/turntable/recordDetail.vue';
//活动创建
import MakeActivity from './views/marketing-activity/creating-activities/activityList.vue';
import IntegralFornow from './views/marketing-activity/creating-activities/IntegralFornow.vue';
import IntegralPromotion from './views/marketing-activity/creating-activities/IntegralPromotion.vue';
import AloneStamps from './views/marketing-activity/creating-activities/AloneStamps.vue';
import ChitCreation from './views/marketing-activity/creating-activities/ChitCreation.vue';
//活动列表
import Active from './views/marketing-activity/activity-list/activeList.vue';
import RewardPromotion from './views/marketing-activity/activity-list/reward-promotion.vue';
import VoucherList from './views/marketing-activity/activity-list/voucherList.vue';
import StampsList from './views/marketing-activity/activity-list/stampsList.vue';
import IntegralList from './views/marketing-activity/activity-list/integralList.vue';
import Viewdetails from './views/marketing-activity/activity-list/viewdetails.vue';
import Activefiguredetails from './views/marketing-activity/activity-list/activefiguredetails.vue';
import BonusPoints from './views/marketing-activity/activity-list/bonusPoints.vue';

/*商圈账单*/
//活动流水
import ActivityWater from './views/business-list/activity-water/ActivityWater.vue';
//账单汇总
import CheckCollect from './views/business-list/check-collect/CheckCollect.vue';

let routes = [{
    path: '/',
    name: 'login',
    component: Loginsq,
    hidden: true
},
    {
        path: '/login',
        component: Loginsq,
        name: '',
        hidden: true
    },
    {
        path: '/accredit',
        component: Accredit,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '会员营销',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            {path: '/memberCardManage', component: MemberCardManage, name: '会员卡管理'},
            {path: '/memberList', component: MemberList, name: '会员列表'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商圈用户管理',
        iconCls: 'el-icon-setting',
        children: [
            {path: '/businessList', component: BusinessList, name: '商户列表'},
            // { path: '/inviteRecord', component: InviteRecord, name: '邀请记录' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '营销活动',
        iconCls: 'el-icon-date',
        children: [{
            path: '/active',
            component: MakeActivity,
            name: '活动创建',
            redirect: '/integralPromotion',
            children: [
                {path: '/integralPromotion', component: IntegralPromotion, name: '创建积分促销活动'},
                {path: '/integralFornow', component: IntegralFornow, name: '创建积分抵现活动'},
                {path: '/alonestamps', component: AloneStamps, name: '创建单品券'},
                {path: '/chitCreation', component: ChitCreation, name: '创建代金券'},
            ]
        }, {
            path:'/redPacket',
            component:Redpacket,
            name:'红包活动',
            redirect:'/packettype',
            children:[
                {path:'/packettype',name:'红包活动类型',component:function(resolve){require(['./views/marketing-activity/alipay-active/packet-type.vue'],resolve)}},
                {path:'/packettypelist',name:'红包活动列表',component:function (resolve) {require(['./views/marketing-activity/alipay-active/packet-activelist.vue'],resolve)}}
            ]
        },{
            path:'/payreturn',name:'创建活动',component:function (resolve) {require(['./views/marketing-activity/alipay-active/make-packet.vue'],resolve)}
        }, {
            path:'/packetnumberdetail',name:'红包详情',component:function (reslove) {require(['./views/marketing-activity/alipay-active/packet-detail.vue'],reslove)}
        },{
            path:'/pointgive',name:'详情列表',component:function (reslove) {require(['./views/marketing-activity/alipay-active/pointList.vue'],reslove)}
        },
            {
                path: '/activityList',
                component: Active,
                name: '活动列表',
                redirect: '/rewardPromotion',
                children: [
                    {path: '/voucherList', component: VoucherList, name: '代金券活动'},
                    {path: '/rewardPromotion', component: RewardPromotion, name: '积分促销活动'},
                    {path: '/stampsList', component: StampsList, name: '单品券活动'},
                    {path: '/integralList', component: IntegralList, name: '积分抵现活动'},
                ]
            },
            {
                path: '/codeGiftMain',
                component: codeGiftMain,
                name: '积分换礼',
                redirect: '/presentLibrary',
                children: [
                    {path: "/presentLibrary", component: presentLibrary, name: '礼品库管理'},
                    {path: "/exchangeGiftRecord", component: exchangeGiftRecord, name: "会员兑换记录"},
                    {path: "/exchangeGifePage", component: exchangeGifePage, name: '礼品核销'},
                ]
            },
            {
                path: '/turntableSetting',
                component: TurntableSetting,
                name: '积分大转盘',
                redirect: '/setting',
                children: [
                    {path: "/setting", component: Setting, name: '转盘活动设置'},
                    {path: "/record", component: Record, name: "活动记录"},
                    {path: "/cancel", component: Cancel, name: '奖项核销'},
                    {path: "/content", component: RecordContent, name: '活动记录 '},
                    {path: "/detail", component: RecordDetail, name: ' 活动记录'},
                ]
            },
            {
                path: '/addbusiness',
                component: Addbusiness,
                name: '口碑招商活动',
                redirect: '/activitytype',
                children: [
                    {path: "/activitytype", component: Activitytype, name: '活动类型'},
                    {path: "/listactivity", component: Listactivity, name: "活动列表 "},

                ]
            },
            {path: '/viewdetails', component: Viewdetails, name: '代金券/单品券详情'}, 
            {path: '/activefiguredetails', component: Activefiguredetails, name: '积分抵现详情'}, 
            {path: '/bonusPoints', component: BonusPoints, name: '积分促销详情'}, 
            {path: '/consume', component: Consume, name: '消费送券'},
            {path: '/consumedetail', component: Consumedetail, name: '查看详情'},
            {path: '/scancode', component: Scancode, name: '扫码送券'},
            {path: '/scancodedetail', component: Scancodedetail, name: '查看详情 '},


        ]
    },
    {
        path: '/',
        component: Home,
        name: '商圈账单',
        iconCls: 'el-icon-document',
        children: [
            {path: '/activityWater', component: ActivityWater, name: '活动流水'},
            {path: '/checkCollect', component: CheckCollect, name: '账单汇总'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;