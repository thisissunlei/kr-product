import Vue from 'vue';
import Router from 'vue-router';
import newRoute from './newRouter.js';
Vue.use(Router)

let rou=newRoute.routes;
if(rou&&rou.length){
    rou.map((item,index)=>{
        let itemRou='pages'+item.path;
        console.log('item',itemRou);
        item.component=eval('()=>import('+itemRou+')')
    })
}
console.log('rouwwww-',rou)
export default new Router({routes:rou})

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
//     // {
//     //   path: '/inventory/goods-library',
//     //   name: 'inventory-goods-library',
//     //   component: ()=>import('pages/inventory/goods-library')
//     // },
//     // {
//     //   path: '/inventory/daily-inventory',
//     //   name: 'DailyInventory',
//     //   component: DailyInventory
//     // },
//     // {
//     //   path: '/inventory/optional-inventory',
//     //   name: 'OptionalInventory',
//     //   component: OptionalInventory
//     // },
//     // {
//     //   path: '/inventory/floor-plan',
//     //   name: 'FloorPlan',
//     //   component: FloorPlan
//     // },
//     // {
//     //   path: '/community/attract-investment',
//     //   name: 'AttractInvestment',
//     //   component: AttractInvestment
//     // },
//     // {
//     //   path: '/operation/community',
//     //   name: 'Community',
//     //   component: Community
//     // },
//     // {
//     //   path: '/operation/visitors-to-record',
//     //   name: 'VisitorsRecord',
//     //   component: VisitorsRecord
//     // }
//   ]
// })
