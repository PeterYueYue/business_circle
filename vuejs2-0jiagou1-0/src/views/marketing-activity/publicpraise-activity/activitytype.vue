<!--活动类型-->
<template>
    <div class="padding_16">
       <div class="zj-top">
            <h4  class="zj-title">品牌商/商圈使用产品说明</h4>
            <p>品牌商是指如宝洁,联合利华等零售品牌，通过各种渠道进行销售的主体；</p>
            <p>商圈是指经营线下商圈的主体，如银泰，大悦城等；</p>
            <p>品牌商/商圈作为第三方商家类型，可利用营销活动平台能力对关联的商家发起活动邀约，联合数个商家一起进行活动。</p>
            <p>典型使用场景 : </p>
            <p>1 . 商圈使用营销活动管理产品发起消费送券活动邀约，在整个商圈下的每一个门店消费均可以给用户送券，券可以在整个商圈下的任何一个门店使用  </p>
            <p>2 . 商圈内的商家接受招商邀约即可参与到本次活动中</p>
            <p>3 . 用户通过线上/线下各种渠道参加商家营销活动获取商家优惠券</p>
            <p>4 . 拿到优惠后，用户到商圈内参加活动的商家消费使用优惠券，进行消费</p>
       </div>
       <p class="zj-active">
            <span class="zj-active-first">活动创建流程:</span>
            <span class="zj-active-number">1</span>
            <span>选择活动类型</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">2</span>
            <span>填写活动信息</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">3</span>
            <span>将门店确认</span>
            <span class="zj-active-direction"></span>
            <span class="zj-active-number">4</span>
            <span>创建完成</span>
        </p>
        <div class="choose_activetype">
            <div class="item">
                <img src="../../../assets/images/recommend_icon.png" alt="">
                <p>消费送券</p>
                <p>多行业交叉送券,提升联消率</p>
                <img src="../../../assets/images/send_stamps_1.png" alt="">
                <div>
                    <router-link to="consume"><div class="creat_btn">创建活动</div></router-link>
                </div>
            </div>
            <div class="item">
                <img src="../../../assets/images/recommend_icon.png" alt="">
                <p>扫码送券</p>
                <p>扫码送券包,提升线下客流转化</p>
                <img src="../../../assets/images/send_stamps_2.png" alt="">
                <div> 
                     <router-link to="scancode"><div class="creat_btn">创建活动</div></router-link>
                </div>
            </div>
        </div>

       
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        mounted: function() {

        },
        methods: {

        }
    }
</script>
<style scoped>
        .padding_16{
            padding: 16px;
        }
      .zj-top {
            display: block;
            padding: 16px;
            background-color: rgb(245, 245, 245);
            border-radius: 6px;
        }
        .zj-top p {
            font-size: 12px;
            line-height: 20px;
        }
        .zj-title {
            display: inline-block;
            font-size: 14px;
            color: #000000;
            font-weight: 600;
            line-height: 40px;
        }
        .zj-active-direction {
            display: inline-block;
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
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .choose_activetype{
            display: flex;
            flex-wrap: wrap;
        }
        .choose_activetype .item{
            position: relative;
            margin-right: 26px;
            width: 240px;
            height: 280px;
            display: inline-block;
            background-color: rgb(245, 245, 245);
            border-radius: 6px;
            text-align: center;
        }
        .choose_activetype .item p:nth-of-type(1){
            font-weight: 600;
            margin-top: 34px;
        }
        .choose_activetype .item p:nth-of-type(2){
            font-size: 12px;
            margin-top: 16px;
        }
        .choose_activetype .item img:nth-of-type(1){
            position: absolute;
            top: 0;
            left:24px;
        }
        .choose_activetype .item img:nth-of-type(2){
            margin-bottom: 8px;
            margin-top: 8px;
        }
        .creat_btn{
            background-color: #0f86bc;
            width: 100px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            font-size: 12px;
            color: #fff;
            border-radius: 4px;
            letter-spacing: 1px;
            text-align: center;
        }
</style>