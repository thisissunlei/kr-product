import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const GoodsLibrary = () => import('pages/inventory/goods-library')
const DailyInventory = () => import('pages/inventory/daily-inventory')
const OptionalInventory = () => import('pages/inventory/optional-inventory')
export default new Router({
  routes: [
    {
      path: '/inventory/goods-library',
      name: 'GoodsLibrary',
      component: GoodsLibrary
    },
    {
      path: '/inventory/daily-inventory',
      name: 'DailyInventory',
      component: DailyInventory
    },
    {
      path: '/inventory/optional-inventory',
      name: 'OptionalInventory',
      component: OptionalInventory
    },
  ]
})
