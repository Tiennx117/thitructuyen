import { useState } from 'react';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import NotionBar from './lms/NotionBar';
import { useCurrentUserDefault } from 'shared/hooks/useCurrentUserDefault';
import { setLanguage } from 'store/oauth/oauthSlice';
import { useDispatch } from 'react-redux';
import { newLayoutRouters } from '../routers/newLayoutRouter';
import './newlayout.scss';
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { appSetting } from 'shared/app-settings';

const NewLayout = () => {
    const [timeNow, setTimeNow] = useState("");
    const [monthNow, setMonthNow] = useState("");
    const [isToggle, setIsToggle] = useState(false)
    const dispatch = useDispatch();
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userRoles = useSelector(state => state.oauth.UserRoles) || [];
    const currentUserDefault = useCurrentUserDefault();
    const [visibleRight, setVisibleRight] = useState(false);
    const { t, i18n } = useTranslation()
    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    }
    const toggle = () => {
        if (!isToggle) {
            document.body.classList.add('sidebar-collapse');

        } else {
            document.body.classList.remove('sidebar-collapse');
        }
        setIsToggle(!isToggle)
        // document.body.classList.remove('overflow-y-disable');
    }

    return (
        <>
            <div className='wrapper'>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light bg-primary navbar-custom" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={toggle} data-widget="pushmenu" role="button"><i className="fas fa-bars" style={{ color: 'white' }} /></a>
                        </li>
                        <Link className="nav-link" to={'/other/search'}>
                            <i title='Chia sẻ' style={{ fontSize: "1.6rem", marginRight: "1rem", cursor: "pointer", color: "white" }} className="fa-solid fa-magnifying-glass"></i>
                        </Link>

                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <div style={{ textAlign: "center", margin: "auto" }}>
                            <span>{format(new Date(), 'P', { locale: vi })}</span>
                        </div>
                        <Link className="nav-link" to={'/other/contact'}>
                            <i title='Liên hệ' style={{ fontSize: "1.6rem", marginRight: "1rem", cursor: "pointer", color: "white" }} className="fa-solid fa-headphones"></i>
                        </Link>
                        <div className='test mt-1' title='Thông báo'>
                            <NotionBar />
                        </div>
                        <div className="dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false">{t('rbkey_LnggClnLBL', 'Ngôn ngữ')}</a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a onClick={() => changeLanguageHandler('en')} className="dropdown-item" href="#">EN</a></li>
                                <li><a onClick={() => changeLanguageHandler('vi')} className="dropdown-item" href="#">VI</a></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false">

                                {/* <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" /> */}
                                <span className="d-none d-sm-inline">{userFirstName}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                                <li>
                                    <a className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a>
                                    <ul className="dropdown-menu submenu submenu-left dropdown-menu-end">
                                        {userRoles.map((top_menu, i) => {
                                            
                                            return (
                                                // <li key={index}><a className="dropdown-item" href="/">{item.mstrUserRoleName}</a></li>
                                                <a href={appSetting.ADMIN_URL + '/Home.aspx?selectedCultureID=' + sessionStorage.getItem('selectedCultureID') + '&SelectedUserRoleId=' + top_menu.mnUserRoleIdEncrypted + ''} key={i} className={sessionStorage.getItem('LMS_URL') ? 'dropdown-item' : 'dropdown-item hide'} style={{ paddingLeft: '1rem' }}>
                                                    <span className="iconify mr-2" data-icon="heroicons-outline:reply" data-inline="false" data-width="18" data-height="18"></span>
                                                    {top_menu.mstrUserRoleName}
                                                </a>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li><a className="dropdown-item" href="/logout">{t('rbkey_LgtLBL', 'Đăng xuất')}</a></li>
                            </ul>
                        </div>
                        {/* <div className="dropdown">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                            <span className="d-none d-sm-inline">{userFirstName}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                            <li><a className="dropdown-item" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a></li>
                            <li><a className="dropdown-item" href="/logout">{t('rbkey_LgtLBL', 'Đăng xuất')}</a></li>
                        </ul>
                    </div> */}
                    </ul>
                </nav>

                <aside className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4">
                    <div className="sidebar  d-flex flex-column align-items-center align-items-sm-start pt-2 pl-0 text-white min-vh-100">
                        <ul className="nav nav-pills nav-sidebar  flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu1">
                            <li className="nav-item">
                                <Link to={{ pathname: '/overview' }} className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        {t('rbkey_ct_ovrvw', 'Tổng quan')}
                                    </p>
                                </Link>
                                <ul style={{ display: 'none' }} className="collapse nav flex-column" id="tongquan" data-bs-parent="#menu1"></ul>

                            </li>

                            <li className="nav-item">

                                <a href="#learner" data-bs-toggle="collapse" data-bs-target="#learner" className="nav-link  align-middle">
                                    <i className="nav-icon fa-solid fa-user" />
                                    <p>
                                        {t('rbkey_LrnLBL', 'Học tập')}
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="collapse nav flex-column" id="learner" data-bs-parent="#menu1">
                                    <div>
                                        <li className="nav-item border-nav-item">
                                            <Link to={{ pathname: '/learner/my-learning' }} className="nav-link">

                                                <p> {t('rbkey_MyLrnngLBL', 'Bài học của tôi')}</p>
                                            </Link>

                                        </li>
                                        <li className="nav-item border-nav-item">
                                            <Link to={{ pathname: '/learner/catalogue' }} className="nav-link">
                                                <p> {t('rbkey_CtlgLBL', 'Khóa học Public')}</p>
                                            </Link>

                                        </li>
                                        <li className="nav-item border-nav-item">
                                            <Link to={{ pathname: '/learner/video-library/home' }} className="nav-link">
                                                <p>{t('rbkey_VdLbrryLBL', 'Thư viện video')}</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item border-nav-item">
                                            <Link to={{ pathname: '/learner/khoahocbatbuoc' }} className="nav-link">
                                                <p>{t('rbkey_MndtryCrssLBL', 'Các khoá học bắt buộc')}</p>
                                            </Link>

                                        </li> */}
                                        <li className="nav-item border-nav-item">
                                            <Link to={{ pathname: '/learner/training-history' }} className="nav-link">
                                                <p>{t('rbkey_TrnngHstryLBL', 'Lịch sử đào tạo')}</p>
                                            </Link>

                                        </li>

                                        {/* <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/learner/khoahocbatbuoc'}>
                                                <p>{t('rbkey_ExtrnlLrnngLBL', 'Bài học ngoài hệ thống')}</p>
                                            </Link>
                                        </li> */}
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/learner/skillpath'}>
                                                <p>Lộ trình kỹ năng</p>
                                            </Link>
                                        </li>
                                    </div>
                                </ul>

                            </li>

                            <li className="nav-item">
                                <a href="#collaborate" data-bs-toggle="collapse" data-bs-target="#collaborate" className="nav-link  align-middle">
                                    <i className="nav-icon fa-solid fas fa-book" />
                                    <p>
                                        {t('rbkey_CllbrtLBL', 'Tương tác')}
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="collapse nav flex-column" id="collaborate" data-bs-parent="#menu1">
                                    <div>
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/collaborate/conversation'}>
                                                <p>{t('rbkey_CnvrstnLBL', 'Cuộc trò chuyện')}</p>
                                            </Link>

                                        </li>
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/collaborate/survey'}>
                                                <p>{t('rbkey_SrvyLBL', 'Khảo sát')}</p>
                                            </Link>

                                        </li>
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/collaborate/briefcase'}>
                                                <p>{t('rbkey_BrfCsLBL', 'Kho tài liệu')}</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/collaborate/blog'}>
                                            <p>{t('rbkey_BlgLBL', 'Blog')}</p>
                                        </Link>
                                    </li> */}
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/collaborate/webinar'}>
                                                <p>{t('rbkey_WbmnrLBL', 'Hội thảo trực tuyến')}</p>
                                            </Link>

                                        </li>

                                    </div>
                                </ul>

                            </li>
                            <li className="nav-item">
                                <a href="#cuocthi" data-bs-toggle="collapse" data-bs-target="#cuocthi" className="nav-link  align-middle">
                                    <i className="nav-icon fa-solid fas fa-edit" />
                                    <p>
                                        {t('rbkey_CmptLBL', 'Cuộc thi')}
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="collapse nav flex-column" id="cuocthi" data-bs-parent="#menu1">
                                    <div>
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/cuocthi/banlanhdao'}>
                                                <p>{t('rbkey_Ldr_BrdLBL', 'Ban lãnh đạo')}</p>
                                            </Link>

                                        </li>
                                        <li className="nav-item border-nav-item">
                                            <Link className="nav-link" to={'/cuocthi/cuahang'}>
                                                <p>Cửa hàng</p>
                                            </Link>

                                        </li>
                                    </div>
                                </ul>

                            </li>

                            {/* <li className="nav-item">
                            <a href="#tuanthu" data-bs-toggle="collapse" data-bs-target="#tuanthu" className="nav-link  align-middle">
                                <i className="nav-icon fa-solid fas fa-edit" />
                                <p>
                                    {t('rbkey_CmplncLBL', 'Tuân thủ')}
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="collapse nav flex-column" id="tuanthu" data-bs-parent="#menu1">
                                <div>
                                    <li className="nav-item border-nav-item">
                                        <a href="../../index.html" className="nav-link">
                                        <p>{t('rbkey_MyCmplncLBL', 'Tuân thủ của tôi')}</p>
                                        </a>
                                    </li>
                                    
                                </div>
                            </ul>

                        </li> */}
                            {/* <li className="nav-item">
                            <a href="#others" data-bs-toggle="collapse" data-bs-target="#others" className="nav-link  align-middle">
                                <i className="nav-icon fa-solid fas fa-edit" />
                                <p>
                                    Others
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="collapse nav flex-column" id="others" data-bs-parent="#menu1">
                                <div>
                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/diembaithi'}>
                                            <p>Điểm</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/skillpath'}>
                                            <p>Lộ trình kỹ năng</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/exam'}>
                                            <p>Thực hiện thi</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/search'}>
                                            <p>Tìm kiếm</p>
                                        </Link>

                                    </li>

                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/contact'}>
                                            <p>Liên hệ</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item border-nav-item">
                                        <Link className="nav-link" to={'/other/sharecourse'}>
                                            <p>Share course</p>
                                        </Link>

                                    </li>
                                </div>
                            </ul>

                        </li>

                        <li className="nav-item">
                            <a href="/demo/lms-container" className="nav-link">
                                <i className="nav-icon far fa-plus-square" />
                                <p>
                                    Demo
                                </p>
                            </a>
                        </li> */}



                        </ul>
                    </div>
                </aside>
                <div className='content-wrapper'>

                    <div className='container-fluid'>
                        <Routes>
                            {newLayoutRouters.map(({ path, component: Component }, index) =>
                                <Route path={path} key={index} element={<Component />} />
                            )}
                        </Routes>
                        <Outlet />
                    </div>


                </div>
            </div>

        </>)
}
export default NewLayout;