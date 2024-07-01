import { loadable } from 'shared/utils';

const tuanthuRoutes = [
    {
        path: '/*',
        component: loadable(() => import('./components/TuanThuContainer'))
    },
    {
        path: '/tuanthucuatoi',
        component: loadable(() => import('./components/TuanThuContainer'))
    },
   
    
]
export { tuanthuRoutes };