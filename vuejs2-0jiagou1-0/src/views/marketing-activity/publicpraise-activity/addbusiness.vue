<!--口碑招商活动-->
<template>
    <div class="zj-main">
        <div class="zj-header">
            <span @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">活动类型</span>
            <span @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">活动列表</span>
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
                if (router == '/activitytype') {
                    this.styleTab = 1;
                } else if (router == '/listactivity') {
                    this.styleTab = 2;
                }
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/activitytype'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/listactivity'
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
       color: #20a0ff !important;;
    }
    
    .zj-routerview {
        display: block;
        width: 100%;
        /*outline: 1px solid red;*/
        /*margin-top: 10px;*/
    }
</style>