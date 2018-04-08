<!--会员列表-->
<template>
    <div class="sq_main">
        <div class="tab_header padding_t_l_r_0">
            <el-input class="query_input" size="small" @keyup.enter.native="query" v-model="inputValue" placeholder="请输入会员姓名/手机号/会员卡号"></el-input>
            <el-button class="query_button" :disabled="disabled" size="small" type="primary" @click="query">搜 索</el-button>

            <!--<el-select v-model="selectvalue" @change="memberkindschange" placeholder="请选择" size="small"-->
                       <!--class="f_r margin_r_10">-->
                <!--<el-option-->
                        <!--v-for="item in selectdata"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
        </div>
        <div class="block">
            <!--未实名会员-->
            <el-table
                    v-show="memberkinds.name_false"
                    :data="tableData1"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="100"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="aliIds"
                        label="会员UID">
                </el-table-column>
                <el-table-column
                        prop="ali_username"
                        label="支付宝账户">
                </el-table-column>
                <el-table-column
                        prop="createDates"
                        label="最近交易时间">
                </el-table-column>
                <el-table-column
                        prop="totalAmounts"
                        label="交易金额">
                </el-table-column>
            </el-table>

            <!--实名用户-->
            <el-table
                    v-show="memberkinds.name_true"
                    :data="tableData2"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="100"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="会员姓名">
                </el-table-column>
                <el-table-column
                        prop="memberSex"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号">
                        <template scope="scope">
                            <span>{{ scope.row.mobile}} </span>
                            <img :class="{isshowicon:scope.row.isallphone}" @click="check_phone_f(scope.$index,scope.row.id)" class="check_phone_icon" src="../../../assets/images/check_phone.png" alt="">
                        </template>
                </el-table-column>
                <el-table-column
                        prop="memberSn"
                        min-width="150"
                        label="会员卡号">
                </el-table-column>
                <el-table-column
                        prop="integral"
                        label="卡积分">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next,jumper"
                    :total="totalPage"
                    class="foot_nav">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {menberList,gettruephone} from '../../../api/api';

    export default {
        data() {
            return {
                //输入框
                inputValue: '',
                disabled: false,
                //总记录数
                totalPage: 1,
                selectdata: [
                    {value: '1', label: '实名'},
                    {value: '0', label: '未实名'},
                ],
                selectvalue: '1',
                memberkinds: {
                    name_true: true,
                    name_false: false
                },
                tableData1: [],
                tableData2: []
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                page: '1',
                count: '10',
                member: '',
                real: this.selectvalue
            });
            this.getList(data);
        },
        methods: {
            //点击眼睛看
            check_phone_f(index,userid){
                let data = this.qs.stringify({
                    id:userid
                });
                gettruephone(data).then(res =>{
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.tableData2[index].mobile = res.content.mobile;
                            this.tableData2[index].isallphone = true;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            handleSizeChange(val) {
            },
            ViewDetails(index) {
            },
            handleCurrentChange(val) {
                let data = this.qs.stringify({
                    page: val,
                    count: '10',
                    menber: this.inputValue,
                    real: this.selectvalue
                });
                this.getList(data);
            },
            memberkindschange: function () {

                if (this.selectvalue == 1) {
                    var data = this.qs.stringify({
                        page: '1',
                        count: '10',
                        member: '',
                        real: '1'
                    });
                    this.memberkinds.name_true = true;
                    this.memberkinds.name_false = false;
                }
                ;
                if (this.selectvalue == 0) {
                    var data = this.qs.stringify({
                        page: '1',
                        count: '10',
                        member: '',
                        real: '0'
                    });
                    this.memberkinds.name_true = false;
                    this.memberkinds.name_false = true;
                }
                ;
                this.getList(data);
            },
            getList(data) {
                menberList(data).then(res => {
                    this.disabled = false;
                    this.$message.closeAll();
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else {
                        if (this.selectvalue == 1) {
                            this.tableData2 = res.content.list;
                            this.totalPage = res.content.num;
                        } else {
                            this.tableData1 = res.content.list;
                            this.totalPage = res.content.num;
                        }
                    }


                })
            },
            query: function () {
                this.disabled = true;
                this.$message('搜索中...');
                let data = this.qs.stringify({
                    page: '1',
                    count: '10',
                    member: this.inputValue,
                    real: this.selectvalue
                });
                this.getList(data);
            }
        }
    }

</script>

<style scoped>
    .check_phone_icon{
        width: 20px;
        position: relative;
        top: 5px;
        display: none;
        cursor: pointer;
    }
    .cell:hover>.check_phone_icon{
        display: inline-block;
    }
    .isshowicon{
        display: none !important;
    }
</style>
