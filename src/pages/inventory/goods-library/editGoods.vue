 <template>   
   <div class="floor-plan-edit">      
     <Form ref="formItem" :model="formItem" style="text-align:left;padding-left:30px;" placeholder="请选择楼层" :rules="ruleInvestment"  label-position="top">

                 <div style="color:red;margin-bottom:20px;">
                    下方数据编辑后立即生效，可能影响历史数据如有需要请下架商品再重新创建商品
                 </div>

                  <Form-item label="所在楼层" style="text-align:left" class='daily-form' prop="floor"> 
                        <Select 
                            v-model="formItem.floor" 
                            placeholder="请选择楼层" 
                            style="width: 200px"
                            clearable
                        >
                            <Option v-for="item in newFloorList" :value="''+item.floor" :key="item.floor">{{ item.floorName }}</Option>
                        </Select> 
                    </Form-item>
                    <Form-item label="商品名称"  style="text-align:left"  class='daily-form' prop="name" >
                            <i-input 
                                v-model="formItem.name" 
                                placeholder="请输入商品名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                     </Form-item>
                    <Form-item label="商品类型"     style="text-align:left"   class='daily-form' prop="goodsType"> 
                          <Select 
                            v-model="formItem.goodsType"
                            placeholder="请选择商品类型" 
                            style="width: 200px;"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select> 
                    </Form-item>
                    <div style="display:inline-block;" v-if="formItem.goodsType=='SPACE'">
                        <Form-item   style="text-align:left"  prop="capacity" label="工位数" class='daily-form'> 
                            <i-input 
                               v-model="formItem.capacity" 
                               placeholder="请输入工位数" 
                               style="width: 200px"
                               @keyup.enter.native="onKeyEnter($event)"
                            />	
                        </Form-item>
                    </div>
                     <Form-item label="面积" class='daily-form' style="text-align:left;padding-left:10px;margin-left:-10px;"  prop="area" > 
                            <i-input 
                                v-model="formItem.area" 
                                style="width: 200px;"
                                placeholder="请输入面积"
                                @keyup.enter.native="onKeyEnter($event)"
                            />	
                     </Form-item>

                      <Form-item v-if="formItem.goodsType=='SPACE'" style="text-align:left"   label="方位" class='daily-form'>     

                        <Select 
                            v-model="formItem.locationType" 
                            placeholder="请选择方位"
                            style="width: 200px;"
                            clearable
                        >
                            <Option v-for="item in locationTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select> 
                     </Form-item>

                     <Form-item v-if="formItem.goodsType=='SPACE'"  style="text-align:left"  label="是否套间" class='daily-form'>     
                                    <Select 
                                    placeholder="请选择套间"
                                    v-model="formItem.suiteType" 
                                    style="width: 200px;"
                                    clearable
                                >
                                    <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                     </Form-item>

                      <Form-item label="商品定价"  prop="quotedPrice" style="text-align:left"  class='daily-form'>
                            <i-input 
                                v-model="formItem.quotedPrice" 
                                style="width: 200px;"
                                 placeholder="请输入定价"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                      </Form-item>
                        <Form-item label="补充描述"  style="text-align:left"  class='daily-form'>
                            
                            <Input
                                 type="textarea"
                                v-model="formItem.descr" 
                                style="width: 200px"
                                placeholder="请输入描述"
                                :maxlength="50"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                      </Form-item>
                      <div>启用状态、物理空间、平面图配置可在列表中直接点击操作</div>
            </Form>   
        </div>
     </template>
<script>
import dateUtils from 'vue-dateutils';
    export default{
         name:'HeighSearch',
        props: {
             floorList:{
                 type:Array,
                 default:()=>[],
             },
             editData:{
                type:Object,
                default:{}
            }
        },
        data (){
           //商品名称
            const validateName = (rule, value, callback) => {
                if(!value){
                    callback('请填写名称');
                }else if(value.length>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            //面积
             const validarea = (rule, value, callback) => {
                var reg=/^(([1-9]{1}[0-9]{0,3})|([0])|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,3}\.\d{1,2}))$/;
                if(value&&!reg.test(value)){
                    callback('小于10000的数字,最多2位小数');
                }else{
                    callback();
                }
            };
            //商品定价
            const validateOrder = (rule, value, callback) => {
                var reg = /^\+?[0-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入非负整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else{
                    callback();
                }
            };
            //工位数
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[0-9]\d*$/;
                if(!value){
                    callback('请填写工位数');
                }else if(!reg.test(value)){
                    callback('请输入非负整数');
                }else if(value>999){
                    callback('最大999个工位');
                }else{
                    callback();
                }
            };

            return{
                 enmuKey:'',
                formItem:
                        {   
                            floor:'',//所在楼层
                            name:'',//商品名称
                            goodsType:'',//商品类型
                            capacity:'',//工位数
                            area:'',//面积
                            locationType:'',//方位
                            suiteType:'',//套间
                            quotedPrice:'',//商品定价
                            descr:'',//补充描述
                        
                        },
                // floorList:[],//所在楼层list
                 productList:[//商品类型list
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                 locationList:[//是否套间list
                    //  {value:'SUITE',label:'有套间'},
                    // {value:'UNSUITE',label:'无套间'},
                    // {value:'UNKNO',label:'有2套间'},
                    // {value:'UNKNOWN',label:'未知'},
                ],
                locationTypeList:[
                    {value:'OUTSIDE_SPACE',label:'外侧间'},
                    {value:'INSIDE_SPACE',label:'内侧间'},
                    {value:'UNKNOWN',label:'未知'}
                ],
                newFloorList:[], 
            ruleInvestment: {
                    floor:[
                        { message: '请选择楼层', trigger: 'change',required: true }
                    ],
                    name:[
                        { validator: validateName, trigger: 'change',required: true }
                    ],
                    goodsType:[
                        { message: '请选择商品类型', trigger: 'change',required: true }
                    ],
                    area: [
                        { validator: validarea, trigger: 'change' }
                    ],
                    quotedPrice: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    capacity: [
                        { validator: validateStation, trigger: 'change' ,required: true }
                    ]   
                }
            }
        },
        mounted(){
        this.newFloorList=[].concat(this.floorList);
        if(this.newFloorList.length>1){
            this.newFloorList.splice(0,1);
        }
        this.getSelectData();
        this.formItem=Object.assign({},this.editData);
        this.formItem.floor=this.formItem.floor?''+this.formItem.floor:'';
        this.$emit('newdateForm',this.formItem);
        },
        updated(){
            this.$emit('newdateForm',this.formItem);
        },
        methods:{
        //枚举 
        getSelectData(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.op.api.enums.community.SpaceSuiteType'
            }).then((response)=>{
               this.locationList=response.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

        //回车          
        onKeyEnter(){
            this.searchClick();
        },



            
        }
    }
</script>

<style lang='less'>
 .floor-plan-edit{
   .daily-form{
            display:inline-block;
            margin-right:20px;
            
    }
 }
</style>  