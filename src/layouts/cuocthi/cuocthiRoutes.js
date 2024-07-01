import { loadable } from 'shared/utils';

const cuocthiRoutes = [
    {
        path: '/*',
        component: loadable(() => import('./components/BanLanhDaoContainer'))
    },
    {
        path: '/banlanhdao',
        component: loadable(() => import('./components/BanLanhDaoContainer'))
    },
    {
        path: '/cuahang',
        component: loadable(() => import('./components/ShopContainer'))
    },
    
]
export { cuocthiRoutes };