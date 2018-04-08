<!--会员卡管理-->
<template>
    <div class="sq_main">
        <div class="membercard_show">
            <div class="card_main_front">
                <div class="card_front">
                    <img class="uploda_img" :src="bgimgurl" alt="">
                    <div class="card_img">
                        <img :src="logoimgurl" alt="">
                    </div>
                </div>
                <span>会员卡正面</span>
            </div>
            <div class="card_main_over">
                <div class="card_over" :style="colorStyle">
                    <div class="card_img">
                        <img :src="logoimgurl" alt="">
                    </div>
                    <span class="card_name">{{form.cardName}}</span>
                    <span class="f_r card_des">会员卡</span>
                    <div class="card_mark">
                        <span>积分 : 888</span>
                    </div>
                </div>
                <span>会员卡背面</span>
            </div>
        </div>
        <div class="membercard_set">
            <span class="ticket_title_all">会员卡样式设置</span>
            <el-form ref="form" :model="form" label-width="128px" :rules="rules_1">
                <el-form-item class="wallet_form" label="钱包端名称 :" prop="cardName">
                    <el-input class="qianbao_input" size="small" v-model="form.cardName"></el-input>
                </el-form-item>
                <el-form-item label="卡片背景色 :" prop="bgColor">
                    <el-color-picker v-model="colorStyle.background" color-format='rgb'
                                     @change='colorchange'></el-color-picker>
                </el-form-item>
                <!--正面背景-->
                <el-form-item label="正面背景图片 :" prop="bgUrl">
                    <el-upload
                            class="avatar-uploader"
                            action="/business/file!fileUpload.action"
                            :data="shopid"
                            :show-file-list="false"
                            :on-success="bgonsuccess"
                            :before-upload="bgbeforeAvatarUpload">
                        <img v-if="imageUrltobg" :src="imageUrltobg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="ticket_tip color_888 ">备注 : 2M以内,格式:png、jpg; 尺寸不小于1020*643px; 不得有圆角，不得拉伸变形;</span>
                </el-form-item>
                <!--logo-->
                <el-form-item label="LOGO图片 :" prop="logoUrl">
                    <el-upload
                            class="avatar-uploader"
                            action="/business/file!fileUpload.action"
                            :data="shopid"
                            :show-file-list="false"
                            :on-success="logoonsuccess"
                            :before-upload="logobeforeAvatarUpload">
                        <img v-if="imageUrltologo" :src="imageUrltologo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <span class="ticket_tip color_888">备注 : 1M以内,格式png、jpg; 尺寸不小于500*500px的正方形; 请优先使用商家LOGO;</span>
                </el-form-item>
                <el-form-item label="会员权益 :" prop="memo">
                    <el-input
                            class="card_desset"
                            type="textarea"
                            :rows="5"
                            resize='none'
                            placeholder="请输入积分描述"
                            v-model="form.memo">
                    </el-input>
                    <span class="ticket_tip color_888">提示 : 内容将展示在支付宝会员卡会员权益说明中,如有多条说明回车换行即可!</span>
                </el-form-item>
                <el-form-item class="exchange_rate" label="会员领卡赠送积分 :" prop="sendPoint">
                    <el-input type="number" size="small" v-model="form.sendPoint" placeholder="请输入积分"></el-input>
                    <!--<span class="ticket_tip color_red">提示 : 设置后均在次日零点生效</span>-->
                </el-form-item>
                <el-form-item label="字段规则显示 :" required>
                    <el-checkbox-group 
                    v-model="checkedCities1"
                    :min="1">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- <el-form-item label="用户信息获取 : ">
                    <el-checkbox-group 
                    v-model="personaldata">
                        <el-checkbox label="姓名"></el-checkbox>
                        <el-checkbox label="身份证"></el-checkbox>
                        <el-checkbox label="手机号"></el-checkbox>
                        <el-checkbox label="生日"></el-checkbox>
                    </el-checkbox-group>
                    <span class="ticket_tip">提示 : 选择获取的用户信息(可不选),将在领卡时由用户填写。</span>
                </el-form-item> -->
                <el-form-item label="栏位设置 :"  >
                    <!-- 开发中 -->
                    <!-- <div style="margin-bottom: 10px;">
                        <span>(1) </span><span>标题 : </span>
                        <el-input style="display:inline-block;width: 140px;margin-right:20px;" disabled size="small"  value="优惠信息"></el-input>
                        <el-radio-group v-model="isshow1">
                            <el-radio :label="0">显示</el-radio>
                            <el-radio :label="1">隐藏</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <span>(2) </span><span>标题 : </span>
                        <el-input style="display:inline-block;width: 140px;margin-right:20px;" disabled size="small"  value="积分兑券"></el-input>
                        <el-radio-group v-model="isshow2">
                            <el-radio :label="0">显示</el-radio>
                            <el-radio :label="1">隐藏</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <span>(3) </span><span>标题 : </span>
                        <el-input style="display:inline-block;width: 140px;margin-right:20px;" disabled size="small"  value="积分转盘"></el-input>
                        <el-radio-group v-model="isshow3">
                            <el-radio :label="0">显示</el-radio>
                            <el-radio :label="1">隐藏</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <span>(4) </span><span>标题 : </span>
                        <el-input style="display:inline-block;width: 140px;margin-right:20px;" disabled size="small"  value="积分换礼品"></el-input>
                        <el-radio-group v-model="isshow4">
                            <el-radio :label="0">显示</el-radio>
                            <el-radio :label="1">隐藏</el-radio>
                        </el-radio-group>
                    </div> -->
                    <div style="margin-bottom: 10px;" v-for="(item,index) in lwlist">
                        <div>
                            <span>({{index+1}}) </span><span><i style="color:#ff4949;">* </i>标题 : </span><el-input style="display:inline-block;width: 140px"  size="small" v-model="item.title"  placeholder="请填写标题"></el-input>&#X3000;
                            <span>副标题 : </span><el-input style="display:inline-block;width: 140px"  size="small" v-model="item.subTitle"  placeholder="请填写副标题"></el-input>
                        </div>
                        <div style="margin-top: 4px;">
                            &#X3000; <span><i style="color:#ff4949;">* </i>链接 : </span><el-input style="display:inline-block;width: 345px;" v-model="item.url"  size="small" placeholder="请填写链接地址,例:https://www.baidu.com"></el-input>
                            <el-button  size="small" type="text"  @click="removeDomain(item)">删除</el-button>
                        </div>
                    </div>
                    <el-button class="margin-l-f" size="small" v-if="lwlist.length <6" type="text"  @click="addDomain">新增栏目</el-button>
                    <!-- 改版前 start -->
                    <!-- <div style="margin-bottom: 10px;" v-for="(item,index) in lwlist">
                        <div>
                            <span>({{index+1}}) </span><span><i style="color:#ff4949;">* </i>标题 : </span><el-input style="display:inline-block;width: 140px"  size="small" v-model="item.title"  placeholder="请填写标题"></el-input>&#X3000;
                            <span>副标题 : </span><el-input style="display:inline-block;width: 140px"  size="small" v-model="item.subTitle"  placeholder="请填写副标题"></el-input>
                        </div>
                        <div style="margin-top: 4px;">
                            &#X3000; <span><i style="color:#ff4949;">* </i>链接 : </span><el-input style="display:inline-block;width: 345px;" v-model="item.url"  size="small" placeholder="请填写链接地址"></el-input>
                            <el-button v-if="lwlist.length != 1" size="small" type="text"  @click="removeDomain(item)">删除</el-button>
                        </div>
                    </div>
                    <el-button class="margin-l-f" size="small" v-if="lwlist.length <5" type="text"  @click="addDomain">新增栏目</el-button> -->
                    <!-- end -->
                </el-form-item>
                <!-- <el-form-item label="会员等级设置 : ">
                    <div>
                        <el-table
                            class="inputwidth_t_grade"
                            :data="gradetabledata"
                            style="max-width: 500px">
                            <el-table-column
                                prop="date"
                                width="80"
                                label="会员等级">
                                <template scope="scope">
                                    <div v-if="scope.$index == 0">
                                        <span style="color:red;">* </span>Vip1
                                    </div>
                                    <div v-if="scope.$index == 1">Vip2</div>
                                    <div v-if="scope.$index == 2">Vip3</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="等级名称">
                                <template scope="scope">
                                    <el-input  v-if="scope.$index == 0"  size="small" v-model="scope.row.name" placeholder="普卡"></el-input>
                                    <el-input  v-if="scope.$index == 1"  size="small" v-model="scope.row.name" placeholder="银卡"></el-input>
                                    <el-input  v-if="scope.$index == 2"  size="small" v-model="scope.row.name" placeholder="金卡"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="等级标准">
                                <template scope="scope">
                                    <span v-if="scope.$index == 0" >授权领取</span>
                                    <div v-if="scope.$index == 1">
                                        <span>累计</span>
                                        <el-input type="number" size="small" @blur="tableinputdatablur(scope.$index,'point')" v-model="scope.row.point" placeholder="积分"></el-input>
                                        <span>分</span>
                                    </div>
                                    <div v-if="scope.$index == 2">
                                        <span>累计</span>
                                        <el-input type="number" size="small" @blur="tableinputdatablur(scope.$index,'point')" v-model="scope.row.point" placeholder="积分"></el-input>
                                        <span>分</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="all"
                                label="会员积分获取权益">
                                <template scope="scope">
                                    <span v-if="scope.$index == 0" >标准比率</span>
                                    <div v-if="scope.$index == 1">
                                        <el-input type="number" size="small" @blur="tableinputdatablur(scope.$index,'times')" v-model="scope.row.times" placeholder="倍率"></el-input>
                                        <span>倍积分</span>
                                    </div>
                                    <div v-if="scope.$index == 2">
                                        <el-input type="number" size="small" @blur="tableinputdatablur(scope.$index,'times')" v-model="scope.row.times" placeholder="倍率"></el-input>
                                        <span>倍积分</span>
                                    </div>
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button v-if="gradetabledata.length < 3" size="small" type="text" @click="addgrade">新增会员等级</el-button>
                    </div>    
                </el-form-item>         -->
                <el-form-item>
                    <el-button v-if=form.id class="bottom_button" size="small" type="primary" @click="set_Membercard('form')">修 改
                    </el-button>
                    <el-button v-if=!form.id class="bottom_button" size="small" type="primary" @click="set_Membercard('form')">提 交
                    </el-button>
                </el-form-item>
            </el-form>
            <span class="ticket_title_all">会员积分设置</span>
            <el-form ref="integral" :model="integral" label-width="128px">
                <el-form-item class="exchange_rate" label="积分规则 :">
                    <span>每消费 </span>
                    <el-input type="number" size="small" placeholder="人民币" v-model="integral.cost"></el-input>
                    <span>元 , 可获得 </span>
                    <el-input type="number" size="small" placeholder="积分" v-model="integral.gain"></el-input>
                    <span>积分</span>
                    <br>
                    <span>日消耗积分上限</span>
                    <el-input type="number" size="small" placeholder="积分" v-model="integral.dayTopPoint"></el-input>
                    <span class="ticket_tip color_red">提示 : 1、请在每日 6:00 ~ 9:00 之间修改设置</span>
                    <span class="ticket_tip color_red">&#X3000;&#X3000;&#X3000;2、如活动需要更改积分比率,在活动结束后务必及时修改积分比率</span>
                </el-form-item>
                <!-- 开发中 -->
                <!-- <div style="padding-left:80px;">
                    <el-table
                        class="inputwidth_t"
                        :data="tableData"
                        style="max-width: 500px"
                        empty-text = "暂无关联商户">
                        <el-table-column
                            prop="date"
                            label="店铺类型">
                            <template scope="scope">
                                <div><span>{{scope.row.data1}}</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="每消费金额(元)">
                            <template scope="scope">
                                <el-input type="number" size="small" v-model="scope.row.data2" placeholder="金额"></el-input>
                            </template>
                          </el-table-column>
                        <el-table-column
                            prop="address"
                            label="获得积分">
                            <template scope="scope">
                                <el-input type="number" size="small" v-model="scope.row.data3" placeholder="积分"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="all"
                            label="日积分消耗上限">
                            <template scope="scope">
                                <el-input type="number" size="small" v-model="scope.row.data4" placeholder="无上限"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div> -->
                <el-form-item label="状态 :">
                    <el-radio class="radio" v-model="integral.enable" label="1">激活</el-radio>
                    <el-radio class="radio" v-model="integral.enable" label="0">关闭</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button class="bottom_button " size="small" type="primary" @click="checksure">确 定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getMemberPoints, saveMember, getmembercade, sentmembercard,getLoginStatus} from '../../../api/api'
    const typeOptions = ['积分', '余额'];
    export default {
        data() {
            return {
                personaldata:[],
                getpersonaldata:'',
                sumbit_regFiled:'',
                sumbit_fieldList:'',
                isshow1:1,
                isshow2:1,
                isshow3:1,
                isshow4:1,
                gradetabledata:[
                    {name:'',point:'0',times:'1'},
                ],
                tableData:[
                    {data1:'美食1',data2:'',data3:'',data4:''},
                    {data1:'美食2',data2:'',data3:'',data4:''},
                    {data1:'美食3',data2:'',data3:'',data4:''},
                    {data1:'美食4',data2:'',data3:'',data4:''},
                    {data1:'美食5',data2:'',data3:'',data4:''},
                ],
                sumbit_fieldList:'',
                sumbit_levels:'',
                sumbit_columns:'',
                lwlist:[
                    // {title:'',subTitle:'',url:''},
                ],
                checkedCities1:['积分'],
                cities: typeOptions,
                //8a99afc65ca00c25015ca00f4f280000
                shopid:{id:''},
                integral: {
                    cost: '',
                    gain: '',
                    dayTopPoint: '',
                    enable: ''
                },
                selectdata: [
                    {value: 'value1', label: '选择1'},
                    {value: 'value2', label: '选择2'},
                    {value: 'value3', label: '选择3'},
                ],
                selectvalue: 'value1',
                radio: '',
                imageUrltobg: '',
                imageUrltologo: '',

                bgimgurl: require('../../../assets/membercard.png'),
                logoimgurl: require('../../../../src/assets/card_logo.png'),
                colorStyle: {
                    background: 'rgb(60,148,197)',
                },
                sumbit_q:false,
                form: {
                    logoId: '',
                    logoUrl: '',
                    bgId: '',
                    bgUrl: '',
                    cardName: '',
                    bgColor: 'rgb(60,148,197)',
                    memo: '',
                    sendPoint: '',
                    fieldList:'',
                    columns:'',
                    hiddens:'',
                    levels:'',
                },
                rules_1: {
                    cardName: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    bgColor: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    bgUrl: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    logoUrl: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    memo: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    sendPoint: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted: function () {
            this.memberPoints();
            //获取商圈会员卡模板
            this.getMembercard();
            this.cookie();

        },
        methods: {
            //会员等级设置table内input验证
            tableinputdatablur(index,type){
                if(type == 'point'){
                    this.gradetabledata[index].point = Math.abs(this.gradetabledata[index].point);
                    this.gradetabledata[index].point = Math.floor(this.gradetabledata[index].point);
                }else if(type == 'times'){
                    this.gradetabledata[index].times = Math.abs(this.gradetabledata[index].times);
                }
            },
            //新增会员等级
            addgrade(){
                this.gradetabledata.push({name:'',point:'',times:''})
            },
            addDomain(){
                this.lwlist.push({title:'',subTitle:'',url:''})
            },
            removeDomain(item){
                var index = this.lwlist.indexOf(item)
                if (index !== -1) {
                    this.lwlist.splice(index, 1)
                }
            },
            cookie(){
                function getCookie(cookieName) {
                    var strCookie = document.cookie;
                    var arrCookie = strCookie.split("; ");
                    for(var i = 0; i < arrCookie.length; i++){
                        var arr = arrCookie[i].split("=");
                        if(cookieName == arr[0]){
                            return arr[1];
                        }
                    }
                    return "";
                }
                var user_id  = getCookie("ENTITY_ID");
                this.shopid.id = user_id ;
            },
            //验证
            set_Membercard(form) {
                // // 验证栏位设置不能为空
                // for(let a = 0;a<this.lwlist.length;a++){
                //     if(this.lwlist[a].title == '' || this.lwlist[a].url == ''){
                //         this.$message.warning('栏位设置弟'+ (a+4) +'条填写不完整');
                //         return;
                //     }
                // }
                // // 验证会员等级设置
                // if(this.gradetabledata.length > 1){
                //     for(let i =0;i<this.gradetabledata.length;i++){
                //         if(this.gradetabledata[i].name == '' || this.gradetabledata[i].point == '' || this.gradetabledata[i].times == ''){
                //             this.$message.warning('会员等级设置不完整');
                //             return;
                //         }
                //     }
                // }
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.up_Membercard();
                    } else {
                        this.$message('信息填写不完整，请重新填写！');
                        return false;
                    }
                });
            },
            //会员卡样式设置
            up_Membercard() {
                for(let i = 0;i<this.checkedCities1.length;i++){
                    if(this.checkedCities1[i] == '积分'){
                        this.sumbit_fieldList = this.sumbit_fieldList + 'POINT'+',';
                    }
                    if(this.checkedCities1[i] == '余额'){
                        this.sumbit_fieldList = this.sumbit_fieldList + 'BALANCE'+',';
                    }
                }
                this.form.fieldList = this.sumbit_fieldList.substr(0,this.sumbit_fieldList.length-1);
                // this.form.hiddens = this.isshow1 + ',' + this.isshow2 + ',' + this.isshow3 + ',' + this.isshow4;
                this.sumbit_fieldList = '';
                if(this.sumbit_q == false){
                    for(let a = 0;a<this.lwlist.length;a++){
                        if(this.lwlist[a].title ==''&&this.lwlist[a].subTitle == ''&&this.lwlist[a].url==''){
                            continue;
                        }else{
                            this.sumbit_columns =this.sumbit_columns + this.lwlist[a].title+'AAA' + this.lwlist[a].subTitle + 'AAA' + this.lwlist[a].url;
                            if(a<this.lwlist.length-1){
                                this.sumbit_columns = this.sumbit_columns + 'BBB';
                            }    
                        }
                        // this.form.hiddens = this.form.hiddens + ',2';
                    }
                    this.form.columns = this.sumbit_columns;
                    this.sumbit_columns='';
                }else if(this.sumbit_q == true){
                    this.form.columns = '';
                }
                // if(this.gradetabledata.length == 1 && this.gradetabledata[0].name == ''){
                //     this.form.levels = '';
                // }else{
                //     for(let i = 0;i<this.gradetabledata.length;i++){
                //         this.sumbit_levels = this.sumbit_levels + this.gradetabledata[i].name + 'AAA' + this.gradetabledata[i].point + 'AAA' + this.gradetabledata[i].times;
                //         if(i<this.gradetabledata.length-1){
                //             this.sumbit_levels = this.sumbit_levels + 'BBB';
                //         }
                //     }
                //     this.form.levels = this.sumbit_levels;
                //     this.sumbit_levels = '';
                // }
                // if(this.personaldata.length == 0){
                //     this.form.regCommon = 0;
                //     this.form.regFiled = '';
                // }else{
                //     this.form.regCommon = 1;
                //     for(let i = 0;i<this.personaldata.length;i++){
                //         if(this.personaldata[i] == '姓名'){
                //             this.sumbit_regFiled = this.sumbit_regFiled + 'NAME';
                //         }else if(this.personaldata[i] == '手机号'){
                //             this.sumbit_regFiled = this.sumbit_regFiled + 'MOBILE';
                //         }else if(this.personaldata[i] == '身份证'){
                //             this.sumbit_regFiled = this.sumbit_regFiled + 'IDCARD';
                //         }else if(this.personaldata[i] == '生日'){
                //             this.sumbit_regFiled = this.sumbit_regFiled + 'BIRTHDAY';
                //         }
                //         if(i<this.personaldata.length-1){
                //             this.sumbit_regFiled = this.sumbit_regFiled + ',';
                //         }
                //     }
                //     this.form.regFiled = this.sumbit_regFiled;
                // }
                // if(this.form.cardTemplateColumnList){
                //     delete this.form.cardTemplateColumnList;
                //     delete this.form.cardTemplateColumnSize;
                //     delete this.form.cardTemplateLevelList;
                //     delete this.form.cardTemplateLevelSize;
                // }
                let data = this.qs.stringify(this.form);
                // console.log(this.form);
                sentmembercard(data).then(res => {
                    if (res.status == "success") {
                        this.$message.success("操作成功!")
                        this.getMembercard();
                    }else{
                        this.$message(res.message);
                    }
                })
            },
            //获取商圈会员卡模板
            getMembercard() {
                getLoginStatus().then(res=>{
                    if(res == false){
                        this.$router.push({path: '/login'});
                    }
                });
                getmembercade().then(res => {
                    if (res.content.id) {
                        this.form = res.content;
                    } else {
                        return;
                    }
                    if (res.content.sendPoint) {
                        this.form.sendPoint = res.content.sendPoint.toString();
                    }
                    this.colorStyle.background = res.content.bgColor;
                    this.logoimgurl = res.content.logoUrl;
                    this.imageUrltologo = res.content.logoUrl;
                    this.bgimgurl = res.content.bgUrl;
                    this.imageUrltobg = res.content.bgUrl;
                    if(res.content.fieldList == 'POINT'){
                        this.checkedCities1 = ['积分'];
                    }
                    if(res.content.fieldList == 'BALANCE'){
                        this.checkedCities1 = ['余额'];
                    }
                    if(res.content.fieldList == 'POINT,BALANCE'){
                        this.checkedCities1 = ['积分','余额'];
                    }
                    // res.content.hiddens.charAt(0) == '0' ? this.isshow1 = 0 : this.isshow1 = 1;
                    // res.content.hiddens.charAt(1) == '0' ? this.isshow2 = 0 : this.isshow2 = 1;
                    // res.content.hiddens.charAt(2) == '0' ? this.isshow3 = 0 : this.isshow3 = 1;
                    // res.content.hiddens.charAt(3) == '0' ? this.isshow4 = 0 : this.isshow4 = 1;
                    this.lwlist = res.content.cardTemplateColumnList;
                    // this.getpersonaldata = res.content.regFiled.replace('IDCARD','身份证').replace('MOBILE','手机号').replace('BIRTHDAY','生日');
                    // this.personaldata = this.getpersonaldata.split(',');
                    if(res.content.cardTemplateColumnList){
                        // for(let i = res.content.cardTemplateColumnList.length-1;i>=0;i--){
                        //     if(res.content.cardTemplateColumnList[i].title == '优惠信息'){
                        //         res.content.cardTemplateColumnList.splice(i, 1);
                        //         continue;
                        //     }
                        //     if(res.content.cardTemplateColumnList[i].title == '积分兑券'){
                        //         res.content.cardTemplateColumnList.splice(i, 1);
                        //         continue;
                        //     }
                        //     if(res.content.cardTemplateColumnList[i].title == '积分转盘'){
                        //         res.content.cardTemplateColumnList.splice(i, 1);
                        //         continue;
                        //     }
                        //     if(res.content.cardTemplateColumnList[i].title == '积分换礼品'){
                        //         res.content.cardTemplateColumnList.splice(i, 1);
                        //         continue;
                        //     }
                            
                        // }
                        this.lwlist = res.content.cardTemplateColumnList;
                    }
                    // if(res.content.cardTemplateLevelList){
                    //     this.gradetabledata = res.content.cardTemplateLevelList;
                    // }
                })
            },
            //颜色改变时
            colorchange() {
                this.form.bgColor = this.colorStyle.background;
            },
            bgonsuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.$message.success('上传背景图片成功!');
                    this.bgimgurl = file.url;
                    this.imageUrltobg = URL.createObjectURL(file.raw);
                    this.form.bgUrl = response.url;
                    this.form.bgId = response.imageId;
                }
                else if(response.error == 1){
                    this.$message(response.url);
                }
            },
            logoonsuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.$message.success('上传LOGO图片成功!');
                    this.logoimgurl = file.url;
                    this.imageUrltologo = URL.createObjectURL(file.raw);
                    this.form.logoUrl = response.url;
                    this.form.logoId = response.imageId;
                }
                else if(response.error == 1){
                    this.$message(response.url);
                }
            },
            bgbeforeAvatarUpload(file) {
                this.$message('正在上传');
            },
            logobeforeAvatarUpload(file) {
                this.$message('正在上传');
            },
