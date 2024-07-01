import { Card } from 'primereact/card';
import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { collaborateRoutes } from './collaborateRoutes';
import { useTranslation } from 'react-i18next';
const CollaborateLayout = () => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderLMS />

            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/collaborate/conversation'}>
                        {t('rbkey_CnvrstnLBL', 'Cuộc trò chuyện')}
                    </Link>
                    <Link className="nav-link" to={'/collaborate/survey'}>
                        {t('rbkey_SrvyLBL', 'Khảo sát')}

                    </Link>
                    <Link className="nav-link" to={'/collaborate/briefcase'}>
                        {t('rbkey_BrfCsLBL', 'Kho tài liệu')}
                    </Link>
                    <Link className="nav-link" to={'/collaborate/blog'}>
                        {t('rbkey_BlgLBL', 'Blog')}
                    </Link>
                    <Link className="nav-link" to={'/collaborate/webinar'}>
                        {t('rbkey_WbmnrLBL', 'Hội thảo trực tuyến')}
                    </Link>
                </nav>
            </div>

            <main className="container-fluid mt-2">
                <Routes>
                    {collaborateRoutes.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}
                </Routes>
                <Outlet />
            </main>


        </>

    )
}
export default CollaborateLayout;