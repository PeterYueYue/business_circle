<!--积分抵现-->
<template>
    <div class="qs_mian">
        <div class="details">
            <span class="ticket_title_all">积分活动内容</span>
            <el-form ref="form" class="active_content" label-width="150px">
                <el-form-item class="active_input_b" label="活动名称 : ">
                    <el-input size="small" placeholder="请输入活动名称" v-model="data.pointName"></el-input>
                </el-form-item>
                <el-form-item class="active_rule" label="活动规则 : ">
                    <el-input size="small" placeholder="积分" v-model="data.cost" type="number"
                              @change="verify(data.cost)"></el-input>
                    <span>积分可抵扣 </span>
                    <el-input size="small" placeholder="金额" v-model="data.gain" type="number"
                              @change="verify(data.gain)"></el-input>
                    <span> 元</span>
                </el-form-item>
                <div class="pop-add-model">
                <span>满 </span>
                <el-input type="number" size="small" placeholder="积分" v-model="data.integration"></el-input>
                <span>积分可参与抵现</span><br>
                </div>
                <div class="pop-add-model">
                    <span>积分池消耗总量上限</span>
                    <!--<input type="number" v-model="totalPoint" @change="verify(totalPoint)">-->
                    <el-input size="small" type="number" v-model="totalPoint" @change="verify(totalPoint)" placeholder="积分"></el-input>
                    <p class="pop-small-size">提示:1.活动期间,如达到积分消耗上限,消费将不计算积分优惠</p>
                    <p class="pop-small-size">&#x3000;&#x3000;&ensp;2.留空或者不填则默认无上限</p>
                </div>
                <el-form-item class="active_input_b" label="活动时间 : ">
                    <el-date-picker v-model="time" type="daterange" size="small" align="right" placeholder="选择日期范围"
                                    @change="changeTime" :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="适用门店 : ">
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="活动备注 : ">
                    <el-input class="card_des_set" type="textarea" :rows="5" resize='none' placeholder="请输入活动描述"
                              v-model="data.memo">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="bottom_button" size="small" :disabled="disabled" type="primary" @click="surRefer">确认</el-button>
                </el-form-item>

            </el-form>
            <!--选择适用门店弹窗-->
            <el-dialog title="选择适用门店" v-model="dialogVisible_queryshops" size="small" top="20%">
                <div class="kinds_main">
                    <div class="shopkinds_list">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                        <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                            <div class="check_divbox" v-for="item in Objects">
                                <el-checkbox :label="item.id">{{item.main_shop_name}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
                    <el-button type="primary" @click="queryshops_btn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getShopLists, integralNow,getLoginStatus} from '../../../api/api'
    import {formateDate, checkRate} from '../../../api/CommonMethods'

    export default {
        data() {
            return {
                disabled:false,
                totalPoint: '',

                data: {
                    pointName: '',
                    cost: '',
                    gain: '',
                    memo: '',
                    integration:''
                },
                shopsnumber: '',
                dialogVisible_queryshops: false,
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                checkedshopstrue: [],
                Objects: [],
                hhddatas2: [],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                time: ''
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getLsit(data);
        },
        methods: {
            verify: function (data) {
                checkRate(data);
                if (checkRate(data) == false) {
                    this.$message({
                        message: '请填写正整数!',
                        type: 'warning'
                    });
                }
            },
//            提交信息
            surRefer: function () {
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                let message = {};
                let isFlag = 1;
//            活动名称
                if (!this.data.pointName || !this.data.cost || this.time.length == 0 || !this.data.gain || this.checkedshopstrue.length == 0 || this.data.integration.length == 0) {
                    this.$message({
                        message: '信息填写不完整!',
                        type: 'warning'
                    });

                } else {
                    message.pointName = this.data.pointName;
                    message.cost = this.data.cost;
                    message.gain = this.data.gain;
                    message.lowPoint=this.data.integration;
                    message.startDate = this.data.startDate;
                    message.endDate = this.data.endDate;
                    message.shopIds = this.checkedshopstrue.join();
                    if (this.totalPoint) {
                        message.totalPoint = this.totalPoint;
                    }else{
                        message.totalPoint = '999999999';
                    }
                    if (this.data.memo) {
                        message.memo = this.data.memo;
                    }
                    this.disabled = true;
                    // console.log(message);
                    let datas = this.qs.stringify(message);
                    integralNow(datas).then(res => {
                        if (res.errorCode == 10000) {
                            this.$message({
                                message: '保存成功!已跳转到活动列表',
                                type: 'success'
                            });
                            this.$router.push({path: '/integralList'});
                        } else if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        } else if (res.errorCode == 20001) {
                            this.disabled = false;
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    })
                }
            },
            //获取门店列表
            getLsit: function (data) {
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                getShopLists(data).then(res => {
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    }else{
                        this.Objects = res.content.resultList;
                    }

                })
            },
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (let i = 0; i < this.Objects.length; i++) {
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
            //    上架门店确定
            queryshops_btn() {
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            changeTime: function () {
                if (!this.time[0] == '') {
                    this.data.startDate = formateDate(this.time[0]);
                    this.data.endDate = formateDate(this.time[1]);
                }

            }
        }
    }

</script>
<style>
    .details {
        width: 500px;
        margin: 20px auto;
    }

    .active_rule .el-input {
        width: 100px;
    }

    .active_input_b .el-input {
        width: 250px;
    }

    .card_des_set {
        width: 250px;
    }

    .active_content {
        margin-top: 30px;
    }

    .shopkinds_list {
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }

    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .pop-small-size{
        color: red !important;
        font-size: 12px!important;
    }
    .pop-add-model {
        /*outline: 1px solid red;*/
        margin-left: 150px;
        width: 100%;
        margin-bottom: 10px;
    }
    .pop-add-model>.el-input{
        width:100px;
    }

    .pop-add-model > span {
        font-size: 14px;
        color: #48576a;
    }

    .pop-add-model > input {
        width: 100px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 30px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        margin-left: 10px;
    }

    .pop-add-model > p {
        font-size: 14px;
        margin-top: 5px;
        color: #f4333c;
    }

</style>