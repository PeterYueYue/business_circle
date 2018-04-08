<!--消费送券-->
<template>
    <div class="zj-main">
        <div class="ticket_show">
            <div>
                <img src="../../../assets/ticket.png" alt="">
                <span>{{money}}元</span>
                <p>活动日期:{{startTime}}至{{endTime}}</p>
            </div>
        </div>
        <div class="ticket_rule bottom_margin_50 xfsq_box">
            <span class="ticket_title_all">活动内容</span>
            <el-form ref="form" :model="form" :rules="rules"  label-width="140px">
                <el-form-item class="ticket_title" label="活动名称 :" prop="name">
                    <el-input size="small" :maxlength=maxlength32 v-model="form.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item class="timechoose_q"  label="门店确认时间 :" required>
                    <div style="display: inline-block;">
                        <el-form-item style="margin-bottom: 0;" prop="investmentStartDate">
                            <el-date-picker
                                v-model="form.investmentStartDate"
                                type="datetime"
                                :disabled="timedisabled1"
                                placeholder="开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    ~
                    <div style="display: inline-block;">
                        <el-form-item style="margin-bottom: 0;" prop="investmentEndDate">
                            <!-- <el-date-picker
                                v-model="form.investmentEndDate"
                                type="date"
                                format="yyyy-MM-dd 23:59:59"
                                @change="timevalueqchange"
                                :disabled="timedisabled2"
                                placeholder="结束时间">
                            </el-date-picker> -->


                            <!-- test -->

                            <el-date-picker
                            v-model="form.investmentEndDate"
                            type="datetime"
                            @change="timevalueqchange"
                            :disabled="timedisabled2"
                            placeholder="结束时间s">
                            </el-date-picker>
                            <!-- testend -->
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item class="timechoose_q" label="活动时间 :" required>
                    <div style="display: inline-block;">
                        <el-form-item  style="margin-bottom: 0;" prop="activeStartDate">
                            <!-- <el-date-picker
                                v-model="form.activeStartDate"
                                type="date"
                                format="yyyy-MM-dd 00:00:00"
                                :disabled="timedisabled3"
                                placeholder="开始时间">
                            </el-date-picker> -->


                            <el-date-picker
                            v-model="form.activeStartDate"
                            type="datetime"
                            :disabled="timedisabled3"
                            placeholder="开始时间">
                            </el-date-picker>

                        </el-form-item>
                    </div>
                    ~
                    <div style="display: inline-block;">
                        <el-form-item  style="margin-bottom: 0;" prop="activeEndDate">
                            <!-- <el-date-picker
                                v-model="form.activeEndDate"
                                type="date"
                                format="yyyy-MM-dd 23:59:59"
                                :disabled="timedisabled4"
                                placeholder="结束时间">
                            </el-date-picker> -->

                            <el-date-picker
                            v-model="form.activeEndDate"
                            type="datetime"
                            :disabled="timedisabled4"
                            placeholder="结束时间">
                            </el-date-picker>

                        </el-form-item>
                    </div>
                </el-form-item>








                <el-form-item  label="活动对象 :" prop="minCost">
                    <span>消费满</span>
                    <el-input class="width_90" size="small" v-model="form.minCost" type="number" @blur="minCostblur" placeholder="请填写"></el-input>
                    <span>元的顾客</span>
                </el-form-item>
                <el-form-item label="参与门店 :" required>
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>
                    <span class="ticket_tip color_888 ">用户在参与门店消费后即可收到活动优惠券</span>
                </el-form-item>
                <!--选择适用门店弹窗-->
                <el-dialog
                    title="选择适用门店"
                    v-model="dialogVisible_queryshops"
                    size="small"
                    top="20%">
                    <div class="kinds_main">
                        <div class="shopkinds_list">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                                <div class="check_divbox" v-for="item in Objects" :key="item.id" >
                                    <el-checkbox :title=item.main_shop_name :label="item.id" :key="item.id">{{item.main_shop_name}}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
                        <el-button type="primary" @click="queryshops_btn">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form>
            <span class="ticket_title_all ">优惠券设置</span>
            <el-form  :rules="rules" :model="form" label-width="140px">
                <el-form-item class="ticket_limit" label="领取上限 :" required >
                    <el-select v-model="form.pickLimitPeriod" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in limitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &#X3000;
                    <div style="display: inline-block;">
                        <el-form-item style="margin-bottom: 0;"  v-if="this.form.pickLimitPeriod != ''">
                            <el-input class="width_90" size="small" type="number" @blur="pickLimitNumblur" v-model="form.pickLimitNum" placeholder="请填写"></el-input>
                            <span>张/人</span>
                         </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item class="ticket_limit" label="发放数量 :" required >
                    <el-select v-model="form.datelimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in datelimitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &#X3000;
                    <div style="display: inline-block" v-if="this.form.datelimitselectvalue == '2'">
                        <el-input class="width_90" size="small" type="number" @blur="Quantityblur" v-model="form.Quantity" placeholder="请填写"></el-input> <span>张</span>
                    </div>
                </el-form-item>
                <div style="display: inline-block;min-height: 600px;">
                    <div style="margin-bottom: 10px;display: inline-block;" v-if="qlist.length < 5">
                        <el-button
                            type="primary"
                            size="small"
                            @click="addTab(editableTabsValue2)"
                        >
                            添加优惠券
                        </el-button>
                        
                    </div>
                    <span style="display: inline-block;line-height: 30px;margin-bottom: 10px;" class="ticket_tip color_888 "> 最多添加五张优惠券</span>
                    <el-tabs v-model="editableTabsValue2" type="border-card" :closable="closable" @tab-remove="removeTab">
                    
                        <el-tab-pane
                            v-for="(item, index) in qlist"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                        >
                            <el-form class="margin_top_5" ref="item" :rules="rules" :model="item" label-width="140px">
                                <span class="titlenamestyle">{{item.title}}</span>
                                <el-form-item label="券种类 :" required>
                                    <el-radio-group @change="titlenamechange(index)" v-model="item.radio" >
                                        <el-radio :label="1">代金券</el-radio>
                                        <el-radio :label="2">折扣券</el-radio>
                                    </el-radio-group>
                                    <br>
                                    <el-checkbox v-if="item.radio == 1" v-model="item.checked">可与门店优惠券叠加使用</el-checkbox>
                                </el-form-item>
                                <el-form-item label="适用门店 :" required>
                                    <div>
                                        <span v-if="item.shopsnumber_q">已选择{{item.shopsnumber_q}}家门店</span>
                                        <el-button v-if="item.shopsnumber_q != ''" type="text" @click="againchooseshop_q(index)">重新选择</el-button>
                                        <el-button :disabled="item.youghunxuanzhedisabled" v-if="item.shopsnumber_q ==''" type="text" @click="youghunxuanzhe(index)">选择门店</el-button>
                                    </div>
                                    <el-checkbox @change = "tongcheckedchange(index)"   v-model="item.tongchecked">与参与门店一致</el-checkbox>
                                </el-form-item>
                                <el-form-item v-if="item.radio == 1" label="券面额 :"  required>
                                    <el-input class="width_90" size="small" @change="titlenamechange(index)" type="number" @blur="priceblur(index)" v-model="item.price"   placeholder="请填写"></el-input> <span>元</span>
                                </el-form-item>
                                <el-form-item v-if="item.radio == 2"  label="折扣力度 :" required>
                                    <el-input class="width_90" size="small"  @change="titlenamechange(index)" v-model="item.discount"  type="number" @blur="discountblur(index)"  placeholder="请填写"></el-input> <span>折</span>
                                    <span class="ticket_tip color_888 ">填写范围为1.1~9.9</span>
                                </el-form-item>
                                <el-form-item label="最低消费 :" required>
                                    <el-select v-model="item.minimumchargevalue" placeholder="请选择" size="small">
                                        <el-option
                                                v-for="item in minimumchargedata"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    &#X3000;
                                    <div style="display: inline-block" v-if="item.minimumchargevalue == 2">
                                        <el-input class="width_90" size="small" v-model="item.minimumcharge" type="number" @blur="minimumchargeblur(index)" placeholder="请填写"></el-input> <span>元</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="券有效期 :" required>
                                    <el-select v-model="item.validitytimevalue" placeholder="请选择" size="small">
                                        <el-option
                                                v-for="item in validitytimedata"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    &#X3000;
                                    <div style="display: inline-block" v-if="item.validitytimevalue == 'RELATIVE'">
                                        <span>领取后</span>
                                        <el-input class="width_90" size="small" v-model="item.validitytimeday" type="number" @blur="validitytimedayblur(index)" placeholder="请填写"></el-input> <span>天内有效</span>
                                    </div>
                                    <div class="timechoose_q" style="display: inline-block" v-if="item.validitytimevalue == 'FIXED'">
                                        <el-date-picker
                                        v-model="item.validitytime"
                                        type="daterange"
                                        placeholder="选择日期范围">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                                <el-form-item class="ticket_title" label="品牌名称 :" required >
                                    <el-input size="small" v-model="item.brandName" :maxlength=maxlength32 placeholder="请输入品牌名称"></el-input>
                                </el-form-item>
                                <el-form-item @click='imguploadclick(index)' label="券Logo :" required>
                                    <el-upload
                                            class="avatar-uploader"
                                            action="/business/file!fileUpload.action"
                                            :data="shopid"
                                            :show-file-list="false"
                                            :on-success="logoonsuccess"
                                            :before-upload="logobeforeAvatarUpload">
                                        <img  @click='imguploadclick(index)'  v-if="item.imageUrltologo" :src="item.imageUrltologo" class="avatar">
                                        <i  @click='imguploadclick(index)'  v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <span class="ticket_tip color_888 ">请上传品牌Logo，文件格式GIF、JPG、JPEG、PNG文件大小10M以内，建议尺寸120px*120px</span>
                                </el-form-item>
                                <el-form-item class="ticket_width200" label="使用说明 :" required >
                                    <div class="marrgin_b_10" v-for="(desitem,i) in item.usedeslist"  :key="desitem.id" >
                                        <el-input size="small" v-model="desitem.des" placeholder="请输入100字以内的说明" :maxlength=maxlength100></el-input>
                                        <el-button size="small" type="text" v-if="item.usedeslist.length>1" @click="removeDomain123(index,desitem)">删除</el-button>
                                    </div>
                                    <el-button size="small" type="text" v-if="item.usedeslist.length<6" @click="addDomain123(index)">新增</el-button>
                                    <!--<el-input size="small" v-model="item.usedes" placeholder="请输入100字以内的说明"></el-input>-->
                                </el-form-item>
                                <el-form-item label="领取上限 :">
                                    <span>每人只能领取1次</span>
                                </el-form-item>
                                <el-form-item label="生效方式 :">
                                    <el-radio class="radio" v-model="item.effectradio" label="1">当日生效</el-radio>
                                    <el-radio class="radio" v-model="item.effectradio" label="2">次日生效</el-radio>
                                </el-form-item>
                                <el-form-item label="是否可转赠 :">
                                    <el-radio class="radio" v-model="item.presentradio" label="1">可转赠</el-radio>
                                    <el-radio class="radio" v-model="item.presentradio" label="2">不可转赠</el-radio>
                                </el-form-item>
                                <el-form-item v-if="item.radio == 2" label="最高优惠金额 :">
                                    <el-input class="width_90" size="small" v-model="item.Maximum_premium" type="number" @blur="Maximum_premiumblur(index)" placeholder="请填写"></el-input> <span>元</span>
                                </el-form-item>
                                <el-form-item  class="ticket_limit" label="可使用时间段 :">
                                    <el-select v-model="item.timelimitselectvalue" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in timelimitselectdata"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <br>
                                    <div class="bgf4f4f4"  v-if="item.timelimitselectvalue == '2'"  :key="item.id">
                                        <div class="timeitem" v-for="(item12,inde) in item.timelist"   :key="item12.id">
                                            <el-checkbox-group @change="tfchange(index)" v-model="item12.checkList">
                                                <el-checkbox label="星期一"></el-checkbox>
                                                <el-checkbox label="星期二"></el-checkbox>
                                                <el-checkbox label="星期三"></el-checkbox>
                                                <el-checkbox label="星期四"></el-checkbox>       
                                                <el-checkbox label="星期五"></el-checkbox>
                                                <el-checkbox label="星期六"></el-checkbox>
                                                <el-checkbox label="星期日"></el-checkbox>
                                            </el-checkbox-group>
                                            <i v-if="item.timelist.length>1" class="el-icon-close position_i" @click.prevent="removetimeduan(index,item12,inde)"></i>
                                            <span class="viltop">指定时段</span>
                                            <div class="neiform">
                                                <div v-for="(time,ind) in item12.times"  class="margin_b_20">
                                                    <el-time-picker
                                                        is-range
                                                        v-model="time.value"
                                                        @change="tfchange(index)"
                                                        :clearable="clearable"
                                                        :editable="editable"
                                                        placeholder="选择时间范围">
                                                    </el-time-picker>
                                                    <el-button size="small" type="text" v-if="item12.times.length>1"  @click.prevent="removeDomain1(inde,time,index)">删除</el-button>
                                                </div>
                                                <el-button size="small" type="text" v-if="item12.times.length < 5" @click="addDomain11(index,inde)">新增</el-button>
                                            </div>
                                        </div>
                                        <el-button v-if="item.timelist.length < 3" class="addmoretimeduan" size="small" type="text"  @click="addtimelistitem(index)">新增更多领券时间段</el-button>
                                        <p style="color:red;">{{item.titletf}}</p>
                                    </div>
                                </el-form-item>
                                <el-form-item label="不可用日期 :">
                                    <el-select v-model="item.nousetimevalue" placeholder="请选择" size="small">
                                        <el-option
                                                v-for="item in nousetimedata"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <div class="timechoose_q"  v-if="item.nousetimevalue == 2">
                                        <div style="margin-top: 8px;" v-for="(time,time_index) in item.nousetimes_data">
                                            <!--<el-time-picker
                                                is-range
                                                v-model="time.value"
                                                placeholder="选择时间范围">
                                            </el-time-picker>-->
                                            <el-date-picker
                                                v-model="time.value"
                                                type="daterange"
                                                placeholder="选择日期范围">
                                            </el-date-picker>
                                            <el-button type="text" class="afterleft" size="small" v-if="item.nousetimes_data.length >1" @click.prevent="removeDomain(time,index)">删除</el-button>
                                        </div>
                                        <el-button type="text" size="small" v-if="item.nousetimes_data.length < 5" @click="addDomain(index)">新增</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-form>
            <span class="ticket_title_all ">创建须知</span>
            <el-form  label-width="140px">
                <span style="padding-left: 80px;" class="ticket_tip color_888 ">活动创建需要至少一家发券门店和一家券使用门店确认后，该活动才可生效</span>
                <el-form-item class="margin_top_30">
                    <el-button class="bottom_button" @click="back" size="small">取 消</el-button>
                    <el-button :disabled="disabled" class="bottom_button" @click="sumbitdata()" size="small" type="primary">提 交</el-button>
                </el-form-item>
            </el-form>
            
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible_close"
                    size="tiny">
                    <span>你确认删除这张券吗?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_close = false">取 消</el-button>
                        <el-button type="primary" @click="closeTab">确 定</el-button>
                    </span>
            </el-dialog>
            <!--优惠券列表选择适用门店弹窗-->
            <el-dialog
                title="选择适用门店"
                v-model="dialogVisible_queryshops_q"
                size="small"
                top="20%">
                <div class="kinds_main">
                    <div class="shopkinds_list">
                        <el-checkbox :indeterminate="qlist[shoosedialog].isIndeterminate_q" v-model="qlist[shoosedialog].checkAll_q"
                                @change="handleCheckAllChange_q">全选
                        </el-checkbox>
                        <el-checkbox-group v-model="qlist[shoosedialog].checkedshops_q" @change="handleCheckedCitiesChange_q">
                            <div class="check_divbox" v-for="item in Objects">
                                <el-checkbox :title=item.main_shop_name :label="item.id" :key="item.id">{{item.main_shop_name}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_queryshops_q = false">取 消</el-button>
                    <el-button type="primary" @click="queryshops_btn_q">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {formateDate,formDateSecond,formatTimestamp,weekDispose,DateLong} from '../../../api/CommonMethods'
    import {getShopLists,saveProduct,createVoucher} from '../../../api/api';
    export default {
        data() {
            return {
                maxlength32:32,
                maxlength100:100,
                clearable:false,
                editable: false,
                disabled:false,
                shopid:{id:''},//上传图片带的id
                inverstmentJsondata:[],//提交的数据
                sumbit_data:{},
                dialogVisible_close:false,
                closable:false,
                timedisabled1:true,
                timedisabled2:false,
                timedisabled3:true,
                timedisabled4:true,
                checkedshopstrue:[],//适用门店(外面)
                checkedshopstrue_q:[],//券内
                editableTabsValue2: '1',
                qlist: [{   //优惠券列表
                    title: '券一',
                    name: '1',
                    radio:1,
                    checked:false,
                    checkedshopstrue_q:[],       
                    price:'',         //券金额
                    discount:'',        //折扣
                    minimumchargevalue:'1',        //1 or 2
                    minimumcharge:'',   //最低消费
                    validitytimevalue:'RELATIVE',  //RELATIVE or FIXED
                    validitytimeday:'',   //券有效期往后多少天
                    validitytime:'',    //券有效期时间范围
                    brandName:'',       //品牌名称
                    usedeslist:[
                        {des:"本优惠券不可兑换现金，不可找零"},
                    ],
                    effectradio:'1',     //生效方式
                    presentradio:'1',    //是否可转赠
                    nousetimevalue:'1',    //不可用时期
                    Maximum_premium:'',     //最高优惠金额
                    brandLogo:'',//图片id
                    urlLogo:'',
                    imageUrltologo: '',
                    nousetimes_data:[
                        {value:[]}
                    ],
                    titletf:'',
                    timelist:[
                        {
                            times: [{
                                value: []
                            }],
                            checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                        },
                    ],
                    hhddatas2_q: [],
                    checkedshops_q: [],
                    isIndeterminate_q: true,
                    checkAll_q: false,
                    
                    shopsnumber_q: '',
                    timelimitselectvalue:'1',
                    tongchecked:false,     //与参与门店一致
                    youghunxuanzhedisabled:false,
                    submit_usedes:[],
                }],
                targetName:'',
                tabIndex: 2,
                
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '',
                showList: [],
                form: {         //活动设置
                    numbers:'45',
                    minCost:'',
                    name: '',
                    shop: '门店1',
                    number: '9999',
                    time: '',
                    pickLimitPeriod: 'M',
                    datelimitselectvalue: '1',
                    pickLimitNum: '',
                    Quantity: '9999',
                    investmentStartDate:'',
                    investmentEndDate:'',
                    activeStartDate:'',
                    activeEndDate:'',
                },
                rules:{
                    name:[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    investmentEndDate:[
                        {type: 'date',required: true, message: '请选择结束时间', trigger: 'blur' },
                    ],
                    activeStartDate:[
                        { type: 'date',required: true, message: '请选择开始时间', trigger: 'blur' },
                    ],
                    activeEndDate:[
                        {type: 'date', required: true, message: '请选择结束时间', trigger: 'blur' },
                    ],
                    minCost:[
                        { required: true, message: '请正确输入最低消费金额', trigger: 'blur' },
                    ],
                },
                //领取上限是否限制
                limitselectdata: [
                    {value: '', label: '不限制'},
                    {value: 'D', label: '每日'},
                    {value: 'W', label: '每周'},
                    {value: 'M', label: '每月'},
                ],
                //发放数量是否限制
                datelimitselectdata: [
                    {value: '1', label: '不限制'},
                    {value: '2', label: '限制数量'},
                ],
                //优惠券列表最低消费
                minimumchargedata:[
                    {value:'1',label:'不限制'},
                    {value:'2',label:'设置最低金额'},
                ],
                timelimitselectdata:[
                    {value:'1',label:'不限制'},
                    {value:'2',label:'指定可用时间段'}
                ],
                //券有效期 相对时间 or 指定时间
                validitytimedata:[
                    {value:'RELATIVE',label:'相对时间'},
                    {value:'FIXED',label:'指定时间'},
                ],
                nousetimedata:[
                    {value:'1',label:'不限制'},
                    {value:'2',label:'指定不可用时期'},
                ],
                Objects: '',    //门店列表
                
                //选择门店有关参数
                hhddatas2: [],
                checkedshops: [],
                isIndeterminate: true,
                checkAll: false,
                dialogVisible_queryshops: false,
                shopsnumber: '',
                shoosedialog:0,
                dialogVisible_queryshops_q: false,
                //标记上传图片时点击的优惠券index
                imguploadclick_data:0,
                
            }
        },
        mounted:function () {
          this.shopList();
          this.getnewdata();
          this.cookie();
        },
        methods: {
            minCostblur(){
                this.form.minCost = Number(this.form.minCost);
                this.form.minCost = Math.abs(this.form.minCost);
                this.form.minCost = this.form.minCost.toFixed(2);
                if(this.form.minCost == '0.00'){
                    this.form.minCost = ' ';
                }
            },
            pickLimitNumblur(){
                this.form.pickLimitNum = Number(this.form.pickLimitNum);
                this.form.pickLimitNum = parseInt(this.form.pickLimitNum);
                this.form.pickLimitNum = Math.abs(this.form.pickLimitNum);
                if(this.form.pickLimitNum == '0.00'){
                    this.form.pickLimitNum = ' ';
                }
            },
            Quantityblur(){
                this.form.Quantity = Number(this.form.Quantity);
                this.form.Quantity = parseInt(this.form.Quantity);
                this.form.Quantity = Math.abs(this.form.Quantity);
                if(this.form.Quantity == "0.00"){
                    this.form.Quantity = ' ';
                }
            },
            priceblur(i){
                if(this.qlist[i].price.length > 7){
                    this.qlist[i].price = this.qlist[i].price.substr(0,7); 
                }
                    this.qlist[i].price = Number(this.qlist[i].price);
                    this.qlist[i].price = Math.abs(this.qlist[i].price);
                    this.qlist[i].price = this.qlist[i].price.toFixed(2);
                    if(this.qlist[i].price == '0.00'){
                        this.qlist[i].price = ' ';
                    }
                this.titlenamechange(i);
            },
            minimumchargeblur(i){
                if(this.qlist[i].minimumcharge.length > 7){
                    this.qlist[i].minimumcharge = this.qlist[i].minimumcharge.substr(0,7); 
                }
                    this.qlist[i].minimumcharge = Number(this.qlist[i].minimumcharge);
                    this.qlist[i].minimumcharge = Math.abs(this.qlist[i].minimumcharge);
                    this.qlist[i].minimumcharge = this.qlist[i].minimumcharge.toFixed(2);
                    if(this.qlist[i].minimumcharge == '0.00'){
                        this.qlist[i].minimumcharge = ' ';
                    }
            },
            validitytimedayblur(i){
                if(this.qlist[i].validitytimeday.length > 3){
                    this.qlist[i].validitytimeday = this.qlist[i].validitytimeday.substr(0,3); 
                }
                    this.qlist[i].validitytimeday = Number(this.qlist[i].validitytimeday);
                    this.qlist[i].validitytimeday = parseInt(this.qlist[i].validitytimeday);
                    this.qlist[i].validitytimeday = Math.abs(this.qlist[i].validitytimeday);
                    if(this.qlist[i].validitytimeday == '0.00'){
                        this.qlist[i].validitytimeday = ' ';
                    }
            },
            Maximum_premiumblur(i){
                if(this.qlist[i].Maximum_premium.length > 7){
                    this.qlist[i].Maximum_premium = this.qlist[i].Maximum_premium.substr(0,7); 
                }
                    this.qlist[i].Maximum_premium = Number(this.qlist[i].Maximum_premium);
                    this.qlist[i].Maximum_premium = Math.abs(this.qlist[i].Maximum_premium);
                    this.qlist[i].Maximum_premium = this.qlist[i].Maximum_premium.toFixed(2);
                    if(this.qlist[i].Maximum_premium == '0.00'){
                        this.qlist[i].Maximum_premium = ' ';
                    }
            },
            discountblur(i){
                if(this.qlist[i].discount <=1||this.qlist[i].discount>=9){
                    this.$message.error('填写范围为1.1~9.9')
                    this.qlist[i].discount = ' ';
                }
                if(this.qlist[i].discount.length > 3){
                    this.qlist[i].discount = this.qlist[i].discount.substr(0,3); 
                }
                this.qlist[i].discount = Number(this.qlist[i].discount);
                this.qlist[i].discount = Math.abs(this.qlist[i].discount);
                if(this.qlist[i].discount == "0.00"){
                    this.qlist[i].discount = ' ';
                }
                if(this.qlist[i].discount == ""){
                    this.qlist[i].discount = ' ';
                }
                this.titlenamechange(i);
            },
            removetimeduan(index,item,inde){
                var index1 = this.qlist[index].timelist.indexOf(item)
                if (index1 !== -1) {
                    this.qlist[index].timelist.splice(index1, 1)
                }
                this.tfchange(index);
            },
            imguploadclick(index){
                this.imguploadclick_data = index;
            },
            logobeforeAvatarUpload(file) {
                this.$message('正在上传');
            },
            logoonsuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.$message.success('上传LOGO图片成功!');
                    this.qlist[this.imguploadclick_data].imageUrltologo = URL.createObjectURL(file.raw);
                    this.qlist[this.imguploadclick_data].brandLogo = response.imageId;
                    this.qlist[this.imguploadclick_data].urlLogo = response.url;
                }
                else if(response.error == 1){
                    this.$message(response.message);
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
            //获取当前时间并设置
            getnewdata(){
                var src = new Date();
                var dest = new Date(src.getTime());
                this.form.investmentStartDate=dest;
            },
            //门店确认时间改变时
            timevalueqchange(){
                this.timedisabled3 = false;
                this.timedisabled4 = false;
            },
            closeTab(){
                let tabs = this.qlist;
                let activeName = this.editableTabsValue2;
                if (activeName === this.targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === this.targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.qlist = tabs.filter(tab => tab.name !== this.targetName);
                if(this.qlist.length > 1){
                    this.closable = true;
                }else{
                    this.closable = false;
                }
                for(let a =0;a<this.qlist.length;a++){
                    let b = a+1;
                    let numberindex = this.switchnumber(b);
                    this.qlist[a].title = numberindex;
                }
                this.dialogVisible_close=false;
            },
            switchnumber(number){
                let c= Number(number);
                let d = '';
                switch(c){
                    case 1:d ='一'; break;
                    case 2:d = '二';break;
                    case 3:d ='三';break;
                    case 4:d ='四';break;
                    case 5:d ='五';break;
                }
                return '券'+d;
            },
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                let des = '';
                let number = this.qlist.length;
                switch(number){
                    case 1:des ='二'; break;
                    case 2:des = '三';break;
                    case 3:des ='四';break;
                    case 4:des ='五';break;
                }
                this.qlist.push({
                    title: '券'+des,
                    name: newTabName,
                    radio:1,
                    checked:false,         
                    price:'',
                    discount:'',         
                    minimumchargevalue:'1',        
                    minimumcharge:'',   
                    validitytimevalue:'RELATIVE',  
                    validitytimeday:'',  
                    validitytime:'',   
                    brandName:'',  
                    usedeslist:[
                        {des:"本优惠券不可兑换现金，不可找零"},
                    ],
                    effectradio:'1', 
                    presentradio:'1', 
                    nousetimevalue:'1',
                    Maximum_premium:'',
                    checkedshopstrue_q:[],
                    nousetimes_data:[
                        {value:[]}
                    ],
                    timelist:[
                        {
                            times: [{
                                value: []
                            }],
                            checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                        },
                    ],
                    hhddatas2_q: [],
                    checkedshops_q: [],
                    isIndeterminate_q: true,
                    checkAll_q: true,
                    dialogVisible_queryshops_q: false,
                    shopsnumber_q: '',
                    brandLogo:'',//图片id
                    urlLogo:'',//图片url
                    imageUrltologo: '',
                    timelimitselectvalue:'1',
                    titletf:'',
                    tongchecked:false,
                    youghunxuanzhedisabled:false,
                    submit_usedes:[],
                });
                this.editableTabsValue2 = newTabName;
                if(this.qlist.length > 1){
                    this.closable = true;
                }else{
                    this.closable = false;
                }
            },
            removeTab(targetName) {
                this.targetName = targetName;
                this.dialogVisible_close=true;
            },
            //与参与门店一致
            tongcheckedchange(index){
                if(this.qlist[index].tongchecked == false){
                    this.qlist[index].youghunxuanzhedisabled = false;

                }else if(this.qlist[index].tongchecked == true){
                    this.qlist[index].checkedshopstrue_q = this.checkedshopstrue;
                    this.qlist[index].shopsnumber_q = 0;
                    this.qlist[index].youghunxuanzhedisabled = true;
                }
            },
            //获取门店信息
            shopList: function () {
                let data = this.qs.stringify({pageNumber: '1',pageSize: '10000'});
                getShopLists(data)
                    .then(res=>{
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else{
                            this.Objects=res.content.resultList;
                        }
                    })
            },
            //点击全选门店
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].id);
                }
                this.checkedshops = event.target.checked ? this.hhddatas2 : [];
                this.isIndeterminate = false;
            },
            //点击选择某一个门店
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.Objects.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
            },
            //重新选择门店
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            // 上架门店确定
            queryshops_btn() {
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            youghunxuanzhe(index){
                this.dialogVisible_queryshops_q = true;
                this.shoosedialog = index;
            },
            //优惠券列表_点击全选门店
            handleCheckAllChange_q(event) {
                this.qlist[this.shoosedialog].hhddatas2_q = [];
                for (let i = 0; i < this.Objects.length; i++) {
                    this.qlist[this.shoosedialog].hhddatas2_q.push(this.Objects[i].id);
                }
                this.qlist[this.shoosedialog].checkedshops_q = event.target.checked ? this.qlist[this.shoosedialog].hhddatas2_q : [];
                this.qlist[this.shoosedialog].isIndeterminate_q = false;
            },
            //优惠券列表_点击选择某一个门店
            handleCheckedCitiesChange_q(value) {
                let checkedCount_q = value.length;
                this.qlist[this.shoosedialog].checkAll_q = checkedCount_q === this.Objects.length;
                this.qlist[this.shoosedialog].isIndeterminate_q = checkedCount_q > 0 && checkedCount_q < this.qlist[this.shoosedialog].hhddatas2_q.length;
            },
            //优惠券列表_重新选择门店
            againchooseshop_q(index) {
                this.shoosedialog = index;
                this.dialogVisible_queryshops_q = true;
                this.qlist[this.shoosedialog].checkedshops_q = this.qlist[this.shoosedialog].checkedshopstrue_q;
            },
            // 优惠券列表_上架门店确定
            queryshops_btn_q() {
                this.dialogVisible_queryshops_q = false;
                this.qlist[this.shoosedialog].checkedshopstrue_q = this.qlist[this.shoosedialog].checkedshops_q;
                this.qlist[this.shoosedialog].shopsnumber_q = this.qlist[this.shoosedialog].checkedshopstrue_q.length;
                this.qlist[this.shoosedialog].choosemendian = this.qlist[this.shoosedialog].checkedshops_q;
            },
            //动态添加选择时间段
            addDomain(i){
                this.qlist[i].nousetimes_data.push({
                    value:[]
                })
            },
            addDomain11(index,inde) {
                this.qlist[index].timelist[inde].times.push({
                    value: []
                })
                this.tfchange(index);
            },
            addtimelistitem(index){
                this.qlist[index].timelist.push(
                    {
                        times: [{
                            value: []
                        }],
                        checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                    }
                )
                this.tfchange(index);
            },
            removeDomain1(inde,time,index) {
                var index23 = this.qlist[index].timelist[inde].times.indexOf(time);
                if (index23 !== -1) {
                    this.qlist[index].timelist[inde].times.splice(index23, 1)
                }
                this.tfchange(index);
            },
            removeDomain(time,i){
                var index = this.qlist[i].nousetimes_data.indexOf(time)
                if (index !== -1) {
                    this.qlist[i].nousetimes_data.splice(index, 1)
                }
            },
            addDomain123(index){
                this.qlist[index].usedeslist.push({
                    des:''
                })
            },
            removeDomain123(index,desitem){
                var indexw = this.qlist[index].usedeslist.indexOf(desitem)
                if (indexw !== -1) {
                    this.qlist[index].usedeslist.splice(index, 1)
                }
                
            },
            //券种类券面额改变时title改变
            titlenamechange(i){
                if(this.qlist[i].radio == '1'){
                    if(this.qlist[i].price == ''){
                            this.qlist[i].title = '代金券';
                    }else{
                        this.qlist[i].title = this.qlist[i].price +'元代金券';
                    }
                }else if(this.qlist[i].radio == '2'){
                    if(this.qlist[i].discount == ''){
                        this.qlist[i].title = '折扣券';
                    }else{
                        this.qlist[i].title = this.qlist[i].discount+ '折折扣券';
                    }
                }
            },    
            //返回上一页
            back(){
                this.$router.go(-1);
            },
            tfchange(i){
                        for(let a =0;a<this.qlist[i].timelist.length;a++){
                            if(this.qlist[i].timelist[a].checkList.length == 0){
                                this.qlist[i].titletf ='第' +(a+1)+ '条记录星期为空';
                                return;
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let a = 0; a<this.qlist[i].timelist[y].times.length;a++){
                                if(!this.qlist[i].timelist[y].times[a].value[1]){
                                    this.qlist[i].titletf = '第'+(y+1)+'条记录弟'+(a+1)+"行为空";
                                    return;
                                }
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let a = 0; a<this.qlist[i].timelist[y].times.length;a++){
                                for(let b = a+1;b<this.qlist[i].timelist[y].times.length-a;b++){
                                    if(this.qlist[i].timelist[y].times[a].value[1].getTime()>this.qlist[i].timelist[y].times[b].value[0].getTime()){
                                        if(this.qlist[i].timelist[y].times[a].value[0].getTime()<this.qlist[i].timelist[y].times[b].value[1].getTime()){
                                            this.qlist[i].titletf = '第'+(y+1)+'条记录第'+(a+1)+'行与第'+(b+1)+'行重复';
                                            return;
                                        }
                                    }
                                 }
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let n=y+1; n<this.qlist[i].timelist.length-y; n++){
                                for(let c = 0;c<this.qlist[i].timelist[y].checkList.length;c++){
                                    for(let d=0;d<this.qlist[i].timelist[n].checkList.length;d++){
                                        if(this.qlist[i].timelist[y].checkList[c] == this.qlist[i].timelist[n].checkList[d]){
                                            for(let u = 0; u < this.qlist[i].timelist[y].times.length;u++){
                                                for(let p = 0;p<this.qlist[i].timelist[n].times.length;p++){
                                                    if(this.qlist[i].timelist[y].times[u].value[1].getTime()>this.qlist[i].timelist[n].times[p].value[0].getTime()){
                                                        if(this.qlist[i].timelist[y].times[u].value[0].getTime()<this.qlist[i].timelist[n].times[p].value[1].getTime()){
                                                            this.qlist[i].titletf ='弟'+(y+1)+'条记录弟'+(u+1)+'行与第'+(n+1)+'条第'+(p+1)+'行重复';
                                                            return;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    this.qlist[i].titletf = ' ';
            },
            //提交按钮
            sumbitdata(){
                //rules验证
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                    } else {
                        return;
                    }
                });
                if(this.form.investmentStartDate.getTime()>this.form.investmentEndDate.getTime()){
                    this.$message.error('门店确认结束时间需大于开始时间');
                    return;
                }  
                if(this.form.investmentEndDate.getTime()>this.form.activeStartDate.getTime()){
                    this.$message.error('活动开始时间需大于门店确认结束时间');
                    return;
                } 
                if(this.form.activeStartDate.getTime()>this.form.activeEndDate.getTime()){
                    this.$message.error('活动结束时间需大于活动开始时间');
                    return;
                }
                if(this.form.minCost == '' || this.form.minCost == ' '){
                    this.$message.error('最低消费金额未填写');
                    return;
                }
                if(this.checkedshopstrue.length == 0){
                    this.$message.error('活动适用门店未选择');
                    return;
                }
                if(this.form.pickLimitPeriod != ''){
                    if(this.form.pickLimitNum == ''||this.form.pickLimitNum == ' '){
                        this.$message.error('优惠券领取上限未填写');
                        return;
                    }
                }
                if(this.form.datelimitselectvalue == '2'){
                    if(this.form.Quantity == ''||this.form.Quantity == ' '){
                        this.$message.error('优惠券发放数量未填写');
                        return;
                    }
                }
                for(let i = 0 ; i <this.qlist.length ; i++){
                    if(this.qlist[i].tongchecked == true){
                        this.qlist[i].checkedshopstrue_q = this.checkedshopstrue;
                    }
                    if(this.qlist[i].checkedshopstrue_q.length == 0){
                        this.$message.error(this.qlist[i].title + '适用门店未选取');
                        return;
                    }
                    if(this.qlist[i].radio == '1'){
                        if(this.qlist[i].price == ''||this.qlist[i].price == ' '){
                            this.$message.error(this.qlist[i].title + ' 券面额未设置');
                            return;
                        }
                    }else if(this.qlist[i].radio == '2'){
                        if(this.qlist[i].discount == ''||this.qlist[i].discount == ' '){
                            this.$message.error(this.qlist[i].title + ' 折扣力度未设置');
                            return;
                        }
                        if(this.qlist[i].discount <= 1.1 || this.qlist[i].discount >= 9.9){
                            this.$message.error(this.qlist[i].title + ' 折扣力度范围为1.1~9.9');
                            return;
                        }
                    }
                    if(this.qlist[i].minimumchargevalue == '2'){
                           if(this.qlist[i].minimumcharge == ''||this.qlist[i].minimumcharge == ' '){
                               this.$message.error(this.qlist[i].title + ' 最低消费金额未设置');
                               return;
                           }
                    }
                    if(this.qlist[i].validitytimevalue == 'RELATIVE'){
                        if(this.qlist[i].validitytimeday == ''||this.qlist[i].validitytimeday == ' '){
                            this.$message.error(this.qlist[i].title + ' 券有效期未填写');
                            return;
                        }
                    }else if(this.qlist[i].validitytimevalue == 'FIXED'){
                        if(!this.qlist[i].validitytime[0]){
                            this.$message.error(this.qlist[i].title + ' 券有效期未选择');
                            return;
                        }
                        if(this.qlist[i].validitytime[1].getTime()<this.form.activeEndDate.getTime()){
                            this.$message.error(this.qlist[i].title + ' 有效期结束时间必须晚于活动结束时间');
                            return;
                        }
                    }
                    if(this.qlist[i].brandName == ''){
                         this.$message.error(this.qlist[i].title + ' 品牌名称未填写');
                         return;
                    }
                    if(this.qlist[i].brandLogo == ''){
                         this.$message.error(this.qlist[i].title + ' 券Logo未上传');
                         return;
                    }
                    for(let b = 0;b<this.qlist[i].usedeslist.length;b++){
                        if(this.qlist[i].usedeslist[b].des == ''){
                            this.$message.error(this.qlist[i].title + ' 使用说明第'+(b+1)+'条未填写');
                            return;
                        }
                    }
                    if(this.qlist[i].nousetimevalue  == '2'){
                        for(let a = 0; a<this.qlist[i].nousetimes_data.length;a++){
                            for(let b = a+1;b<this.qlist[i].nousetimes_data.length-a;b++){
                                if(this.qlist[i].nousetimes_data[a].value[1].getTime()>this.qlist[i].nousetimes_data[b].value[0].getTime()){
                                    if(this.qlist[i].nousetimes_data[a].value[0].getTime()<this.qlist[i].nousetimes_data[b].value[1].getTime()){
                                        this.$message.error(this.qlist[i].title + ' 不可用日期第'+(a+1)+'条与第'+(b+1)+'条重复');
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    if(this.qlist[i].timelimitselectvalue == '2'){
                        for(let a =0;a<this.qlist[i].timelist.length;a++){
                            if(this.qlist[i].timelist[a].checkList.length == 0){
                                this.$message.error(this.qlist[i].title + '可使用时间段第' +(a+1)+ '条记录星期为空');
                                return;
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let a = 0; a<this.qlist[i].timelist[y].times.length;a++){
                                if(!this.qlist[i].timelist[y].times[a].value[1]){
                                    this.$message.error(this.qlist[i].title + '可使用时间段第'+(y+1)+'条记录弟'+(a+1)+"行为空" );
                                    return;
                                }
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let a = 0; a<this.qlist[i].timelist[y].times.length;a++){
                                for(let b = a+1;b<this.qlist[i].timelist[y].times.length-a;b++){
                                    if(this.qlist[i].timelist[y].times[a].value[1].getTime()>this.qlist[i].timelist[y].times[b].value[0].getTime()){
                                        if(this.qlist[i].timelist[y].times[a].value[0].getTime()<this.qlist[i].timelist[y].times[b].value[1].getTime()){
                                            this.$message.error(this.qlist[i].title + ' 可使用时间段第'+(y+1)+'条记录第'+(a+1)+'行与第'+(b+1)+'行重复');
                                            return;
                                        }
                                    }
                                 }
                            }
                        }
                        for(let y =0;y<this.qlist[i].timelist.length;y++){
                            for(let n=y+1; n<this.qlist[i].timelist.length-y; n++){
                                for(let c = 0;c<this.qlist[i].timelist[y].checkList.length;c++){
                                    for(let d=0;d<this.qlist[i].timelist[n].checkList.length;d++){
                                        if(this.qlist[i].timelist[y].checkList[c] == this.qlist[i].timelist[n].checkList[d]){
                                            for(let u = 0; u < this.qlist[i].timelist[y].times.length;u++){
                                                for(let p = 0;p<this.qlist[i].timelist[n].times.length;p++){
                                                    if(this.qlist[i].timelist[y].times[u].value[1].getTime()>this.qlist[i].timelist[n].times[p].value[0].getTime()){
                                                        if(this.qlist[i].timelist[y].times[u].value[0].getTime()<this.qlist[i].timelist[n].times[p].value[1].getTime()){
                                                            this.$message.error(this.qlist[i].title + ' 可使用时间段弟'+(y+1)+'条记录弟'+(u+1)+'行与第'+(n+1)+'条第'+(p+1)+'行重复');
                                                            return;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    }
                }
                this.setdatatosumbit();
            },
            //判断已通过验证,开始整合数据提交
            setdatatosumbit(){
                
                for(let i = 0 ; i < this.qlist.length; i++){
                    if(this.qlist[i].timelimitselectvalue == '1'){
                        this.qlist[i].sumbit_timelimitselectvalue  = '';
                    }else if(this.qlist[i].timelimitselectvalue == '2'){
                        this.qlist[i].sumbit_timelimitselectvalue  = [];
                        for(let n = 0;n<this.qlist[i].timelist.length;n++){
                            let useweekstr = '';
                            for(let c = 0; c< this.qlist[i].timelist[n].checkList.length;c++){
                                if(this.qlist[i].timelist[n].checkList[c] == '星期一'){
                                    useweekstr = useweekstr + '1,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期二'){
                                    useweekstr = useweekstr + '2,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期三'){
                                    useweekstr = useweekstr + '3,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期四'){
                                    useweekstr = useweekstr + '4,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期五'){
                                    useweekstr = useweekstr + '5,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期六'){
                                    useweekstr = useweekstr + '6,'
                                }
                                if(this.qlist[i].timelist[n].checkList[c] == '星期日'){
                                    useweekstr = useweekstr + '7,'
                                }
                            }
                            useweekstr = useweekstr.substr(0,useweekstr.length-1);
                            let usetimestr = '';
                            usetimestr = DateLong(this.qlist[i].timelist[n].times)
                            this.qlist[i].sumbit_timelimitselectvalue.push({
                                useWeek:useweekstr,
                                useTime:usetimestr,
                            })
                        }
                    }
                    if(this.qlist[i].nousetimevalue == '1'){
                        this.qlist[i].sumbit_forbidden_use_date = '';
                    }else if(this.qlist[i].nousetimevalue == '2'){
                        this.qlist[i].sumbit_forbidden_use_date = '';
                        for(let j=0;j<this.qlist[i].nousetimes_data.length;j++){
                            if(this.qlist[i].nousetimes_data[j].value[0]){
                                let a = formateDate(this.qlist[i].nousetimes_data[j].value[0])
                                let b = formateDate(this.qlist[i].nousetimes_data[j].value[1])
                                this.qlist[i].sumbit_forbidden_use_date = this.qlist[i].sumbit_forbidden_use_date + a + ',' + b + '^';
                            }
                            
                        }
                        this.qlist[i].sumbit_forbidden_use_date = this.qlist[i].sumbit_forbidden_use_date.substr(0,this.qlist[i].sumbit_forbidden_use_date.length-1);
                        
                    }
                    if(this.qlist[i].nousetimes_data)
                    if(this.qlist[i].radio == '1'){
                        this.qlist[i].voucherType = 'MONEY';
                        this.qlist[i].sumbit_price = this.qlist[i].price;
                        this.qlist[i].sumbit_discount = '';
                        this.qlist[i].sumbit_maxAmount = '9999';
                    }else if(this.qlist[i].radio == '2'){
                        this.qlist[i].voucherType = 'RATE';
                        this.qlist[i].sumbit_price = '0.00';
                        this.qlist[i].sumbit_discount = this.qlist[i].discount;
                        this.qlist[i].sumbit_maxAmount = this.qlist[i].Maximum_premium;
                    }
                    if(this.qlist[i].checked == false){
                        this.qlist[i].sumbit_checked = 'NO_MULTI';
                    }else if(this.qlist[i].checked == true){
                        if(this.qlist[i].radio == '1'){
                            this.qlist[i].sumbit_checked = 'MULTI_USE_WITH_OTHERS';
                        }else if(this.qlist[i].radio == '2'){
                            this.qlist[i].sumbit_checked = '';
                        }
                    }
                    
                    if(this.qlist[i].minimumchargevalue == '1'){
                        this.qlist[i].sumbit_minimumchargevalue = '0.01';
                    }else if(this.qlist[i].minimumchargevalue == '2'){
                        this.qlist[i].sumbit_minimumchargevalue = this.qlist[i].minimumcharge;
                    }
                    if(this.qlist[i].validitytimevalue == 'RELATIVE'){
                        this.qlist[i].sumbit_validStartDate = '';
                        this.qlist[i].sumbit_validEndDate = '';
                        this.qlist[i].sumbit_validToDay =this.qlist[i].validitytimeday;
                    }else if(this.qlist[i].validitytimevalue == 'FIXED'){
                        this.qlist[i].sumbit_validStartDate = formateDate(this.qlist[i].validitytime[0]);
                        this.qlist[i].sumbit_validEndDate = formateDate(this.qlist[i].validitytime[1]);
                        this.qlist[i].sumbit_validToDay ='';
                    }
                    if(this.qlist[i].effectradio == '1'){
                        this.qlist[i].sumbit_effectWay = 'IMMEDIATELY';
                    }else if(this.qlist[i].effectradio == '2'){
                        this.qlist[i].sumbit_effectWay = 'DELAY';
                    }
                    if(this.qlist[i].presentradio == '1'){
                        this.qlist[i].sumbit_isShare = true;
                    }else if(this.qlist[i].presentradio == '2'){
                        this.qlist[i].sumbit_isShare = false;
                    }
                    for(let a = 0;a<this.qlist[i].usedeslist.length;a++){
                        this.qlist[i].submit_usedes[a] = this.qlist[i].usedeslist[a].des;
                    }
                    this.disabled = true;
                    this.inverstmentJsondata.push(
                        {
                            voucherType:this.qlist[i].voucherType,
                            isRepeat:this.qlist[i].sumbit_checked,
                            suitShops:this.qlist[i].checkedshopstrue_q,
                            voucherMoney:this.qlist[i].sumbit_price,
                            discount:this.qlist[i].sumbit_discount,
                            fullCost:this.qlist[i].sumbit_minimumchargevalue,
                            validType:this.qlist[i].validitytimevalue,
                            validStartDate:this.qlist[i].sumbit_validStartDate,
                            validEndDate:this.qlist[i].sumbit_validEndDate,
                            validToDay:this.qlist[i].sumbit_validToDay,
                            brandName:this.qlist[i].brandName,
                            brandLogo:this.qlist[i].brandLogo,
                            // brandLogo:'2N-JXEkdRaG-GSdhPjneIgAAACMAAQED',
                            urlLogo:this.qlist[i].urlLogo,
                            // urlLogo:'https://oalipay-dl-django.alicdn.com/rest/1.0/image?fileIds=2N-JXEkdRaG-GSdhPjneIgAAACMAAQED&zoom=original',
                            receiveMax:'1',
                            instruction:this.qlist[i].submit_usedes,
                            effectWay:this.qlist[i].sumbit_effectWay,
                            isShare:this.qlist[i].sumbit_isShare,
                            maxAmount:this.qlist[i].sumbit_maxAmount,
                            usetimeweekjson:this.qlist[i].sumbit_timelimitselectvalue,
                            forbiddenUseDate:this.qlist[i].sumbit_forbidden_use_date,
                        }
                    )
                }
                this.sumbit_data = {
                    type:'CONSUME_SEND',
                    'investment.investmentType':'PAYMENT_RESULT',
                    'investment.name':this.form.name,
                    'investment.investmentStartDate':formDateSecond(this.form.investmentStartDate),
                    'investment.investmentEndDate':formDateSecond(this.form.investmentEndDate),
                    'investment.activeStartDate':formDateSecond(this.form.activeStartDate),
                    'investment.activeEndDate':formDateSecond(this.form.activeEndDate),
                    'investment.minCost':this.form.minCost,
                    'investment.investmentShops':JSON.stringify(this.checkedshopstrue),
                    'investment.pickLimitPeriod':this.form.pickLimitPeriod,
                    'investment.pickLimitNum':this.form.pickLimitNum,
                    'investment.Quantity':this.form.Quantity,
                    inverstmentJson:JSON.stringify(this.inverstmentJsondata),
                }
                this.inverstmentJsondata = [];  //置空临时数据
                this.$message('活动创建中...')
                //数据已整合,提交
                let data = this.qs.stringify(this.sumbit_data);
                createVoucher(data)
                    .then(res=>{
                        this.disabled = false;
                        if(res.status == 'success'){
                            this.$message.success('创建成功');
                            this.$router.push({path: '/listactivity'})
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                            this.$router.push({path: '/listactivity'})
                        }
                })
            },
        },
    }
</script>

<style scoped>
    .marrgin_b_10{
        margin-bottom: 10px;
    }
    .addmoretimeduan{
        margin-left: 52px;
        position: relative;
        top:-20px;
    }
    .position_i{
        float: right;
        position: relative;
        left: 24px;
        top: -22px;
    }
    .timeitem{
        margin-bottom: 24px;
        margin-right: 20px;
    }
    .ticket_show{
        width: 30%;
    }
    .ticket_rule {
        width: 69%;
    }
    .margin_top_30{
        margin-top: 30px;
    }
    .titlenamestyle{
        font-size: 14px;
        font-weight: 600;
    }
    .margin_top_5{
        margin-top: 5px;
    }
</style>