<template>
    <div class='community-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;"> 
                        <Form-item label="商品名称" class='daily-form' prop="name">
                            <i-input 
                                v-model="formItem.name" 
                                placeholder="请输入商品名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item label="招商状态" class='daily-form'> 
                            <Select 
                                v-model="formItem.status" 
                                placeholder="全部" 
                                style="width: 200px"
                                multiple
                            >
                                <Option v-for="item in inventoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item class="priceForm community-form">
                            <span class="attract-font">社<span style="display:inline-block;width:26px;"></span>区</span>
                            <Select 
                                v-model="formItem.cityId" 
                                placeholder="请输入城市" 
                                style="width: 90px;margin-right:20px;"
                                @on-change="cityChange"
                            >
                                <Option 
                                    v-for="item in cityList" 
                                    :value="item.cityId" 
                                    :key="item.cityId"
                                >
                                    {{ item.cityName }}
                                </Option>
                            </Select>
                            <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区" 
                                    style="width: 90px;"
                                    @on-change="communityChange"
                                >
                                    <Option 
                                        v-for="item in communityList" 
                                        :value="item.id" 
                                        :key="item.id"
                                    >
                                        {{ item.name }}
                                    </Option>
                            </Select>
                        
                            <Select 
                                    v-model="formItem.floor" 
                                    v-if="floorList && floorList.length !=0"
                                    placeholder="请输入楼层" 
                                    style="width: 90px;margin-left:20px;"
                                >
                                    <Option 
                                        v-for="item in floorList" 
                                        :value="item.floor" 
                                        :key="item.floor"
                                    >
                                        {{ item.floorName }}
                                    </Option>
                            </Select> 
                        </Form-item>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
                    <div class="daily-form">
                        <span class="attract-font" style="padding-top:7px;">商品定价</span>
                        <Form-item  class="priceForm" prop="priceMin">
                            <i-input 
                                v-model="formItem.priceMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                        <Form-item  class="priceForm" prop="priceMax" >
                            <i-input 
                                v-model="formItem.priceMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div class="daily-form">
                        <span class="attract-font" style="padding-top:7px;">工位数量</span>
                        <Form-item  class="priceForm" prop="stationsMin">
                            <i-input 
                                v-model="formItem.stationsMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="stationsMax">
                            <i-input 
                                v-model="formItem.stationsMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <Form-item label="商品类型" class='daily-form'> 
                        <Select 
                            v-model="formItem.goodsType" 
                            placeholder="请输入商品类型" 
                            style="width: 200px"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> 
                    </Form-item>
                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>


                <!-- 第三行-->
                <div style="white-space: nowrap;">
                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right: 3px;">签约价</span>
                        <Tooltip content="表中的签约价均只显示整数，实际签约金额以合同为准" placement="top">
                            <span class="tip-pic"></span>
                        </Tooltip>
                        <Form-item  class="priceForm" prop="orderPriceMin">
                            <i-input 
                                v-model="formItem.orderPriceMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="orderPriceMax">
                            <i-input 
                                v-model="formItem.orderPriceMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right:11px;">折<span style="display:inline-block;width:25px;"></span>扣</span>
                        <Form-item  class="priceForm" prop="discountMin">
                            <i-input 
                                v-model="formItem.discountMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="discountMax">
                            <i-input 
                                v-model="formItem.discountMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <Form-item label="渠道来源" class='daily-form'> 
                        <Cascader 
                          v-model="formItem.source"
                          style="width: 200px"
                          :data="sourceData"    
                        />
                    </Form-item>
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>


                 <!-- 第四行-->
                <div style="white-space: nowrap;">
                    <span class="attract-font" style="padding-top:7px;margin-right:24px;">销售员</span>
                    <Form-item class='daily-form'>
                        <Select 
                                v-model="formItem.sellerId" 
                                style="width: 200px"
                                :remote-method="remoteSaler"
                                clearable
                                filterable
                                remote
                                :loading="loading"
                            >
                            <Option v-for="item in sellerList" :value="''+item.id" :key="item.id">{{ item.lastname }}</Option>
                        </Select>
                    </Form-item>

                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right:11px;">租<span style="display:inline-block;width:27px;"></span>期</span>
                        <Form-item  class='daily-form'>
                            <Select 
                                v-model="formItem.rentTimeType" 
                                style="width: 90px"
                                clearable
                            >
                                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item  prop="rentTime" class="priceForm" style="margin-right:5px">
                            <i-input 
                                v-model="formItem.rentTime" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span>天</span>
                    </div>
                </div>


            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import publicFn from '../publicFn';
