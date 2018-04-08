<!--消费返还-->
<template>
    <div class="mains" style="overflow-x: hidden">
        <div class="zj-title">
            <span></span>
            <span>红包设置</span>
            <span v-if="routerId==1">(消费返还)</span>
            <span v-if="routerId==2">(消费集点送)</span>
            <span v-if="routerId==3">(新客奖励)</span>
            <span v-if="routerId==4">(新会员)</span>
            <span v-if="routerId==5">(回归礼)</span>
            <span v-if="routerId==6">(指定单品送)</span>
        </div>
        <div class="zj-content">
            <span>红包活动名称 :</span>
            <el-input placeholder="请输入活动名称" v-model="form.name" class="zj-name"></el-input>
        </div>
        <div class="zj-content">
            <span>红包活动预算 :</span>
            <el-input placeholder="1.00~1000000.00" type="number" v-model="form.budget" class="zj-budget"></el-input>
            <span>&#x3000;元</span>
        </div>
        <div class="zj-content">
            <span>红包发放数量 :</span>
            <el-input placeholder="输入红包数量(1-1000000)" type="number" v-model="form.number" class="zj-budget"></el-input>
            <span>&#x3000;个</span>
        </div>
        <div class="zj-shape">
            <span>红包发放形式 :</span>
            <el-radio class="radio" v-model="form.radio" label="1">随机金额</el-radio>
            <p>每个用户领取的红包金额为活动预算金额除以红包发送数量得到的平均金额值得0.5-1.5倍</p>
            <p>
                <el-radio class="radio" v-model="form.radio" label="2">固定金额</el-radio>
            </p>
            <p class="zj-money">红包面额总金额/总数量;每个用户领取的红包金额为活动预算金额除以红包发放数量得到的固定金额
            </p>
        </div>
        <div class="zj-time">
            <span>红包发放时间 :</span>
            <el-date-picker v-model="form.time" type="daterange" class="zj-times" :picker-options="pickerOptions2"
                            placeholder="选择时间范围" @change="timeChange()" align="right">
            </el-date-picker>
        </div>
        <div class="zj-shop">
            <span>适用门店 :</span>
            <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
            <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
            <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店</el-button>
        </div>
        <div class="zj-text">
            <span>活动说明 :</span>
            <textarea v-model="form.text" placeholder="请输入活动说明"></textarea>
        </div>

        <!--选择适用门店弹窗-->
        <el-dialog title="选择适用门店" v-model="dialogVisible_queryshops" size="small" top="20%">
            <div class="kinds_main">
                <div class="shopkinds_list">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                        <div class="check_divbox" v-for="item in Objects">
                            <el-checkbox :label="item.id" :key="item.id">{{item.main_shop_name}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queryshops_btn">确 定</el-button>
        <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
      </span>
        </el-dialog>

        <div class="zj-title">
            <span></span>
            <span>红包领取限制</span>
        </div>

        <div class="zj-goods" v-if="routerId==6">
            <span>指定单品 :</span>
            <span v-if="multipleSelectionLength">已选{{multipleSelectionLength}}种商品</span>
            <el-button type="text" @click="checkselectGood" v-if="multipleSelectionLength">点击查看</el-button>
            <el-button type="text" @click="againselectGood" v-if="multipleSelectionLength">重新选择</el-button>
            <el-button type="text" @click="selectGood" v-if="!multipleSelectionLength">选择商品</el-button>
        </div>
        <div class="zj-term" v-if="routerId==5">
            <span>发放条件 :</span>
            <p>距离活动开始前&#x3000;
                <el-input v-model="form.term5" class="zj-number" placeholder="天数"></el-input>&#x3000;内,未使用支付宝消费的门店可参与
            </p>
        </div>
        <div class="zj-term" v-if="routerId==5">
            <span></span>
            <p>消费满&#x3000;
                <el-input v-model="form.term6" class="zj-number" placeholder="金额"></el-input>&#x3000;元,发放红包
            </p>
        </div>
        <div class="zj-term" v-if="routerId==2">
            <span>发放条件:</span>
            <p>消费满&#x3000;
                <el-input v-model="form.term2" class="zj-number" placeholder="金额"></el-input>&#x3000;元,集一次点
            </p>
        </div>
        <div class="zj-term" v-if="routerId==2">
            <span>集点次数:</span>
            <p>满足&#x3000;
                <el-input v-model="form.term3" class="zj-number" placeholder="次数"></el-input>&#x3000;元,现金红包
            </p>
        </div>

        <div class="zj-term" v-if="routerId==1 || routerId==3">
            <span>发放条件:</span>
            <p>消费满&#x3000;
                <el-input v-model="form.term4" class="zj-number" placeholder="金额"></el-input>&#x3000;元,发放红包
            </p>
        </div>

        <div class="zj-limit" v-if="routerId==1 || routerId==2 ||  routerId==6">
            <span>红包领取次数 :</span>&#x3000;
            <el-input v-model="form.limit" class="zj-number" placeholder="次数" style="margin-left:12px;"></el-input>&#x3000;
        </div>
        <div class="zj-degree" v-if="routerId==1 || routerId==2 ">
            每人
            <!--<el-input v-model="form.date" class="zj-number" placeholder="每日"></el-input>-->
            <el-select v-model="form.date" placeholder="请选择" style="margin-left:5px;" size="samll">
                <el-option v-for="item in optionsd" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            领取
            <el-input v-model="form.degree" class="zj-number" placeholder="次数"
                      style="position:realtive;top:-2px;"></el-input>
        </div>

        <div class="zj-place">
            <span>领取时间限制 :</span>
            <!--<el-form-item class="ticket_limit" label="核销时间 :">-->
            <el-select v-model="form.timelimitselectvalue" placeholder="请选择" size="small" style="margin-left:25px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <br>
            <div class="bgf4f4f4" v-if="this.form.timelimitselectvalue == 1" style="margin-left:100px;">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="星期一">星期一</el-checkbox>
                    <el-checkbox label="星期二">星期二</el-checkbox>
                    <el-checkbox label="星期三">星期三</el-checkbox>
                    <el-checkbox label="星期四">星期四</el-checkbox>
                    <el-checkbox label="星期五">星期五</el-checkbox>
                    <el-checkbox label="星期六">星期六</el-checkbox>
                    <el-checkbox label="星期日">星期日</el-checkbox>
                </el-checkbox-group>
                <span class="viltop">指定时段</span>
                <div class="neiform">
                    <div v-for="(time,index) in times" class="margin_b_20">
                        <el-time-picker is-range v-model="time.value" placeholder="选择时间范围">
                        </el-time-picker>
                        <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain(time)">删除</el-button>

                    </div>
                    <el-button type="primary" v-if="times.length < 5" @click="addDomain">新增</el-button>
                </div>
            </div>

        </div>
        <div class="zj-button" @click="sumite()">
            <button>提交</button>
        </div>

        <el-dialog title="商品选择" v-model="choose_goods" size="large" top="10%">
            <span class="zj-span" v-if="this.shopMessage.length == 0">请先选择适用门店 ！</span>
            <div class="choose_goods_main">
                <div class="main_left">
                    <div class="zj-select">
                        <p>选择门店 :</p>
                        <el-select v-model="selectValue" placeholder="请选择门店" size="small" @change="selectShop">
                            <el-option
                                v-for="item in shopMessage"
                                :key="item.shop_id"
                                :label="item.shop_name"
                                :value="item.shop_id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="left_box">
                        <div class="box_title">
                            <span>选择分类</span>
                        </div>
                        <div class="box_list">
                            <div v-for="item in goodslist">
                                <p @click="clickkinds(item.category_id,item.shop_id)" v-bind:class='{active1 : item.id ==
                                choosekinds}'>
                                    {{item.category_name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_right" style="margin-top: 30px;">
                    <div class="right_box">
                        <!--<div class="right_box_title">-->
                            <!--<span>商品名称</span>-->
                            <!--<el-input class="right_query_input" size="small" v-model="food.name"-->
                                      <!--placeholder="请输入商品名称"></el-input>-->
                            <!--<span>价格</span>-->
                            <!--<el-input class="right_title_input" v-model="food.priceTop" size="small"></el-input>-->
                            <!--<span>至</span>-->
                            <!--<el-input class="right_title_input" v-model="food.priceBot" size="small"></el-input>-->
                            <!--<el-button class="margin_l_20" type="primary" size="small" @click="queryF">搜 索</el-button>-->
                        <!--</div>-->
                        <div class="zj-main">
                            <div class="zj-block">
                                <p>待选商品</p>
                                <table border="0">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>商品名称</th>
                                        <th>商品价格</th>
                                    </tr>
                                    </thead>
                                    <tbody class="zj-tbody">
                                    <tr v-for=" (dataSelect,index) in tableData" @click="clickShop(dataSelect)">
                                        <td>{{index + 1}}</td>
                                        <td>{{dataSelect.goodsName}}</td>
                                        <td>{{dataSelect.price}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="zj-block-center">

                            </div>
                            <div class="zj-block">
                                <p>已选商品</p>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>商品名称</th>
                                        <th>商品价格</th>
                                    </tr>
                                    </thead>
                                    <tbody class="zj-tbody zj-bodyd">
                                    <tr v-for=" (date,index) in multipleSelection" @click="deleteShop(date)">
                                        <td>{{index + 1}}</td>
                                        <td>{{date.goodsName}}</td>
                                        <td>{{date.price}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="choose_goods = false">返 回</el-button>
        <el-button type="primary" @click="choosegoodstruebut">确 定</el-button>
      </span>
        </el-dialog>

        <el-dialog title="查看已选商品" v-model="checkgoodslist" size="tiny" top="10%">
            <div class="block check_choose_list">
                <el-table prop="num" ref="multipleTable" :data="multipleSelection">
                    <el-table-column prop="goodsName" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="price" label="商品价格(元)">
                    </el-table-column>
                </el-table>

            </div>

        </el-dialog>

    </div>
</template>

<script>
    import {formateDate, DateLong, weekDispose} from '../../../api/CommonMethods';
    import {getShopLists, getAlipy,getChineseName,getShopClassify,getShopDetail} from '../../../api/api';

    export default {
        data() {
            return {
                shopMessage:'',
                checkgoodslist: false,
                tableData: '',
                goodslist: [],
                choose_goods: false,
                food: {
                    name: '',
                    priceTop: '',
                    priceBot: ''
                },
                name: '',
                multipleSelectionLength: '',
                detallimitselectvalue: '',
                selectValue:'',
                options: [{
                    value: '1',
                    label: '限制'
                }, {
                    value: '2',
                    label: '不限制'
                }],
                time: {
                    value: ''
                },
                checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                times: [{
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                }],
                choosekinds: '',
                dialogVisible_queryshops: false,
                routerId: '',
                metaName: '',
                shopsnumber: '',
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                Objects: [],
                newarr: [],
                multipleSelection: '',
                form: {
                    timelimitselectvalue: '',
                    date: '',
                    degree: '',
                    number: '',
                    radio: '',
                    name: '',
                    budget: '',
                    time: '',
                    text: '',
                    term: '',
                    limit: '',
                    budgets: '',
                    term1: '',
                    term2: '',
                    term3: '',
                    term4: '',
                    term5: '',
                    term6: '',
                },
                optionsd: [{
                    value: 'D',
                    label: '每日'
                }, {
                    value: 'W',
                    label: '每周'
                }, {
                    value: 'M',
                    label: '每月'
                }],
                hhddatas2: [],
                startTime: '',
                endTime: '',
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

            }
        },
        mounted: function () {
            this.getStoreList();
            this.form.timelimitselectvalue = '2';
        },
        methods: {
            sumite: function () {
                //活动类型
                let message = {};
                if (this.routerId == 1) {
                    message.cashType = 0;
                    //          发放条件
                    message.sendLeast = this.form.term4;
                    //红包领取次数
                    message.pickLimitTotalNum = this.form.limit;
                    message.pickLimitType = this.form.date;
                    message.pickLimitNum = this.form.degree;
                } else if (this.routerId == 2) {
                    message.cashType = 3;
                    message.getPointMoney = this.form.term2;
                    //          集点次数
                    message.pointNum = this.form.term3;
                    //          红包领取
                    message.pickLimitTotalNum = this.form.limit;
                    message.pickLimitType = this.form.date;
                    message.pickLimitNum = this.form.degree;
                } else if (this.routerId == 3) {
                    message.cashType = 4;
                    //          发放条件
                    message.sendLeast = this.form.term4;

                } else if (this.routerId == 4) {
                    message.cashType = 2
                } else if (this.routerId == 5) {
                    message.cashType = 5;
                    //          发放条件
                    message.unPayDay = this.form.term5;
                    message.sendLeast = this.form.term6;
                } else if (this.routerId == 6) {
                    message.cashType = 1;
                    //          指定单品
                    message.goodsIds = JSON.stringify(this.multipleSelection);
                    message.pickLimitTotalNum = this.form.limit;
                }
                //        红包名称
                message.couponName = this.form.name;
                //        红包预算
                message.totalMoney = this.form.budget;
                //        红包发放数量
                message.totalNum = this.form.number;
                //        红包发放形式
                if (this.form.radio == 1) {
                    message.prizeType = 'random';
                } else {
                    message.prizeType = 'fixed'
                }
                //        红包发放时间
                message.startTime = this.startTime;
                message.endTime = this.endTime;
                //门店列表
                message.shopInfoIds = this.checkedshops.join();
                //活动说明
                message.prizeMsg = this.form.text;
                //领取时间限制
                if (this.form.timelimitselectvalue == 1) {
                    message.isPickLimit = '1';
                    message.pickWeekLimit = weekDispose(this.checkList);
                    message.pickTimeLimit = DateLong(this.times);
                } else {
                    message.isPickLimit = '0';
                }
                let data = this.qs.stringify(message);
                getAlipy(data)
                    .then(res => {
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        });
                        if (res.errorCode == 10000) {
                            this.$router.push('/packettypelist')
                        }
                    });
            },
            timeChange: function () {
                this.startTime = formateDate(this.form.time[0]);
                this.endTime = formateDate(this.form.time[1]);
            },
            //搜索商品
            queryF: function () {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000',
                    name: this.food.name,
                    maxPrice: this.food.priceTop,
                    minPrice: this.food.priceBot
                });
            },
            //   确定按钮
            choosegoodstruebut: function () {
                this.choose_goods = false;
                this.multipleSelectionLength = this.multipleSelection.length;
            },
            //      获取商品分类
            getStoreList: function (data) {
                //        获取门店列表
                getShopLists(data)
                    .then(res => {
                        this.Objects = res.content.resultList;
                    });
            },
            //分类查询商品
            clickkinds(category_id, shop_id) {
                // this.choosekinds = id;
                this.choosekinds = category_id;
                let data = this.qs.stringify({
                    shopId: shop_id,
                    goodsCategoryId: category_id
                });
                getShopDetail(data)
                    .then(res => {
                        this.tableData = res.content.list;
                    })
            },
            clickShop: function (data) {
                this.newarr.push(data);
                this.multipleSelection = this.unique(this.newarr);
            },
            unique: function (a) {
                let res = [];
                for (let i = 0, len = a.length; i < len; i++) {
                    let item = a[i];
                    (res.indexOf(item) === -1) && res.push(item)
                }
                return res
            },
            //查看商品
            checkselectGood() {
                this.checkgoodslist = true;
            },
            // 重新选择
            againselectGood() {
                this.choose_goods = true;
            },
            //选择商品
            selectGood() {
                this.choose_goods = true;
            },
            selectChange: function () {
            },
            addDomain() {
                this.times.push({
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                })
            },
            removeDomain(time) {
                var index = this.times.indexOf(time)
                if (index !== -1) {
                    this.times.splice(index, 1)
                }
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].shopId);
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
                this.getChineseName(this.checkedshops);
                this.shopsnumber = this.checkedshopstrue.length;
            },
            //选择门店寻找
            getChineseName: function (data) {
                let message = data.join();
                let datas = this.qs.stringify({
                    shopIds: message
                });
                getChineseName(datas)
                    .then(res => {
                        this.shopMessage = res.content;
                    })
            },
            //            门店查分类
            selectShop: function () {
               // alert(this.selectValue);
                let data = this.qs.stringify({
                    shopId: this.selectValue
                });
                getShopClassify(data)
                    .then(res => {
                        this.goodslist = res.content;
                    })
            }
        },
        created: function () {
            let id = this.$route.query.id;
            this.routerId = id;
            if (id == 1) {
                this.metaName = '消费返还'
            } else if (id == 2) {
                this.metaName = '消费集点送'
            } else if (id == 3) {
                this.metaName = '新客奖励'
            } else if (id == 4) {
                this.metaName = '新会员'
            } else if (id == 5) {
                this.metaName = '回归礼'
            } else if (id == 6) {
                this.metaName = '指定单品送'
            }
            // var curRouter = this.$router.currentRoute;
            // this.$store.commit("dealData", {
            //     path: curRouter.path,
            //     name: this.metaName
            // });
        }
    }
