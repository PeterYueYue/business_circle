<template>
    <div class="zj-mains">
        <div class="zj-header">
            <span @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">转盘活动设置</span>
            <span @click="styleClick(3)" :class="{styleTabs : styleTab == 3}">活动记录</span>
            <span @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">奖项核销</span>
        </div>
        <p class="zj-routerview">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                styleTab: 1
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
                if (router == '/cancel') {
                    this.styleTab = 1;
                } else if (router == '/setting' ) {
                    this.styleTab = 2;
                } else if (router == '/record' || router == '/content' || router == '/detail' ) {
                    this.styleTab = 3;
                }
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/cancel'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/setting'
                    })
                } else if (data == 3) {
                    this.$router.push({
                        path: '/record'
                    })
                }
                this.styleTab = data;
            }
        }
    }
</script>
<style scoped>
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