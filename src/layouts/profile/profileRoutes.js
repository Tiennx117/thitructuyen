import { loadable } from 'shared/utils';

const profileRoutes = [
    {
        path: '/*',
        component: loadable(() => import('./components/ProfileContainer'))
    },
]
export { profileRoutes };