//            会员积分回显
            memberPoints: function () {
                getMemberPoints().then(res => {
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else if(res.errorCode == 30006){
                        this.$router.push({path: '/login'});
                    }else {
                        this.integral.cost = res.content.cost;
                        this.integral.gain = res.content.gain;
                        this.integral.enable = res.content.enable;
                        this.integral.dayTopPoint = res.content.dayTopPoint;
                    }
                })
            },
            //验证会员积分设置
            checksure() {
                if (this.integral.cost === '' || this.integral.gain === ''  || this.integral.dayTopPoint === '' || this.integral.enable === '') {
                    this.$message('信息填写不正确,请重新填写!')
                } else {
                    this.sure();
                }
            },
            sure: function () {
                let data = this.qs.stringify(this.integral);
                saveMember(data).then(res => {
                    if (res.errorCode == 30005 || res.errorCode == 30006) {
                        this.$router.push({path: '/login'});
                    } else if (res.status == "success") {
                        this.$message.success("修改成功!");
                        this.memberPoints();
                    }
                })
            }
        }
    }

</script>
<style>
    .margin-l-f{
            margin-left: 24px;
    }
    .title, .el-breadcrumb {
        /*display: none;*/
    }

    .bg-purple-light {
        height: 100%;
    }

    .content-wrapper {
        min-height: 100%;
    }

    .sq_main {
        background-color: white;
        padding: 16px;
    }

    .ticket_title_all {
        display: inline-block;
        margin-top: 10px;
        padding-left: 8px;
        border-left: 10px solid #00a0e9;
    }

    .ticket_tip {
        line-height: 20px;
        display: block;
        font-size: 12px;
    }

    .color_888 {
        color: #888;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        text-align: center;
        width: 88px;
        height: 88px;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 88px;
        height: 88px;
        line-height: 88px;
        text-align: center;
    }

    .avatar {
        width: 80px;
        margin-top: 5px;
        display: inline-block;
    }

    .membercard_show {
        float: left;
        width: 40%;
        text-align: center;
    }

    .membercard_set {
        margin-top: 30px;
        margin-bottom: 50px;
        float: left;
        width: 60%;
    }

    .card_main_front {
        margin: 0 auto;
        margin-top: 60px;
    }

    .card_front {
        position: relative;
        margin: 20px auto;
        width: 304px;
        height: 186px;
        border-radius: 8px;
        /*background: url('../../assets/images/membercard.png') no-repeat;*/
    }

    .card_main_over {
        margin: 0px auto;
        margin-top: 60px;
    }

    .card_over {
        position: relative;
        margin: 20px auto;
        border-radius: 8px;
        width: 304px;
        height: 186px;
        -moz-box-shadow:0px 0px 20px #ADADAD; -webkit-box-shadow:0px 0px 20px #ADADAD; box-shadow:0px 0px 20px #ADADAD;

    }

    .card_img {
        position: absolute;
        top: 20px;
        left: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        overflow: hidden;
        background-color: white;
        border-radius: 50%;
    }

    .card_img img {
        width: 50px;
    }

    .card_name {
        letter-spacing: 2px;
        float: left;
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        line-height: 50px;
        margin: 20px 0 0 74px;
    }

    .card_des {
        letter-spacing: 2px;
        color: white;
        font-size: 12px;
        margin-right: 20px;
        margin-top: 38px;
    }

    .card_mark {
        position: relative;
        top: 110px;
        height: 42px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .card_mark span {
        font-size: 18px;
        font-weight: 500;
        color: #dddddd;
        line-height: 42px;
        position: absolute;
        left: 20px;
    }

    .qianbao_input {
        width: 280px;
    }

    .wallet_form {
        margin-top: 20px;
    }

    .card_desset{
        width: 280px;
    }
    .card_desset .el-textarea__inner{
        font-size: 12px ;
    }

    .exchange_rate .el-input {
        width: 100px;
    }

    .exchange_rate {
        margin-top: 20px;
    }

    .uploda_img {
        display: inline-block;
        border-radius: 8px;
        outline: none;
        width: 304px;
        height: 186px;
        -moz-box-shadow:0px 0px 20px #ADADAD; -webkit-box-shadow:0px 0px 20px #ADADAD; box-shadow:0px 0px 20px #ADADAD;

    }
    .inputwidth_t{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /* .inputwidth_t_grade{
        margin-top: 20px;
        margin-bottom: 14px;
    } */
    .inputwidth_t .el-input,.inputwidth_t_grade .el-input{
        width: 60px !important;
        margin-top: 4px;
    }
    .inputwidth_t img{
        width: 12px;
        position: relative;
        top:2px;
        margin-right: 4px;
    }
    .inputwidth_t td,.inputwidth_t  th.is-leaf,.inputwidth_t_grade td,.inputwidth_t_grade  th.is-leaf{
      height: 44px !important;
    }
</style>