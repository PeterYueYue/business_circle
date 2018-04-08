<template>
    <div class="padding-10">
        <div class="tab_header only_input">
            <el-input size="small" placeholder="请输入会员姓名/卡号/兑奖码" v-model="shopName"></el-input>
            <el-button class="query_button" size="small" type="primary" @click="getList()">搜 索</el-button>
            <el-button class="query_button f_r returntprecord" size="small"  @click="returntorecord()">返 回</el-button>

        </div>
        
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData">
                    <el-table-column prop="user_name" label="会员姓名" >
                    </el-table-column>
                    <el-table-column prop="user_card" label="会员卡号">
                    </el-table-column>
                    <el-table-column prop="reward_name" label="奖项名称">
                    </el-table-column>
                    <el-table-column prop="reward_code" label="兑换码">
                    </el-table-column>
                    <el-table-column prop="exchange_statu" label="是否兑换">
                    </el-table-column>
                    <el-table-column prop="exchange_time" label="兑奖时间">
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next,jumper" :total="number" class="foot_nav">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {getRewardLog} from '../../../api/api';
    export default {
        data(){
            return{
                pageNumber:1,
                number:0,
                shopName:'',
                tableData:[],
                goodsid:'',
            }
        },
        mounted: function() {
            this.getList();
        },
        methods: {
            getList: function() {
                let data = this.qs.stringify({
                    pageNumber:this.pageNumber,
                    pageSize:10,
                    activityId:this.goodsid,
                    queryStr:this.shopName,
                })
                getRewardLog(data).then(res => {
                    if(res.errorCode == 30005){
                        this.$router.push({path: '/login'});
                    }else{
                        if(res.status == "success"){
                            this.tableData = res.content.resultList;
                            this.number = res.content.pageTotal;
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
            returntorecord(){
                window.history.back();
            }
        },
        created:function () {
            var id = this.$route.query.id;
            this.goodsid = id;
        }
    }
</script>
<style scoped>
    .padding-10{
        padding:16px;
    }
    .returntprecord{
        border-color: #4db3ff;
        color: #4db3ff;
    }
</style>