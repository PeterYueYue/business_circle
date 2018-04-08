<template>
    <div>
        <div class="busarea_active_main">
            <div class="tab_header busarea-active-title">
                <span>活动状态 : </span>
                <el-select v-model="statuselectvalued" placeholder="请选择" size="small">
                    <el-option
                            v-for="item in statuselectdatad"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span class="margin_l_20">门店选择 : </span>
                <el-select v-model="shopValued" placeholder="请选择" size="small">
                    <el-option
                            v-for="item in shopselectdatad"
                            :key="item.id"
                            :label="item.main_shop_name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-button class="query_button" type="primary" size="small" @click="Dquery">搜 索</el-button>
            </div>
            <div class="pop-busarea-section" v-for="message in goldList">
                <detail_item :message="message"></detail_item>
            </div>
        </div>
    </div>
</template>
<script>
    import Vouchers from "./Vouchers.vue";
    import {getTicketList, getShopLists, getLoginStatus, getGoldList, getProductList} from '../../../api/api';

    export default {
        data() {
            return {
                goldList: '',
                shopValued: '',
                shopselectdatad: [{main_shop_name: '全部门店', id: ''}],
                shopselectvalued: '',
                statuselectdatad: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '进行中'},
                    {value: '2', label: '已结束'},
                    {value: '3', label: '待进行'}
                ],
                statuselectvalued: '',
            }
        },
        mounted: function () {
            let message = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            getShopLists(message).then(res => {
                if (res.errorCode == 30005) {
                    this.$router.push({path: '/login'});
                } else {
                    let downdata = res.content.resultList;

                    this.shopselectdatad = this.shopselectdatad.concat(downdata);
                }
                this.statuselectvalued = this.statuselectdatad[0].value;

            });
            let datad = this.qs.stringify({
                activityStatu: 0
            });
            this.getGoldLists(datad);
        },
        methods: {
            Dquery: function () {
                let data = this.qs.stringify({
                    shopId: this.shopValued,
                    activityStatu: this.statuselectvalued
                });
                this.getGoldLists(data);
            },
            getGoldLists: function (data) {
                getGoldList(data)
                    .then(res => {
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'})
                        }
                        this.goldList = res.content.resultList;
                    })
            },
        },
        components: {
            detail_item: Vouchers
        }
    }
