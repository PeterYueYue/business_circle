<!--代金券创建s-->
<!--活动营销/单品营销-->
<template>
    <div class="zj-main">
        <div class="ticket_show">
            <div>
                <img src="../../../assets/ticket.png" alt="">
                <span>{{money}}元</span>
                <p>活动日期:{{startTime}}至{{endTime}}</p>
            </div>
        </div>
        <div class="ticket_rule bottom_margin_50">
            <span class="ticket_title_all">活动内容</span>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item class="ticket_title" label="活动名称 :">
                    <el-input size="small" v-model="form.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="券面额 :">
                    <el-input class="width_90" size="small" v-model="money" placeholder="请输入"></el-input>
                    元
                </el-form-item>
                <el-form-item label="适用门店 :">
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>

                </el-form-item>
                <el-form-item class="ticket_number" label="数量 :">

                    <el-input class="width_90" size="small" v-model="form.number" placeholder="输入数量"></el-input>
                </el-form-item>
                <el-form-item label="活动时间 :">
                    <div class="block">
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                align="right"
                                size="small"
                                placeholder="选择日期范围"
                                @change="changeTime"
                                :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item class="ticket_number" label="券有效期 :">
                    券领取后&ensp;
                    <el-input class="width_90" size="small" v-model="form.numbers" type="number"
                              placeholder="输入天数"></el-input>&ensp;天有效
                </el-form-item>
                <el-form-item class="ticket_limit" label="使用条件 :">
                    <el-select v-model="form.uselimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in limitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div v-if="this.form.uselimitselectvalue == 1">
                        <span>消费满 </span>
                        <el-input class="width_90" size="small" placeholder="金额" v-model="numberX"></el-input>
                        <span>可用</span>
                    </div>

                </el-form-item>
                <!--选择适用门店弹窗-->
                <el-dialog
                        title="选择适用门店"
                        v-model="dialogVisible_queryshops"
                        size="small"
                        top="20%">
                    <div class="kinds_main">
                        <div class="shopkinds_list">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                                <div class="check_divbox" v-for="item in Objects">
                                    <el-checkbox :label="item.id" :key="item.id">{{item.main_shop_name}}</el-checkbox>
                                </div>

                            </el-checkbox-group>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
             <el-button type="primary" @click="queryshops_btn">确 定</el-button>
          </span>
                </el-dialog>
            </el-form>
            <span class="ticket_title_all ">规则设置</span>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item class="ticket_limit" label="领取限制 :">
                    <el-select v-model="form.limitselectvalue" placeholder="请选择" size="small" @change="selectChange">
                        <el-option
                                v-for="item in limitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div v-if="this.form.limitselectvalue == 1">
                        <el-input class="width_90" size="small" v-model="form.number1" placeholder="请输入"></el-input>
                        <span>张/人</span>
                    </div>
                </el-form-item>
                <el-form-item class="ticket_limit" label="每日领取限制 :">
                    <el-select v-model="form.datelimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in datelimitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div v-if="this.form.datelimitselectvalue == 1">
                        <el-input class="width_90" size="small" v-model="form.number2" placeholder="请输入"></el-input>
                        张/人/天
                    </div>

                </el-form-item>
                <!--<el-form-item label="是否需要积分兑换 :">-->
                    <!--<el-radio class="radio" v-model="form.code_radio" label="1">是</el-radio>-->
                    <!--<el-radio class="radio" v-model="form.code_radio" label="2">否</el-radio>-->
                <!--</el-form-item>-->
                <el-form-item v-if="form.code_radio == 1" label="兑换所需积分 :">
                    <el-input class="width_90" size="small" v-model="form.needcode" placeholder="积分"></el-input>
                </el-form-item>
                <el-form-item v-if="form.code_radio == 2" class="setways" label="投放渠道 :">
                    <el-select v-model="form.ways" multiple placeholder="请选择">
                        <el-option
                                v-for="item in wayskinds"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="ticket_limit" label="领券时间 :">
                    <el-select v-model="form.timelimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in timelimitselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div class="bgf4f4f4" v-if="this.form.timelimitselectvalue == 1">
                        <el-checkbox-group v-model="checkList">
                        <el-checkbox label="星期一"></el-checkbox>
                        <el-checkbox label="星期二"></el-checkbox>
                        <el-checkbox label="星期三"></el-checkbox>
                        <el-checkbox label="星期四"></el-checkbox>
                        <el-checkbox label="星期五"></el-checkbox>
                        <el-checkbox label="星期六"></el-checkbox>
                        <el-checkbox label="星期日"></el-checkbox>
                        </el-checkbox-group>
                        <span class="viltop">指定时段</span>
                        <div class="neiform">
                            <div v-for="(time,index) in times" class="margin_b_20">
                                    <el-time-picker
                                        is-range
                                        v-model="time.value"
                                        placeholder="选择时间范围">
                                    </el-time-picker>
                                    <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain(time)">删除</el-button>
                                    
                                </div>
                                <el-button type="primary" v-if="times.length < 5" @click="addDomain">新增</el-button>
                        </div>
                        <span class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</span>

                    </div>

                </el-form-item>
                <el-form-item class="ticket_limit" label="核销时间 :">
                    <el-select v-model="form.detallimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in detallimitselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div class="bgf4f4f4" v-if="this.form.detallimitselectvalue == 1">
                        <el-checkbox-group v-model="checkList1">
                        <el-checkbox label="星期一"></el-checkbox>
                        <el-checkbox label="星期二"></el-checkbox>
                        <el-checkbox label="星期三"></el-checkbox>
                        <el-checkbox label="星期四"></el-checkbox>
                        <el-checkbox label="星期五"></el-checkbox>
                        <el-checkbox label="星期六"></el-checkbox>
                        <el-checkbox label="星期日"></el-checkbox>
                        </el-checkbox-group>
                        <span class="viltop">指定时段</span>
                        <div class="neiform">
                            <div v-for="(time,index) in times1" class="margin_b_20">
                                    <el-time-picker
                                        is-range
                                        v-model="time.value"
                                        placeholder="选择时间范围">
                                    </el-time-picker>
                                    <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain1(time)">删除</el-button>
                                    
                                </div>
                                    <el-button type="primary" v-if="times1.length < 5" @click="addDomain1">新增</el-button>
                            </div>
                        <span class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</span>

                    </div>

                    </el-form-item>
                <el-form-item>
                    <el-button class="bottom_button" size="small" type="primary" @click="saveMessage">提 交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import {formateDate,formDateSecond,formDateSecond59,formatTimestamp,weekDispose,DateLong} from '../../../api/CommonMethods'
    import {getShopLists,saveProduct} from '../../../api/api';
    export default {
        data() {
            return {
                times:[
                    {
                        value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    }
                ],
                times1:[
                    {
                        value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    }
                ],
                checkList:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                checkList1:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                
                choosekinds: '',
                wayskinds: [
                    {value: 'QR_CODE', label: '二维码'},
                    {value: 'SHORT_LINK', label: '短链接'},
                    {value: 'SHOP_DETAIL', label: '店铺主页'},
//                  {value: 'PAYMENT_RESULT',label: '支付成功页'},
//                  {value: 'URL_WITH_TOKEN',label: '口令送'},
                ],
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                shopsnumber: '',
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '',
                showList: [],
                form: {
                    numbers:'45',
                    name: '',
                    shop: '门店1',
                    number: '9999',
                    time: '',
                    timelimitselectvalue:'2',
                    detallimitselectvalue:'2',
                    limitselectvalue: '2',
                    datelimitselectvalue: '2',
                    uselimitselectvalue: '',
                    number1: '',
                    number2: '',
                    limittime: '',
                    code_radio: '1',
                    needcode: '',
                    ways: []
                },
                timelimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                detallimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                limitselectdata: [
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                datelimitselectdata: [
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                hhddatas2: [],
                Objects: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                choose_goods: false,
                dialogVisible_queryshops: false,
                messageData:{},
                firstTime:'',
                lastTime:'',
                numberX:''
            }
        },
        mounted:function () {
          this.shopList();
        },
        methods: {
            //领券时间3个函数(添加,删除,处理)
            addDomain(){
                this.times.push({
                       value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    })
            },
            removeDomain(time) {
                var index = this.times.indexOf(time)
                if (index !== -1) {
                    this.times.splice(index, 1)
                }
            },
            //核销时间3个函数(添加,删除,处理)
            addDomain1(){
                this.times1.push({
                       value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    })
            },
            removeDomain1(time) {
                var index = this.times1.indexOf(time)
                if (index !== -1) {
                    this.times1.splice(index, 1)
                }
            },
            saveMessage:function () {
                this.messageData.name=this.form.name;
                this.messageData.voucher_worth_value=this.money;
                if(this.checkedshopstrue){
                    this.messageData.suit_shops=this.checkedshopstrue.join();
                }
                this.messageData.quantity=this.form.number;
                this.messageData.start_time=this.firstTime;
                this.messageData.end_time=this.lastTime;
                //        有效期
                this.messageData.relative_time = this.form.numbers;
                if(this.form.uselimitselectvalue == 1){
                    this.messageData.send_rule_min_cost=this.numberX;
                }else if(this.form.uselimitselectvalue == 2){
                    this.messageData.send_rule_min_cost='0';
                }
                //领取限制
                if(this.form.limitselectvalue == 1){
                    this.messageData.user_win_count=this.form.number1;
                }else if(this.form.limitselectvalue == 2){
                    this.messageData.user_win_count='9999';
                }
                //每日领取限制
                if(this.form.datelimitselectvalue == 1){
                    this.messageData.user_win_frequency=this.form.number2;
                }else if(this.form.datelimitselectvalue == 2){
                    this.messageData.user_win_frequency='9999';
                }
                //领取时间限制
                if(this.form.timelimitselectvalue ==1){
                    let arrs=weekDispose(this.checkList);
                    this.messageData.use_week=arrs;
                    let useTime=DateLong(this.times);
                    this.messageData.use_time=useTime;
                }
                //核销时间
                if(this.form.detallimitselectvalue == 1){
                    let arrs=weekDispose(this.checkList1);
                    this.messageData.exchange_week=arrs;
                    let useTime=DateLong(this.times1);
                    this.messageData.exchange_time=useTime;
                }
                
                this.messageData.binding_point=this.form.needcode;
                delete this.messageData['publish_channels_type'];
                let data=this.qs.stringify(this.messageData);
                saveProduct(data)
                    .then(res=>{
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else if(res.errorCode == 10000){
                            this.$message({
                                message: '恭喜你，创建代金券成功!',
                                type: 'success'
                            });
                            this.$router.push({path: '/voucherList'});
                        } else{
                            this.errorMessage = res.message;
                            this.$message(res.message);
                        }
                    })
            },
            shopList: function () {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000'
                });
                getShopLists(data)
                    .then(res=>{
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else{
                            this.Objects=res.content.resultList;
                        }
                    })
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].id);
                }
                this.checkedshops = event.target.checked ? this.hhddatas2 : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.Objects.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
            },
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            // 上架门店确定
            queryshops_btn() {
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            changeTime: function () {
                this.startTime = formateDate(this.time[0]);
                this.endTime = formateDate(this.time[1]);
                this.firstTime = formDateSecond(this.time[0]);
                this.lastTime = formDateSecond59(this.time[1]);
            },
            selectChange: function () {
            }

        },

    }
