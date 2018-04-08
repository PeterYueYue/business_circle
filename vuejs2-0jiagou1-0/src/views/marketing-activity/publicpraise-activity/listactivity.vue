<!--活动列表-->
<template>
    <div class="zj-main padding_10">
       <div class="tab_header padding_t_l_r_0">
            <span>活动类型 : </span>
            <el-select v-model="typeselectvalue" placeholder="请选择" size="small">
                <el-option
                        v-for="item in typeselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            &#X3000;
            <span>活动状态 : </span>
            <el-select v-model="statusselectvalue" placeholder="请选择" size="small">
                <el-option
                        v-for="item in statusselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            &#X3000;
            <span>活动时间 : </span>
            <el-date-picker
                v-model="activetime"
                size="small"
                type="daterange"
                :picker-options="pickerOptions2"
                :editable="editable"
                placeholder="选择时间范围">
            </el-date-picker>
            <el-button class="query_button" @click="getList" type="primary" size="small">搜 索</el-button>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData">
                    <el-table-column prop="name" label="活动名称" >
                    </el-table-column>
                    <el-table-column prop="time" label="活动时间">
                        <template scope="scope">
                            <span>{{scope.row.activeStartDate}}</span> - <span>{{scope.row.activeEndDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="活动类型">
                        <template scope="scope">
                            <span v-if="scope.row.investmentType == 'PAYMENT_RESULT'">消费送券</span>
                            <span v-if="scope.row.investmentType == 'SHOP_DETAIL'">扫码送券</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="number_all" label="券核销数/券领取数(张)">
                        <template scope="scope">
                            <p v-if="scope.row.investmentStatus == 0||scope.row.investmentStatus == 1">/</p>
                            <div v-if="scope.row.investmentStatus == 2||scope.row.investmentStatus == 3">
                                <p>{{scope.row.verifyNum}} / {{scope.row.receiveNum}}</p>
                                <el-button @click="click_detail(scope.row.id)"  type="text" size="small">查看详细</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="活动状态">
                        <template scope="scope">
                            <p v-if="scope.row.investmentStatus == 0">招商进行中</p>
                            <p v-if="scope.row.investmentStatus == 1">招商结束,待开始</p>
                            <p v-if="scope.row.investmentStatus == 2">进行中</p>
                            <p v-if="scope.row.investmentStatus == 3">已结束</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="play" label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.offline == '0'" @click="closeactive(scope.row.id)"  type="text" size="small">结束<span style="color:#333"> | </span></el-button>
                            <router-link :to="{path:'consumedetail',query:{id:scope.row.id}}">
                                <el-button  type="text" size="small">查看活动详情</el-button>
                            </router-link>
                            <!--<router-link v-if="scope.row.investmentType == 'PAYMENT_RESULT'" :to="{path:'consumedetail',query:{id:scope.row.id}}">
                                <el-button  type="text" size="small">查看活动详情</el-button>
                            </router-link>-->
                            <!--<router-link v-if="scope.row.investmentType == 'SHOP_DETAIL'" :to="{path:'scancodedetail',query:{id:scope.row.id}}">
                                <el-button  type="text" size="small">查看活动详情</el-button>
                            </router-link> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    :page-size="10" 
                    layout="total, prev, pager, next,jumper" 
                    :total="pageCount" 
                    class="foot_nav">
                </el-pagination>
                <!--券数据明细表格-->
                <el-dialog
                    title="券数据明细"
                    v-model="dialogVisible_queryshops"
                    size="small"
                    top="20%">
                    <div class="">
                        <div class="block">
                            <el-table
                            :data="dataile_tableData">
                                <el-table-column
                                label="券序号"
                                    type="index"
                                    width="50">
                                </el-table-column>
                                <el-table-column prop="brandName" label="券名称" >
                                </el-table-column>
                                <el-table-column prop="voucherNum" label="发放数量">
                                </el-table-column>
                                <el-table-column prop="type" label="核销数/领取数">
                                    <template scope="scope">
                                        <p>{{scope.row.verifyNum}} / {{scope.row.receiveNum}}</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-dialog>
                <!--结束提示-->
                <el-dialog
                    title="提示"
                    v-model="dialogVisible_closeactive"
                    size="tiny"
                    top="30%">
                    <p style="text-align: center;">是否确认结束该活动?</p>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_closeactive = false">取 消</el-button>
                        <el-button type="primary" @click="closetrue_btn">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import {formateDate} from '../../../api/CommonMethods'
    import {getInvestmentPager,activeoffline,getSonVoucher} from '../../../api/api';
    export default {
        data() {
            return {
                pageNumber:'1',
                activeId:'',
                pageSize:'10',
                pageCount:0,
                activetime:'',
                editable:false,
                typeselectvalue:'',
                statusselectvalue:'',
                dialogVisible_queryshops:false,
                dialogVisible_closeactive:false,
                tableData:[],
                dataile_tableData:[],
                activeStartDate:'',
                activeEndDate:'',
                typeselectdata:[
                    {value: '', label: '全部'},
                    {value: 'PAYMENT_RESULT', label: '消费送券'},
                    {value: 'SHOP_DETAIL', label: '扫码送券'},
                ],
                statusselectdata:[
                    {value: '', label: '全部'},
                    {value: '0', label: '招商进行中'},
                    {value: '1', label: '招商结束,待进行'},
                    {value: '2', label: '进行中'},
                    {value: '3', label: '已结束'},
                ],
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
        mounted: function() {
            this.getList();
        },
        methods: {
            //搜索按钮调用函数
            getList(){
                if(this.activetime[0]){
                    this.activeStartDate = formateDate(this.activetime[0]);
                    this.activeEndDate = formateDate(this.activetime[1]);
                }else{
                    this.activeStartDate = '';
                    this.activeEndDate = '';
                }
                let data = this.qs.stringify({
                    'investment.investmentType':this.typeselectvalue,
                    'investment.investmentStatus':this.statusselectvalue,
                    'investment.activeStartDate':this.activeStartDate,
                    'investment.activeEndDate':this.activeEndDate,
                    'pageNumber':this.pageNumber,
                    'pageSize':this.pageSize,
                });
                getInvestmentPager(data)
                    .then(res=>{
                        this.tableData = res.content.resultList;
                        this.pageCount = res.content.pageCount;
                })
            },
            //页码变化时
            handleCurrentChange(val){
                this.pageNumber = val;
                this.getList();
            },
            //券核销数/券领取数  查看详细
            click_detail(id){
                this.dialogVisible_queryshops = true;
                let data = this.qs.stringify({
                    voucherId:id
                });
                getSonVoucher(data)
                    .then(res=>{
                        this.dataile_tableData = res.content.resultList;
                })
            },
            //结束活动
            closeactive(id){
                this.dialogVisible_closeactive = true;
                this.activeId = id;
            },
            //确认关闭活动  确认按钮
            closetrue_btn(){
                let data = this.qs.stringify({
                    voucherId:this.activeId
                });
                activeoffline(data)
                    .then(res=>{
                        if(res.status == 'error'){
                            this.$message.error(res.message);
                        }else if(res.status == 'success'){
                            this.$message.success('活动结束成功');
                        }
                        this.getList();
                })
                this.dialogVisible_closeactive = false;
            }
        }
    }
</script>
<style scoped>
    .padding_10{
        padding: 16px;
        width: auto;
    }
</style>