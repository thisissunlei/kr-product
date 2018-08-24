export default {routes:[{
    path: '/community/attract-investment',
    name: 'community-attract-investment',
    component: ()=>import('pages/community/attract-investment') 
},{
    path: '/community/publicPage',
    name: 'community-publicPage',
    component: ()=>import('pages/community/publicPage') 
},{
    path: '/inventory/Inventory-gantt-chart/gantt-chart',
    name: 'inventory-Inventory-gantt-chart-gantt-chart',
    component: ()=>import('pages/inventory/Inventory-gantt-chart/gantt-chart') 
},{
    path: '/inventory/Inventory-gantt-chart',
    name: 'inventory-Inventory-gantt-chart',
    component: ()=>import('pages/inventory/Inventory-gantt-chart') 
},{
    path: '/inventory/daily-inventory',
    name: 'inventory-daily-inventory',
    component: ()=>import('pages/inventory/daily-inventory') 
},{
    path: '/inventory/floor-plan',
    name: 'inventory-floor-plan',
    component: ()=>import('pages/inventory/floor-plan') 
},{
    path: '/inventory/goods-library',
    name: 'inventory-goods-library',
    component: ()=>import('pages/inventory/goods-library') 
},{
    path: '/inventory/optional-inventory',
    name: 'inventory-optional-inventory',
    component: ()=>import('pages/inventory/optional-inventory') 
},{
    path: '/operation/community',
    name: 'operation-community',
    component: ()=>import('pages/operation/community') 
},{
    path: '/operation/visitors-to-record',
    name: 'operation-visitors-to-record',
    component: ()=>import('pages/operation/visitors-to-record') 
}]}