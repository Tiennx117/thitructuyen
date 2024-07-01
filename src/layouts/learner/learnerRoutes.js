import { loadable } from 'shared/utils';

const learnerRouters = [

    {
        path: '/*',
        component: loadable(() => import('./components/MyLearnerContainer'))
    },
    {
        path: '/my-learner',
        component: loadable(() => import('./components/MyLearnerContainer'))
    },
    {
        path: '/catalogue',

        component: loadable(() => import('./components/CatalogueContainer'))
    },
    {
        path: '/video-library/*',
        component: loadable(() => import('./video-library/VideoLibraryContainer'))
    },
    {
        path: '/khoahocbatbuoc',
        component: loadable(() => import('./components/KhoaHocBatBuocContainer'))
    },
    {
        path: '/training-history',
        component: loadable(() => import('./components/TrainingHistory'))
    },
    {
        path: '/learner/training-history-all',
        component: loadable(() => import('./components/ViewAll'))
    },
    {
        path: '/learner/my-learning-all',
        component: loadable(() => import('./components/ViewAllLearner'))
    },
    {
        path: '/learner/my-learning-key',
        component: loadable(() => import('./components/ViewAllKeySearchLearner'))
    },
    {
        path: '/exam/:course_id',
        component: loadable(() => import('../others/components/Exam'))
    },
    {
        path: '/other/sharecourse',
        component: loadable(() => import('../others/components/ShareCourse'))
    },

]
export { learnerRouters };