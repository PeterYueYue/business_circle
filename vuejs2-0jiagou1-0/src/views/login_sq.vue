<template>
    <div class="main">
        <div class="header" @click="skip">
            <img src="../assets/logo.png" alt=""/>
            <span>商圈管理后台</span>
        </div>
        <div class="loginbody" :style="loginbody">
            <div class="login-main">
                <div class="ad">
                    <span></span><br/>
                    <span></span>
                </div>
                <div class="login-box">
                    <div class="login-form">
                        <span class="sq_title">登录商圈后台</span><br/>
                        <div class="user">
									<span>
										<svg class="icon" aria-hidden="true">
										    <use xlink:href="#icon-ren"></use>
										</svg>
									</span>
                            <input maxlength="11" v-model="form.mobile" type="text" placeholder="请输入手机号码"/>
                        </div>
                        <div class="password">
									<span>
										<svg class="icon" aria-hidden="true">
										    <use xlink:href="#icon-mima"></use>
										</svg>
									</span>
                            <input type="password" v-model="form.password" @keyup.enter="clickKey" name="password" placeholder="请输入密码"
                                   id="password" value=""/>
                        </div>
                        <div class="pop-error">
                            <p>{{message}}</p>
                        </div>
                        <input class="ui-button" @click="handleSubmit2"  type="submit" name="" id="" value="登    录"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttom_ad" :style="buttom_ad"></div>

        <div></div>
    </div>


</template>

<script>
    import {requestLogin,getLoginStatus} from '../api/api';
    export default {
        data() {
            return {
                loginbody: {
                    background: "url(" + require("../assets/login_bg.jpg") + ")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: "center center"
                },
                buttom_ad: {
                    background: "url(" + require("../assets/images/bottom_img.png") + ")",
                    backgroundRepeat: 'no-repeat',
                },
                dialogVisible: true,
                form: {

                },
                message: ''
            }
        },
        mounted: function () {

            getLoginStatus().then(res=>{


                if(res == true){
                    this.$router.push({path: '/memberCardManage'});
                }
            })
        },
        methods: {
            clickKey:function () {
                this.handleSubmit2();
            },
            skip: function () {
                window.location.href = "http://b.tingzhijun.com/"
            },
            handleSubmit2() {
                let loginParams = this.qs.stringify(this.form);
                requestLogin(loginParams).then(res => {
                    if (res.errorCode == 10000) {
                        //成功
                        let user = res.content;
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.$router.push({path: '/memberCardManage'});
                    } else if (res.errorCode == 30002) {
                        //账户名或者密码错误!
                        this.message = res.message;
                    } else if (res.errorCode == 20000) {
                        //参数错误
                    } else if (res.errorCode == 20001) {
                        //授权错误!
                    } else if (res.errorCode == 30003) {
                        //您的账号已被禁用
                        this.message = res.message;
                    } else if (res.errorCode == 30003) {
                        //您的账号已被锁定
                        this.message = res.message;
                    } else if (res.errorCode == 30006) {
                        //授权过期
                        this.message = res.message;
                        let user = '0';
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.$router.push({path: '/Accredit'});
                        let imgContent = 'http://139.196.177.162:8080';
                        let url = res.content;
                        let img_url = imgContent + url;
                        sessionStorage.setItem("key", img_url);
                    }
                });

            }
        }
    }

</script>

<style>
    .buttom_ad {
        width: 1200px;
        height: 167px;
        margin: 20px auto;
    }

    .login-box {
        margin-top: 102px;
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

    .sq_title {
        letter-spacing: 2px;
        display: inline-block;
        margin-top: 50px;
        font-size: 20px;
        color: #FFFFFF;
        font-weight: 400;
    }

    .login-form div {
        font-size: 0;
        height: 40px;
    }

    .login-form div span {
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
        margin-top: 30px;
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
        margin-top: 10px;
        cursor: pointer;
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

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .loginbody {
        /*background: url(../assets/login_bg.png) no-repeat center center;*/
        width: 100%;
        height: 600px;
        overflow: hidden;
        /*position: absolute;*/
    }

    .main {
        width: 100%;
        margin: 0px auto;
    }

    .main .header {
        margin: 0 auto;
        width: 1200px;
        height: 66px;
        display: flex;
        align-items: center;
    }

    .main .header img {
        margin-left: 60px;
        width: 138px;
        height: 36px;
    }

    .main .header span {
        font-size: 20px;
        color: #333333;
        margin-left: 16px;
    }

    .main .loginbody .login-main {
        width: 1200px;
        margin: 0 auto;
    }

    .main .loginbody .login-main .ad {
        float: left;
        margin-top: 200px;
        margin-left: 116px;
    }

    .ad span:first-child {
        font-size: 48px;
        color: #FFFFFF;
        font-weight: 400;
        display: inline-block;
        margin-bottom: 10px;
    }

    .ad span:last-child {
        font-size: 24px;

        color: #FFFFFF;
    }

    .pop-error {
        /*outline:1px solid red;*/
        height: 30px !important;
    }

    .pop-error > p {
        font-size: 12px !important;
        color: red;
        height: 30px;
        line-height: 30px;
    }


</style>