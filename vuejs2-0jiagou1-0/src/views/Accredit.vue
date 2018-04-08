<template>
        <div class="main">
                <div class="header">
                        <img src="../assets/logo.png" alt="" />
                        <span>商圈管理后台</span>
                </div>
                <div class="loginbody" :style="loginbody">
                        <div class="login-main">
                                <div class="ad">
                                        <span>你好,我是一句广告语</span><br/>
                                        <span>你好,我是上面那句广告语的说明解释</span>
                                </div>
                                <form id="myform" name="myform" method="post" onsubmit="return sumbitTest();" action="RegisterAction.action">
                                        <div class="login-box">
                                                <div class="login-form">
                                                   <span class="title margin_b_15">登陆成功</span><br/>
                                                   <span class="color_fff">请使用支付宝手机版</span><br>
                                                   <span class="color_fff">扫描二维码,进行授权登录</span>
                                                   <div class="pop-imges">
                                                      <img id="img_keleyi_com" :src="img_url" alt="">
                                                   </div>
                                                </div>
                                        </div>
                                </form>
                        </div>

                </div>

                <div class="buttom_ad" :style="buttom_ad"></div>
                <div></div>
        </div>
</template>
<script>
    import { queryAccredit } from '../api/api';

    export default {
        data(){
            return{
                img_url:'',
                loginbody:{
			  background: "url("+require("../assets/login_bg.jpg")+")",
			  backgroundRepeat:'no-repeat',
			  backgroundPosition:"center center"
		  },
		  buttom_ad:{
			  background: "url("+require("../assets/images/bottom_img.png")+")",
			  backgroundRepeat:'no-repeat',
		  },
            }
        },
        mounted:function () {
            let imgUrl = sessionStorage.getItem("key");
            this.img_url=imgUrl;
            var that=this;
            var timer = setInterval(function(){
                queryAccredit().then(res=>{
                    if(res.status == true){
                        that.$router.push({ path: '/memberCardManage' });
                        clearInterval(timer);
                    }else{
                    }
                })
            },1000)

        },
        methods:{

        }

    }
</script>
<style lang="scss">
        .color_fff{
                letter-spacing:2px;
                font-size: 14px;
                font-weight: 200;
                color: #fff;
        }
        .margin_b_15{
                margin-bottom: 15px;
        }
        .pop-foot {
                width: 100%;
                height: 20%;
                outline: 1px solid green;
                display: flex;
                justify-content: center;
                align-items: center;
        }

        .login-box {
                margin-top: 82px;
                margin-right: 98px;
                float: right;
                width: 290px;
                height: 344px;
                background-color: rgba(0, 0, 0, 0.5);
        }

        .login-form {
                width: 220px;
                margin: 0 auto;
                text-align: center;
        }

        .title {
                letter-spacing:3px;
                display: inline-block;
                margin-top: 40px;
                font-size: 20px;
                color: #FFFFFF;
                font-weight: 400;
        }

        .login-form div:nth-child(1) {
                font-size: 0;
                height: 40px;
        }

        .login-form div:nth-child(1) span {
                color: white;
                font-size: 20px;
                line-height: 40px;
                display: inline-block;
                width: 40px;
                height: 40px;
                background-color: #DDDDDD;
                float: left;
        }

        .login-form div input {
                padding: 0 0 0 10px;
                font-size: 14px;
                outline: none;
                float: left;
                height: 40px;
                width: 170px;
                border: none;
                margin: 0;
        }

        .login-form .user {
                margin-top: 24px;
        }

        .login-form .password {
                margin-top: 10px;
        }

        .query_password {
                float: right;
                font-size: 14px;
                color: #FFFFFF;
                display: inline-block;
                margin-top: 8px;
        }

        .login-form .ui-button {
                width: 220px;
                height: 40px;
                border: none;
                border-radius: 4px;
                padding: 0;
                background-color: #00a0e9;
                font-size: 16px;
                font-weight: 600;
                color: #ffffff;
                margin-top: 20px;
        }

        .ui-button:hover {
                text-decoration: none;
                outline: none;
        }

        .register {
                color: #00A0E9;
        }

        .check_password {
                margin-top: 46px;
                margin-right: 98px;
                float: right;
                width: 342px;
                height: 402px;
                background-color: rgba(0, 0, 0, 0.5);
        }

        .passworddes {
                display: none;
                height: 20px !important;
        }

        .passworddes p {
                text-align: left;
                margin-top: 8px;
                font-size: 14px;
                color: red;
                display: inline-block;
                width: 200px;
        }

        .pop-title span {
                display: block;
                font-size: 14px;
                color: #fff;
        }

        .pop-title span:nth-child(1) {
                margin-top: 20px;
        }

        .pop-title span:nth-child(2) {
                margin-top: 2px;
        }

        .pop-imges {
                width: 100%;
                /*outline: 1px solid red;*/
                margin-top: 20px;
        }

        .pop-imges img {
                width: 160px;
                height: 160px;
        }
</style>