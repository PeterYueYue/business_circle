<!--账单汇总-->
<template>
    <div class="sq_main">
        <div class="tab_header only_input">
            <div class="block pop-d-block">
                <span class=" line_height_30 font14">门店选择 :&nbsp;</span>
                <el-select v-model="selectvalue" placeholder="请选择" size="small" @change="queryData"
                           class=" margin_r_10">
                    <el-option
                            v-for="item in selectdata"
                            :key="item.id"
                            :label="item.main_shop_name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <span class="demonstration">交易时间</span>
                <el-date-picker
                        v-model="value3"
                        type="daterange"
                        size="small"
                        placeholder="选择时间范围"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="pop-button">
                <el-button type="primary" size="small" class="query_button" @click="queryData">搜 索</el-button>
                <!--<el-button size="small" class="query_button">重 置</el-button>-->
                <!--<button v-if="onece == '1'" @click="packup" class="pop-icon">收起-->
                <!--<svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-shangsheng"></use>-->
                <!--</svg>-->
                <!--</button>-->
                <!--<button v-if="onece != '1'" @click="packto" class="pop-icon">展开-->
                <!--<svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-xiajiang"></use>-->
                <!--</svg>-->
                <!--</button>-->
            </div>
        </div>
        <!--可选参数-->
        <!--<div class="pop-optional" v-bind:class="{disappear : onece == '2'}">-->
        <!--<label>终端号:</label><input type="text">-->
        <!--<label>操作员:</label><input type="text">-->
        <!--<label>交易状态:</label><input type="text">-->
        <!--</div>-->

        <div class="tab_list summary_set_height">
            <div class="tongjidiv">
                <span>营销金额 :</span>
                <span>{{checkdata1}}</span>
                <span>元</span>
                <span class="margin_l_20">积分优惠 :</span>
                <span>{{checkdata2}}</span>
                <span> 元</span>
                <span class="margin_l_20">券优惠 :</span>
                <span>{{checkdata3}}</span>
                <span>元</span>
            </div>
            <div class="block">
                <el-table
                        v-if="memberkinds.name_false"
                        :data="tableData2"
                        style="width: 100%">
                    <el-table-column
                            label="门店"
                            width="240">
                            <template scope="scope">
                                <div class="main_shop_name">{{scope.row.shopName}}</div>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="totalAmount"
                            label="订单金额(元)">
                    </el-table-column>
                    <el-table-column
                            prop="totalCount"
                            label="订单笔数(笔)">
                    </el-table-column>
                    <el-table-column
                            prop="receiptAmount"
                            label="商家实收(元)">
                    </el-table-column>
                    <el-table-column
                            prop="cardnumber"
                            label="商家优惠(元)">
                        <template scope="scope">
                            <div>
                                <span class="width60">积分优惠 :</span>
                                <span class="">{{ scope.row.integralDiscount.toFixed(2)}}</span>
                            </div>
                            <div>
                                <span class="width60">券优惠 :</span>
                                <span class="">{{ scope.row.voucherDiscount.toFixed(2)}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="5"
                        layout="total, prev, pager, next,jumper"
                        :total="pageCount"
                        class="foot_nav">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import {getShopList, getbillList, getLoginStatus} from '../../../api/api'
    import {formateDate, formatTimestamp} from '../../../api/CommonMethods'

    export default {
        data() {
            return {
                //                展开收起默认参数
                onece: '2',
                //                时间选择
                value3: [],
                //              下拉选择
                selectdata: [{main_shop_name: '全部门店', id: ''}],
                pageCount: 0,
                pageNumber: 1,
                selectvalue: '',
                checkdata1: '0.00',
                checkdata2: '0.00',
                checkdata3: '0.00',
                selectdefault: '',
                memberkinds: {
                    name_true: false,
                    name_false: true
                },
                tableData2: [],
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
            getLoginStatus().then(res => {
                if (res == false) {
                    this.$router.push({path: '/login'});
                }
            });
            let data = this.qs.stringify({
                pageNumber: 1,
                pageSize: 10000,
            });
            this.getStore(data);
        },
        methods: {
            queryData: function () {
                getLoginStatus().then(res => {
                    if (res == false) {
                        this.$router.push({path: '/login'});
                    }
                });

                if (this.value3[0]) {
                    let startTime = formateDate(this.value3[0]);
                    let endTime = formateDate(this.value3[1]);
                    let StartTime = formatTimestamp(this.value3[0]);
                    let EndTime = formatTimestamp(this.value3[1]);
                    if (EndTime - StartTime > 7776000) {
                        this.$message('查询时间范围不能超过3个月,请重新选择!')
                    } else {
                        let data = this.qs.stringify({
                            pageNumber: this.pageNumber,
                            pageSize: 10,
                            beginTime: startTime,
                            endTime: endTime,
                            shopId: this.selectvalue
                        })
                        getbillList(data).then(res => {
                            if (res.content.resultList == null) {
                                this.$message("暂无数据!")
                                this.tableData2 = [];
                            } else {
                                this.checkdata1 = res.content.pageTotalAmount.toFixed(2);
                                this.checkdata2 = res.content.pageIntegralDiscount.toFixed(2);
                                this.checkdata3 = res.content.pageVoucherDiscount.toFixed(2);
                                this.pageCount = res.content.pageCount;
                                this.tableData2 = res.content.resultList;
                            }
                        })
                    }
                }
            },
            // packup: function () {
            //     this.onece = '2'
            // },
            // packto: function () {
            //     this.onece = '1'
            // },

            ViewDetails(index) {
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.queryData();
            },
            //获取门店列表
            getStore(data) {
                getLoginStatus().then(res => {
                    if (res == false) {
                        this.$router.push({path: '/login'});
                    }
                });
                getShopList(data).then(res => {
                    var downdata = res.content.resultList;
                    this.selectdata = this.selectdata.concat(downdata);
                })
            }
        }
    }

</script>
<style>
    .summary_set_height {
        height: calc(100% - 120px) !important;
    }

    .margin_l_20 {
        margin-left: 20px;
    }

    .pop-d-block {
        display: inline-block;
    }

    .pop-d-block > span {
        font-size: 12px;
    }

    .pop-button {
        /*float: left;*/
        display: inline-block;
        /*margin-right: 31px;*/
        /* margin-left: 10px; */
    }

    .pop-button button {
        outline: none;

    }

    .tongjidiv {
        margin-bottom: 10px;
        padding:0 10px;
    }

    .tongjidiv > span:nth-of-type(2),
    .tongjidiv > span:nth-of-type(5),
    .tongjidiv > span:nth-of-type(8) {
        display: inline-block;
        font-size: 26px;
        font-weight: bold;
        color: #f4333c;
        /*outline:1px solid red;*/
        position: relative;
        top: 2.5px;
        /*margin:10px 5px;*/
    }

    .tongjidiv > span:nth-of-type(1),
    .tongjidiv > span:nth-of-type(4),
    .tongjidiv > span:nth-of-type(3),
    .tongjidiv > span:nth-of-type(6),
    .tongjidiv > span:nth-of-type(7),
    .tongjidiv > span:nth-of-type(9) {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        /*outline:1px solid blue;*/
        line-height: 16px;
    }
</style>