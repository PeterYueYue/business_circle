<!--活动流水-->
<template>
    <div class="sq_main">
        <div class="tab_header only_input">
        
        <span class=" line_height_30">门店选择 :&nbsp;</span>
        <el-select v-model="selectvalue" placeholder="请选择" size="small" class=" margin_r_10" @change="selectChange">
            <el-option
            v-for="item in selectdata"
            :key="item.id"
            :label="item.main_shop_name"
            :value="item.id">
            </el-option>
        </el-select>
        <span>交易日期:</span>
        <el-date-picker
            v-model="value3"
            size="small"
            type="daterange"
            :picker-options="pickerOptions2"
            placeholder="选择时间范围">
        </el-date-picker>
        <el-button class="query_button" @click="getList" type="primary" size="small">搜 索</el-button>
        
        
        

        </div>

        <div class="tab_list">
        <div class="block">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="交易时间"
                class="active_time_pad"
                width="90">
                <template scope="scope">
                <p>{{scope.row.createDate}}</p>
                <p>{{scope.row.createTime}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="ordernumber"
                label="订单号/交易号"
                min-width="260">
                <template scope="scope">
                    <div>
                        <span class="width60">订单号 :</span>
                        <span class="">{{scope.row.paymentSn}}</span>
                    </div>
                    <div v-if="scope.row.tradeNo">
                        <span class="width60">交易号 :</span>
                        <span class="">{{scope.row.tradeNo}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="money"
                label="订单金额(元)"
                min-width="200">
                <template scope="scope">
                    <div>
                        <span class="width60">订单金额 :</span>
                        <span class="">{{ scope.row.totalAmount.toFixed(2)}}</span>
                    </div>
                    <div>
                        <span class="width60">实收 :</span>
                        <span class="">{{ scope.row.receiptAmount.toFixed(2)}}</span>
                    </div>
                    <div>
                        <span class="width60">优惠 :</span>
                        <span class="">{{ scope.row.allPreferential.toFixed(2)}}</span>
                    </div>
                </template>

            </el-table-column>
            <el-table-column
                prop="saletype"
                min-width="100"
                label="优惠方式">
                <template scope="scope">
                    <div>
                        <span class="width60">积分优惠 :</span>
                        <span class="">{{ scope.row.integralDiscount}}</span>
                    </div>
                    <div>
                        <span class="width60">券优惠 :</span>
                        <span class="">{{ scope.row.voucherDiscount}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="shopName"
                label="门店"
                min-width="150">
            </el-table-column>
            </el-table>
            <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next,jumper"
            :total="number"
            class="foot_nav">
            </el-pagination>
        </div>
        </div>
    </div>
</template>

<script>
    import {getactiveList,getShopList,getLoginStatus}  from '../../../api/api'
    import {formatTimestamp,formateDate}  from '../../../api/CommonMethods'
    export default {
        data() {
            return {
                page:1,
                number:0,
                tableData: [],
                value3: [],
                selectdata: [{main_shop_name:'全部门店',id:''}],
                selectvalue:'' ,
                // 日期选择快捷建
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
        mounted:function () {
            getLoginStatus().then(res=>{
                if(res == false){
                    this.$router.push({path: '/login'});
                }
            });
            let  data=this.qs.stringify({
                pageNumber:'1',
                pageSize:'10'
            });
            this.getStore(data);
        },
        methods: {
            getList:function(){
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                if(this.value3[0]){
                let startTime=formateDate(this.value3[0]);
                let endTime=formateDate(this.value3[1]);
                let StartTime=formatTimestamp(this.value3[0]);
                let EndTime=formatTimestamp(this.value3[1]);
                if(EndTime-StartTime >7776000){
                    this.$message('查询时间范围不能超过3个月,请重新选择!')
                }else{
                    let data = this.qs.stringify({
                        page:this.page,
                        count:10,
                        startTime:startTime,
                        endTime:endTime,
                        shopid:this.selectvalue
                    });
                    getactiveList(data).then(res=>{
                        this.number = res.content.num;
                        this.tableData = res.content.list;
                        if(res.content.list.length == 0){
                            this.$message("暂无数据!")
                        }
                    })
                }
                }
            },
            ViewDetails(index){
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            getStore(data){
                getShopList(data).then(res=>{
                    var downdata = res.content.resultList;
                    this.selectdata = this.selectdata.concat(downdata);
                })
            },
            selectChange:function () {
            }
        }
    }

</script>
<style>
    .width60 {
        display: inline-block;
    width: 60px;
    text-align: right;
  }
  .pop-icon {
  color: #00a0ea;
  margin-left: 4px;
  border: none !important;
  background-color: white;
  outline:none;
}

.pop-icon:hover {
  cursor: pointer;
}
.disappear {
  display: none;
}
.pop-state-select{
  margin-left: 6px;
}
.pop-states{
  font-size: 12px!important;
}

.pop-v-optional{
  margin-top: 10px;
}
.line_height_30{
    line-height: 30px;
}

.only_input  .el-select .el-input {
    width: 200px;
}
.only_input  .el-select{
    width: 200px;
}
.el-table .cell div{
    width: 100%;
    text-align: center;
}
</style>