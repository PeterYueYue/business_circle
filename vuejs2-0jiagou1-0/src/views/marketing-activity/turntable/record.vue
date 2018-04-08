<template>
    <div class=" padding-10">
        <div class="tab_header only_input">
            <span>活动时间 : </span>
            <el-date-picker
                v-model="value3"
                size="small"
                type="daterange"
                @change="datachange"
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
                    <el-table-column
                    label="序号"
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column prop="start_date" label="活动开始时间" >
                    </el-table-column>
                    <el-table-column prop="end_date" label="活动结束时间">
                    </el-table-column>
                    <el-table-column prop="cost" label="消耗积分">
                    </el-table-column>
                    <el-table-column prop="total" label="抽奖次数">
                    </el-table-column>
                    <el-table-column label="已兑奖数量">
                        <template scope="scope">
                            <p>{{ scope.row.exchangeNum}}</p>
                            <router-link  :to="{path:'content',query:{id:scope.row.id}}">
                                <el-button  type="text" size="small">查看明细</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="play" label="操作">
                        <template scope="scope">
                            <router-link  :to="{path:'detail',query:{id:scope.row.id}}">
                                <el-button  type="text" size="small">查看详情</el-button>
                            </router-link>    
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next,jumper" :total="number" class="foot_nav">
                </el-pagination>
            </div>
            </div>
</div>
</template>
<script>
    import {getActivityList} from '../../../api/api';
    import {formateDate} from '../../../api/CommonMethods';
    export default {
        data() {
            return {
                editable:false,
                pageNumber:1,
                number:0,
                startTime:'',
                endTime:'',
                tableData:[],
                value3: [],
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
            getList: function() {
                // alert('加载数据啦')
                if(this.value3[0]){
                    this.startTime = formateDate(this.value3[0]);
                    this.endTime = formateDate(this.value3[1]);
                }else{
                    this.startTime = '';
                    this.endTime = '';
                }
                let data = this.qs.stringify({
                    pageNumber:this.pageNumber,
                    pageSize:10,
                    startDate:this.startTime,
                    endDate:this.endTime,
                });
                getActivityList(data).then(res =>{
                    if(res.errorCode == 30005){
                        this.$router.push({path: '/login'});
                    }else{
                        if(res.status == "success"){
                            this.number = res.content.pageTotal;
                            this.tableData = res.content.resultList;
                        }else{
                            this.$message(res.message);
                            this.tableData = [];
                        }
                        
                    }
                })

            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getList();
            },
            datachange(a){
                if(a == ""){
                    this.value3 = [];
                }
            }
        }
    }
</script>
<style scoped>
    .padding-10 {
        padding: 0 16px;
    }
</style>