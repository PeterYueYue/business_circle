<!--活动营销/单品营销-->
<template>
    <div class="zj-main">
        <div class="ticket_show">
            <div>
                <img src="../../../assets/images/ticket.png" alt="">
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
                <el-form-item class="ticket_downtype" label="优惠方式 :">
                    <el-radio class="radio" v-model="form.radio" label="1">立减</el-radio>
                    <br>
                    <el-input class="width_90" type="number" size="small" v-model="form.saletype" placeholder="输入金额"
                              :maxlength="6" :max="99"
                              @change="changeInput"></el-input>
                    元<br>
                    <span class="ticket_tip">单品代金券面额。例如：金额2元，商品原价10元，用户仅需付8元</span>
                    <el-radio class="radio" v-model="form.radio" label="2">减到固定金额</el-radio>
                    <br>
                    <span>商品原价</span>
                    <el-input class="width_90" size="small" type="number" v-model="form.startprice" placeholder="输入原价"
                              :maxlength="6"
                              @change="changeInput"></el-input>
                    元, 减到
                    <el-input placeholder="输入优惠价" :maxlength="6" type="number" @change="changeInput" class="width_90"
                              size="small"
                              v-model="form.endprice"></el-input>
                    元<br>
                    <span class="ticket_tip">优惠价即为用户需付款金额。例如:原价10元，优惠价2元，用户仅需付2元</span>
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
                    <el-input class="width_90" size="small" v-model="form.number" type="number"
                              placeholder="输入数量"></el-input>
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
                <el-form-item label="商品编辑 :">
                    <div>
                        <span v-if="multipleSelectionLength">已选{{multipleSelectionLength}}种商品</span>
                        <el-button type="text" @click="checkselectGood" v-if="multipleSelectionLength">点击查看</el-button>
                        <el-button type="text" @click="againselectGood" v-if="multipleSelectionLength">重新选择</el-button>
                        <el-button type="text" @click="selectGood" v-if="!multipleSelectionLength">选择商品</el-button>
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
             <el-button type="primary" @click="queryshops_btn">确 定</el-button>
             <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
          </span>
                </el-dialog>

                <el-dialog
                    title="商品选择"
                    v-model="choose_goodsd"
                    size="large"
                    top="10%">
                    <span class="zj-span" v-if="this.shopMessage.length == 0">请先选择适用门店 ！</span>
                    <div class="choose_goods_main">
                        <div class="main_left">
                            <div class="zj-select ">
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
                                        <!--<el-button @click="clickkinds(item.id)" class="list" :type="type_size">{{item.name}}</el-button>-->
                                        <p @click="clickkinds(item.category_id,item.shop_id)"
                                           v-bind:class='{active1 : item.category_id == choosekinds}'>
                                            {{item.category_name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="main_right">
                            <div class="right_box">
                                <div class="right_box_title">
                                    <!--<span>商品名称</span>-->
                                    <!--<el-input class="right_query_input" size="small" v-model="food.name"-->
                                    <!--placeholder="请输入商品名称"></el-input>-->
                                    <!--<span>价格</span>-->
                                    <!--<el-input class="right_title_input" v-model="food.priceTop" size="small"></el-input>-->
                                    <!--<span>至</span>-->
                                    <!--<el-input class="right_title_input" v-model="food.priceBot" size="small"></el-input>-->
                                    <!--<el-button class="margin_l_20" type="primary" size="small" @click="queryF">搜  索-->
                                    <!--</el-button>-->
                                </div>
                                <div class="zj-main">
                                    <div class="zj-block">
                                        <p>待选商品</p>
                                        <table border="0">
                                            <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>商品名称</th>
                                                <th>店铺名称</th>
                                            </tr>
                                            </thead>
                                            <tbody class="zj-tbody zj-bodys">
                                            <tr v-for=" (dataSelect,index) in tableData" @click="clickShop(dataSelect)">
                                                <td>{{index + 1}}</td>
                                                <td>{{dataSelect.goodsName}}</td>
                                                <td>{{dataSelect.shopName}}</td>
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
                                                <th>店铺名称</th>
                                            </tr>
                                            </thead>
                                            <tbody class="zj-tbody">
                                            <tr v-for=" (date,index) in multipleSelection" @click="deleteShop(date)">
                                                <td>{{index + 1}}</td>
                                                <td>{{date.goodsName}}</td>
                                                <td>{{date.shopName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer zj-martop">
                         <el-button @click="choose_goodsd = false">返 回</el-button>
                         <el-button type="primary" @click="choosegoodstruebut">确 定</el-button>
                    </span>
                </el-dialog>
                <!--查看已选商品-->
                <el-dialog
                    title="查看已选商品"
                    v-model="checkgoodslist"
                    size="small"
                    top="10%">
                    <!--<p v-for="item in multipleSelection">{{item.name}}</p>-->
                    <div class="block check_choose_list">
                        <el-table
                            prop="num"
                            ref="multipleTable"
                            :data="multipleSelectionshow">
                            <el-table-column
                                type="index"
                                width="80"
                                label="序号">
                            </el-table-column>
                            <el-table-column
                                prop="goodsName"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                prop="shopName"
                                label="店铺名称">
                            </el-table-column>
                        </el-table>

                    </div>
                    <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="checkgoodslist = false">确 定</el-button>
                            <el-button @click="checkgoodslist = false">返 回</el-button>
                        </span>
                </el-dialog>
            </el-form>
            <span class="ticket_title_all select_width ">规则设置</span>
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
                <el-form-item label="是否需要积分兑换 :" style="display: none;">
                    <el-radio class="radio" v-model="form.code_radio" label="1">是</el-radio>
                    <el-radio class="radio" v-model="form.code_radio" label="2">否</el-radio>
                </el-form-item>
                <el-form-item v-if="form.code_radio == 1" label="兑换所需积分 :">
                    <el-input class="width_90" size="small" v-model="form.needcode" type="number"
                              placeholder="积分"></el-input>
                </el-form-item>
                <el-form-item v-if="form.code_radio == 2" class="setways" label="投放渠道 :">
                    <el-select v-model="form.ways" multiple placeholder="请选择" @change="choice">
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
                                <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain(time)">删除
                                </el-button>

                            </div>
                            <el-button type="primary" v-if="times.length < 5" @click="addDomain">新增</el-button>
                        </div>
                        <p class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</p>
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
                                <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain1(time)">删除
                                </el-button>

                            </div>
                            <el-button type="primary" v-if="times1.length < 5" @click="addDomain1">新增</el-button>
                        </div>
                        <p class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</p>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button class="bottom_button" size="small" type="primary" :disabled="disabled" @click="submit">
                        提 交
                    </el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        formatTimestamp,
        formateDate,
        formDateSecond,
        formDateSecond59,
        unique,
        weekDispose,
        DateLong
    } from '../../../api/CommonMethods'
    import {getShopLists, getChineseName, getShopClassify, getShopDetail, saveAloneMesssage} from '../../../api/api';

    export default {
        data() {
            return {
                times: [
                    {
                        value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                    }
                ],
                times1: [
                    {
                        value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                    }
                ],
                checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                checkList1: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                selectValue: '',
                shopMessage: '',
                loading: false,
                disabled: false,
                errorMessage: '',
                food: {
                    name: '',
                    priceTop: '',
                    priceBot: ''
                },
                moneySpread: '',
                choosekinds: '',
                wayskinds: [
                    {value: 'QR_CODE', label: '二维码'},
                    {value: 'SHORT_LINK', label: '短链接'},
                    {value: 'SHOP_DETAIL', label: '店铺主页'},
//          {value: 'PAYMENT_RESULT',label: '支付成功页'},
//          {value: 'URL_WITH_TOKEN',label: '口令送'},
                ],
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                shopsnumber: '',
                multipleSelectionLength: '',
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '0',
                showList: [],
                form: {
                    numbers: '45',
                    name: '',
                    radio: '',
                    saletype: '',
                    startprice: '',
                    endprice: '',
                    shop: '门店1',
                    number: '9999',
                    time: '',
                    timelimitselectvalue: '2',
                    detallimitselectvalue: '2',
                    limitselectvalue: '2',
                    datelimitselectvalue: '2',
                    number1: '',
                    number2: '',
                    limittime: '',
                    code_radio: '1',
                    needcode: '',
                    ways: []
                },
                timelimitselectdata: [
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                detallimitselectdata: [
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
                tableData: [],
                multipleSelection: [],
                multipleSelectionshow: [],
                goodslist: [],
                value1: '',
                hhddatas2: [],
                Objects: [],
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
                DVlue: '',
                choose_goodsd: false,
                checkgoodslist: false,
                dialogVisible_queryshops: false,
                data: {},
                voucher_start_time: '',
                voucher_end_time: '',
                arr: [],
                newarr: [],
                tableDatas: []
            }
        },
        mounted: function () {
//      queryLogin();
            let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getStoreList(data);

        },
        methods: {
            //领券时间3个函数(添加,删除,处理)
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


            addDomain1() {
                this.times1.push({
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                })
            },
            removeDomain1(time) {
                var index = this.times1.indexOf(time)
                if (index !== -1) {
                    this.times1.splice(index, 1)
                }
            },

//            门店查分类
            selectShop: function () {
//                alert(this.selectValue);
                let data = this.qs.stringify({
                    shopId: this.selectValue
                });
                getShopClassify(data)
                    .then(res => {
                        this.goodslist = res.content;
                    })
            },
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
            deleteShop: function (msg) {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].id == msg.id) {
                        this.multipleSelection.splice(i, 1);
                        this.newarr.splice(i, 1);
                        break;
                    }
                }
            },
            //搜索商品
            queryF: function () {
//        queryLogin();
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000',
                    name: this.food.name,
                    maxPrice: this.food.priceTop,
                    minPrice: this.food.priceBot
                });
            },
            //提交
            submit: function () {
                this.loading = true;
//        queryLogin();
//        标题
                this.data.name = this.form.name;
//        优惠方式
                if (this.form.radio == 1) {
                    let promo_type = 'MONEY';
                    this.data.promo_type = promo_type;
                    this.data.voucher_worth_value = this.form.saletype;
                } else if (this.form.radio == 2) {
                    let promo_type = 'REDUCETO';
                    this.data.promo_type = promo_type;
                    this.data.original_price = this.form.startprice;
                    this.data.voucher_worth_value = this.moneySpread;
                }
//        门店列表
                this.data.voucher_suit_shops = this.checkedshops.join();
                this.data.suit_shops = this.checkedshops.join();
//        数量
                this.data.quantity = this.form.number;
//         领券时间
                this.data.voucher_start_time = this.voucher_start_time;
                this.data.voucher_end_time = this.voucher_end_time;
//        券有效期
                this.data.start_time = this.voucher_start_time;
                this.data.end_time = this.voucher_end_time;
//        有效期
                this.data.relative_time = this.form.numbers;
                this.data.item_info_item_ids = JSON.stringify(this.multipleSelection);
                this.data.constraint_info_item_ids = JSON.stringify(this.multipleSelection);
//        领取限制
                if (this.form.limitselectvalue == 1) {
                    this.data.user_win_count = this.form.number1;
                }
//          每日领取限制
                if (this.form.datelimitselectvalue == 1) {
                    this.data.user_win_frequency = this.form.number2;
                }
//        是否需要积分兑换
                if (this.form.code_radio == 1) {
                    this.data.binding_point = this.form.needcode;
                    this.data.publish_channels_type = 'SHOP_DETAIL';
                } else if (this.form.code_radio == 2) {
                    delete this.data['binding_point'];
                    this.data.publish_channels_type = this.form.ways.join();
                }
       
                //领取时间限制
                if (this.form.timelimitselectvalue == 1) {
                    let arrs = weekDispose(this.checkList);
                    this.data.use_week = arrs;
                    let useTime = DateLong(this.times);
                    this.data.use_time = useTime;
                }
                //核销时间
                if (this.form.detallimitselectvalue == 1) {
                    let arrs = weekDispose(this.checkList1);
                    this.data.exchange_week = arrs;
                    let useTime = DateLong(this.times1);
                    this.data.exchange_time = useTime;
                }
                let datas = this.qs.stringify(this.data);
                if (this.multipleSelection.length > 0) {
                    this.disabled = true;
                    saveAloneMesssage(datas)
                        .then(res => {
                            this.disabled = false;
                            if (res.errorCode != 10000) {
                                this.errorMessage = res.message;
                                this.$message(res.message);
                            } else if (res.errorCode == 10000) {
                                this.loading = false;
                                this.$message(res.message);
                                this.setTime();
                            }
                        })
                } else if (this.multipleSelection.length == 0) {
                    this.$message('请选择商品!')
                }

            },
            setTime: function () {
                this.$router.push('/stampsList')
            },
            choice: function () {
            },
//分类查询商品
            clickkinds(category_id, shop_id) {
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
                this.getChineseName(this.checkedshops);
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            //查看商品
            checkselectGood() {
                this.checkgoodslist = true;
            },
            // 重新选择
            againselectGood() {
                this.choose_goodsd = true;
            },
            //选择商品
            selectGood: function () {
                this.choose_goodsd = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 优惠方式,绑定数据
            changeInput: function () {
                if (this.form.radio == 1) {
                    this.money = this.form.saletype;
                } else if (this.form.radio == 2) {
                    this.money = this.form.startprice - this.form.endprice;
                    this.moneySpread = this.form.startprice - this.form.endprice;
                }
            },
            changeTime: function () {
                if (this.time[0]) {
                    this.startTime = formateDate(this.time[0]);
                    this.endTime = formateDate(this.time[1]);
                    this.sTime = formatTimestamp(this.time[0]);
                    this.eTime = formatTimestamp(this.time[1]);
                    this.DVlue = this.eTime - this.sTime;
                    let that = this;
                    if (this.DVlue > 7776000) {
                        that.$message('时间不可以超过三个月,请重新选择!');
                    }
                    this.voucher_start_time = formDateSecond(this.time[0]);
                    this.voucher_end_time = formDateSecond59(this.time[1]);
                }
            },
            //   确定按钮
            choosegoodstruebut: function () {
                this.choose_goodsd = false;
                this.multipleSelectionLength = this.multipleSelection.length;
                this.multipleSelectionshow = this.multipleSelection;
            },
            selectGood: function () {
                this.choose_goodsd = true;
            },
            selectChange: function () {
            },
            getStoreList: function (data) {
//        获取门店列表
                getShopLists(data)
                    .then(res => {
                        this.Objects = res.content.resultList;
                    });
            }

        },
    }
</script>

<style >
    .zj-spand {
        margin-top: 6px;
        color: red;
        font-size: 12px;
    }

    .zj-martop {
        position: relative;
        top: 20px;
    }

    .zj-span {
        position: absolute;
        top: 15px;
        left: 45%;
        font-size: 20px;
        color: red;
    }

    .zj-select {
        display: flex;
        padding-left: 18px;
    }

    .zj-select > p {
        line-height: 30px;
    }

    .zj-main {
        width: 100%;
        display: flex;
    }

    .zj-block {
        width: 50%;
        outline: 1px solid #dfe6ec;
        position: relative;
        margin-top: -20px;
    }

    .select_width260 .el-select, .select_width260 .el-select .el-input {
        width: 240px;
    }

    .zj-tbody {
        display: block;
        width: 100%;
        height: 470px;
        overflow-y: scroll;
    }
    .zj-bodys{
        height: 470px!important;
    }

    .zj-block > table thead, .zj-block > tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    .zj-tbody > tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    .zj-block > p {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: 3px;
        margin: 0;
        text-align: center;
    }

    .zj-block-center {
        width: 10px;
    }

    .zj-block > table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0px;
        font-size: 12px;
        word-wrap: normal;
        text-overflow: ellipsis;
        color: black;
    }

    .zj-block > table > thead > tr {
        background-color: #dfe6ec;
    }

    .zj-block > table > thead > tr > th:nth-child(1) {
        width: 30%;
        height: 40px;
    }

    .zj-block > table > tbody {
        height: 400px;
    }

    .zj-block > table > tbody > tr > td {
        height: 40px;
        border-bottom: 1px solid #dfe6ec;
    }

    .zj-block > table > thead > tr > th:nth-child(2) {
        width: 40%;
        height: 40px;
    }

    .zj-block > table > thead > tr > th:nth-child(3) {
        width: 30%;
        height: 40px;
    }

    .zj-block > table > tbody > tr:hover {
        cursor: pointer;
    }

    .box_list p {
        line-height: 26px;
        padding-left: 8px;
    }

    .active1 {
        background: #00a0e9;
        color: white;
    }

    .ticket_title_all {
        display: inline-block;
        margin-top: 10px;
        padding-left: 8px;
        border-left: 10px solid #00a0e9;
    }

    .ticket_show {
        width: 39%;
        display: inline-block;
        margin-top: 80px;
        text-align: center;
        justify-content: center;
    }

    .ticket_show div {
        display: inline-block;
        height: 450px;
        width: 230px;
        margin: 50px auto;
        position: relative;

    }

    .select_width .el-input {
        width: 160px !important;
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
        z-index: 50;
        font-size: 20px;
    }


    .ticket_tip {
        line-height: 20px;
        display: block;
        color: #888;
        font-size: 12px;
    }

    .ticket_rule {
        vertical-align: top;
        display: inline-block;
        margin-top: 26px;
        /*float: left;*/
        width: 60%;
        /*height:100%;*/
        /*outline:1px solid red;*/
    }

    .ticket_rule .el-form {
        margin-top: 20px;
    }

    .el-form-item__label {
        padding: 8px 12px 9px 0;
    }

    .ticket_title .el-input {
        width: 260px;
    }

    .ticket_limit .el-input {
        /*width: 260px;*/
    }

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

    .bottom_margin_50 {
        margin-bottom: 50px;
    }

    .shopkinds_list {
        padding: 12px;
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }

    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 175px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .check_choose_list .el-table__body-wrapper {
        height: 385px;
    }

    .bgf4f4f4 {
        /*width: 495px;*/
        display: inline-block;
        padding: 10px;
        border: 10px solid #f4f4f4;
        border-radius: 10px;
        margin-top: 6px;
        background-color: #ffffff;
    }

    .neiform {
        display: inline-block;
        width: 400px;
    }

    .viltop {
        vertical-align: top;
        position: relative;
        top: 10px;
    }

    .neiform .el-form-item__label {
        color: #333;
    }

    /*.neiform .el-button+.el-button{
      margin-left: 0;
    }*/
    .neiform .el-input__inner {
        height: 30px !important;
    }

    .neiform .el-button {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        vertical-align: bottom;
    }

    .neiform .margin_b_20 {
        padding-top: 10px;
    }

    .bgf4f4f4 .el-checkbox__label {
        padding-left: 2px;
    }

    .bgf4f4f4 .el-checkbox {
        margin-left: 5px;
    }
</style>
