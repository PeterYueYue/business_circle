<!--积分抵现的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.isMarketable == 0"></div>
            <div class="pop-busarea-title">
                <div class="pop-busarea-top">
                    <p class="pop-p">
                        <span>活动创建时间:</span>
                        <span>{{message.create_date}}</span>
                    </p>
                    <div class="pop-div">
                        <div class="pop-avatar pop-avatars">
                            <span></span>
                        </div>
                        <div class="pop-word pop-m-word" v-if="message.point_promotion_type != 'TIMES' ">
                            <span class="pop-two-span">满</span><span
                                class="zj-black"> {{message.extendpoint}} </span><span
                                class="pop-two-span">赠送额外积分</span>
                        </div>
                        <div class="pop-word pop-m-word" v-if="message.point_promotion_type == 'TIMES' ">
                            <span class="zj-black"> {{message.times}} </span><span class="pop-two-span">倍积分促销</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-busarea-main">
                <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 :&nbsp;</span><span>{{message.title}}</span></p>
                  <p><span>促销日期 :&nbsp;</span><span>{{message.start_date}} 至 {{message.end_date}}</span></p>
                    <!--<p><span>适用门店 : </span><span>{{message.dayIntegral}}</span></p>-->
                    <!--<p><span>活动限制:</span><span>{{message.four}}</span></p>-->
                  <p><span>适用门店 :&nbsp;</span><span>{{message.shop_num}} 家门店</span></p>
                  <p><span>活动隶属商圈 :&nbsp;</span><span>{{message.circle_name}}</span></p>
                  <p><span>操作 :&nbsp;</span>
                      <!--<span class="pop-blue"  @click="clickTo">查看详情</span>-->
                      <router-link tag="span" class="pop-blue"
                                   :to="{path:'bonusPoints',query:{id:message.pointPromotionID,isMarketable:message.isMarketable}}">
                          点击设置
                      </router-link>
                  </p>
                </div>
              </span>
                    <span>
              </span>
                </div>
                <div class="pop-busarea-bottom" v-show="!preview">
                    <span>
                <button @click="preview = !preview">返回</button>
              </span>
                </div>
            </div>
            <div class="pop-busarea-mains">
            </div>
        </div>
    </div>

</template>
<script>
    import {getWaterd} from '../../../api/api'

    export default {
        props: ["message"],
        data() {
            return {
                sum: '',
                preview: true,
            }
        },
        methods: {
            waterTo: function (data) {
                let message = this.qs.stringify({
                    active_id: data
                });
                this.preview = !this.preview;
                getWaterd(message).then(res => {
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.sum = res.content;
                    }

                })
            }
        }
    }
</script>
<style>
    .pop-first-span {
        font-size: 26px;
        color: #cc0000;
    }

    .pop-two-span {
        font-size: 16px !important;
        color: #cc0000;
    }

    .zj-black {
        font-size: 20px !important;
        color: #cc0000 !important;
    }

    .pop-t {
        margin-left: 20px;
        margin-top: -8px;
    }

    .pop-avatars > span {
        background: url("../../../../src/assets/images/integral.png") 50% 50% no-repeat;
        background-size: contain;
    }

    .pop-m-word {
        display: inline-block;
        /*outline:1px solid red;*/
        /*margin-top: 15px;*/
    }

    .pop-download span {
        font-size: 12px !important;
        color: #05a4e6 !important;
    }

    .pop-download span:nth-child(1) {
        margin-left: 30px;
    }

    .pop-download span:nth-child(2) {
        margin-left: 20px;
    }

    .pop-download span:hover, .pop-blue:hover {
        cursor: pointer;
    }

    .pop-blue {
        color: #05a4e6;
    }
</style>
