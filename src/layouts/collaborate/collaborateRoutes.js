import { loadable } from 'shared/utils';
const pathParent = '/collaborate'
const collaborateRoutes = [
    {
        path:  '/*',
        component: loadable(() => import('./components/ConversationContainer'))
    },
    {
        path:  '/conversation',
        component: loadable(() => import('./components/ConversationContainer'))
    },
    {
        path:  '/survey',
        component: loadable(() => import('./components/SurveyContainer'))
    },
    {
        path:  '/blog',
        component: loadable(() => import('./components/BlogContainer'))
    },
    {
        path:  '/briefcase',
        component: loadable(() => import('./components/BriefcaseContainer'))
    },
    {
        path:  '/webinar',
        component: loadable(() => import('./components/WebinarContainer'))
    },
    
]
export { collaborateRoutes };