<template>
<div>
    <div class="busarea_active_main">
        <div class="tab_header busarea-active-title">
            <span>活动状态 : </span>
            <el-select v-model="statuselectvalue" placeholder="请选择" size="small">
                <el-option
                        v-for="item in statuselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="margin_l_20">门店选择 : </span>
            <el-select v-model="shopselectvalue" placeholder="请选择" size="small">
                <el-option
                        v-for="item in shopselectdata"
                        :key="item.id"
                        :label="item.main_shop_name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button class="query_button" type="primary" size="small" @click="query">搜 索</el-button>
        </div>
        <div class="pop-busarea-section" v-for="message in messages">
            <detail_items :message="message"></detail_items>
        </div>
    </div>
</div>
</template>
<script>
    import Item from "./money.vue";
    import {getTicketList, getShopLists, getLoginStatus, getGoldList, getProductList} from '../../../api/api';
export default {
    data(){
        return{
            messages:'',
            shopValue:'',
            shopselectdata: [{main_shop_name: '全部门店', id: ''}],
            shopselectvalue: '',
            statuselectdata: [
                {value: '0', label: '全部'},
                {value: '1', label: '进行中'},
                {value: '2', label: '已结束'},
                {value: '3', label: '待进行'}
            ],
            statuselectvalue: '',
        }
    },
    mounted:function () {
        let message = this.qs.stringify({
            pageNumber: '1',
            pageSize: '10000'
        });
        getShopLists(message).then(res => {
            if (res.errorCode == 30005) {
                this.$router.push({path: '/login'});
            } else {
                let downdata = res.content.resultList;
                this.shopselectdata = this.shopselectdata.concat(downdata);
            }

        });
//            列表获取
        this.statuselectvalue = this.statuselectdata[0].value;
        let data = this.qs.stringify({
            pointStatus: 0
        });
        this.getList(data);
    },
    methods:{
        query: function () {
            getLoginStatus().then(res => {
                if (res == false) {
                    this.$router.push({path: '/login'});
                }
            });
            let data = {
                pointStatus: this.statuselectvalue
            };
            if (this.shopselectvalue) {
                data.curShopId = this.shopselectvalue
            }
            let datas = this.qs.stringify(data);
            this.getList(datas);
        },
        getList: function (data) {
            getTicketList(data).then(res => {
                if (res.errorCode == 30005) {
                    this.$router.push({path: '/login'});
                } else {
                    this.messages = res.content.circlePointList;
                    if (res.content.circlePointList.length == 0) {
                        this.$message('暂无数据!');
                    }
                }

            })
        }

    },
    components: {
        detail_items: Item
    }
}
</script>
<style>

</style>