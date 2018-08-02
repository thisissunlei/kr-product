//公共的api
module.exports = {
    'post-list-upload-url': {
        url: '/api/krspace-erp-web/wf/request-attachment/add',
        method: 'post'
    },

    'get-vue-upload-url': {
        url: '/api/krspace-op-web/sys/upload-policy',
        method: 'get'
    },

    'down-file':{
        url:'/api/op/sys/downFile',
        method:'get'
    },



    //权限
    'type-page':{
        url:'/api/pm/role/list/type/page',
        method:'get'
    },
    'roledetail':{
        url:'/api/pm/role/action/detail',
        method:'get'
    },
    'roleSave':{
        url:'/api/pm/role/action/add',
        method:'post'
    },
    'getSsoUserListAll':{
        url:'/api/pm/role-resource/pmUser',
        method:'get'
    },
    'existUserListAll':{
        url:'/api/pm/role-resource/exist',
        method:'get'
    },
    'addUser':{
        url:'/api/pm/role-resource/add',
        method:'get'
    },
    'roleEdit':{
        url:'/api/pm/role/action/edit',
        method:'get'
    },
    'roleDelete':{
        url:'/api/pm/role/action/delete',
        method:'delete'
    },
    'roleEidtDetail':{//'/api/pm/role/action/detail',
        url:'/api/pm/role/action/edit',
        method:'post'
    }



    // /----------------------------------

    ,'listCommunityConfigByPage':{
      url:'/api/krspace-sync-web/listCommunityConfigByPage',
      method:'get'
   },
      'communityConfigStatusUpdate':{
        url:'/api/krspace-sync-web/communityConfigStatusUpdate',
        method:'get'
    },
    'communityConfigAdd':{
      url:'/api/krspace-sync-web/communityConfigAdd',
      method:'post'
    },
    'krspace-op-web-fna-corporation':{
      url:'api/krspace-op-web/fna-corporation-list',
      method:'get',

    },
    //获取客户信息
    'getUserData':{
        url:'/api/krspace-sso-web/sso/sysOwn/findUserData',
        method: 'get'
    },
    'ssoUserlist':{
      url:'/api/pm/sso-user-list',
      method: 'get'
    },
    'discuss-actions-top':{
      url:'/api/pm/discuss/actions/top',
      method: 'post'
    },
    'discuss-actions-remind':{
      url:'/api/pm/discuss/actions/remind',
      method: 'post'
    },
    'project-check-creator':{
      url:'/api/pm/project/check/creator',
      method: 'post'
    }
    // /----------------------------------/api/krspace-sync-web




}
