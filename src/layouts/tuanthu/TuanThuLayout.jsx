import { Card } from 'primereact/card';
import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { tuanthuRoutes } from './tuanthuRoutes';
import { useTranslation } from 'react-i18next';

const TuanThuLayout = () => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderLMS />

            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/tuanthu/tuanthucuatoi'}>
                        {t('rbkey_MyCmplncLBL','Tuân thủ của tôi')}
                    </Link>
                    
                </nav>
            </div>

            <main className="container-fluid mt-2">
            <Routes>
                    {tuanthuRoutes.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}
                </Routes>
                <Outlet />
            </main>


        </>

    )
}
export default TuanThuLayout;