import SelectSaler from '~/components/SelectSaler.vue'
export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    components:{
       SelectSaler
    },
    data() {
            //工位数量
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else if (this.formItem.stationsMin&&this.formItem.stationsMax&&Number(this.formItem.stationsMin)>Number(this.formItem.stationsMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //签约价
            const validatePrice = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.priceMin&&this.formItem.priceMax&&Number(this.formItem.priceMin)>Number(this.formItem.priceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //商品定价
            const validateOrder = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.orderPriceMin&&this.formItem.orderPriceMax&&Number(this.formItem.orderPriceMin)>Number(this.formItem.orderPriceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //折扣
            const validateDiscount = (rule, value, callback) => {
                var reg=/^(([1-9]{1})|([0-9]{1}\.\d{1}))$/;
                if(value&&!reg.test(value)){
                    callback('请输入0-10之间的数字,最多1位小数');
                }else if (this.formItem.discountMin&&this.formItem.discountMax&&Number(this.formItem.discountMin)>Number(this.formItem.discountMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };    
            //商品名称
            const validateName = (rule, value, callback) => {
                var str=publicFn.fucCheckLength(value);
                if(value&&str>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            //租期天数
            const validateTime = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else{
                    callback();
                }
            };

            return { 
                loading:false, 
                formItem:{
                    investmentStatus:'',
                    status:[],

                    name:'',
                    communityId:'',
                    cityId:'',
                    floor:' ',
                    stationsMax:'',
                    stationsMin:'',
                    goodsType:' ',
                    priceMin:'',
                    priceMax:'',
                    discountMin:'',
                    discountMax:'',
                    sellerId:'',
                    orderPriceMin:'',
                    orderPriceMax:'',
                    rentTime:'',
                    rentTimeType:'GT',


                    source:[],
                    sourceId:'',
                    subSourceId:''
                },
                sourceData:[],
                communityList:[],
                cityList:[],
                floorList:[],
                sellerList:[],
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                inventoryList:[
                    {value:'AVAILABLE',label:'未招商'},
                    {value:'INVITING',label:'招商中'},
                    {value:'RENTING',label:'已招商'},
                    {value:'DISABLED',label:'不可招商'}
                ],
                timeList:[
                   {value:'LT',label:'小于'},
                   {value:'EQ',label:'等于'},
                   {value:'GT',label:'大于'}
                ],
                
                formItemOld:{},
                ruleInvestment: {
                    name:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    stationsMin: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    stationsMax: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    priceMin: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    priceMax: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    orderPriceMin: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    orderPriceMax: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    discountMin: [
                        { validator: validateDiscount, trigger: 'change' }
                    ],
                    discountMax: [
                        { validator: validateDiscount, trigger: 'change' }
                    ],
                    rentTime:[
                        { validator: validateTime, trigger: 'change' }
                    ]
                }
            }
    },
    mounted(){
        this.getCityList();
        this.getSourceData();
        var _this=this;
        setTimeout(() => {
            _this.$emit('initData',this.formItem);
            _this.formItemOld=Object.assign({},this.formItem);
        },500);
    },
    methods:{
        //销售员搜索
        remoteSaler(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.getSalerData(query)
                }, 200);
            }
        },
        //销售员
        getSalerData(name){
            let list = [];
            this.$http.get('get-saler',{phoneOrEmail:name}).then((res)=>{
                list = res.data.slice(0,10);
                this.loading= false;
                this.sellerList=list;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //渠道来源
        getSourceData(){
            this.$http.get('get-customer-source').then((res)=>{
                this.sourceData=publicFn.sourceStyleSwitch(res.data);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //社区接口
        getCommunityList(id){
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
                this.formItem.communityId=res.data.length?res.data[0].id:'';
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
                this.formItem.cityId=res.data.length?res.data[0].cityId:'';
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //楼层接口
        getFloorList(param){
            this.$http.get('getDailyFloor', {communityId:param}).then((res)=>{
                this.floorList=res.data;
                if(this.floorList.length>1){
                    this.floorList.unshift({floor:' ',floorName:"全部楼层"})                        
                }
                this.formItem.floor=this.floorList.length?this.floorList[0].floor:' '; 
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //搜索
        searchClick(){
            this.$refs['formItemInvestment'].validate((valid) => {
                if (valid) {
                    //招商状态格式转换
                    var str='';
                    this.formItem.status.map((item,index)=>{
                            str=str?str+','+item:item;
                    }) 
                    this.formItem.investmentStatus=str; 
                    //渠道来源格式转换
                    var length=this.formItem.source.length;
                    if(length){
                        this.formItem.sourceId=this.formItem.source[0];
                        this.formItem.subSourceId=length>1?this.formItem.source[1]:'';
                    }
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.formItem.status=[];
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            this.getCommunityList(param)
        },
        //社区change事件
        communityChange(param){
            this.getFloorList(param);
        }
    }
}
</script>

<style lang='less'>
     .community-search-form{
         //苏岭
         display: inline-table;
         word-spacing: -4px;
         .community-header{
            padding: 30px 10px 10px 20px;
            .ivu-form .ivu-form-item-label{
                color:#333;
                font-weight: 500;
            }
            .daily-form{
                display:inline-block;
                margin-right:20px;
                .ivu-form-item-content{
                    display:inline-block;
                }
                .ivu-form-item:after, .ivu-form-item:before{
                    content: none;
                }
            }
            .community-form{
                vertical-align: middle;
                .ivu-select-dropdown{
                    min-width:100px;
                    width:auto !important;
                    left:auto !important;
                }
            }
            .priceForm{
                display:inline-block;
                .ivu-form-item-content{
                    display:inline-block;
                }
            }
            .attract-font{
                font-weight:bold;
                display:inline-block;
                margin-right:12px;
            }
            .attract-line{
                display:inline-block;
                margin:0 4px 0 5px;
                padding-top: 6px;
            }
            .tip-pic{
                display:inline-block;
                width: 16px;
                height: 16px;
                background: url(img/q1.svg) no-repeat center;
                background-size: 100%;
                vertical-align: middle;
                margin-right:5px;
                margin-top: -2px;
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:150px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
        }
     }
</style>
