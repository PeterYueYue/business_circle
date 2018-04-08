<!--商户列表-->
<template>
    <div class="sq_main">
            <div class="tab_header padding_t_l_r_0">
            <el-input size="small" placeholder="请输入店铺名称" @keyup.enter.native="queryList" v-model="dataform.shopName"></el-input>
            <el-button class="query_button" size="small" type="primary" @click="queryList">搜 索</el-button>
            <el-button class="f_r" size="small" type="primary" @click="refresh">获取最新商户数据</el-button>
            </div>
            <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableDatas"
                style="width: 100%">
                <el-table-column
                    label="店铺名称"
                    width="240">
                    <template scope="scope">
                        <div class="main_shop_name">{{scope.row.main_shop_name}}</div>
                    </template>
                </el-table-column>
                <!--<el-table-column
                    prop="shop_type"
                    label="店铺类型">
                </el-table-column>-->
                <el-table-column
                    prop="categoryName"
                    label="店铺类型">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="店铺地址">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="110">
                </el-table-column>
                <el-table-column
                    prop="setcode"
                    width="130"
                    label="每人日积分获得上限">
                    <template scope="scope">
                        <div class="date_time_input">
                            <el-input
                            size="small"
                            type='number'
                            :value=scope.row.day_integral  
                            v-model="scope.row.day_integral" 
                            placeholder="积分" 
                            @focus="focus_input(scope.row.day_integral)"
                            @blur="changedata(scope.row.id,scope.row.day_integral)"
                            @change="verify(scope.row.day_integral)"
                            ></el-input>
                            
                            <!--<input @blur="changedata(scope.row.id,this.value)" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">-->
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column
                    prop="set"
                    label="操作">
                    <template scope="scope">
                       <el-button type="text" size="small" :disabled="true">二维码</el-button>
                       <span style="color: #ddd">&nbsp;|</span>
                       <el-button type="text" size="small" :disabled="true">下载</el-button>
                    </template>
                </el-table-column>-->
                </el-table>
                <el-pagination
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="total, prev, pager, next,jumper"
                :total="dataLength"
                class="foot_nav">
                </el-pagination>
            </div>
            </div>

    </div>
</template>

<script>
	import { getShopList,changeCode,getNewShopList,getLoginStatus } from '../../../api/api';
    import {checkRate} from '../../../api/CommonMethods';    export default {
        data() {
            return {
                dataform:{
                    pageNumber:1,
                    pageSize:10,
                    shopName:''
                },
                tableDatas:[],
                dataLength:0,
                startdata:''
            }
        },
        mounted:function () {
            this.GetList();
        },
        methods: {
            verify:function (data) {
                checkRate(data);
                if(checkRate(data) ==false){
                    this.$message({
                        message: '请填写正整数!',
                        type: 'warning'
                    });
                }
            },
            //input获取焦点
            focus_input(data){
                this.startdata = data;
            },
            // 获取数据
            GetList(){
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                let dataform = this.qs.stringify(this.dataform);
                getShopList(dataform).then(res => {
                    this.tableDatas = res.content.resultList;
                    this.dataLength =  res.content.total;
                })
            },
            //页码改变时
            handleCurrentChange(val) {
                this.dataform.pageNumber = val;
                this.GetList();
            },
            //刷新
            refresh:function () {
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                this.dataform.pageNumber =1;
                getNewShopList().then(res => {
                    if(res.status =="success"){
                        this.$message.success("已成功获取最新商户数据!");
                        this.GetList();
                    }else if(res.status == 'error'){
                        this.$message.error("获取最新商户数据失败!");
                    }
                })
            },
            // 搜索
            queryList:function (){
                this.dataform.pageNumber = 1;
                this.GetList();
            },
            //输入框的值改变了
            changedata:function(data,code){
                if( code == this.startdata){
                }else{
                    if(code == '' ){
                        code = 0;
                    }
                    let changedata = this.qs.stringify({
                        id:data,
                        dayIntegral:code
                    })
                    var that = this;
                    changeCode(changedata).then(res => {
                        if(res.status == "success"){
                            this.$message.success('修改成功!');
                        }else if(res.staus =="error"){
                            this.$message.error('修改失败!');
                        }
                    })
                }
                
            },
    }
    }
</script>
<style>
    .date_time_input .el-input input{
        text-align: center;
    }
    .date_time_input .el-input{
        width: 80px !important;
    }
    /*.code_input{
        width: 80px;
        height: 30px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        text-align: center;
        outline: none;

    }*/
    tbody .cell{
        width: 100%;
    }
    .main_shop_name{
        width: 100%;
        padding-left: 20px;
        text-align: left !important;
    }
</style>