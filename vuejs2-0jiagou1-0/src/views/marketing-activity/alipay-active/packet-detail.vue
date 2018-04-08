<!--红包领取数/总个数查看详情-->
<template>
    <div class="mains">
        <!-- <div class="zj-mainss" v-if="message"> -->
        <div class="zj-mainss">
            <div class="zj-title">
                <span></span>
                <span>红包设置</span>
                <span v-if="message.cashType == 0">(消费返还)</span>
                <span v-if="message.cashType == 1">(指定单品)</span>
                <span v-if="message.cashType == 2">(新会员)</span>
                <span v-if="message.cashType == 3">(消费集点送)</span>
                <span v-if="message.cashType == 4">(新客奖励)</span>
                <span v-if="message.cashType == 4">(回归礼)</span>
            </div>
            <div class="zj-content">
                <span>红包活动名称:</span>
                <span>{{message.couponName}}</span>
            </div>
            <div class="zj-content">
                <span>红包活动预算:</span>
                <span>{{message.totalMoney}}元</span>
            </div>
            <div class="zj-content">
                <span>红包发放数量:</span>
                <span>{{message.totalNum}}个</span>
            </div>
            <div class="zj-shape">
                <span>红包发放形式:</span>
                <!-- <el-radio class="radio" v-model="form.radio" label="1" v-if="form.radio == 1">随机金额</el-radio> -->
                <span style="font-size:14px" v-if="form.radio == 1">随机金额</span>
                <p v-if="form.radio == 1" style="margin-left: 100px;">每个用户领取的红包金额为活动预算金额除以红包发送数量得到的平均金额值得0.5-1.5倍</p>
                <!-- <p> -->
                <span style="font-size:14px;" v-if="form.radio == 2">固定金额</span>
                <!-- </p> -->
                <p style="margin-left:110px;" v-if="form.radio == 2">红包面额总金额/总数量;每个用户领取的红包金额为活动预算金额除以红包发放数量得到的固定金额
                </p>
            </div>
            <div class="zj-content zj-contents">
                <span>红包发放时间:</span>
                <span>{{message.startTime}}-{{message.endTime}}</span>
            </div>
            <div class="zj-content">
                <span>适用门店:</span>
                <span>已选{{number}}家门店</span>&#x3000;
                <span class="zj-blue" @click="dialogVisible_shopslist = true">点击查看</span>
            </div>
            <el-dialog
                title="适用门店列表"
                v-model="dialogVisible_shopslist"
                size="tiny"
                top="20%">
                <p v-for="item in message.shopInfoList">{{item.name}}</p>
                <span slot="footer" class="dialog-footer">

                      <!-- <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button> -->
                    <!-- <el-button @click="dialogVisible_shopslist = false">取 消</el-button> -->
                  </span>
            </el-dialog>
            <div class=" zj-text">
                <span>活动说明:</span>
                <span>{{message.prizeMsg}}</span>
            </div>
            <div class="zj-title">
                <span></span>
                <span>红包领取限制</span>
            </div>

            <!--指定单品-->
            <div class="zj-content" v-if="type == 1">
                <span>指定单品:</span>
                <span>已选{{message.goodsList.length}}商品</span>&#x3000;
                <span class="zj-blue" @click="dialogVisible_shopslist1 = true">点击查看</span>
            </div>
            <el-dialog
                title="适用商品列表"
                v-model="dialogVisible_shopslist1"
                size="tiny"
                top="20%">
                <!--<p v-for="item in message.goodsList">{{item.name}}</p>-->
                <div class="goodsList">
                    <p>
                        <span>商品序号</span>
                        <span>商品名称</span>
                        <span>商品分类</span>
                        <span>商品价格</span>
                    </p>
                    <p v-for="(item,index) in message.goodsList">
                        <span>{{index}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.categoryName}}</span>
                        <span>{{item.price }}</span>
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">

                      <!-- <el-button type="primary" @click="dialogVisible_shopslist1 = false">确 定</el-button> -->
                    <!-- <el-button @click="dialogVisible_shopslist1 = false">取 消</el-button> -->
                  </span>
            </el-dialog>
            <div class="zj-content" v-if="type == 1">
                <span>红包领取次数:</span>
                <span>{{message.pickLimitNum}}次</span>
            </div>

            <!--回归礼-->
            <div class="zj-content" v-if="type == 5">
                <span>发放条件:</span>
                <span>距离活动开始前{{message.unPayDay}}天数内,未使用支付宝消费的门店可参与</span>
            </div>
            <span v-if="type == 5" style="margin-left: 640px;font-size: 12px">消费满{{message.sendLeast}}元,发放红包</span>

            <!--消费集点送-->
            <div class="zj-content" v-if="type== 3">
                <span>发放条件:</span>
                <span>消费满{{message.getPointMoney}}元,集一次点</span>
            </div>
            <div class="zj-content" v-if="type== 3">
                <span>集点次数:</span>
                <span>满足{{message.pointNum}}元,现金红包</span>
            </div>
            <div class="zj-content" v-if="type== 3 || type == 0">
                <span>红包领取次数:</span>
                <span>{{message.pickLimitTotalNum}}次</span>
            </div>
            <!--新会员-->
            <!--新客奖励-->
            <div class="zj-content" v-if="type == 4 || type == 0">
                <span>发放条件:</span>
                <span>消费满{{message.sendLeast}}元,发放红包</span>
            </div>
            <span style="margin-left: 640px;font-size: 12px"
                  v-if="type== 3">每人{{date}}领取{{message.pickLimitNum}}次</span>


            <div class="zj-content">
                <span>领取规则:</span>
                <span v-if="message.isPickLimit==0">不限制</span>
                <span v-if="message.isPickLimit==1">限制</span>
            </div>
            <div class="zj-content" v-if="message.isPickLimit==1">
                <span></span>
                <span>{{message.pickWeekLimit}}</span>
            </div>
            <span style="margin-left: 640px;font-size: 12px"
                  v-if="message.isPickLimit==1">{{message.pickTimeLimit}}</span>
            <span class="zj-foot">
        <button @click="submit">返回</button>
      </span>
        </div>
    </div>
