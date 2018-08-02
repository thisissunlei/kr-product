
import OrderApi from './order';
import OrderManageApi from './orderManage';
import ContractCenter from './contractCenter'
import apiPublic from './apiPublic'
import BillApi from './bill.js';
import MemberApi from './member.js'
import Settlement from './settlement.js';
import operationsCenter from './operationsCenter'
import OperationApi from './operation.js';
import NewMain from './newMain.js';
import Basic from './basic.js';
import projectSetting from './projectSetting';
import Inventory from './inventory.js';
import Calculator from './calculator.js';
import Smarthardware from './smarthardware.js';
import Krmeeting from './krmeeting.js';
import DoorRelationship from './doorRelationship.js';
import KrmeetingRoom from './krmeetingRoom.js';
import ProductGoods from './productGoods.js';
let ddd  = {
  //账单中心--客户接口--优化后
  'get-payment-customer-like': {
    url: '/api/krspace-pay/payment/customer/like',
    method: 'get'
  },
  "typePage":{
    url:'/api/pm/discuss/list/type/page',
    method:'get'
  },
  "actions-add":{
    url:'/api/pm/discuss/actions/add',
    method:'post'
  },
  "actions-delete":{
    url:'/api/pm/discuss/actions/delete',
    method:'delete'
  },
  'get-vue-upload-url': {
    url: '/api/krspace-op-web/sys/upload-policy',
    method: 'get'
},
  'list-type-code': {
    url: '/api/pm/form-field/list/type/code',
    method: 'get'
},
'list-type-code-write': {
  url: '/api/pm/form-field/list/type/code/write',
  method: 'get'
},

'get-enum-all-data':{
  url:'/api/krspace-sso-web/sys/enmu',
  method:'get'
},
'member-detail-list':{
  url:'/api/pm/member-detail/list',
  method:'get'
},
'member-actions-edit':{
  url:'/api/pm/member-detail/actions/edit',
  method:'get'
}
,
  'list-type-code-detail': {
    url: '/api/pm/form-field/list/type/detail',
    method: 'get'
},
'roleActionCheck':{
    url:'/api/pm/role/action/check',
    method: 'get'
}

}

export default {
  ...OrderApi,
  ...OrderManageApi,
  ...ContractCenter,
  ...apiPublic,
  ...BillApi,
  ...MemberApi,
  ...Settlement,
  ...operationsCenter,
  ...OperationApi,
  ...NewMain,
  ...Basic,
  ...Calculator,
  ...projectSetting,
  ...Inventory,
  ...Smarthardware,
  ...Krmeeting,
  ...DoorRelationship,
  ...KrmeetingRoom,
  ...ProductGoods,
  ...ddd
}
