import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/detail/:id',
    component: Layout,
    redirect: '/device/devices',
    children: [
      {
        path: '',
        name: 'DeviceDetail',
        component: () => import('@/views/table/devdetail'),
        //meta: { title: '设备详情', icon: 'tree' }
      }
    ],
    hide: true
  },

  // device management
  {
    path: '/device',
    component: Layout,
    redirect: '/device',
    name: 'Device',
    meta: { title: '设备管理', icon: 'el-icon-cpu' },
    children: [
      {
        path: 'devices',
        name: 'Devices',
        component: () => import('@/views/table/devices'),
        meta: { title: '设备列表', icon: 'table' }
      },
      {
        path: 'newdevices',
        name: 'NewDevices',
        component: () => import('@/views/table/newdevices'),
        meta: { title: '新上设备', icon: 'el-icon-mobile' }
      }
    ]
  },

  // data management
  {
    path: '/data',
    component: Layout,
    redirect: '/data/rawdevice',
    name: 'Data',
    meta: { title: '数据管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'rawdevice',
        name: 'RawDeviceData',
        component: () => import('@/views/table/rawdevicedata'),
        meta: { title: '原始设备数据', icon: 'table' }
      },
      {
        path: 'rawgateway',
        name: 'RawGateWayData',
        component: () => import('@/views/table/rawdevicedata'),
        meta: { title: '原始网关数据', icon: 'tree' }
      }
    ]
  },

  {
    path: '/otherinfo',
    component: Layout,
    name: 'OtherInfo',
    meta: { title: '其他', icon: 'el-icon-document' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/info/infopage'),
        meta: { title: '其他信息', icon: 'el-icon-more'}
      }
    ]
  },

  // 告警管理
  /*{
    path: '/alert',
    component: Layout,
    redirect: '/alert/list',
    name: 'Alert',
    meta: { title: '告警管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '历史告警', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '历史故障', icon: 'tree' }
      }
    ]
  },*/

  // 网关管理
  /*{
    path: '/gateway',
    component: Layout,
    redirect: '/gateway/list',
    name: 'Gateway',
    meta: { title: '网关管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '测点管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '流量监控', icon: 'tree' }
      }
    ]
  },*/

  // 权限管理
  /*{
    path: '/auth',
    component: Layout,
    redirect: '/auth/manage',
    name: 'Auth',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '接口管理', icon: 'tree' }
      }
    ]
  },*/

  /* {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
