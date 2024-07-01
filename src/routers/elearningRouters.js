import { loadable } from 'shared/utils';
const elearningRouters = [
    {
        path: '/learner/*',
        component: loadable(() => import('layouts/learner/LearnerLayout'))
    },
]
export { elearningRouters };