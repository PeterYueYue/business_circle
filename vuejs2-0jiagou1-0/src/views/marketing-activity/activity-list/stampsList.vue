<template>
<div>
    <div class="busarea_active_main">
        <div class="tab_header busarea-active-title">
            <span>活动状态 : </span>
            <el-select v-model="statuselectvalues" placeholder="请选择" size="small">
                <el-option
                        v-for="item in statuselectdatas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="margin_l_20">门店选择 : </span>
            <el-select v-model="shopValues" placeholder="请选择" size="small">
                <el-option
                        v-for="item in shopselectdatas"
                        :key="item.id"
                        :label="item.main_shop_name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button class="query_button" type="primary" size="small" @click="productQuery">搜 索</el-button>
        </div>
        <div class="pop-busarea-section" v-for="message in productList">
            <detail_iteme :message="message"></detail_iteme>
        </div>
    </div>
</div>
</template>
<script>
    import stamps from './Stamps';
    import {getTicketList, getShopLists, getLoginStatus, getGoldList, getProductList} from '../../../api/api';
export default {
    data(){
        return{
            productList:'',
            shopValues:'',
            shopselectdatas: [{main_shop_name: '全部门店', id: ''}],
            shopselectvalues: '',
            statuselectdatas: [
                {value: '0', label: '全部'},
                {value: '1', label: '进行中'},
                {value: '2', label: '已结束'},
                {value: '3', label: '待进行'}
            ],
            statuselectvalues: '',
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
                this.shopselectdatas = this.shopselectdatas.concat(downdata);
            }

        });
//            列表获取
        this.statuselectvalues = this.statuselectdatas[0].value;
        let datas=this.qs.stringify({
            activityStatu:0
        });

        this.getProductLists(datas);
    },
    methods:{
        productQuery:function () {
            let data=this.qs.stringify({
                shopId:this.shopValues,
                activityStatu:this.statuselectvalues
            });
            this.getProductLists(data);
        },
        getProductLists:function (data) {
            getProductList(data)
                .then(res=>{
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'})
                    }
                    this.productList=res.content.resultList;
                })
        }
    },
    components: {
        detail_iteme: stamps
    }
}
</script>
<style>

</style>