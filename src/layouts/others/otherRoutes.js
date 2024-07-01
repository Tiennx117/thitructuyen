import { loadable } from 'shared/utils';

const otherRoutes = [
    {
        path: '/*',
        component: loadable(() => import('./components/DiemBaiThi'))
    },
    {
        path: '/diembaithi',
        component: loadable(() => import('./components/DiemBaiThi'))
    },
    {
        path: '/demo',
        component: loadable(() => import('./components/DemoComponent'))
    },
    {
        path: '/skillpath',
        component: loadable(() => import('./components/LoTrinhKyNang'))
    },
    {
        path: '/exam',
        component: loadable(() => import('./components/Exam'))
    },
    {
        path: '/search',
        component: loadable(() => import('./components/Search'))
    },
    {
        path: '/sharecourse',
        component: loadable(() => import('./components/ShareCourse'))
    },
    {
        path: '/thuchienthi',
        component: loadable(() => import('./components/Submit/DemoThucHienThi'))
    },
   
    // Đã xóa
    // {
    //         path: '/catalogue',
    //         component: loadable(() => import('./components/DSKhoaHoc'))
    //     },
]
export { otherRoutes };