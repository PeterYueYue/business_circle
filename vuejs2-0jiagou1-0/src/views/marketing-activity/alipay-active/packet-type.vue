<!--红包活动类型-->
<template>
    <!--<div class="busarea_active_main">-->
    <!--红包活动类型&#X3000;-->
    <!--<router-link to="payreturn">消费返还</router-link>&#X3000;-->
    <!--<router-link to="nodenumber">消费集点送</router-link>&#X3000;-->
    <!--<router-link to="newclient">新客奖励</router-link>&#X3000;-->
    <!--<router-link to="newvip">新会员</router-link>&#X3000;-->
    <!--<router-link to="returnback">回归礼</router-link>&#X3000;-->
    <!--<router-link to="pointgive">指定单品送</router-link>&#X3000;-->
    <!--</div>-->
    <div class="zj-mains">
        <div class="zj-top">
            <div class="zj-avatar"></div>
            <h4 class="zj-title">营销活动送红包产品介绍</h4>
            <p>营销活动送红包是为支付宝签约商户提供的一种营销工具。</p>
            <p>商户可以根据自己的营销需求创建现金红包活动，送现金等丰富多彩的玩法。<span>活动有效时间最长为6个月，过期后需要创建新的活动.</span></p>
            <p>商户不但可以控制活动预算，还可以控制用户领取次数，领取频率等，让活动设计更贴合商户需求。</p>
            <p>用户领取现金红包后，资金将直接进支付宝余额，并在app首页的红包应用中，查看到出资商户的品牌信息。若红包没有被领取完，资金将会在红包失效时（有效时间由商户创建现金红包时指定）退回到商户的支付宝账户中。</p>
        </div>
        <br>
        <p class="zj-active">
            <span class="zj-active-first">支付宝红包现金活动创建流程:</span>
            <span class="zj-active-number">1</span>
            <span>选择红包类型</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">2</span>
            <span>创建活动</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">3</span>
            <span>支付宝款项</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">4</span>
            <span>活动发布</span>
        </p>
        <div class="zj-blocks">
            <router-link tag="span" :class="{selected:select == 1}" @click="selectClick(1)"
                         :to="{path:'payreturn',query:{id:1} }">
                <div></div>
                <p>消费返还</p>
                <p>商家创建支付宝红包活动,消费者在指定日期内使用支付宝付款并达到活动指定单笔消费金额,则发放现金红包.
                    用户领取红包,商家可设置每人每日/每周/每月/每次活动领取次数.
                    红包领取途径支持商券通pos或者码上付产品.
                </p>
            </router-link>
            <router-link tag="span" :class="{selected:select == 2}" @click="selectClick(2)" :to="{
                path:'payreturn',query:{id:2} }">
                <p>消费集点送</p>
                <p>商家创建支付宝红包活动,消费者在指定日期内使用支付宝付款并达到活动指定单笔消费金额,集点一次.满足集点次数的用户发放红包奖励
                    用户领取红包,商家可设置每人每日/每周/每月/每次活动领取次数.
                    红包领取途径支持商券通pos或者码上付产品.
                </p>
            </router-link>
            <router-link tag="span" :class="{selected:select == 3}" @click="selectClick(3)" :to="{
                path:'payreturn',query:{id:3} }">
                <p>新客奖励</p>
                <p>商家创建支付宝红包活动,新用户在指定日期内使用支付宝付款并达到指定单笔消费金额,则发放现金红包.
                    新用户定义 : 在活动门店未使用过支付宝支付的用户(交易流水未记录过的用户,限支付宝付款).
                    红包领取途径支持商券通pos或者码上付产品.
                </p>
            </router-link>
            <router-link tag="span" :class="{selected:select == 4}" @click="selectClick(4)" :to="{
                path:'payreturn',query:{id:4} }">
                <p>新会员</p>
                <p>商家创建支付宝红包活动,新用户在指定日期内支付宝领取并绑定商户会员卡,则发放现金红包.
                    新会员定义 : 领取绑定活动门店支付宝电子会员卡用户
                </p>
            </router-link>
            <router-link tag="span" :class="{selected:select == 5}" @click="selectClick(5)" :to="{
                path:'payreturn',query:{id:5} }">
                <p>回归礼</p>
                <p>商家创建红包活动,指定时间内, 未使用支付宝消费的门店会员可参与.
                    符合条件的会员在门店单笔消费满足指定金额,则发放红包奖励.
                    红包领取途径支持商券通pos或者码上付产品.
                </p>
            </router-link>
            <router-link tag="span" :class="{selected:select == 6}" @click="selectClick(6)" :to="{
                path:'payreturn',query:{id:6} }">
                <p>指定单品送</p>
                <p>商家创建支付宝红包活动,消费者在指定日期内使用支付宝付款并购买指定单品,则发放现金红包.
                    用户领取红包,商家可设置每人每日/每周/每月/每次活动领取次数.
                    红包领取途径支持商券通pos或者码上付产品.
                </p>
            </router-link>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                select: 0
            }
        },
        mounted: function () {
        },
        methods: {
            selectClick: function (id) {
                if (id == 1) {
                    this.select = 1;
                } else if (id == 2) {
                    this.select = 2
                } else if (id == 3) {
                    this.select = 3
                } else if (id == 4) {
                    this.select = 4
                } else if (id == 5) {
                    this.select = 5
                } else if (id == 6) {
                    this.select = 6
                }

            }
        },
        // created: function () {
        //     var curRouter = this.$router.currentRoute;
        //     this.$store.commit("dealData", {
        //         path: curRouter.path,
        //         name: curRouter.meta.name
        //     });
        // }
    }
