import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { profileRoutes } from './profileRoutes';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
const ProfileLayout = () => {
    return (
        <>
            <HeaderLMS />
            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/profile/user'}>
                        Hồ sơ
                    </Link>
                    <Link className="nav-link" to={'/profile/changepassword'}>
                        Đổi mật khẩu
                    </Link>
                    <Link className="nav-link" to={'/profile/certificate'}>
                        Chứng chỉ
                    </Link>
                    <Link className="nav-link" to={'/profile/performance'}>
                        Thành tích
                    </Link>
                    <Link className="nav-link" to={'/profile/skill'}>
                        Kỹ năng
                    </Link>
                </nav>
            </div>
            <main className="container-fluid mt-2">
                <Routes>
                    {profileRoutes.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}
                </Routes>
                <Outlet />
            </main>
        </>
    )
}
export default ProfileLayout;