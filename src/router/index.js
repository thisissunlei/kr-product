import Vue from 'vue';
import Router from 'vue-router';
import newRoute from './newRouter.js';
Vue.use(Router)

console.log('dd',typeof newRoute.port,newRoute.port);
var portArr=newRoute.port.split('\n');
console.log('dd',portArr);
if(portArr&&portArr.length){
  portArr.map((item,index)=>{
      console.log('svf',item);
  })
}
newRoute.port;
if(newRoute.routes&&newRoute.routes.length){
  newRoute.routes.map((item,index)=>{
      item.component=eval(item.component);
  })
}
export default new Router({routes:newRoute.routes})

// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

// const GoodsLibrary = () => import('pages/inventory/goods-library/index.vue')
// const DailyInventory = () => import('pages/inventory/daily-inventory/index.vue')
// const OptionalInventory = () => import('pages/inventory/optional-inventory/index.vue')
// const FloorPlan = () => import('pages/inventory/floor-plan/index.vue')
// const AttractInvestment = () => import('pages/community/attract-investment/index.vue')
// const Community = () => import('pages/operation/community/index.vue')
// const VisitorsRecord = () => import('pages/operation/visitors-to-record/index.vue')
// export default new Router({
//   // mode: 'history',
//   routes: [
//     {
//       path: '/inventory/goods-library',
//       name: 'GoodsLibrary',
//       component: GoodsLibrary
//     },
//     {
//       path: '/inventory/daily-inventory',
//       name: 'DailyInventory',
//       component: DailyInventory
//     },
//     {
//       path: '/inventory/optional-inventory',
//       name: 'OptionalInventory',
//       component: OptionalInventory
//     },
//     {
//       path: '/inventory/floor-plan',
//       name: 'FloorPlan',
//       component: FloorPlan
//     },
//     {
//       path: '/community/attract-investment',
//       name: 'AttractInvestment',
//       component: AttractInvestment
//     },
//     {
//       path: '/operation/community',
//       name: 'Community',
//       component: Community
//     },
//     {
//       path: '/operation/visitors-to-record',
//       name: 'VisitorsRecord',
//       component: VisitorsRecord
//     }
//   ]
// })
