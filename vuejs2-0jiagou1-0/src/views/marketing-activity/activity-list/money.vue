<!--积分抵现的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.offlineStatus == 1"></div>
            <div class="pop-busarea-title">
                <div class="pop-busarea-top">
                    <p class="pop-p">
                        <span>活动创建时间:</span>
                        <span>{{message.startDate}}</span>
                    </p>
                    <div class="pop-div">
                        <div class="pop-avatar pop-avatars">
                            <span></span>
                        </div>
                        <div class="pop-word pop-m-word">
                            <span>{{message.cost}}</span><span>积分抵</span><span
                                class="pop-first-span">{{message.gain}}</span><span class="pop-two-span">元</span>
                            <!--<p class="pop-download"><span>二维码</span><span>下载</span></p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-busarea-main">
                <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 :&nbsp;</span><span>{{message.activityName}}</span></p>
                  <p><span>活动有效期 :&nbsp;</span><span>{{message.startDate}} 至 {{message.endDate}}</span></p>
                  <p><span>积分池上限 :&nbsp;</span><span>{{message.dayIntegral}}</span></p>
                    <!--<p><span>活动限制:</span><span>{{message.four}}</span></p>-->
                  <p><span>适用门店 :&nbsp;</span><span>{{message.shopNum}} 家门店</span></p>
                  <p><span>活动隶属商圈 :&nbsp;</span><span>{{message.circleName}}</span></p>
                  <p><span>操作 :&nbsp;</span>
                      <!--<span class="pop-blue"  @click="clickTo">查看详情</span>-->
                      <router-link tag="span" class="pop-blue"
                                   :to="{path:'activefiguredetails',query:{id:message.activityId,offlineStatus:message.offlineStatus}}">
                          点击设置
                      </router-link>
                  </p>
                </div>
              </span>
                    <span>
                <button @click="waterTo(message.activityId)">查看流水</button>
              </span>
                </div>
                <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p>
                         <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-yichengjiao"></use>
                         </svg>
                         成交笔数 : <span>{{sum.receiveNum}}</span>
                     </p>
                     <p>
                          <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jifen"></use>
                          </svg>
                         积分消耗总计 : <span>{{sum.afterNum}}</span>
                     </p>
                     <p>
                         <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jine1"></use>
                         </svg>
                         抵扣金额总计 :<span>{{sum.voucherDiscount}} 元</span>
                     </p>
                 </div>
              </span>
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
                let message=this.qs.stringify({
                    active_id:data
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
        color: #f4333c;
    }

    .pop-two-span {
        font-size: 16px;
        color: #f4333c;
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
