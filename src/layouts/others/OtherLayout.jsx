import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { otherRoutes } from './otherRoutes';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
const OtherLayout = () => {
    return (
        <>
            <HeaderLMS />

            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link" to={'/other/diembaithi'}>
                        Điểm
                    </Link>
                    <Link className="nav-link" to={'/other/skillpath'}>
                        Lộ Trình Kỹ Năng
                    </Link>
                    <Link className="nav-link" to={'/other/demotest'}>
                        Demo
                    </Link>
                    <Link className="nav-link" to={'/other/exam'}>
                        Thực hiện thi
                    </Link>
                    <Link className="nav-link" to={'/other/search'}>
                        Tìm kiếm
                    </Link>
                    <Link className="nav-link" to={'/other/sharecourse'}>
                        Share course
                    </Link>
                    <Link className="nav-link" to={'/other/thuchienthi'}>
                        Demo Thuc hien thi
                    </Link>
                </nav>
            </div>

            <main className="container-fluid mt-2">
                <Routes>

                    {otherRoutes.map(({ path, component: Component }, index) =>
                        <Route path={path} key={index} element={<Component />} />
                    )}


                </Routes>
                <Outlet />

            </main>


        </>

    )
}
export default OtherLayout;