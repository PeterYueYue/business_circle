<!--积分促销详情-->
<template>
    <div class="juzhong">
        <span class="ticket_title_all margin_b_10">积分促销活动</span>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item class="ticket_title" label="活动名称 :">
                <span>{{form.title}}</span>
            </el-form-item>
            <el-form-item label="促销方式 :">
                <el-radio class="radio" v-model="radio" label="1" v-if="form.pointPromotionType == 'TIMES' ">积分倍率 * {{form.times}}</el-radio>
                <el-radio class="radio" v-model="radio" label="1" v-if="form.pointPromotionType != 'TIMES' ">赠送额外积分</el-radio>
                <p v-if="form.pointPromotionType != 'TIMES' " v-for="data in message.promotList">消费满{{data.minCost}}元,可获得额外百分之{{data.promotPercent}}积分</p>
            </el-form-item>
            <el-form-item label="活动优先级 :">
                <span class="details_des">{{form.sortNum}}</span>
            </el-form-item>
            <el-form-item label="活动时间 :">
                <span>{{form.startDate}}至{{form.endDate}}</span>
            </el-form-item>
            <el-form-item label="促销时间 :">
                <span>{{message.weekCN}}</span>
                <span>{{form.promotionTime}}</span>
            </el-form-item>
            <el-form-item class="code_shop" label="适用门店 :">
                <span>已选 {{message.shopNum}} 家门店&#X3000;</span>
                <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
            </el-form-item>
            <el-dialog
                    title="适用门店列表"
                    v-model="dialogVisible_shopslist"
                    size="tiny"
                    top="20%">
                <p v-for="item in message.shopList">{{item.shopName}}</p>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                  </span>
            </el-dialog>

            <el-form-item label="活动备注 :">
                <span class="details_des">{{form.memo}}</span>
            </el-form-item>

            <el-form-item>
                <el-button class="bottom_button" v-if="isMarketable == '1'" size="small" :disabled="disabled" type="primary" @click="dialogVisible_down = true;">下 架</el-button>
                <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
            </el-form-item>
            <el-dialog
                    title="活动下架"
                    v-model="dialogVisible_down"
                    size="tiny"
                    top="20%">
                <p>是否确认下架?</p>
                <p>活动下架后则结束,不可重新上架!</p>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible_down = false">取 消</el-button>
                      <el-button type="primary" @click="down_active">确 定</el-button>
                  </span>
            </el-dialog>
        </el-form>
    </div>
</template>

<script>
    import {getPointPromotion,pointSoldOut} from '../../../api/api'

    export default {
        data() {
            return {
                isMarketable:'',
                radio:'1',
                disabled:false,
                dialogVisible_down:false,
                activityId: '',
                shops: [],
                dialogVisible_shopslist: false,
                message:'',
                form: {
                    shopnumber:''
                }
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                id: this.activityId
            });
            getPointPromotion(data).then(res => {
                if (res.errorCode == 30005) {
                    this.$router.push({path: '/login'});
                } else {
                    if(res.status == 'error'){
                        this.$message(res.message);
                        this.back();
                    }else{
                        this.form = res.content.pointPromotion;
                        this.message=res.content;
                    }
                }
            })
        },
        methods: {
            //下架
            down_active(){
                this.dialogVisible_down = false;
                this.disabled = true;
                let data = this.qs.stringify({
                    id: this.activityId
                });
                pointSoldOut(data).then(res=>{
                    if(res.status == "success"){
                        this.$message.success("下架成功!已返回活动列表");
                        this.$router.push({path:'/rewardPromotion'})
                    }
                    else if(res.status == "errro"){
                        this.disabled = false;
                        this.$message('下架失败,请重试!')
                    }
                })
            },
            //返回
            back() {
                window.history.back();
            }
        },
        created: function () {
            let id = this.$route.query.id;
            let isMarketable = this.$route.query.isMarketable;
            this.activityId = id;
            this.isMarketable = isMarketable;
            // var curRouter = this.$router.currentRoute;
            // this.$store.commit("dealData", {
            //     path: curRouter.path,
            //     name: curRouter.meta.name
            // });
        }
    }
</script>

<style>
    .margin_b_10 {
        margin-bottom: 20px;
    }

    .juzhong {
        width: 450px;
        margin: 20px auto;
    }

    .details_des {
        display: inline-block;
        width: 300px;
    }

    .dialog_goodslist .el-table__body-wrapper {
        height: 280px;
    }
</style>
