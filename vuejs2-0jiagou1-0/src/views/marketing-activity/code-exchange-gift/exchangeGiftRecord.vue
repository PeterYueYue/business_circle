<template>
    <div class="padding_16">
        <div class="tab_header padding_t_l_r_0">
            <el-input size="small" v-model="searchText" placeholder="请输入礼品名称/会员姓名/卡号"></el-input>
            <el-button class="query_button" type="primary" size="small"  @click="query_btn">搜 索</el-button>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData">
                    <el-table-column prop="memberName" label="会员姓名">
                    </el-table-column>
                    <el-table-column prop="memberCard" label="会员卡号">
                    </el-table-column>
                    <el-table-column prop="giftName" label="礼品名称">
                    </el-table-column>
                    <el-table-column prop="point" label="消耗积分">
                    </el-table-column>
                    <el-table-column prop="exchangeDate" label="兑换时间">
                    </el-table-column>
                    <el-table-column label="领取时间">
                        <template scope="scope">
                            <p v-if="scope.row.status == 'not_recevied'">未领取</p></p>
                            <p v-if="scope.row.status == 'already_recevied'">{{scope.row.receiveDate}}</p></p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    :page-size="pageSize" 
                    layout="total, prev, pager, next,jumper" 
                    :total="totalCount" 
                    class="foot_nav">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {GiftListLog} from '../../../api/api';
    export default {
        data() {
            return {
                pageSize:10,
                pageNumber:1,
                searchText:'',
                totalCount:10,
                tableData:[],
            }
        },
        mounted: function() {
            this.query_btn();
        },
        methods: {
            //搜索
            query_btn(){
                let data = this.qs.stringify({
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    searchText:this.searchText,
                });
                GiftListLog(data)
                .then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.tableData = res.content.result;
                            this.totalCount = res.content.totalCount;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //页面改变时
            handleCurrentChange(val){
                this.pageNumber = val;
                this.query_btn();
            }
        }
    }
</script>
<style scoped>

</style>