</script>

<style>

    .active1 {
        /*border: 1px solid red;*/
    }

    .ticket_title_all {
        display: inline-block;
        margin-top: 10px;
        padding-left: 8px;
        border-left: 10px solid #00a0e9;
    }

    .ticket_show {
        text-align: center;
        width: 39%;
        display: inline-block;
        margin-top: 80px;
        justify-content: center;
    }

    .ticket_show div {
        display: inline-block;
        height: 450px;
        width: 230px;
        margin: 50px auto;
        position: relative;
    }

    .ticket_show div img {
        height: 450px;
        width: 230px;
        
        display: inline-block;
        z-index: 10;
    }

    .ticket_show div span {
        display: inline-block;
        position: absolute;
        width: 100px;
        top: 150px;
        left: 65px;
        text-align: center;
        /*outline:1px solid orange;*/
        z-index: 50;
        font-size: 20px;
    }

    .ticket_show div p {
        display: inline-block;
        width: 195px;
        text-align: center;
        /*outline:1px solid red;*/
        position: absolute;
        font-size: 12px;
        top: 180px;
        left: 15px;
        z-index: 60;
    }

    .ticket_tip {
        line-height: 20px;
        display: block;
        color: #888;
        font-size: 12px;
    }



    .ticket_title .el-input {
        width: 260px;
    }

    /*.ticket_limit .el-input {
      width: 260px;
    }*/

    .width_90 {
        width: 90px !important;
    }

    .choose_goods_main {
        height: 500px;
    }

    .choose_goods_main .main_left {
        width: 25%;
        float: left;
        height: 100%;
    }

    .choose_goods_main .main_left .left_box {
        height: 100%;
        margin: 10px;
    }

    .choose_goods_main .main_left .left_box .box_title {
        height: 40px;
        background-color: #00a0e9;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .box_title span {
        line-height: 40px;
        color: white;
        margin-left: 14px;
    }

    .choose_goods_main .main_left .left_box .box_list {
        height: calc(100% - 40px);
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        overflow: auto;
        border: 1px solid #dddddd;
    }

    .box_list .list {
        display: block;
        padding: 5px 10px;
        margin: 0px;
    }

    .choose_goods_main .main_left .left_box .box_list::-webkit-scrollbar {
        display: none;
    }

    .choose_goods_main .main_right {
        float: left;
        width: 75%;
        height: 100%;
    }

    .main_right .right_query_input {
        width: 160px;
        margin-right: 30px;
    }

    .main_right .right_title_input {
        width: 50px;
    }

    .right_box {
        margin: 10px;
    }

    .right_box_title {
        margin: 20px 0;
    }

    .right_box .el-table__body-wrapper {
        height: 385px;
    }

    .setways .el-select, .setways .el-select .el-input {
        width: 260px;
    }

    .bottom_margin_200 {
        margin-bottom: 200px;
    }

    .shopkinds_list {
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }
    .display_i_b{
        display: inline-block;
    }
    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .check_choose_list .el-table__body-wrapper {
        height: 385px;
    }
    .margin_b_20{
        display: inline-block;
    }

</style>