</script>
<style>

    .margin_l_20 {
        display: inline-block;
        margin-left: 20px;
    }

    .busarea-active-title {
        /*margin-bottom: 2px;*/
        /*padding-bottom: 5px;*/
        /*margin-left: 10px;*/
        border-bottom: 2px solid #f4f4f4;
    }

    .pop-busarea-head {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f4f4f4;
    }

    .pop-busarea-head span {
        margin-left: 20px;
    }

    .pop-busarea-section {
        height: 150px;
        border-bottom: 3px solid #f4f4f4;
        /*outline:1px solid red;*/
        position: relative;
        padding-right: 10px;
    }

    .pop-main > div:nth-last-type(1) {
        outline: 10px solid red;
    }

    .pop-busarea-top {
        width: 100%;
        /*padding-top: 10px;*/
        /*height: 35px;*/
        /*display: flex;*/
        font-size: 12px !important;
    }

    .pop-p {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        /*outline:1px solid red;*/
    }

    .pop-p span:nth-child(1) {
        display: inline-block;
        margin-left: 20px;
    }

    .pop-div {
        /*outline:1px solid green;*/
        height: 110px;
        display: flex;
    }

    .pop-avatar {
        /*width: 30%;*/
        /*outline:1px solid blue;*/
        display: flex;
        /*justify-content: center;*/
        /*align-items: center;*/
        margin-left: 30px;
        padding-top: 20px;
        margin-right: 20px;
    }

    .pop-avatar span {
        width: 120px;
        height: 58px;
        /*outline:1px solid red;*/
        background: url("../../../../src/assets/images/logos.png") 50% 50% no-repeat;
        background-size: 100% 100%;
    }

    .pop-word {
        width: 70%;
        display: flex;
        align-items: center;
    }

    .pop-word span:nth-child(1) {
        color: #f4333c;
        font-size: 26px;
        line-height: 92px;
    }

    .pop-word span:nth-child(2) {
        color: #f4333c;
        font-size: 16px;
    }

    .pop-busarea-body {
        display: flex;
        /*width: 100%;*/
        height: 150px;
        /*margin-top: 6px;*/
        background-color: white;
        /*outline:1px solid orange;*/
    }

    .pop-busarea-title {
        width: 35%;
        min-width: 330px;
        height: 100%;
        /*outline:1px solid orange;*/
        display: flex;
    }

    .pop-busarea-title > span:nth-child(1) {
        width: 36%;
        /*background-color: yellow;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pop-busarea-title > span:nth-child(1) > div {
        width: 72px;
        height: 72px;
        border-radius: 50%;
    }

    .pop-busarea-title > span:nth-child(2) {
        width: 64%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .pop-busarea-span > div {
        display: inline-block;
        width: 100%;
        /*outline:1px solid red;*/
    }

    .pop-busarea-span > div > p:nth-child(1) {
        font-size: 16px;
        /*color: red;*/
    }

    .pop-busarea-span > div > p:nth-child(2) {
        font-size: 20px;
        margin-top: 20px;
        color: #f4333c;
    }

    .pop-busarea-main {
        width: 70%;
        height: 130px;
        border-left: 1px dashed #ddd;
        margin-top: 10px;
        /*outline:5px solid red;*/
        /*margin-top: 8px;*/
    }

    .pop-busarea-tops {
        width: 100%;
        height: 100%;
        display: flex;
    }

    /*-----------------------------左边距离-------------------------------*/
    .pop-busarea-tops span:nth-child(1) {
        margin-left: 30px;
        width: 70%;
        height: 100%;
        /*background-color: red;*/
        display: flex;
        align-items: center;
    }

    .pop-busarea-p > p {
        display: flex;
        margin-top: 4px;
        font-size: 12px !important;
    }

    .pop-busarea-p > p:nth-child(1) > span:nth-child(1) {
        text-align: left;
    }

    .pop-busarea-p > p > span:nth-child(1) {
        display: inline-block;
        width: 100px;
        text-align: right;
    }

    .pop-busarea-p > p > span:nth-child(2) {
        display: inline-block;
    }

    .pop-busarea-tops span:nth-child(2) {
        /*height: 100%;*/
        /*position: relative;*/
    }

    .pop-busarea-tops span:nth-child(2) > button,
    .pop-busarea-bottom span:nth-child(2) > button {
        position: absolute;
        bottom: 22px;
        right: 30px;
        width: 80px;
        height: 30px;
        color: white;
        line-height: 30px;
        background-color: #05a4e6;
        border-radius: 4px;
    }

    .pop-busarea-bottom {
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #f5f5f5;
    }

    .pop-busarea-bottom span:nth-child(1) {
        margin-left: 100px;
        width: 70%;
        height: 100%;
        /*background-color: red;*/
        display: flex;
        align-items: center;
    }

    .pop-busarea-ps p {
        font-size: 12px;
        position: relative;
    }

    .pop-busarea-bottom span:nth-child(2) {
        width: 30%;
        height: 100%;
        position: relative;
    }

    .pop-busarea-ps .icon {
        color: #00a0ea;
        margin-right: 10px;
    }

    .pop-busarea-ps > p > span {
        /*display: inline-block;*/
        font-size: 18px !important;
        color: #f4333c;
        position: absolute;
        margin-left: 6px;
        top: 2px;
    }

    .pop-busarea-span {
        color: #00a0ea;
    }

    .pop-busarea-span:hover {
        cursor: pointer;
    }

    .pop-end {
        width: 150px;
        height: 150px;
        margin-left: 28%;
        position: absolute;
        top: 0;
        outline: 1px solid grren;
        background: url("../../../assets/images/end.png") 50% 50% no-repeat;
    }

</style>