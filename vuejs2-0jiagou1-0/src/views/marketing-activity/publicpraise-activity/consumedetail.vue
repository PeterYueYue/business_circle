<!--消费送券-->
<template>
    <div class="zj-main">
        <div class="ticket_show">
            <div>
                <img src="../../../assets/ticket.png" alt="">
                <!--<span>{{money}}元</span>
                <p>活动日期:{{startTime}}至{{endTime}}</p>-->
            </div>
        </div>
        <div class="ticket_rule ticket_rule_zs bottom_margin_50">
            <span class="ticket_title_all">活动内容</span>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="活动名称 :">
                    <span>{{form.name}}</span>
                </el-form-item>
                <el-form-item label="门店确认时间 :">
                    <span>{{form.investmentStartDate}} ~ {{form.investmentEndDate}}</span>
                </el-form-item>
                <el-form-item label="活动时间 :">
                    <span>{{form.activeStartDate}} ~ {{form.activeEndDate}}</span>
                </el-form-item>
                <el-form-item  label="活动对象 :">
                    <span v-if="form.investmentType == 'PAYMENT_RESULT'">消费满 {{form.minCost}} 元的顾客</span>
                    <span v-if="form.investmentType == 'SHOP_DETAIL'">所有扫码顾客</span>
                </el-form-item>
                <el-form-item v-if="form.investmentType == 'PAYMENT_RESULT'" label="参与门店 :">
                    <span>共 {{canyushopslength}} 家门店</span>
                    <el-button class="click_table" type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
                </el-form-item>
                <el-dialog
                    title="适用门店列表"
                    v-model="dialogVisible_shopslist"
                    size="tiny"
                    top="20%">
                    <div class="block">
                        <el-table
                        :data="tableData1"
                        style="width: 100%">
                            <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="shopName"
                                label="门店">
                            </el-table-column>
                            <!--<el-table-column
                                prop="shopStatus"
                                label="状态">
                            </el-table-column>-->
                        </el-table>
                     </div>   
                    <!--<span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                    </span>-->
                </el-dialog>
            </el-form>
            <span class="ticket_title_all ">优惠券设置</span>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="领取上限 :">
                    <span v-if="form.pickLimitNum == '9999'">不限制</span>
                    <span v-if="form.pickLimitPeriod == 'D'">每日 {{form.pickLimitNum}} 张/人</span>
                    <span v-if="form.pickLimitPeriod == 'W'">每周 {{form.pickLimitNum}} 张/人</span>
                    <span v-if="form.pickLimitPeriod == 'M'">每月 {{form.pickLimitNum}} 张/人</span>
                </el-form-item>
                <el-form-item class="ticket_limit" label="发放数量 :">
                    <span v-if="form.quantity == '9999'">不限制</span>
                    <span v-if="form.quantity != '9999'">{{form.quantity}} 张</span>
                </el-form-item>
                <div style="display: inline-block;min-height: 600px;width: 600px">
                    <el-tabs v-model="editableTabsValue2" type="border-card">
                        <el-tab-pane
                            v-for="(item,listindex) in qlist"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                        >
                            <el-form class="margin_top_5"  label-width="140px">
                                <el-form-item label="券种类 :">
                                    <span v-if="item.voucherType == 'RATE'">折扣券</span>
                                    <span v-if="item.voucherType == 'MONEY'">代金券<span></span></span>
                                    <p style="color:#888" v-if="item.voucherType == 'MONEY' && item.isRepeat == 'MULTI_USE_WITH_OTHERS'">* 可与门店优惠券叠加使用</p>
                                    <p style="color:#888" v-if="item.voucherType == 'MONEY' && item.isRepeat == 'NO_MULTI'">* 不可与门店优惠券叠加使用</p>
                                </el-form-item>
                                <el-form-item label="适用门店 :">
                                    <span>共 {{item.showshopslistnumber}} 家门店</span>
                                    <el-button type="text" class="click_table" @click="clicktodetail(listindex)">点击查看</el-button>
                                </el-form-item>
                                <el-form-item v-if="item.voucherType == 'MONEY'" label="券面额 :">
                                    <span>{{item.voucherMoney}} 元</span>
                                </el-form-item>
                                <el-form-item v-if="item.voucherType == 'RATE'"  label="折扣力度 :">
                                   <span>{{item.discount*10}} 折</span>
                                </el-form-item>
                                <el-form-item label="最低消费 :">
                                    <span v-if="item.fullCost == '0.01'">不限制</span>
                                    <span v-if="item.fullCost != '0.01'">{{item.fullCost}} 元</span>
                                </el-form-item>
                                <el-form-item label="券有效期 :">
                                    <span>{{item.modifyDate}}</span>
                                </el-form-item>
                                <el-form-item label="品牌名称 :">
                                    <span>{{item.brandName}}</span>
                                </el-form-item>
                                <el-form-item label="券Logo :">
                                    <div>
                                        <img style="width:100px;display: inline-block;height: auto;" :src="item.urlLogo" alt="">
                                    </div>
                                </el-form-item>
                                <el-form-item label="使用说明 :">
                                    <p v-for="items in item.showinstruction">{{items}}</p>
                                </el-form-item>
                                <el-form-item label="领取上限 :">
                                    <span>每人只能领取1次</span>
                                </el-form-item>
                                <el-form-item label="生效方式 :">
                                    <span v-if="item.effectWay == 'IMMEDIATELY'">当日生效</span>
                                    <span v-if="item.effectWay == 'DELAY'">次日生效</span>
                                </el-form-item>
                                <el-form-item label="是否可转赠 :">
                                    <span v-if="item.isShare == 'true'">可转赠</span>
                                    <span v-if="item.isShare == 'false'">不可转赠</span>
                                </el-form-item>
                                <el-form-item v-if="item.voucherType == 'RATE'" label="最高优惠金额 :">
                                    <span>{{item.maxAmount}} 元</span>
                                </el-form-item>
                                <el-form-item label="可使用时段 :">
                                    <span v-if="item.show_useWeek == ''">不限制</span>
                                    <p v-if="item.show_useWeek != ''" v-for="items in item.show_useWeek">
                                        每周{{items.useWeek}} {{items.useTime}} 时间段内可使用
                                    </p>
                                </el-form-item>
                                <el-form-item label="不可用日期 :">
                                    <span v-if="item.show_forbiddenUseDate == ''">不限制</span>
                                    <span v-if="item.show_forbiddenUseDate != ''">{{item.show_forbiddenUseDate}} 不可使用</span>
                                </el-form-item>
                                
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                    <el-form-item class="margin_top_30">
                        <el-button type="primary" class="bottom_button" @click="back" size="small">返 回</el-button>
                    </el-form-item>
                      <el-dialog
                        title="适用门店列表"
                         v-model="dialogVisible_shopslist_quan"
                         size="tiny"
                         top="20%">
                         <div class="block">
                             <el-table
                             :data="tableData2"
                             style="width: 100%">
                                 <el-table-column
                                     label="序号"
                                      type="index"
                                     width="50">
                                </el-table-column>
                                <el-table-column
                                    prop="shopName"
                                    label="门店">
                                </el-table-column>
                                <el-table-column
                                    label="状态">
                                    <template scope="scope">
                                        <p v-if="scope.row.confirmStatus =='PENDING' ">未同意</p>
                                        <p v-if="scope.row.confirmStatus =='PASS' ">已同意</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                           </div>  
                                    <!--<span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible_shopslist_quan = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogVisible_shopslist_quan = false">确 定</el-button>
                                    </span>-->
                      </el-dialog>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { getVoucher } from '../../../api/api';
    export default {
        data() {
            return {
                id:'',
                dialogVisible_shopslist:false,
                dialogVisible_shopslist_quan:false,
                editableTabsValue2:'',
                form:{},
                canyushopslength:0,
                qlist: [],
                tableData1:[],
                tableData2:[],
            }
        },
        mounted:function () {
            this.getData();
        },
        methods: {
            //获取数据
            getData(){
                let data = this.qs.stringify({
                    voucherId:this.id
                });
                getVoucher(data)
                    .then(res=>{
                        this.form = res.content.investment;
                        this.qlist = res.content.sonList;
                        this.canyushopslength = res.content.shopList.length;
                        this.tableData1 = res.content.shopList;
                        this.showdata();
                })
            },
            showdata(){
                this.form.investmentStartDate = this.form.investmentStartDate.substring(0,this.form.investmentStartDate.length-2);
                this.form.activeEndDate = this.form.activeEndDate.substring(0,this.form.activeEndDate.length-2);
                this.form.activeStartDate = this.form.activeStartDate.substring(0,this.form.activeStartDate.length-2);
                this.form.investmentEndDate = this.form.investmentEndDate.substring(0,this.form.investmentEndDate.length-2);
                for(let i = 0;i<this.qlist.length;i++){
                    this.qlist[i].showshopslistnumber = this.qlist[i].suitShopList.length;
                    // this.qlist[i].tableData2 = this.qlist[i].suitShopList;
                    if(this.qlist[i].voucherType == 'MONEY'){
                        this.qlist[i].title = this.qlist[i].voucherMoney + '元代金券';
                        this.qlist[i].name = i.toString();
                    }else if(this.qlist[i].voucherType == "RATE"){
                        this.qlist[i].title = this.qlist[i].discount*10 + '折折扣券';
                        this.qlist[i].name = i.toString();
                    }
                    this.qlist[i].instruction = this.qlist[i].instruction.substring(2,this.qlist[i].instruction.length - 2);
                    this.qlist[i].showinstruction = [];
                    this.qlist[i].showinstruction = this.qlist[i].instruction.split('","');
                    if(this.qlist[i].useWeek == ''){
                        this.qlist[i].show_useWeek = '';
                    }else if(this.qlist[i].useWeek != ''){
                        this.qlist[i].show_useWeek=JSON.parse(this.qlist[i].useWeek);
                        for(let m =0;m<this.qlist[i].show_useWeek.length;m++){
                            this.qlist[i].show_useWeek[m].useTime = this.qlist[i].show_useWeek[m].useTime.replace(/,/g,'-').replace(/\^/g,' ; ');
                            this.qlist[i].show_useWeek[m].useWeek = this.qlist[i].show_useWeek[m].useWeek.replace(/1/,'一').replace(/2/,'二').replace(/3/,'三').replace(/4/,'四').replace(/5/,'五').replace(/6/,'六').replace(/7/,'日');
                        }
                        this.qlist[i].show_useWeek
                    }
                    if(this.qlist[i].forbiddenUseDate == ''){
                        this.qlist[i].show_forbiddenUseDate = '';
                    }else if(this.qlist[i].forbiddenUseDate != ''){
                        this.qlist[i].show_forbiddenUseDate = this.qlist[i].forbiddenUseDate.replace(/,/g,' 至 ').replace(/\^/g,' ; ');
                    }
                }
                this.editableTabsValue2 = '0';
            },
            clicktodetail(index){
                this.dialogVisible_shopslist_quan = true;
                this.tableData2 = this.qlist[index].suitShopList;
            },
            //返回上一页
            back(){
                this.$router.go(-1);
            },

        },
        created:function(){
            let getid = this.$route.query.id;
            this.id = getid;
        }

    }
</script>

<style scoped>
    .ticket_show{
        width: 30%;
    }
    .ticket_rule {
        width: 69%;
    }
    .margin_top_30{
        margin-top: 30px;
    }
    .titlenamestyle{
        font-size: 14px;
        font-weight: 600;
    }
    .margin_top_5{
        margin-top: 5px;
    }
</style>