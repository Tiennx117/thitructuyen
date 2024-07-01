import './headerlms.module.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import NotionBar from './NotionBar';
import { useCurrentUserDefault } from 'shared/hooks/useCurrentUserDefault';
import { setLanguage } from 'store/oauth/oauthSlice';
import { useDispatch } from 'react-redux';

const HeaderLMS = () => {
    const dispatch = useDispatch();
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const currentUserDefault = useCurrentUserDefault();
    const [visibleRight, setVisibleRight] = useState(false);
    const { t, i18n } = useTranslation()
    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        console.log('currentUserDefault', currentUserDefault);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" style={{ backgroundColor: '#23b7e5' }} aria-label="Main navigation">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>
                        <img style={{ height: '26px' }} src={window.location.origin + '/images/logo-eps.png'} />
                    </Link>

                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/overview'}>
                                    {t('rbkey_ct_ovrvw', 'Tổng quan')}
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/learner'}>
                                    {t('rbkey_LrnLBL', 'Học tập')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/collaborate'}>
                                    {t('rbkey_CllbrtLBL', 'Tương tác')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/cuocthi'}>
                                    {t('rbkey_CmptLBL', 'Cuộc thi')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/tuanthu'}>
                                    {t('rbkey_CmplncLBL', 'Tuân thủ')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/other'}>
                                    Others
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/demo'}>
                                    Demo
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{t('rbkey_LnggClnLBL', 'Ngôn ngữ')}</a>
                                <ul className="dropdown-menu">
                                    <li><a onClick={() => changeLanguageHandler('en')} className="dropdown-item" href="#">EN</a></li>
                                    <li><a onClick={() => changeLanguageHandler('vi')} className="dropdown-item" href="#">VI</a></li>

                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 pull-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{userFirstName}</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                                    <li><a className="dropdown-item" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a></li>
                                    <li><a className="dropdown-item" href="/logout">{t('rbkey_LgtLBL', 'Đăng xuất')}</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 pull-right">
                            <div className='test'>
                                <NotionBar />
                            </div>
                        </ul>
                        <form className="d-flex" role="search">
                            <input style={{ borderRadius: '20px' }} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
            <div className="nav-scroller bg-body shadow-sm" style={{ paddingTop: '50px' }}></div>
        </>
    )
}

export default HeaderLMS;