import { loadable } from 'shared/utils';

const newLayoutRouters = [

    //learner
    // {
    //     path: '/*',
    //     // component: loadable(() => import('../layouts/learner/my-learning/MyLearningV2'))
    //     component: loadable(() => import('../layouts/overview/OverviewLayout'))
    // },
    {
        path: '/overview',
        component: loadable(() => import('../layouts/overview/OverviewLayout'))
    },
    {
        path: '/learner/video-library/availableChannel-all',
        component: loadable(() => import('../layouts/learner/video-library/VideoChannelAll'))
    },
    {
        path: '/learner/video-library/video-noibat-all',
        component: loadable(() => import('../layouts/learner/video-library/VideoNoiBatAll'))
    },
    {
        path: '/learner/my-learning-all',
        component: loadable(() => import('../layouts/learner/components/ViewAllLearner'))
    },
    {
        path: '/learner/my-learning-key',
        component: loadable(() => import('../layouts/learner/components/ViewAllKeySearchLearner'))
    },
    {
        path: '/learner/my-learning',
        component: loadable(() => import('../layouts/learner/my-learning/MyLearningV2'))
    },
    {
        path: '/learner/social-network',
        component: loadable(() => import('../layouts/learner/social-network/SocialNetwork'))
    },
    {
        path: '/learner/my-learning/*',
        component: loadable(() => import('../layouts/learner/components/LearningDeatilUrl'))
    },
    {
        path: '/learner/calender',
        component: loadable(() => import('../layouts/learner/my-learning/Calender'))
    },

    {
        path: '/learner/catalogue/*',
        component: loadable(() => import('../layouts/learner/components/CatalogueContainer'))
    },
    {
        path: '/learner/readbook',
        component: loadable(() => import('../layouts/learner/components/ReadBook'))
    },
    {
        path: '/learner/location',
        component: loadable(() => import('../layouts/learner/components/CoursesLocation'))
    },
    {
        path: '/learner/location-new',
        component: loadable(() => import('../layouts/learner/components/CoursesLocationV2'))
    },
    {
        path: '/learner/video-library/*',
        component: loadable(() => import('../layouts/learner/video-library/VideoLibraryContainer'))
    },
    {
        path: '/learner/khoahocbatbuoc',
        component: loadable(() => import('../layouts/learner/components/KhoaHocBatBuocContainer'))
    },
    {
        path: '/learner/training-history-all',
        component: loadable(() => import('../layouts/learner/components/ViewAll'))
    },
    {
        path: '/learner/training-history',
        component: loadable(() => import('../layouts/learner/components/TrainingHistoryV2'))
    },
    {
        path: '/learner/exam/:course_id',
        component: loadable(() => import('../layouts/others/components/Exam'))
    },
    {
        path: '/learner/skillpath',
        component: loadable(() => import('../layouts/others/components/LoTrinhKyNang'))
    },
    {
        path: '/learner/featured-course',
        component: loadable(() => import('../layouts/learner/components/FeaturedCourseContainer'))
    },

    //collaborate
    {
        path: '/collaborate/conversation',
        component: loadable(() => import('../layouts/collaborate/components/ConversationContainer'))
    },
    {
        path: '/collaborate/survey',
        component: loadable(() => import('../layouts/collaborate/components/SurveyContainer'))
    },
    {
        path: '/collaborate/blog',
        component: loadable(() => import('../layouts/collaborate/components/BlogContainer'))
    },
    {
        path: '/collaborate/briefcase',
        component: loadable(() => import('../layouts/collaborate/components/BriefcaseContainer'))
    },
    {
        path: '/collaborate/webinar',
        component: loadable(() => import('../layouts/collaborate/components/WebinarContainer'))
    },

    //cuocthi
    {
        path: '/cuocthi/banlanhdao',
        component: loadable(() => import('../layouts/cuocthi/components/BanLanhDaoContainer'))
    },
    {
        path: '/cuocthi/cuahang',
        component: loadable(() => import('../layouts/cuocthi/components/ShopContainer'))
    },

    //other
    {
        path: '/other/frameworkconfiguration',
        component: loadable(() => import('../layouts/others/components/FrameworkConfiguration'))
    },
    {
        path: '/other/diembaithi',
        component: loadable(() => import('../layouts/others/components/DiemBaiThi'))
    },
    {
        path: '/other/demo',
        component: loadable(() => import('../layouts/others/components/DemoComponent'))
    },
    {
        path: '/other/skillpath',
        component: loadable(() => import('../layouts/others/components/LoTrinhKyNang'))
    },
    {
        path: '/other/exam',
        component: loadable(() => import('../layouts/others/components/Exam'))
    },
    {
        path: '/other/search',
        component: loadable(() => import('../layouts/others/components/Search'))
    },
    {
        path: '/other/sharecourse',
        component: loadable(() => import('../layouts/others/components/ShareCourse'))
    },
    {
        path: '/other/thuchienthi',
        component: loadable(() => import('../layouts/others/components/Submit/DemoThucHienThi'))
    },
    {
        path: '/other/my-learning-old',
        component: loadable(() => import('../layouts/learner/components/MyLearnerContainer'))
    },
    {
        path: '/other/contact',
        component: loadable(() => import('../layouts/others/components/ChamSocKH'))
    },
    {
        path: '/other/help',
        component: loadable(() => import('../layouts/others/components/Help'))
    },
    {
        path: '/other/faq',
        component: loadable(() => import('../layouts/others/components/FAQ'))
    },
    //profile
    {
        path: '/profile/*',
        component: loadable(() => import('../layouts/profile/components/ProfileContainer'))
    },
    // xem them thong bao
    {
        path: '/showmorenotification/',
        component: loadable(() => import('../layouts/lms/ShowMoreNotification'))
    },
]
export { newLayoutRouters };