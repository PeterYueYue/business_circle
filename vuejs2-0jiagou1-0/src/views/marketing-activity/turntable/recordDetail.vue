<template>
<div class="padding-10">
    <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData">
                    <el-table-column prop="reward_class" label="奖项序号" >
                    </el-table-column>
                    <el-table-column prop="reward_name" label="奖项名称">
                    </el-table-column>
                    <el-table-column prop="reward_num" label="奖项数量">
                    </el-table-column>
                    <el-table-column prop="total" label="抽中次数">
                    </el-table-column>
                    <el-table-column prop="exchangeNum" label="已兑换数量">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-button class="query_button f_r returntprecord" size="small"  @click="returntorecord()">返 回</el-button>

</div>
</template>
<script>
    import {getRewardByActivity} from '../../../api/api';
    export default {
        data(){
            return{
                goodsid:'',
                tableData:[]
            }
        },
        mounted: function() {
            this.getList()
        },
        methods: {
            getList(){
                let data = this.qs.stringify({
                    activityId:this.goodsid,
                })
                getRewardByActivity(data).then(res => {
                    if(res.errorCode == 30005){
                        this.$router.push({path: '/login'});
                    }else{
                        if(res.status == "success"){
                            this.tableData = res.content.resultList;
                        }else{
                            this.$message(res.message);
                            this.tableData = [];
                        }
                        
                    }
                })
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
        padding: 16px;
    }
    .returntprecord{
        border-color: #4db3ff;
        color: #4db3ff;
        margin-top: 20px;
    }
</style>