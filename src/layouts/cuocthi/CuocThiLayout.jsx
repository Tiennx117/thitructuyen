import { Card } from 'primereact/card';
import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { cuocthiRoutes } from './cuocthiRoutes';
import { useTranslation } from 'react-i18next';
const CuocThiLayout = () => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderLMS />

            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/cuocthi/banlanhdao'}>
                        {t('rbkey_Ldr_BrdLBL','Ban lãnh đạo')}
                    </Link>
                    <Link className="nav-link" to={'/cuocthi/cuahang'}>
                        {t('rbkey_Ldr_BrdLBL','Cửa hàng')}
                    </Link>
                </nav>
            </div>

            <main className="container-fluid mt-2">
                <Routes>
                    {cuocthiRoutes.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}
                </Routes>
                <Outlet />
            </main>


        </>

    )
}
export default CuocThiLayout;