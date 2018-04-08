<template>
    <div class="zj-main">
        <div class="zj-header">
            <span @click="styleClick(4)" :class="{styleTabs : styleTab == 4}">积分促销活动</span>
            <span @click="styleClick(3)" :class="{styleTabs : styleTab == 3}">积分抵现活动</span>
            <span @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">代金券活动</span>
            <span @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">单品券活动</span>
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
        watch:{
			"$route":"routerChange"
		},
        mounted: function() {
            this.routerChange();
        },
        methods: {
            routerChange(){
                let router = this.$route.path;
                if (router == '/voucherList') {
                    this.styleTab = 1;
                } else if (router == '/stampsList') {
                    this.styleTab = 2;
                } else if (router == '/integralList') {
                    this.styleTab = 3;
                } else if (router == '/rewardPromotion') {
                    this.styleTab = 4;
                }
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/voucherList'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/stampsList'
                    })
                } else if (data == 3) {
                    this.$router.push({
                        path: '/integralList'
                    })
                } else if (data == 4) {
                    this.$router.push({
                        path: '/rewardPromotion'
                    })
                }
                this.styleTab = data;
            }
        }
    }
</script>
<style scoped>
    .zj-main {
        display: block !important;
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