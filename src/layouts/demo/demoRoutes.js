import { loadable } from 'shared/utils';

const demoRoutes = [
    
    {
        path: '/demotest',
        component: loadable(() => import('./components/DemoTest'))
    },
    {
        path:'/lms-container',
        component: loadable(() => import('./components/LMSContainer'))
    },
    {
        path:'/tree-checkbox',
        component: loadable(() => import('./components/TreeCheckBox'))
    },
    {
        path:'/columnchart',
        component: loadable(() => import('./components/ColumnChartDemo'))
    },
    {
        path:'/gaugechart',
        component: loadable(() => import('./components/GaugeChartDemo'))
    },
    {
        path:'/dragdrop',
        component: loadable(() => import('./components/DragDropDemo'))
    },
    {
        path:'/dragdrophook',
        component: loadable(() => import('./components/DragDropHookList'))
    },
    {
        path:'/cardresponsive',
        component: loadable(() => import('./components/DemoCardResponive'))
    },
    {
        path:'/calendar',
        component: loadable(() => import('./components/DemoCalendar'))
    },
    {
        path:'/fixscroll',
        component: loadable(() => import('./components/FixScrollDemo'))
    },
    {
        path:'/hooklist',
        component: loadable(() => import('./components/DemoHookListSate'))
    },
    {
        path:'/fillblank',
        component: loadable(() => import('./components/DemoFillBlank'))
    },
    {
        path:'/network-status',
        component: loadable(() => import('./components/DemoNetworkStatus'))
    },
    {
        path:'/focus-scroll',
        component: loadable(() => import('./components/FocusScroll'))
    },
    {
        path:'/demo-cancelrequest',
        component: loadable(() => import('./components/DemoCancelRequest'))
    },
    {
        path:'/demowaka',
        component: loadable(() => import('./components/DemoWaka'))
    },
    {
        path:'/jwplayer',
        component: loadable(() => import('./components/DemoJwplayer'))
    },
    {
        path:'/demowaka2',
        component: loadable(() => import('./components/DemoWaka2'))
    },
    {
        path:'/demowakaapi',
        component: loadable(() => import('./components/DemoWakaEpub'))
    },
    {
        path:'/demowakaaudio',
        component: loadable(() => import('./components/DemoWakaAudio'))
    },
    {
        path:'/demowakaapi-list',
        component: loadable(() => import('./components/DemoWakaApiList'))
    },
    {
        path:'/demowakaDetaiContent/:content_id',
        component: loadable(() => import('./components/waka/ContentDetail'))
    },
    
]
export { demoRoutes };