</script>
<style scoped>
    .zj-mains{
        overflow-y: auto;
        width: 100%;
        height: 100%;
    }
    .zj-blocks span:hover{
        background-color: #00a0e8 !important;
        color: #fff !important;
        cursor: pointer;
    }
    .selected {
        background-color: #00a0e8 !important;
        color: #fff !important;
    }

    .zj-blocks {
        /*width: 1500px;*/
        margin: 25px 0px 150px;
        display: flex;
        flex-wrap: wrap;
    }

    .zj-blocks span {
        display: inline-block;
        position: relative;
        width: 240px;
        height: 283px !important;
        text-align: center;
        height: 283px;
        margin: 10px 15px;
        background-color: #f5f5f5;
        border-radius: 6px;
    }

    .zj-blocks span div {
        position: absolute;
        top: 0;
        width: 70px;
        height: 70px;
        background: url("../../../assets/images/hot.png") no-repeat;
        background-size: contain;
    }

    .zj-blocks span p:nth-of-type(1) {
        margin-top: 36px;
        font-size: 16px;
    }

    .zj-blocks span p:nth-of-type(2) {
        padding: 0 21px;
        text-align: left;
        line-height: 24px;
        margin-top: 22px;
        font-size: 12px;
    }

    .zj-active-direction {
        display: inline-block;
        /*background-color: red;*/
        background-image: url("../../../assets/images/toLeft.png");
        width: 25px;
        height: 10px;
        margin: 0 8px;
    }

    .zj-active-number {
        display: inline-block;
        text-align: center;
        font-size: 12px;
        margin: 0px 4px;
        color: #fff;
        width: 16px;
        height: 16px;
        background-color: #00a0e9;
        border-radius: 50%;
    }

    .zj-active {
        font-size: 14px;
        padding-left: 15px;
    }

    .zj-top {
        display: block;
        width: 98%;
        height: 155px;
        margin-top: 20px;
        margin-left: 10px;
        /*margin: 20px 20px;*/
        background-color: rgb(245, 245, 245);
        border-radius: 6px;
    }

    .zj-avatar {
        width: 149px;
        height: 39px;
        /*outline: 1px solid green;*/
        float: right;
        background: none;
        /*background-image: url("../../../assets/images/ant.png");*/
        margin: 10px 20px 0 0;
    }

    .zj-title {
        display: inline-block;
        margin: 21px 0 18px 21px;
        width: 157px;
        height: 14px;
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        color: #000000;
        font-weight: 600;
    }

    .zj-top p {
        font-size: 12px;
        line-height: 19px;
        padding-left: 20px;
    }

    .zj-top p span {
        color: #ff0000;
    }
</style>