</template>
<script>
    // import { ipAddress } from '../../../service'

    import {alipyDetail} from '../../../api/api';

    export default {
        data() {
            return {
                dialogVisible_shopslist: false,
                dialogVisible_shopslist1: false,
                date: '',
                message: '',
                type: '',
                number: '',
                id: '',
                form: {
                    radio: ''
                }
            }
        },
        mounted: function () {
            let message = this.qs.stringify({
                id: this.id
            });
            this.queryList(message)
        },
        methods: {
            queryList: function (data) {
                // this.$http.post(`${ipAddress}/front/ali_cash_activity!getAliCashActivityById.action`, data)
                alipyDetail(data)
                    .then(res => {
                        if (res.errorCode == 10000) {
                            this.message = res.content;
                            if (res.content.prizeType == 'random') {
                                this.form.radio = '1';
                            } else {
                                this.form.radio = '2';
                            }
                            this.number = res.content.shopInfoList.length;
//              活动类型
                            if (res.content.cashType == 0) {
//                消费返还
                                this.type = 0
                            } else if (res.content.cashType == 1) {
//                指定单品
                                this.type = 1
                            } else if (res.content.cashType == 2) {
//                新会员
                                this.type = 2
                            } else if (res.content.cashType == 3) {
//                消费集点送
                                this.type = 3
                            } else if (res.content.cashType == 4) {
//                新客奖励
                                this.type = 4
                            } else if (res.content.cashType == 5) {
//                回归礼
                                this.type = 5
                            }
                            if (res.content.pickLimitType == "D") {
                                this.date = '日'
                            } else if (res.content.pickLimitType == "W") {
                                this.date = '周'
                            } else if (res.content.pickLimitType == "M") {
                                this.date = '月'
                            }
                        } else if (res.errorCode == 30005) {
                            this.$router.push('/login')
                        }
                    })
            },
            submit: function () {
                this.$router.go(-1);
            }
        },
        created: function () {
            let curRouter = this.$router.currentRoute;
            // this.$store.commit("dealData", {
            //     path: curRouter.path,
            //     name: curRouter.meta.name
            // });
            this.id = this.$route.query.id;
        }
    }

</script>
<style scoped>
    .main {
        overflow-x: hidden;
    }

    .goodsList {
        width: 100%;
        /*outline:1px solid red;*/
        background-color: #fff;
    }

    .goodsList p {
        display: flex;
    }

    .goodsList p span {
        display: inline-block;
        text-align: center;
        width: 25%;
        line-height: 30px;
        height: 30px;
    }

    .zj-foot {
        margin-left: 650px;
    }

    .zj-foot button {
        margin-top: 20px;
        width: 72px;
        height: 28px;
        background-color: #00a0e9;
        color: #ffffff;
        border-radius: 5px;
    }

    .zj-blue {
        color: #00a0e9;
    }

    .zj-money {
        line-height: 30px;
        font-size: 12px;
        margin-top: 5px;
        margin-left: 130px;
    }

    .zj-shape p:nth-of-type(1) {
        font-size: 12px;
        margin-left: 128px;
        margin-top: 8px;
    }

    .zj-shape p:nth-of-type(2) {
        font-size: 12px;
        margin-left: 106px;
        margin-top: 8px;
    }

    .zj-shape {
        margin-left: 535px;
        margin-top: 18px;
    }

    .zj-shape span:nth-child(1) {
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 38px;
        text-align: right;
        font-size: 12px;
    }

    .zj-mainss {
        width: 100%;
        margin-left: -80px;
        margin-bottom: 50px;
        /* outline: 1px solid red; */
    }

    .zj-title {
        width: 800px;
        display: flex;
        /*justify-content:center;*/
        align-items: center;
        margin-top: 40px;
        margin-left: 480px;
    }

    .zj-title span:nth-of-type(1) {
        display: inline-block;
        width: 10px;
        height: 20px;
        background-color: #00a0e9;
        margin-right: 5px;
    }

    .zj-title span {
        color: #333;
        font-size: 14px;
    }

    .zj-content {
        display: flex;
        margin-left: 535px;
        margin-top: 10px;
    }

    .zj-content span {
        display: inline-block;
        height: 32px;
        line-height: 38px;
        text-align: center;
        font-size: 12px;
    }

    .zj-content span:nth-child(1) {
        width: 100px;
        text-align: right;
    }

    .zj-content span:nth-child(2) {
        margin-left: 4px;
    }

    .zj-text {
        display: flex;
        margin-left: 535px;
        margin-top: 10px;
    }

    .zj-text span:nth-child(1) {
        display: inline-block;
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 38px;
        font-size: 12px;
    }

    .zj-text span:nth-child(2) {
        width: 300px;
        margin-top: 10px;
        margin-left: 5px;
        font-size: 12px;
        /*outline: 1px solid red;*/
    }

    .zj-contents span:nth-child(2) {
        width: 150px;
        text-align: left;
    }

</style>
