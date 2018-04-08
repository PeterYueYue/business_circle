<!--单品券列表/积分抵现/查看详情-->
<template>

    <div class="juzhong">
        <span class="ticket_title_all margin_b_10">积分抵现活动</span>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item class="ticket_title" label="活动名称 :">
                <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="活动规则 :">
                <span>{{form.cost}} 积分  可抵扣 {{form.gain}}元</span>
            </el-form-item>
            <el-form-item label="积分规则 :">
                <span class="details_des">满&ensp;{{form.lowPoint}}&ensp;积分可参与抵现</span>
            </el-form-item>
            <el-form-item label="活动时间 :">
                <span>{{form.startDate}}至{{form.endDate}}</span>
            </el-form-item>
            <el-form-item class="code_shop" label="适用门店 :">
                <span>已选 {{form.shopnumber}} 家门店&#X3000;</span>
                <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
            </el-form-item>
            <el-dialog
                    title="适用门店列表"
                    v-model="dialogVisible_shopslist"
                    size="tiny"
                    top="20%">
                <p v-for="item in shops">{{item.shopName}}</p>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                  </span>
            </el-dialog>
            
            <el-form-item label="活动备注 :">
                <span class="details_des">{{form.memo}}</span>
            </el-form-item>

            <el-form-item>
                <el-button class="bottom_button" v-if="offlineStatus == '0'" size="small" :disabled="disabled" type="primary" @click="dialogVisible_down = true;">下 架</el-button>
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
    import {getActiveDetail,downactive} from '../../../api/api'

    export default {
        data() {
            return {
                offlineStatus:'',
                disabled:false,
                dialogVisible_down:false,
                activityId: '',
                shops: [],
                dialogVisible_shopslist: false,
                form: {
                    shopnumber:''
                }
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                activityId: this.activityId
            });
            getActiveDetail(data).then(res => {
                if (res.errorCode == 30005) {
                    this.$router.push({path: '/login'});
                } else {
                    this.form = res.content;
                    this.shops = res.content.shopList;
                    this.form.shopnumber = res.content.shopList.length;
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
                downactive(data).then(res=>{
                    if(res.status == "success"){
                        this.$message.success("下架成功!已返回活动列表");
                        this.$router.push({path:'/integralList'})
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
            let offlineStatus = this.$route.query.offlineStatus;
            this.offlineStatus = offlineStatus;
            this.activityId = id;
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
