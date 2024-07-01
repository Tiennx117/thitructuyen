import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import NotionBar from './lms/NotionBar';
import { useCurrentUserDefault } from 'shared/hooks/useCurrentUserDefault';
import { setLanguage } from 'store/oauth/oauthSlice';
import { useDispatch } from 'react-redux';
import './newlayout.scss'
const NewLayout = () => {

    const dispatch = useDispatch();
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const currentUserDefault = useCurrentUserDefault();
    const [visibleRight, setVisibleRight] = useState(false);
    const { t, i18n } = useTranslation()
    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    }

    return (<>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <img style={{ height: '26px' }} src='/images/logo-eps.png' />
                </Link>
                <div className="d-flex flex-row">
                    <div className='test mt-1'>
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
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                            <span className="d-none d-sm-inline mx-1">{userFirstName}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                            <li><a className="dropdown-item" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a></li>
                            <li><a className="dropdown-item" href="/logout">{t('rbkey_LgtLBL', 'Đăng xuất')}</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 p-0 bg-newlayout">
                    <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">

                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="/overview" className="nav-link align-middle">
                                    <i className="fa fa-home" />
                                    <span className=" d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                        {t('rbkey_ct_ovrvw', 'Tổng quan')}
                                    </span>
                                </a>
                            </li>


                            <li>
                                <a href="#learner" data-bs-toggle="collapse" data-bs-target="#learner" className="nav-link  align-middle" aria-expanded="true">
                                    <i className="fa-solid fa-user" /> <span className=" d-none d-sm-inline sidebar-menu-text">{t('rbkey_LrnLBL', 'Học tập')}</span> </a>
                                <div className="collapse show nav flex-column " id="learner" data-bs-parent="#menu">
                                    <div >
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/my-learner" className="nav-link">
                                                <i className="fa-solid fa-book-open" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_MyLrnngLBL', 'Bài học của tôi')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/catalogue" className="nav-link">
                                                <i className="fa-solid fa-bookmark" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_CtlgLBL', 'Khóa học Public')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/video-library" className="nav-link">
                                                <i className="fa-solid fa-video" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_VdLbrryLBL', 'Thư viện video')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/khoahocbatbuoc" className="nav-link">
                                                <i className="fa-solid fa-star" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_MndtryCrssLBL', 'Các khoá học bắt buộc')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/training-history" className="nav-link">
                                                <i className="fa-solid fa-magnifying-glass" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_TrnngHstryLBL', 'Lịch sử đào tạo')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/khoahocbatbuoc" className="nav-link">
                                                <i className="fa-solid fa-gear" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_DshbrdLBL', 'Bảng điều khiển')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/khoahocbatbuoc" className="nav-link">
                                                <i className="fa-solid fa-book-open-reader" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_ExtrnlLrnngLBL', 'Bài học ngoài hệ thống')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/learner/khoahocbatbuoc" className="nav-link">
                                                <i className="fa-solid fa-chart-simple" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_SkllPthLBL', 'Lộ trình kỹ năng')}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <a href="#collaborate" data-bs-toggle="collapse" className="nav-link  align-middle ">
                                    <i className="fa-solid fa-users" /> <span className=" d-none d-sm-inline sidebar-menu-text">{t('rbkey_CllbrtLBL', 'Tương tác')}</span></a>
                                <ul className="collapse nav flex-column " id="collaborate" data-bs-parent="#menu">
                                    <div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/collaborate/conversation" className="nav-link">
                                                <i className="fa-solid fa-message" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_CnvrstnLBL', 'Cuộc trò chuyện')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/collaborate/survey" className="nav-link">
                                                <i className="fa-solid fa-square-check" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_SrvyLBL', 'Khảo sát')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/collaborate/briefcase" className="nav-link">
                                                <i className="fa-solid fa-folder-open" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_BrfCsLBL', 'Kho tài liệu')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/collaborate/blog" className="nav-link">
                                                <i className="fa-brands fa-blogger" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_BlgLBL', 'Blog')}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/collaborate/webinar" className="nav-link">
                                                <i className="fa-solid fa-layer-group" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_WbmnrLBL', 'Hội thảo trực tuyến')}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#cuocthi" data-bs-toggle="collapse" className="nav-link  align-middle">
                                    <i className="fa-solid fa-square-pen" /> <span className=" d-none d-sm-inline sidebar-menu-text"> {t('rbkey_CmptLBL', 'Cuộc thi')}</span> </a>
                                <ul className="collapse nav flex-column " id="cuocthi" data-bs-parent="#menu">
                                    <div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/cuocthi/banlanhdao" className="nav-link">
                                                <i className="fa-solid fa-user-tie" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_Ldr_BrdLBL', 'Ban lãnh đạo')}
                                                </span>
                                            </a>
                                            <a href="/cuocthi/cuahang" className="nav-link">
                                                <i className="fa-solid fa-user-tie" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_Ldr_BrdLBL', 'Cửa hàng')}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#tuanthu" data-bs-toggle="collapse" className="nav-link  align-middle">
                                    <i className="fa-solid fa-file-lines" /> <span className=" d-none d-sm-inline sidebar-menu-text"> {t('rbkey_CmplncLBL', 'Tuân thủ')}</span> </a>
                                <ul className="collapse nav flex-column " id="tuanthu" data-bs-parent="#menu">
                                    <div>
                                        <li className="w-100 ml-md-3">
                                            <a href="/tuanthu/tuanthucuatoi" className="nav-link">
                                                <i className="fa-solid fa-file-lines" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    {t('rbkey_MyCmplncLBL', 'Tuân thủ của tôi')}
                                                </span>
                                            </a>
                                        </li>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#other" data-bs-toggle="collapse" className="nav-link  align-middle">
                                    <i className="fa-solid fa-circle-plus" /> <span className=" d-none d-sm-inline sidebar-menu-text"> Others</span> </a>
                                <div className="collapse nav flex-column " id="other" data-bs-parent="#menu">
                                    <div >
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/diembaithi" className="nav-link">
                                                <i className="fa-solid fa-circle-check" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Điểm
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/skillpath" className="nav-link">
                                                <i className="fa-solid fa-chart-simple" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Lộ trình kỹ năng
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/demotest" className="nav-link">
                                                <i className="fa-solid fa-laptop-code" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Demo
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/exam" className="nav-link">
                                                <i className="fa-solid fa-laptop-code" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Thực hiện thi
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/sharecourse" className="nav-link">
                                                <i className="fa-solid fa-magnifying-glass" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Tìm kiếm
                                                </span>
                                            </a>
                                        </div>
                                        <div className="w-100 ml-md-3">
                                            <a href="/other/search" className="nav-link">
                                                <i className="fa-solid fa-share" />
                                                <span className="d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                                    Share course
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#" className="nav-link align-middle">
                                    <i className="fa-solid fa-laptop-code" />
                                    <span className=" d-none d-sm-inline sidebar-menu-text sidebar-menu-text">
                                        Demo
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <hr />

                    </div>
                </div>
                <div className="col py-3">

                    <h3>Left Sidebar with Submenus</h3>
                    <p className="lead">
                        An example 2-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single
                        menu is be open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
                    <ul className="list-unstyled">
                        <li><h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile</li>
                    </ul>
                </div>
            </div>
        </div>


    </>)
}
export default NewLayout;