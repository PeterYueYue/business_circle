<template>
    <div class="zj-mains">
        <div class="zj-head">
            <span></span>
            <span>奖项核销</span>
            <span>核销链接:</span>
            <span>{{url}}</span>
            <!--<span>复制</span>-->
        </div>
        <div class="zj-sure">
            <span>请输入奖项兑换码</span>
            <el-input class="width_90" size="small" @keyup.enter.native="sureCancel" type="number" placeholder="请输入兑换码" v-model="data"></el-input>
            <el-button class="bottom_button" size="small" type="primary" @click="sureCancel">
                确定
            </el-button>
        </div>
        <div class="zj-hr">
            <span></span>
        </div>
        <div class="zj-body">
            <span>
                <span></span>
                <span>手气真好,您获得的奖项是:</span>
            </span>
            <br>
            <span>
                {{message}}
            </span>
            <br>
            <el-button class="zj-button" size="small" type="primary" @click="surExchange" >
                确认兑换
            </el-button>
        </div>
    </div>
</template>
<script>
    import {exchange,sureExchange,nuclear} from '../../../api/api'

    export default {
        data() {
            return {
                url:'',
                data: '',
                message:'',
                id:''
            }
        },
        mounted:function () {
            //核销接口返回
                this.clearted()
        },
        methods: {
            clearted:function () {
                nuclear()
                    .then(res=>{
                        this.url=res.content.exchangeLinks;
                    })
            },
            sureCancel: function () {
                let datas=this.qs.stringify({
                    rewardCode:this.data
                });
                exchange(datas)
                    .then(res=>{
                        if(res.errorCode == 70002){
                            this.$message({
                                message: res.message,
                                type: 'warning'
                            });
                        }else if(res.errorCode == 10000){
                            this.message=res.content.rewardName;
                            this.id=res.content.rewardId;
                        }

                    });

            },
            surExchange:function () {
                let data=this.qs.stringify({
                    rewardId:this.id
                });
                sureExchange(data)
                    .then(res=>{
                        if(res.errorCode==10000){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                        }else if(res.errorCode == 70003){
                            this.$message.error(res.message);
                        }
                    })
            }
        }
    }
</script>
<style scoped>
    .zj-body {
        wdith: 100%;
        text-align: center;
    }

    .zj-body > span {
        height: 90px;
        /*outline:1px solid red;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .zj-body span:nth-of-type(1) {
        margin-top: 80px;
    }

    .zj-body span:nth-of-type(1) span:nth-of-type(1) {
        display: inline-block;
        /*outline:1px solid green;*/
        width: 80px;
        height: 80px;
        background: url("../../../assets/images/cup.png") 0 0 no-repeat;
        background-size: contain;
        margin-top: 10px;
    }

    .zj-body span:nth-of-type(1) span:nth-of-type(2) {
        display: inline-block;
        height: 100%;
        line-height: 100px;
        /*background-color: orange;*/
        margin-left: 10px;
        font-size: 28px;
        color: #333;
    }

    .zj-body span:nth-of-type(2) {
        font-size: 24px;
        color: #20a0ff;
    }

    .zj-button {
        width: 300px;
        color: #20a0ff;
        background-color: #fff !important;
        height: 50px;
        border: 1px solid #20a0ff;
    }

    .zj-main {
        outline: 1px solid red;
    }

    .zj-head {
        /*width: 1000px;*/
        display: flex;
        margin-top: 40px;

    }

    .zj-head span {
        display: inline-block;
        line-height: 30px;
    }

    .zj-head span:nth-of-type(1) {
        display: inline-block;
        width: 10px;
        height: 30px;
        background-color: #20a0ff;
        margin-left: 50px;
    }

    .zj-head span:nth-of-type(2) {
        margin-left: 8px;
        font-size: 18px;
        font-size: 14px;
        font-weight: 600;
    }

    .zj-head span:nth-of-type(3),
    .zj-head span:nth-of-type(4) {
        margin-left: 100px;
        font-size: 14px;
    }

    .zj-head span:nth-of-type(5) {
        margin-left: 10px;
        color: #20a0ff;
    }

    .zj-head span:nth-of-type(5):hover {
        cursor: pointer;
    }

    .zj-sure {
        display: flex;
        margin-top: 50px;
        height: 30px;
        line-height: 30px;
    }

    .zj-sure span:nth-last-of-type(1) {
        margin-left: 100px;
        font-size: 14px;
    }

    .width_90 {
        width: 200px !important;
        margin-left: 15px;
    }

    .bottom_button {
        margin-left: 50px;
    }

    .zj-hr {
        width: 100%;
        /*outline:1px solid red;*/
        margin-top: 50px;
        text-align: center;
    }

    .zj-hr span {
        display: inline-block;
        width: 90%;
        height: 1px;
        background-color: #ddd;
    }
</style>