</script>
<style scoped>
    .zj-button {
        margin-bottom: 50px;
    }

    .zj-button button {
        width: 72px;
        height: 28px;
        background-color: #00a0e9;
        color: #fff;
        border-radius: 4px;
    }

    .zj-goods {
        margin-top: 15px;
        margin-left: 36%;
    }

    .zj-goods span:nth-child(1) {
        text-align: center;
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 38px;
        font-size: 12px;
    }

    .zj-button {
        margin-top: 15px;
        margin-left: 650px;
    }

    .zj-goods span:nth-child(2) {
        color: #20a0ff;
        font-size: 12px;
    }

    .bgf4f4f4 {
        margin-left: 80px;
    }

    .zj-place {
        margin-left: 36%;
        font-size: 12px;
        margin-top: 20px;
        line-height: 30px;
    }

    .zj-degree {
        margin-top: 20px;
        line-height: 30px;
        font-size: 12px;
        margin-left: 42%;
    }

    .zj-limit {
        margin-left: 36%;
        font-size: 12px;
        margin-top: 20px;
        line-height: 30px;
    }

    .zj-term {
        margin-left: 36%;
        display: flex;
        margin-top: 20px;
        /*line-height: ;*/
        font-size: 12px;
    }

    .zj-term p {
        margin: 0;
        line-height: 30px;
    }

    .zj-text {
        display: flex;
        /*margin-top: 10px;*/
        margin-left: 36%;
    }

    .zj-text textarea {
        width: 320px;
        margin-top: 10px;
        height: 160px;
        resize: none;
        border: 1px solid #bfcbd9;
        outline: none;
        padding: 4px;
        border-radius: 5px;
    }

    .zj-shop {
        margin-top: 15px;
        margin-left: 36%;
    }

    .zj-time {
        margin-top: 20px;
        margin-left: 36%;
    }

    .zj-times {
        width: 320px;
        height: 32px;
    }

    .zj-time span,
    .zj-shop span,
    .zj-text span,
    .zj-term span {
        text-align: center;
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 38px;
        font-size: 12px;
    }

    .zj-money {
        line-height: 30px;
        font-size: 12px;
        margin-top: 5px;
        margin-left: 108px;
    }

    .zj-number {
        width: 72px;
        height: 32px;
    }

    .main {
        width: 98%;
        /*outline: 1px solid red;*/
        overflow-x: hidden;
    }

    .zj-shape p:nth-of-type(1) {
        font-size: 12px;
        margin-left: 106px;
        margin-top: 8px;
    }

    .zj-shape p:nth-of-type(2) {
        font-size: 12px;
        margin-left: 106px;
        margin-top: 8px;
    }

    .zj-shape {
        margin-left: 36%;
        margin-top: 18px;
    }

    .zj-shape span {
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 38px;
        font-size: 12px;
    }

    .zj-budget {
        width: 279px;
        height: 32px;
    }

    .zj-name {
        width: 320px;
        height: 32px;
    }

    .zj-content {
        display: flex;
        margin-left: 36%;
        margin-top: 18px;
    }

    .zj-content span {
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 38px;
        font-size: 12px;
    }

    .zj-title {
        width: 800px;
        display: flex;
        /*justify-content:center;*/
        align-items: center;
        margin-top: 40px;
        margin-left: 30%;
    }

    .zj-title span:nth-of-type(1) {
        display: inline-block;
        width: 10px;
        height: 20px;
        background-color: #00a0e9;
        margin-right: 5px;
    }

    .zj-title span {
        color: #333;
        font-size: 14px;
    }
    .right_box_title{
        margin-top: -30px;
        margin-bottom: 30px;
    }
    .zj-select{
        margin-top: -20px;
    }
.zj-bodyd{
    height:430px!important;
}
</style>
