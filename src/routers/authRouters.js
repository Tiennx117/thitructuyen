import { loadable } from '../shared/utils/loadable';
//import loadable from '@loadable/component'
import DemoLayout from '../layouts/demo/DemoLayout';
import AdminLayout from '../layouts/AdminLayout';
import LearnerLayout from '../layouts/learner/LearnerLayout';
import CuocThiLayout from '../layouts/cuocthi/CuocThiLayout';
const authRouters = [
    {
        path: '/*',
        component: loadable(() => import('../layouts/NewLayout')),
    },
    {
        path: '/logout',
        component: loadable(() => import('../modules/logout/Logout')),
    },
    {
        path: '/demobook',
        component: loadable(() => import('../layouts/demo/components/DemoWakaAudio')),
    },
    {
        path: '/readbook',
        component: loadable(() => import('../layouts/learner/components/ReadBook')),
    },

    {
        path: '/gallery',
        component: loadable(() => import('../modules/gallery/GalleryManager'))
    },
    {
        path: '/demo-layout',
        component: loadable(() => import('../layouts/DemoLayout')),
    },
    {
        path: '/lmslog',
        component: loadable(() => import('../layouts/LmsLogLayout')),
    },
    // {
    //     path: '/overview',
    //     component: loadable(() => import('../layouts/overview/OverviewLayout')),
    // },

    // {
    //     path: '/collaborate/*',
    //     component: loadable(() => import('../layouts/collaborate/CollaborateLayout')),
    // },
    // {
    //     path: '/learner/*',
    //     component: LearnerLayout,
    // },
    // {
    //     path: '/cuocthi/*',
    //     component: CuocThiLayout,
    // },
    // {
    //     path: '/tuanthu/*',
    //     component: loadable(() => import('../layouts/tuanthu/TuanThuLayout')),
    // },
    // {
    //     path: '/other/*',
    //     component: loadable(() => import('../layouts/others/OtherLayout')),
    // },
    {
        path: '/demo/*',
        component: DemoLayout,
    },
    {
        path: '/admin/*',
        component: AdminLayout,
    },
    // {
    //     path: '/profile/*',
    //     component: loadable(() => import('../layouts/profile/ProfileLayout')),
    // },
    {
        path: '/elearning/*',
        component: loadable(() => import('../layouts/ELearningLayout')),
    },
    {
        path: '/newlayout/*',
        component: loadable(() => import('../layouts/NewLayout')),
    },
    {
        path: '/layouttest/*',
        component: loadable(() => import('../layouts/LayoutTest')),
    },
    {
        path: '/couter/*',
        component: loadable(() => import('../modules/example/CounterExample')),
    },


]
export { authRouters };