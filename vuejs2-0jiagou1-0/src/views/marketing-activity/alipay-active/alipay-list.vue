<template>
    <div class="zj-mains">
        <div class="zj-header">
            <span @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">红包活动类型</span>
            <span @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">红包活动列表</span>
            <div style="height:100%;float: right;line-height: 60px;font-size: 14px;margin-right: 10px"
                 @click="dialogVisible = true">帮助</div>
            <div style="float: right;" class="zj-avatar" @click="dialogVisible = true"></div>
        </div>
        <p class="zj-routerview">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </p>
        <el-dialog title="帮助" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" class="zj-dialog">
            <!--<span>这是一段信息</span>-->
            <p style="font-size: 12px;">1.创建支付宝活动,商家需要先签约支付宝"营销活动送红包"产品</p>
            <p style="font-size: 12px;">2.签约地址:
                <span style="color: deepskyblue;">https://b.alipay.com</span>
            </p>
            <p style="font-size: 14px;margin-top: 5px;">支付宝红包提示:</p>
            <div class="list">
                <span class="number">1</span>
                <span style="font-size:12px;">登录支付宝商家中心</span>
                <span class="rate"></span>
                <span class="number">2</span>
                <span style="font-size:12px;">进入产品中心</span>
                <span class="rate"></span>
                <span class="number">3</span>
                <span style="font-size:12px;">选择营销活动送红包</span>
            </div>
            <!--<span slot="footer" class="dialog-footer"></span>-->
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                styleTab: 2
            }
        },
        mounted: function() {
            this.routerChange();
            
        },
        watch:{
			"$route":"routerChange"
		},
        methods: {
            routerChange(){
                let router = this.$route.path;
                if (router == '/packettypelist') {
                    this.styleTab = 1;
                } else if (router == '/packettype' ) {
                    this.styleTab = 2;
                }
            },
            handleClose(done) {
                done();
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/packettypelist'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/packettype'
                    })
                }
                this.styleTab = data;
            }
        }
    }
</script>
<style scoped>
    .rate {
        display: inline-block;
        width: 30px;
        height: 8px;
        margin: 0 4px;
        margin-top: 4px;
        background: url("../../../assets/images/toLeft.png") no-repeat;
        background-size: 100% 100%;
    }
    .number {
        margin: 2px 2px;
        display: inline-block;
        width: 15px;
        text-align: center;
        line-height: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #00a0e9;
        color: #fff;
    }
    .zj-avatar{
        width: 15px;
        height: 15px;
        background: url(../../../assets/images/help.png) no-repeat;
        margin-top: 23px;
        margin-right: 5px;
    }
    .zj-mains {
        display: block !important;
        /* min-width: 100px; */
        background-color: #fff;
        /* outline: 1px solid red; */
    }


    .zj-header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #f4f4f4;
    }

    .zj-header>span {
        display: inline-block;
        width: 130px;
        height: 57px;
        line-height: 57px;
        text-align: center;
        color: #555;
        font-weight: 600;
        box-sizing: content-box;
        font-size: 14px;
        /*margin-bottom: 2px;*/
    }

    .zj-header>span:hover {
        cursor: pointer;
        border-bottom: 3px solid #20a0ff;
        color: #20a0ff;
    }

    .styleTabs {
        border-bottom: 3px solid #20a0ff;
        color: #20a0ff !important;
    }

    .zj-routerview {
        display: block;
        width: 100%;
        /*outline: 1px solid red;*/
        /*margin-top: 10px;*/
    }
</style>