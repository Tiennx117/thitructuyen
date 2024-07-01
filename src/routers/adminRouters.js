import { loadable } from '../shared/utils';

const adminRouters = [
    {
        path: '/demo1',
        component: loadable(() => import('../modules/example/Demo1'))
    },
    {
        path: '/logout',
        component: loadable(() => import('../modules/logout/Logout')),
    },
    {
        path: '/profile',
        component: loadable(() => import('../modules/profile/Profile'))
    },
    {
        path: '/user-list',
        component: loadable(() => import('../modules/user/UserList'))
    },
    {
        path: '/user-form/:user_id',
        component: loadable(() => import('../modules/user/UserForm'))
    },
    {
        path: '/role-list',
        component: loadable(() => import('../modules/role/RoleList'))
    },
    {
        path: '/module-list',
        component: loadable(() => import('../modules/module/ModuleList'))
    },
    {
        path: '/gallery-module',
        component: loadable(() => import('../modules/gallery/GalleryManager'))
    },
    {
        path: '/post-list',
        component: loadable(() => import('../modules/post/PostList'))
    },
    {
        path: '/post-form/:post_id',
        component: loadable(() => import('../modules/post/PostForm'))
    },
    {
        path: '/category-list',
        component: loadable(() => import('../modules/category/CategoryList'))
    },
    {
        path: '/slide-list',
        component: loadable(() => import('../modules/slide/SlideList'))
    },
    {
        path: '/slide-form/:slide_id',
        component: loadable(() => import('../modules/slide/SlideForm'))
    },

    {
        path: '/calculation-unit-list',
        component: loadable(() => import('../modules/calculation-unit/CalculationUnitList'))
    },
    {
        path: '/calculation-unit-form/:calculation_unit_id',
        component: loadable(() => import('../modules/calculation-unit/CalculationUnitForm'))
    },
    /*
    {
        path: '/ticket-inventory-form/:ticket_inventory_id',
        component: loadable(() => import('../modules/ticket-inventory/TicketInventoryForm'))
    },
    {
        path: '/ticket-inventory-list',
        component: loadable(() => import('../modules/ticket-inventory/TicketInventoryList'))
    },
    {
        path: '/statistic-inventory',
        component: loadable(() => import('../modules/ticket-inventory/StatisticInventory'))
    },*/

    //order
    {
        path: '/order-form/:order_id',
        component: loadable(() => import('../modules/order/OrderForm'))
    },
    {
        path: '/order-list',
        component: loadable(() => import('../modules/order/OrderList'))
    },
    // store
    {
        path: '/store-form/:store_id',
        component: loadable(() => import('../modules/store/StoreForm'))
    },
    {
        path: '/store-list',
        component: loadable(() => import('../modules/store/StoreList'))
    },
    // account member
    {
        path: '/account-member-form/:account_member_id',
        component: loadable(() => import('../modules/account-member/AccountMemberForm'))
    },
    {
        path: '/account-member-list',
        component: loadable(() => import('../modules/account-member/AccountMemberList'))
    },
    {
        path: '/province-list',
        component: loadable(() => import('../modules/province/ProvinceList'))
    },
    {
        path: '/province-form/:province_id',
        component: loadable(() => import('../modules/province/ProvinceForm'))
    },
    {
        path: '/district-list',
        component: loadable(() => import('../modules/district/DistrictList'))
    },
    {
        path: '/district-form/:district_id',
        component: loadable(() => import('../modules/district/DistrictForm'))
    },
    /*
    {
        path: '/ward-list',
        component: loadable(() => import('../modules/ward/WardList'))
    },
    {
        path: '/ward-form/:ward_id',
        component: loadable(() => import('../modules/ward/WardForm'))
    },
    */
]
export { adminRouters };