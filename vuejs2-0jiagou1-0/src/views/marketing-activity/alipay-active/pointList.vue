<!--指定单品送-->
<template>
    <div class="tab_main">
        <div class="tab_header">
            <span class=" line_height_30">订单交易号 :&nbsp;</span>
            <el-input placeholder="请输入订单交易号" v-model="inputValue" @keyup.enter.native="query" size="small"
                      class="pop-summary-input"></el-input>
            <span class="demonstration m_l_10">交易日期:</span>
            <el-date-picker
                v-model="timeValue"
                type="datetimerange"
                size="small"
                :picker-options="pickerOptions2"
                placeholder="选择时间范围"
                align="right">
            </el-date-picker>
            <el-button class="query_button" type="primary" size="small" @click="spack">搜 索</el-button>
            <el-button class="query_button" type="primary" size="small" style="margin-left:200px;" @click="back">返 回</el-button>

        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                    :data="tableData2">
                    <el-table-column
                        type="index"
                        width="100"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="红包领取时间">
                    </el-table-column>
                    <el-table-column
                        prop="paymentSn"
                        label="订单交易号">
                    </el-table-column>
                    <el-table-column
                        prop="aliUid"
                        label="用户UID">
                    </el-table-column>
                    <el-table-column
                        prop="aliAccount"
                        label="支付宝账号">
                    </el-table-column>
                    <el-table-column
                        prop="prizeAmount"
                        label="红包领取金额(元)">
                    </el-table-column>
                    <el-table-column
                        prop="payAmount"
                        label="消费金额(元)">
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next,jumper"
                    :total="totalPage"
                    class="foot_nav">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {formateDate} from '../../../api/CommonMethods'
    import {alipyPointList} from '../../../api/api';
    // import { ipAddress } from '../../../../service'
    export default {
        data() {
            return {
                pageNumber: '',
                totalPage: 1,
                id: '',
                startTimes: '',
                endTime: '',
                editable: false,
                tableData2: [],
                timeValue: '',
                inputValue: '',
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
            let message = this.qs.stringify({
                id: this.id,
                pageNumber: 1,
                pageSize: 10
            });
            this.query(message)
        },
        methods: {
            back:function(){
                this.$router.go(-1);
            },
            query: function (message) {
                // this.$http.post(`${ipAddress}/front/ali_cash_activity!getAliCashLogPager.action`, message)
                alipyPointList(message)
                    .then(res => {
                        if (res.errorCode == 10000) {
//                  页码
                            this.totalPage = res.content.totalCount;
                            this.tableData2 = res.content.resultList;
                        }else if(res.errorCode == 30005){
                            this.$router.push('/login')
                        }
                    })
            },
            //          搜索
            spack: function () {
                if (this.timeValue) {
                    this.startTimes = formateDate(this.timeValue[0]);
                    this.endTime = formateDate(this.timeValue[1])
                }

                let message = this.qs.stringify({
                    paymentSn: this.inputValue,
                    startTime: this.startTimes,
                    endTime: this.endTime,
                    pageNumber: this.pageNumber,
                    pageSize: 10
                });
                this.query(message)
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                let message = this.qs.stringify({
                    id: this.id,
                    pageNumber: val,
                    pageSize: 10
                });
                this.query(message)
            }
        },
        created: function () {
            var curRouter = this.$router.currentRoute;
            // this.$store.commit("dealData", {
            //     path: curRouter.path,
            //     name: curRouter.meta.name
            // });
            this.id = this.$route.query.id;
        }
    }
</script>
<style scoped>
    .tab_main{
        margin: 10px 10px;
    }
    .m_l_10 {
        margin-left: 10px;
    }
</style>
