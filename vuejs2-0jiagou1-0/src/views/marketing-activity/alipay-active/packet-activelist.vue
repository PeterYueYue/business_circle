<!--红包活动列表-->
<template>
    <div class="busarea_active_main">
        <div class="tab_header">
            <span class="line_height_30 font14">活动类型 :&nbsp;</span>
            <el-select v-model="activeselectvalue" placeholder="请选择活动类型" size="small" class=" margin_r_10">
                <el-option v-for="item in activeselectdata" :key="item.activeId" :label="item.activeName" :value="item.activeId">
                </el-option>
            </el-select>
            <span class=" line_height_30 font14">活动状态 :&nbsp;</span>
            <el-select v-model="stateselectvalue" placeholder="请选择活动状态" size="small" class=" margin_r_10">
                <el-option v-for="item in stateselectdata" :key="item.stateId" :label="item.stateName" :value="item.stateId">
                </el-option>
            </el-select>
            <span class="demonstration">交易时间 :&nbsp;</span>
            <el-date-picker v-model="timevalue" type="daterange" :editable="editable" size="small" @change="timeChange" placeholder="选择时间范围">
                <!--  :picker-options="pickerOptions"   -->
            </el-date-picker>
            <el-button type="primary" size="small" class="query_button" @click="query">搜 索</el-button>
            <el-button type="primary" size="small" class="query_refresh" @click="refresh">刷新状态</el-button>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table :data="tableData">
                    <el-table-column type="index" width="100" label="序号">
                    </el-table-column>
                    <el-table-column prop="time" label="活动时间">
                        <template scope="scope">
                            <div>
                                <span>{{scope.row.startTime}} 至 {{scope.row.endTime}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="couponName" label="现金红包名称">
                    </el-table-column>
                    <el-table-column prop="addr" label="已领金额/红包总金额">
                        <template scope="scope">
                            <div>
                                <span>{{scope.row.sendMoney }} 元/ {{scope.row.totalMoney}}元</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="linkMan" label="红包领取数/总个数">
                        <template scope="scope">
                            <div>
                                {{scope.row.sendNum}} / {{scope.row.totalNum}}
                            </div>
                            <div>
                                <router-link :to="{path:'pointgive',query:{id:scope.row.id}}">
                                    <el-button type="text" size="small">查看详情</el-button>
                                </router-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="statusStr" label="活动状态">
                    </el-table-column>
                    <el-table-column prop="mobile" label="操作">
                        <template scope="scope">
                            <div>
                                <!--<router-link :to="{path:'goodscheck',query:{id:1}}">-->
                                <el-button type="text" size="small" v-if="scope.row.status == 'CREATED'" @click="closed(scope.row.payUrl)">去打款
                                </el-button>
                                <span style="color: #ddd" v-if="scope.row.status == 'CREATED'">&nbsp;|</span>
                                <!--</router-link>-->
                                <!-- <router-link  :to="{path:'goodscheck',query:{id:scope.row.prop10}}"> -->
                                <el-button type="text" size="small" v-if="scope.row.status == 'READY'" @click="end(scope.row.id,scope.row.status)">暂停</el-button>
                                <span style="color: #ddd" v-if="scope.row.status == 'READY'">&nbsp;|</span>
                                <!-- </router-link> -->
                                <!-- <router-link  :to="{path:'goodscheck',query:{id:scope.row.prop10}}"> -->
                                <el-button type="text" size="small" v-if="scope.row.status == 'PAUSE'" @click="end(scope.row.id,scope.row.status)">开始</el-button>
                                <span style="color: #ddd" v-if="scope.row.status == 'PAUSE'">&nbsp;|</span>
                                <!-- </router-link> -->
                                <!--<router-link :to="{path:'goodscheck',query:{id:scope.row.prop10}}">-->
                                <el-button type="text" size="small" v-if="scope.row.status == 'PAUSE' || scope.row.status == 'READY'" @click="end(scope.row.id,scope.row.status)">结束
                                </el-button>
                                <span style="color: #ddd" v-if="scope.row.status == 'PAUSE' || scope.row.status == 'READY'">&nbsp;|</span>
                                <!--</router-link>-->
                                <router-link :to="{path:'packetnumberdetail',query:{id:scope.row.id}}">
                                    <el-button type="text" size="small">查看详情</el-button>
                                </router-link>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleCurrentChange" :page-size="10" layout=" prev, pager, next,jumper" :total="totalPage" class="foot_nav">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { formateDate } from '../../../api/CommonMethods';
    import { getAlipyList,alipyEnd,alipyRefresh} from '../../../api/api';
    // import { ipAddress } from '../../../service'

    export default {
        data() {
            return {
                totalPage: 1,
                tableData: [],
                activeselectvalue: '',
                activeselectdata: [
                    { activeId: '', activeName: '全部' },
                    { activeId: '0', activeName: '消费返还' },
                    { activeId: '3', activeName: '消费集点送' },
                    { activeId: '4', activeName: '新客奖励' },
                    { activeId: '2', activeName: '新会员' },
                    { activeId: '5', activeName: '回归礼' },
                    { activeId: '1', activeName: '指定单品送' },
                ],
                stateselectvalue: '',
                stateselectdata: [
                    { stateId: '', stateName: '全部' },
                    { stateId: 'CREATED', stateName: '已创建未打款' },
                    { stateId: 'PAID', stateName: '已打款' },
                    { stateId: 'PAUSE', stateName: '活动已暂停' },
                    { stateId: 'CLOSED', stateName: '活动已结束' },
                    { stateId: 'SETTLE', stateName: '活动已清算' },
                ],
                timevalue: '',
                page: '',
                pickerOptions: {
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
                editable: false,

            }
        },
        mounted: function() {
            let message = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10'
            });
            this.listQuery(message);
        },
        methods: {
            refresh(){
                alipyRefresh()
                    .then(res=>{
                        if(res.errorCode == 10000){
                            this.$message({
                                message: '恭喜你，刷新成功了!',
                                type: 'success'
                            });
                        }else if(res.errorCode == 30005) {
                            this.$router.push('/login')
                        } else {
                            this.$message({
                                message: '出现问题,请联系管理员!',
                                type: 'warning'
                            });
                        }
                    })
            },
            end(id, status) {
                this.$confirm('暂停/结束该活动?, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ended(id, status);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            ended: function(id, status) {
                let statesed;
                if (status == 'READY') {
                    //暂停
                    statesed = 'PAUSE'
                } else if (status == 'PAUSE') {
                    //开始
                    statesed = 'READY'
                } else if (status == 'CREATED') {
                    //结束
                    statesed = 'CLOSED'
                }
                let datas = this.qs.stringify({
                    id: id,
                    status: statesed
                });

                // this.$http.post(`${ipAddress}/front/ali_cash_activity!changeActivityStatus.action`, data)
                alipyEnd(datas)
                    .then(res => {
                        this.listQuery();
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    })
            },
            closed: function(url) {
                if (url) {
                    window.open(url);
                }
            },
            listQuery: function(id) {
                getAlipyList(id)
                    .then(res => {
                        if (res.errorCode == 10000) {
                            this.tableData = res.content.resultList;
                            this.totalPage = res.content.totalCount;
                        }else if(res.errorCode == 30005){
                            this.$router.push('/login')
                        }
                    })

            },
            handleCurrentChange: function(val) {
                this.page = val;
                let message = this.qs.stringify({
                    pageNumber: val,
                    pageSize: '10'
                });
                this.listQuery(message);
            },
            query: function() {

                let message = this.qs.stringify({
                    cashType: this.activeselectvalue,
                    status: this.stateselectvalue,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    pageNumber: this.page,
                    pageSize: '10'
                });
                this.listQuery(message);
            },
            timeChange: function() {
                if (this.timevalue) {
                    this.startTime = formateDate(this.timevalue[0]);
                    this.endTime = formateDate(this.timevalue[1]);
                }

            }

        }
    }
</script>
<style scoped>
    .query_refresh{
        width: 70px;
        float: right;
    }
    .zj-mian{
        outline: 1px solid red;
    }
    .busarea_active_main{
        width: 98%;
         /*outline: 1px solid red;*/
        margin: 0 10px;
    }
</style>
