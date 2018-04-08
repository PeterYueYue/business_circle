<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				&#x3000;{{collapsed?'':sysName}}
			</el-col>
			<!--<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>-->
			<el-col :span="10" class="breadcrumb-container">
						<!--<strong class="title">{{$route.name}}</strong>-->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<!--<img :src="this.sysUserAvatar" /> -->
						账户名称 :{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>设置</el-dropdown-item> -->
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<el-menu :default-active="menu_start" :router=true_set :unique-opened=true_set
                         class="el-menu-vertical-demo zj-bar"  theme="dark">
					<el-submenu index="1">
						<template slot="title">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-dianpuguanli"></use>
						</svg>
						会员营销
						</template>
						<el-menu-item index="/memberCardManage">会员卡管理</el-menu-item>
						<el-menu-item index="/memberList">会员管理</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-huodong"></use>
						</svg>
						商圈用户管理
						</template>
						<el-menu-item index="/businessList">商户列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-huiyuan2"></use>
						</svg>
						营销活动
						</template>
                        <el-menu-item index="/redPacket">现金红包</el-menu-item>
                        <el-menu-item index="/addbusiness">口碑招商活动</el-menu-item>
						<el-menu-item index="/codeGiftMain">积分换礼</el-menu-item>
						<el-menu-item index="/turntableSetting">积分大转盘</el-menu-item>
						<el-menu-item index="/active">活动创建</el-menu-item>
						<el-menu-item index="/activityList">活动列表</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-qiaquan1"></use>
						</svg>
						商圈账单
						</template>
						<el-menu-item index="/activityWater">活动流水</el-menu-item>
						<el-menu-item index="/checkCollect">账单汇总</el-menu-item>
					</el-submenu>
			</el-menu>
				<!--导航菜单-->
				<!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>-->
				<!--导航菜单-折叠后-->
				<!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>-->
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<!--<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>-->
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>


<script>
	export default {
		data() {
			return {
				menu_start:'/memberCardManage',
				sysName:'商圈后台系统',
				true_set:true,
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		mounted:function() {
			this.routerChange();
			let user = sessionStorage.getItem('user');
//			alert(user);
			if (user) {
				user = JSON.parse(user);
//				this.sysUserName = user.name || '';
                this.sysUserName=user;
//				this.sysUserAvatar = user.avatar || '';
			}

		},
		watch:{
			"$route":"routerChange"
		},
		methods: {
			routerChange(){
				this.menu_start = this.$route.path;
				if(this.$route.path == "/integralPromotion" || this.$route.path == "/integralFornow" || this.$route.path == "/chitCreation" || this.$route.path == "/alonestamps"|| this.$route.path == "/addactive"){
					this.menu_start = "/active";
				}
				if(this.$route.path == "/rewardPromotion" || this.$route.path == "/integralList" || this.$route.path == "/voucherList" || this.$route.path == "/stampsList" || this.$route.path == "/activefiguredetails"|| this.$route.path == "/bonusPoints"|| this.$route.path == "/viewdetails"){
					this.menu_start = "/activityList";
				}
				if(this.$route.path == "/setting" || this.$route.path == "/record" || this.$route.path == "/cancel" || this.$route.path == "/content" || this.$route.path == "/detail"){
					this.menu_start = "/turntableSetting";
				}
				if(this.$route.path == "/activitytype" || this.$route.path == "/listactivity" || this.$route.path == "/consume" || this.$route.path == "/consumedetail"|| this.$route.path == "/scancode" || this.$route.path == "/scancodedetail"){
					this.menu_start = "/addbusiness";
				}
				if(this.$route.path =='/packettypelist' || this.$route.path =='/payreturn' || this.$route.path
                    =='/packetnumberdetail' || this.$route.path =='/pointgive' || this.$route.path =='/packettype'  ){
                    this.menu_start = "/redPacket";
                }
				if(this.$route.path =='/exchangeGifePage' || this.$route.path =='/exchangeGiftRecord' || this.$route.path
                    =='/presentLibrary'){
                    this.menu_start = "/codeGiftMain";
                }
			},
			handleopen() {
			},
			handleclose() {
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}

	}
</script>

<style scoped lang="scss">
	@import '~scss_vars';
	/*.el-menu{*/
		/*background-color: rgb(63, 63, 63);*/
	/*}*/
	/*!*.el-submenu .el-menu-item:hover, .el-submenu__title:hover {*!*/
		/*!*background-color: #d1dbe5;*!*/
	/*!*}*!*/
	/*.el-submenu__title{*/
		/*color: red;*/
	/*}*/
	/*.el-menu-item{*/
		/*background-color:rgb(63, 63, 63)!important;*/
	/*}*/
    .zj-bar{
        /*outline: 1px solid red;*/
        /*height: 1000px!important;*/
    }

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		min-width: 1200px;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			border-bottom: 1px solid #eee;
			background-color: white;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:black;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				background-color: rgb(63, 63, 63);
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				/*outline:1px solid red;*/
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				/*overflow-y: scroll;*/
				overflow:auto;
				padding: 16px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>