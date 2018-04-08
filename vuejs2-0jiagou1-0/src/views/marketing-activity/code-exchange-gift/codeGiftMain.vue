<template>
    <div class="zj-main zj-content">
        <div class="zj-header">
            <span @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">礼品库管理</span>
            <span @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">会员兑换记录</span>
            <span @click="styleClick(3)" :class="{styleTabs : styleTab == 3}"> 礼品核销 </span>
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
                if (router == '/presentLibrary') {
                    this.styleTab = 1;
                } else if (router == '/exchangeGiftRecord') {
                    this.styleTab = 2;
                } else if (router == '/exchangeGifePage') {
                    this.styleTab = 3;
                }
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/presentLibrary'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/exchangeGiftRecord'
                    })
                } else if (data == 3) {
                    this.$router.push({
                        path: '/exchangeGifePage'
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
    
    .zj-content {
        position: relative;
        overflow-y: hidden;
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
    }
</style>