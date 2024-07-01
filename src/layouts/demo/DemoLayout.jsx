import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { demoRoutes } from './demoRoutes';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import DemoSideBar from './components/DemoSidebar';
const DemoLayout = () => {
    return (
        <>
            <HeaderLMS />
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-2'>
                    <DemoSideBar />

                </div>
                <div className='col-lg-10'>
                    <main className="mt-2">
                        
                        <Routes>
                            {demoRoutes.map(({ path, component: Component }, index) =>
                                <Route path={path} key={index} element={<Component />} />
                            )}
                        </Routes>
                        <Outlet />

                    </main>
                </div>
            </div>
            </div>





        </>

    )
}
export default DemoLayout;