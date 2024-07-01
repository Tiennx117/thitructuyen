import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { learnerRouters } from './learnerRoutes';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LearnerLayout = () => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderLMS />

            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/learner/my-learner'}>
                        {t('rbkey_MyLrnngLBL', 'Bài học của tôi')}
                    </Link>
                    <Link className="nav-link" to={'/learner/catalogue'}>
                        {t('rbkey_CtlgLBL', 'Khóa học Public')}
                    </Link>
                    <Link className="nav-link" to={'/learner/video-library/home'}>
                        {t('rbkey_VdLbrryLBL', 'Thư viện video')}
                    </Link>

                    <Link className="nav-link" to={'/learner/khoahocbatbuoc'}>

                        {t('rbkey_MndtryCrssLBL', 'Các khoá học bắt buộc')}
                    </Link>

                    <Link className="nav-link" to={'/learner/training-history'}>
                        {t('rbkey_TrnngHstryLBL', 'Lịch sử đào tạo')}

                    </Link>
                    <Link className="nav-link" to={'/learner/khoahocbatbuoc'}>
                        {t('rbkey_DshbrdLBL', 'Bảng điều khiển')}

                    </Link>
                    <Link className="nav-link" to={'/learner/khoahocbatbuoc'}>
                        {t('rbkey_ExtrnlLrnngLBL', 'Bài học ngoài hệ thống')}

                    </Link>

                    <Link className="nav-link" to={'/learner/khoahocbatbuoc'}>
                        {t('rbkey_SkllPthLBL', 'Lộ trình kỹ năng')}

                    </Link>

                </nav>
            </div>

            <main className="container-fluid mt-2">
                <Routes>
                    {learnerRouters.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}
                </Routes>
                <Outlet />

            </main>
        </>
    )
}
export default LearnerLayout;