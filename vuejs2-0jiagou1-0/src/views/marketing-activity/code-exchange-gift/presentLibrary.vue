<template>
    <div class="padding_16">
        <div class="tab_header padding_t_l_r_0">
            <el-button type="primary"  @click="addgift_btn">&#X3000;添加礼品&#X3000;</el-button>
            <el-button type="primary"  @click="plchoose(0)">上架已选中礼品</el-button>
            <el-button type="primary"  @click="plchoose(1)">下架已选中礼品</el-button>
            <!--<el-button type="primary"  @click="showallgifts">显示所有已上架礼品</el-button>-->
            <div class="f_r">
                <span>礼品显示 : </span>
                <el-select v-model="selectvalue" placeholder="请选择" size="small" class=" margin_r_10" @change="selectChange">
                    <el-option
                    v-for="item in selectdata"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type">
                    </el-option>
                </el-select>
                <span>礼品名称 : </span>
                <el-input class="width_150" size="small" v-model="queryacticvename" placeholder="请输入礼品名称"></el-input>
                <el-button class="query_button" type="primary" size="small"  @click="query_gift_btn">搜 索</el-button>
            </div>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55"> 
                    </el-table-column>
                    <el-table-column prop="name" label="礼品名称" >
                    </el-table-column>
                    <el-table-column label="礼品图片">
                        <template scope="scope">
                            <div class="gift_table_imgbox">
                                <img :src="scope.row.logo" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="point" label="兑换所需积分">
                    </el-table-column>
                    <el-table-column label="礼品库存数量">
                        <template scope="scope">
                            <p>{{scope.row.totalNum - scope.row.exchangeNum}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="exchangeNum" label="线上兑换数量">
                    </el-table-column>
                    <el-table-column prop="receiveNum" label="到店领取数量">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            <p v-if="scope.row.status == 'start'">已上架</p></p>
                            <p v-if="scope.row.status == 'end'">已下架</p></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.status == 'start'" @click="soldoutgift_btn(scope.row.id)" type="text" size="small">下架</el-button>
                            <el-button v-if="scope.row.status == 'end'" @click="upshowgift_btn(scope.row.id)" type="text" size="small">上架</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="compilegift_btn(scope.row.id)" type="text" size="small">编辑</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="removegift_btn(scope.row.id)" style="color:red;" type="text" size="small">删除</el-button>
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
        <!--下架礼品-->
        <el-dialog
            title="下架礼品"
            v-model="soldoutgift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">下架后该礼品将不再显示到支付宝会员卡积分兑换页面</p>
            <p style="padding: 4px;text-align: center;">是否确认下架? </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sxplay(1,3)">确 定</el-button>
                <el-button @click="soldoutgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--上架礼品-->
        <el-dialog
            title="上架礼品"
            v-model="upshowgift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">上架后该礼品将显示到支付宝会员卡积分兑换页面</p>
            <p style="padding: 4px;text-align: center;">是否确认上架? </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sxplay(2,4)">确 定</el-button>
                <el-button @click="upshowgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--删除礼品-->
        <el-dialog
            title="删除礼品"
            v-model="removegift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">删除后该礼品将从支付宝会员卡积分兑换页面下架 </p>
            <p style="padding: 4px;text-align: center;">是否确认删除?  </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="removegift_true_btn">确 定</el-button>
                <el-button @click="removegift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--添加礼品-->
        <el-dialog
            title="添加礼品"
            class="addgift_c"
            v-model="addgift_dialog"
            size="small"
            top="15%">
            <el-form label-width="100px" class="addtable_form" :model="addform" :rules="addrule" ref="addform">
                <el-form-item label="礼品名称 : " prop="name">
                    <el-input size="small" placeholder="请输入名称" v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="兑换所需积分 : " prop="point">
                    <el-input size="small" type="number" placeholder="请输入积分" v-model="addform.point"></el-input>
                </el-form-item>
                <el-form-item label="礼品库存数量 : " prop="totalNum">
                    <el-input size="small" type="number" placeholder="请输入数量" v-model="addform.totalNum"></el-input>
                </el-form-item>
                <el-form-item label="礼品图片 : " prop="logo">
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
                    <span class="ticket_tip color_888">备注 : 300KB以内,格式jpg/png; 尺寸不小于160px*160px的正方形;</span>               
                </el-form-item>
                <el-form-item label="是否上架 : " >
                    <el-radio-group v-model="addform.status">
                        <el-radio label="start">是</el-radio>
                        <el-radio label="end">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addgift_true_btn">确 定</el-button>
                <el-button @click="addgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--编辑礼品-->
        <el-dialog
            title="编辑礼品"
            class="addgift_c"
            v-model="compilegift_dialog"
            size="small"
            top="15%">
            <el-form label-width="100px" class="addtable_form" :model="compileform" :rules="compilerule" ref="compileform">
                <el-form-item label="礼品名称 : "  prop="name">
                    <el-input :disabled="true" size="small" placeholder="请输入名称" v-model="compileform.name"></el-input>
                </el-form-item>
                <el-form-item label="兑换所需积分 : " prop="point">
                    <el-input size="small" type="number"  placeholder="请输入积分" v-model="compileform.point"></el-input>
                </el-form-item>
                <el-form-item label="礼品库存数量 : " prop="totalNum">
                    <el-input size="small" type="number"  placeholder="请输入数量" v-model="compileform.totalNum"></el-input>
                </el-form-item>
                <el-form-item label="礼品图片 : " prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            :disabled="true"
                            action="/business/file!fileUpload.action"
                            :data="shopid"
                            :show-file-list="false"
                            :on-success="logoonsuccess1"
                            :before-upload="logobeforeAvatarUpload1">
                        <img v-if="imageUrltologo1" :src="imageUrltologo1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                   
                </el-form-item>
                <el-form-item label="是否上架 : " >
                    <el-radio-group v-model="compileform.status">
                        <el-radio label="start">是</el-radio>
                        <el-radio label="end">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="compilegift_true_btn">确 定</el-button>
                <el-button @click="compilegift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { savaGift,giftLibrary,selectGift,deleteGift,afterGift,afterGifts } from '../../../api/api';
    export default {
        data() {
            var totalNumvalidate=(rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的礼品库存数量'));
                }
                callback();
            };
             var pointvalidate=(rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的兑换所需积分'));
                }
                callback();
            };
            return {
                selectdata:[
                    {text:'全部',type:''},
                    {text:'已上架',type:'start'},
                    {text:'已下架',type:'end'},
                ],
                selectvalue:'',
                addform:{
                    name:'',
                    status:'start',
                    totalNum:'',
                    point:'',
                    logo:'',
                },
                compileform:{
                    name:'',
                    status:'start',
                    id:'',
                    totalNum:'',
                    point:'',
                    logo:'',
                },
                addrule:{
                    name:[
                        { required: true, message: '请输入礼品名称', trigger: 'blur' },
                        { max: 15, message: '礼品名称长度大于15个字符', trigger: 'blur' },
                    ],
                    totalNum:[
                        { required: true, message: '请输入礼品库存数量', trigger: 'blur' },
                        {validator: totalNumvalidate, trigger: 'blur'},
                    ],
                    point:[
                        { required: true, message: '请输入兑换所需积分', trigger: 'blur' },
                        {validator: pointvalidate, trigger: 'blur'},
                    ],
                    logo:[
                        { required: true, message: '请上传图片', trigger: 'blur' },
                    ],
                },
                compilerule:{
                    name:[
                        { required: true, message: '请输入礼品名称', trigger: 'blur' },
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    totalNum:[
                        { required: true, message: '请输入礼品库存数量', trigger: 'blur' },
                        {validator: totalNumvalidate, trigger: 'blur'},
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    point:[
                        { required: true, message: '请输入兑换所需积分', trigger: 'blur' },
                        {validator: pointvalidate, trigger: 'blur'},
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    logo:[
                        { required: true, message: '请上传图片', trigger: 'blur' },
                    ],
                },
                pageSize:10,
                pageNumber:'1',
                model_test:'',
                removegift_dialog:false,
                compilegift_dialog:false,
                upshowgift_dialog:false,
                imageUrltologo: '',
                imageUrltologo1: '',
                shopid:{id:''},
                radio:'1',
                addgift_dialog:false,
                soldoutgift_dialog:false,
                totalCount:0,
                queryacticvename:'',
                choosegiftid:'',
                tableData:[],
                chooseafterid:'',
                multipleSelection:'',
                choosedig:'',
            }
        },
        mounted: function() {
            this.cookie();
            this.getGiftList();
        },
        methods: {
            //礼品显示状态变化时
            selectChange(){
                this.getGiftList(); 
            },
            //获取礼品库列表
            getGiftList(){
                let data = this.qs.stringify({
                    status:this.selectvalue,
                    name:this.queryacticvename,
                    pageNumber:this.pageNumber,
                    pageSize:this.pageSize,
                });
                giftLibrary(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.tableData = res.content.result;
                            this.totalCount = res.content.totalCount;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //上架下架选择礼品
            plchoose(type_num){
                if(this.multipleSelection.length == 0){
                    this.$message.warning('请先选择礼品');
                    return;
                }
                this.choosedig = '1';
                if(type_num == 0){
                    //上架
                    this.upshowgift_dialog = true;
                }else if(type_num == 1){
                    //下架
                    this.soldoutgift_dialog = true;
                }
            },
            //搜索礼品
            query_gift_btn(){
                this.pageNumber = 1;
                this.getGiftList();
            },
            // 下架礼品
            soldoutgift_btn(id){
                this.choosedig = '2';
                this.soldoutgift_dialog = true;
                this.chooseafterid = id;
            },
            upshowgift_btn(id){
                this.choosedig = '2';
                this.upshowgift_dialog = true;
                this.chooseafterid = id;
            },
            //批量上架或下架
            moresolidoutgift(giftids,istype){
                let data = this.qs.stringify({
                    ids:giftids,
                    types:istype,
                }); 
                afterGifts(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(istype == 1){
                                this.$message.success('成功下架选中礼品');
                                this.soldoutgift_dialog = false;
                            }else if(istype == 0){
                                this.$message.success('成功上架选中礼品');
                                this.upshowgift_dialog = false;
                            }
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //调用接口,上架或者下架
            solidoutgift_f(istype){
                let data = this.qs.stringify({
                    id:this.chooseafterid,
                    types:istype,
                }); 
                afterGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(istype == 1){
                                this.$message.success('下架成功');
                                this.soldoutgift_dialog = false;
                            }else if(istype == 0){
                                this.$message.success('上架成功');
                                this.upshowgift_dialog = false;
                            }
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //下架礼品弹窗内,点击确定
            sxplay(type,isab){
                if(this.choosedig == '2'){
                    if(type == 1){
                        this.solidoutgift_f(1);
                    }else if(type == 2){
                        this.solidoutgift_f(0);
                    }
                }else if(this.choosedig == '1'){
                    let giftidlist = '';
                    for(let i = 0;i<this.multipleSelection.length;i++){
                        giftidlist = giftidlist + this.multipleSelection[i].id + ',';
                    }
                    giftidlist = giftidlist.substr(0,giftidlist.length-1);
                    if(isab == 3){
                        this.moresolidoutgift(giftidlist,1);
                    }else if(isab == 4){
                        this.moresolidoutgift(giftidlist,0);
                    }
                }
            },
            //添加商品
            addgift_btn(){
                this.addgift_dialog = true;
                this.addform.name = '';
                this.addform.status = 'start';
                this.addform.totalNum = '';
                this.addform.point = '';
                this.addform.logo = '';
                this.imageUrltologo= '';
            },
            //添加商品弹窗内,点击确定
            addgift_true_btn(){
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        this.start_addgift();
                    } else {
                        return;
                    }
                });
            },
            //添加礼品接口
            start_addgift(){
                let data = this.qs.stringify(this.addform);
                savaGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('添加成功');
                            this.addgift_dialog = false;
                            this.pageNumber = 1;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            compilegift_btn(giftid){
                let data = this.qs.stringify({
                    id:giftid,    
                });
                selectGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.compileform = res.content;
                            this.compileform.point = res.content.point.toString();
                            this.compileform.totalNum = res.content.totalNum.toString();
                            this.imageUrltologo1 = res.content.logo;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
                this.compilegift_dialog = true;
            },
            compilegift_true_btn(){
                this.$refs['compileform'].validate((valid) => {
                    if (valid) {
                        this.start_compilegift();
                    } else {
                        return;
                    }
                });
                
            },
            start_compilegift(){
                let data = this.qs.stringify(this.compileform);
                savaGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('修改成功');
                            this.compilegift_dialog = false;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                    else if(res.errorCode == '90003'){
                        if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //删除商品,打开弹窗
            removegift_btn(giftid){
                this.removegift_dialog = true;
                this.choosegiftid = giftid;
            },
            //删除商品弹窗内,点击确定
            removegift_true_btn(){
                let data = this.qs.stringify({
                    id:this.choosegiftid
                });
                deleteGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('删除成功');
                            this.removegift_dialog = false;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
                
            },
            //表格页面改变时
            handleCurrentChange(val){
                this.pageNumber = val;
                this.getGiftList();
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
            logoonsuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.$message('上传LOGO图片成功!');
                    this.logoimgurl = file.url;
                    this.imageUrltologo = URL.createObjectURL(file.raw);
                    this.addform.logo = response.url;
                    // this.addform.logoId = response.imageId;
                }
                else if(response.error == 1){
                    this.$message(response.url);
                }
            },
            logobeforeAvatarUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 0.3;
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 300KB!');
                }else{
                    this.$message('正在上传');
                }
                return isLt1M;
            },
            logoonsuccess1(response, file, fileList) {
                // if (response.error == 0) {
                //     this.$message('上传LOGO图片成功!');
                //     this.logoimgurl = file.url;
                //     this.imageUrltologo1 = URL.createObjectURL(file.raw);
                //     this.compileform.logo = response.url;
                //     this.compileform.logoId = response.imageId;
                // }
                // else if(response.error == 1){
                //     this.$message(response.url);
                // }
            },
            logobeforeAvatarUpload1(file) {
                // this.$message('正在上传');
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            }
        }
    }
</script>
<style scoped>
    .addtable_form {
        width: 380px;
        margin: 0 auto;
    }
    .gift_table_imgbox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gift_table_imgbox img{
        max-width: 50px;
        max-height: 50px;
    }
    .padding_10{
        padding: 10px;
    }
    .width_150{
        width: 150px;
    }
</style>