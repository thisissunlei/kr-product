import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const GoodsLibrary = () => import('pages/inventory/goods-library/index.vue')
const DailyInventory = () => import('pages/inventory/daily-inventory/index.vue')
const OptionalInventory = () => import('pages/inventory/optional-inventory/index.vue')
const FloorPlan = () => import('pages/inventory/floor-plan/index.vue')
const AttractInvestment = () => import('pages/community/attract-investment/index.vue')
const Community = () => import('pages/operation/community/index.vue')
const VisitorsRecord = () => import('pages/operation/visitors-to-record/index.vue')
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/inventory/goods-library',
      name: 'GoodsLibrary',
      component: GoodsLibrary,
      meta: {
        title: '工位商品-氪空间后台管理系统'
      }
    },
    {
      path: '/inventory/daily-inventory',
      name: 'DailyInventory',
      component: DailyInventory,
      meta: {
        title: '每日库存查询-氪空间后台管理系统'
      }

    },
    {
      path: '/inventory/optional-inventory',
      name: 'OptionalInventory',
      component: OptionalInventory,
      meta: {
        title: '可租商品查询-氪空间后台管理系统'
      }
    },
    {
      path: '/inventory/floor-plan',
      name: 'FloorPlan',
      component: FloorPlan,
      meta: {
        title: '库存平面图-氪空间后台管理系统'
      }
    },
    {
      path: '/community/attract-investment',
      name: 'AttractInvestment',
      component: AttractInvestment,
      meta: {
        title: '社区招商情况-氪空间后台管理系统'
      }
    },
    {
      path: '/operation/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/operation/visitors-to-record',
      name: 'VisitorsRecord',
      component: VisitorsRecord
    }
  ]
})
