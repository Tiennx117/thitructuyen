
import { React, useEffect, useState, useRef,memo } from 'react';
// import { useState } from 'react';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import NotionBar from './lms/NotionBar';
import { useCurrentUserDefault } from 'shared/hooks/useCurrentUserDefault';
import { setLanguage, setDescriptionMenu } from 'store/oauth/oauthSlice';
import { useDispatch } from 'react-redux';
import { newLayoutRouters } from '../routers/newLayoutRouter';
import './newlayout.scss';
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { appSetting, PATH_APICHATBOT } from 'shared/app-settings';
import { NavLink } from 'react-router-dom';
import { useMedia } from 'shared/hooks/useMedia';
import { useExamDescriptive } from 'hooks/useExamDescriptive'
import { Image } from 'components/Image';
//import { menuItems } from './MenuItems';
import { setSelectedMenu } from 'store/navlayout/navlayoutSlice';
import { classNames } from "primereact/utils";
import { Tooltip } from 'primereact/tooltip';
import { de } from 'date-fns/locale';
import { videoService } from "services/videoService";
import { notificationService } from 'services/notificationService';
// import "primeicons/primeicons.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.css";
// import "primeflex/primeflex.css";
import { TieredMenu } from 'primereact/tieredmenu';
import { PanelMenu } from 'primereact/panelmenu';
import { InputText } from 'primereact/inputtext';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayerAudio from '../layouts/learner/components/Waka/PlayerAudio';
import axios from "axios";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import Popup from 'reactjs-popup';
import './modal.scss';

const NewLayout = () => {
    let navigate = useNavigate();
    const menu = useRef(null);
    const { item, initDb, addItem, getAllItem, deleteItemById } = useExamDescriptive();
    const [timeNow, setTimeNow] = useState("");
    const [monthNow, setMonthNow] = useState("");
    const [isToggle, setIsToggle] = useState(false)
    const [menuItems, setmenuItems] = useState([])
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataBanner, setdataBanner] = useState([]);
    const [dataCourse, setdataCourse] = useState([]);
    const [isMyLearning, setisMyLearning] = useState('')
    const [dataDetails, setdataDetails] = useState([]);

    const dispatch = useDispatch();
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userMiddleName = useSelector(state => state.oauth.UserMiddleName) || '';
    const userLastName = useSelector(state => state.oauth.UserLastName) || '';
    const userLogo = useSelector(state => state.oauth.UserImage) || '';
    const userRoles = useSelector(state => state.oauth.UserRoles) || [];
    const selectedNav = useSelector(state => state.navlayout.selectedMenu) || '';
    const TurnOnChatbot = useSelector(state => state.oauth.TurnOnChatbot) || '';
    const currentUserDefault = useCurrentUserDefault();
    const location = useLocation();
    const { t, i18n } = useTranslation()
    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    }
    const [numberIdNavClick, setchangeIdNav] = useState({});

    const lstAudioBookStore = useSelector(state => state.detailplayaudio) || [];
    const playerAudioItem = useSelector(state => state.playerAudioItem) || [];

    const userDefault = getCurrentUserDefault()
    const userID = userDefault.UserId;
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 4,
        SortBy: "RECENT",
        SeartchText: '',
        SortOrder: 'ASC'
    });

    useEffect(() => {
        // call api here 
        loadApi()

    }, []);
    const loadApi = async () => {
        let result2 = await notificationService.GetMenuDetails();
        setmenuItems(result2.data.MenuItems)
        let result = await notificationService.getbanner({ ...filterBy1, PageNumber: 1 });
        if (result.data.FilePath == null) {
            setIsShowModal(false)
        } else {
            setdataBanner(result.data)
        }

        let result1 = await notificationService.getfeaturedcoursedetail({ ...filterBy1, PageNumber: 1, IDFeatured: result.data.CourseID });
        setdataCourse(result1.data?.FeaturedCourseLstDetail)
        // let result3 = await notificationService.getmylearningdetail(result.data.CourseID, isMyLearning);
        // setdataDetails(result3.data?.LearningItem)
        // console.log("1", result.data)
        // console.log("2", result1.data)

    }
    useEffect(() => {
        setIsShowModal(true);
    }, []);
    const closeModal = () => {
        setIsShowModal(false);
    }
    const openModal = async (item2) => {


        // navigate('/learner/featured-course')
        if (item2.length > 1) {
            setIsShowModal(false);
            console.log("courseID", dataBanner)

            navigate('/learner/featured-course', { state: {visible: true, courseID: dataBanner.CourseID} })
            // navigate('/learner/featured-course')
        } else if (item2.length == 1) {
            console.log("2", item2)
            setIsShowModal(false);

            navigate("/learner/my-learning/" + item2[0].LaunchCode + "-"+item2[0].CourseType + "-" + item2[0].IDFeaturedCourse)
        }
    }

    const ShowModal = memo(function ShowModal(item, isShowModal, item2) {
        console.log("item2", dataCourse);
        return <Popup defaultOpen={true} closeOnDocumentClick lockScroll modal onClose={closeModal}>
            <div className="">
                <a className="close" onClick={closeModal}>
                    <i class="pi pi-times" style={{ fontSize: "1.5rem" }}></i>
                </a>
                <a className="image-container2" >
                    <img
                        className="image"
                        src={item.item.FilePath}
                        alt="no image"
                        onClick={() => openModal(dataCourse)}
                        style={{cursor:'pointer'}}
                    />
                </a>
            </div>
        </Popup>

    });

    // localStorage.removeItem('pathUrlActive');
    const changeIdNav = async (id, url) => {
        dispatch(setSelectedMenu(url));
        setchangeIdNav(id);
        localStorage.setItem('pathUrlActive', url);
        document.getElementById('menu_bar2').style.display = 'block'
        // let a = document.getElementById('menu_bar2').style.display;
        // if (a == '') {
        //     document.getElementById('menu_bar2').style.display = 'block'
        // }
        // else {
        //     document.getElementById('menu_bar2').style.display = ''
        // }
    }

    const setLocalStore = () => {
        // localStorage.setItem('pathUrlActive', '/learner/my-learning');
        navigate({ pathname: appSetting.DEFAULT_PAGE ? appSetting.DEFAULT_PAGE : "/learner/my-learning" });
    }

    let getPathUrlActive = localStorage.getItem('pathUrlActive');
    const Navbar = () => {
        return (
            <nav>
                {/* id='menu_bar1' */}
                <ul id='menu_bar1' className="menus1">
                    {menuItems.length > 1 && menuItems.map((item, index) => {
                        if (appSetting.SITE_RECRUITMENT == "TRUE") {
                            if (item?.Title == 'Học tập') {
                                return (
                                    <li className='menu-item' key={index} >
                                        <NavLink
                                            to={item.Action}
                                            onClick={() => changeIdNav(item.Id, item.Action)}
                                            className={classNames('', selectedNav === item.Action ? 'active' : '', getPathUrlActive === item.Action ? 'active' : '')}
                                        >{item.Title}
                                        </NavLink>
                                    </li>
                                );
                            }
                        }
                        else {
                            return (
                                <li className='menu-item' key={index} >
                                    <NavLink
                                        to={item.Action}
                                        onClick={() => changeIdNav(item.Id, item.Action)}
                                        className={classNames('', selectedNav === item.Action ? 'active' : '', getPathUrlActive === item.Action ? 'active' : '')}
                                    >{item.Title}</NavLink>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        );
    };

    const SubItems = () => {
        return (
            <nav>
                {/* id='menu_bar2' */}
                <ul id='menu_bar2' className="menus2">
                    {menuItems.map((item, index) => {
                        return (
                            <SubNavigation key={index} urlParent={item.Action} subMenus={item.menuLevel2} />
                        );
                    })}


                </ul>
            </nav>
        );
    };

    const SubNavigation = (props) => {
        if (!props.subMenus?.subMenuItems) return null;
        let subMenuItemExpand;
        if (props.subMenus.parent == numberIdNavClick) {
            subMenuItemExpand = props.subMenus.subMenuItems?.filter((item, index) => index > 4);
        } else if (getPathUrlActive === props.urlParent) {
            subMenuItemExpand = props.subMenus.subMenuItems?.filter((item, index) => index > 4);
        }
        return (
            <>
                {props.subMenus?.subMenuItems.map((item, index) => {
                    if (index < 5) {
                        if (appSetting.SITE_RECRUITMENT == "TRUE") {
                            if (item.Title == "Bài học của tôi") {
                                if (props.subMenus.parent == numberIdNavClick) {
                                    return (
                                        <li className='menu-item1' key={index} onClick={() => {
                                            dispatch(setSelectedMenu(props.urlParent));
                                            clickMenu(item.Description);
                                        }}>
                                            <NavLink style={{ marginRight: '800px' }} to={{ pathname: item.Action }}>{item.Title}</NavLink>
                                        </li>
                                    )
                                } else if (getPathUrlActive === props.urlParent) {
                                    return (
                                        <li className='menu-item1' key={index} onClick={() => {
                                            dispatch(setSelectedMenu(props.urlParent));
                                            clickMenu(item.Description);
                                        }}>
                                            <NavLink style={{ marginRight: '800px' }} to={{ pathname: item.Action }}>{item.Title}</NavLink>
                                        </li>
                                    )
                                }
                            }
                        }
                        else {
                            if (props.subMenus.parent == numberIdNavClick) {
                                return (
                                    <>
                                        <li className='menu-item1' key={index} onClick={() => {
                                            dispatch(setSelectedMenu(props.urlParent));
                                            clickMenu(item.Description);
                                        }}>
                                            <NavLink to={{ pathname: item.Action }}>{item.Title}</NavLink>
                                        </li>
                                    </>
                                )
                            } else if (getPathUrlActive === props.urlParent) {
                                return (
                                    <>
                                        <li className='menu-item1' key={index} onClick={() => {
                                            dispatch(setSelectedMenu(props.urlParent));
                                            clickMenu(item.Description);
                                        }}>
                                            <NavLink to={{ pathname: item.Action }}>{item.Title}</NavLink>
                                        </li>
                                    </>
                                )
                            }
                        }
                    }
                })}

                {subMenuItemExpand?.length > 0 &&
                    <SubMenuExpand subMenus={subMenuItemExpand} />
                }
            </>
        )
    }

    const SubMenuExpand = (props) => {
        console.log("subMenus", props.subMenus)
        return (
            <>
                <li className="dropdown" style={{ color: 'hsla(0deg, 0%, 100%, 0.45)', padding: '3px 0 0 15px', fontWeight: '500', cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                    <Image className='d-flex align-items-center' style={{ height: '35px' }} src="/images/sort-bar-gray.svg" alt="" />
                </li>
                <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: 'rgb(197 197 197)' }}>
                    {props.subMenus.map((subItem, index) => {
                        return (
                            <div>
                                <li key={index} className='sub-menu-expand'>
                                    <NavLink to={{ pathname: subItem.Action }} style={{ color: 'black', fontWeight: '500' }}>{subItem.Title}</NavLink>
                                </li>
                            </div>

                        )
                    })}
                </ul>
            </>
        )
    }

    useEffect(() => {
        if (TurnOnChatbot == "TRUE") {
            setTimeout(() => {
                document.getElementsByClassName("rw-launcher")[0].addEventListener("click", myGreeting);
                myGreeting();
            }, 2000);
            const script = document.createElement("script");
            // script.src = "https://unpkg.com/@rasahq/rasa-chat@0.1.3/dist/widget.js";
            const defaultsrc = window.location.origin + '/rasa.js';
            script.src = defaultsrc;
            script.async = true;
            script.onload = () => {
                window.WebChat.default(
                    {
                        selector: "#webchat",
                        initPayload: "/greet",
                        customData: { "language": "en" }, // arbitrary custom data. Stay minimal as this will be added to the socket
                        socketUrl: appSetting.RASA_SOCKET_URL,
                        //socketPath: "/socket.io/",
                        title: appSetting.RASA_TITLE,
                        subtitle: appSetting.RASA_SUBTITLE,
                        profileAvatar: window.location.origin + '/images/vietinbank.png',
                        params: { "storage": "session" },
                        inputTextFieldHint: "Nhập nội dung cần hỗ trợ"
                    },
                    null
                );
            }
            script.async = true;
            document.head.appendChild(script);
        }
        else {
            if (userRoles.filter(x => x.mnUserRoleId == 7).length > 0) {
                setTimeout(() => {
                    document.getElementsByClassName("rw-launcher")[0].addEventListener("click", myGreeting);
                    myGreeting();
                }, 2000);
                const script = document.createElement("script");
                // script.src = "https://unpkg.com/@rasahq/rasa-chat@0.1.3/dist/widget.js";
                const defaultsrc = window.location.origin + '/rasa.js';
                script.src = defaultsrc;
                script.async = true;
                script.onload = () => {
                    window.WebChat.default(
                        {
                            selector: "#webchat",
                            initPayload: "/greet",
                            customData: { "language": "en" }, // arbitrary custom data. Stay minimal as this will be added to the socket
                            socketUrl: appSetting.RASA_SOCKET_URL,
                            //socketPath: "/socket.io/",
                            title: appSetting.RASA_TITLE,
                            subtitle: appSetting.RASA_SUBTITLE,
                            profileAvatar: window.location.origin + '/images/vietinbank.png',
                            params: { "storage": "session" },
                            inputTextFieldHint: "Nhập nội dung cần hỗ trợ"
                        },
                        null
                    );
                }
                script.async = true;
                document.head.appendChild(script);
            }
        }
        initDb();
        deleteData2Day()
    }, [])
    const myGreeting = () => {
        setTimeout(() => {
            document.getElementsByClassName('rw-sender')[0].addEventListener('submit', function (evt) {
                setTimeout(() => {
                    const rwclient = document.getElementsByClassName("rw-client");
                    const message = rwclient[rwclient.length - 1].children[0]
                    console.log(message.innerText);
                    let body = {
                        UserID: userID,
                        Content_Conversation: message.innerText
                    }
                    try {
                        axios.post(PATH_APICHATBOT + '/Conversation/Add', body);
                    } catch (e) {
                        console.log('api chatbot add error')
                    }

                }, 1000);

            })
        }, 1000);
    }
    const deleteData2Day = async () => {
        try {
            let dataAllLocal = await getAllItem()
            let d = new Date()
            let time1 = d.getTime();
            for (let i = 0; i < dataAllLocal.length; i++) {
                let a = time1 - dataAllLocal[i]?.time
                //let b = 1000 * 60 * 60 * 24
                let b = 1000 * 60
                if (a >= b) {
                    await deleteItemById(dataAllLocal[i].id)
                }
            }
        }
        catch (e) {
        }
    }
    const items = [
        {
            label: "Học tập",
            items: [
                {
                    label: "Bài học của tôi",
                    url: "learner/my-learning"
                },
                {
                    label: "Khóa học công khai",
                    url: "learner/catalogue"
                },
                {
                    label: 'Thư viện video',
                    url: 'learner/video-library',
                },
                {
                    label: 'Lịch sử đào tạo',
                    url: 'learner/training-history',
                },
                {
                    label: 'Lộ trình kỹ năng',
                    url: 'learner/skillpath',
                },

            ]
        },
        {
            label: 'Tương tác',
            items: [
                {
                    label: 'Cuộc trò chuyện',
                    url: 'collaborate/conversation'
                },
                {
                    label: 'Khảo sát',
                    url: 'collaborate/survey'
                },
                {
                    label: 'Kho tài liệu',
                    url: 'collaborate/briefcase'
                },
                {
                    label: 'Hội thảo trực tuyến',
                    url: 'collaborate/webinar'
                }
            ]
        },
        {
            label: 'Cuộc thi',
            items: [
                {
                    label: 'Ban lãnh đạo',
                    url: 'cuocthi/banlanhdao'
                },
                {
                    label: 'Cửa hàng',
                    url: 'cuocthi/cuahang'
                },

            ]
        }
    ];

    // const renderMenu = () => {
    //     return (
    //         <div className="menus1">
    //             <PanelMenu model={items} />
    //         </div>
    //     )
    // }




    let pathname = window.location.pathname;
    if (document.getElementById("content") != null) {
        if (pathname !== '/overview') {
            document.getElementById("content").classList.add('content-wrapper');
            document.getElementById("contentHeight").classList.remove('contentHeightScroll');
        } else if (pathname == '/overview') {
            document.getElementById("content").classList.remove('content-wrapper');
            document.getElementById("contentHeight").classList.add('contentHeightScroll');
        }
    }

    const clickMenu = (Description) => {
        // document.getElementById('menu_bar2').style.display = ''
        let a = document.getElementById('menu_bar1').style.display;
        if (a == '') {
            document.getElementById('menu_bar1').style.display = 'block'
        }
        else {
            document.getElementById('menu_bar1').style.display = ''
        }
        document.getElementById('menu_bar2').style.display = '';
        dispatch(setDescriptionMenu(Description));
    }

    const clickIconSearch = () => {
        let searchElement = document.getElementById('search-header-small').style.display;
        console.log(document.getElementById('search-header-small'))

        if (searchElement == '') {
            document.getElementById('search-header-small').style.display = 'block'
            console.log(document.getElementById('search-header-small').style)
        }
        else {
            document.getElementById('search-header-small').style.display = ''
        }
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode == 13) {
            sessionStorage.setItem('searchTerm', searchTerm);

            //window.location.href = '/other/search'; //tốc độ chậm, xóa biến state
            navigate({ pathname: '/other/search' }); //tốc độ nhanh, k xóa biến state
        }
    };

    function clickSearchBtn() {
        if (searchTerm !== null && searchTerm !== undefined && searchTerm !== '') {
            sessionStorage.setItem('searchTerm', searchTerm);
        }
    }
    let getDataStream = localStorage.getItem('dataStream');
    return (
        <>
            {isShowModal == true ? <ShowModal item={dataBanner} isShowModal={isShowModal} item2={dataCourse}></ShowModal> : null}
            <div className='wrapper'>
                <nav className="conta navbar-expand topnavbar stickey-header" style={{ border: 'none' }}>
                    <div className=''>
                        <div className='container'>
                            <div className='main-header-container d-flex '>
                                <div className='navbar-header navbar-header pt-2 mr-3'>
                                    <a onClick={() => { setLocalStore() }} href=''><Image className='styleImg' src="/images/logo_vietinbank.png" alt="" /></a>
                                </div>
                                <div className='align-items-center iconmenu' style={{ padding: '0 10px' }} onClick={() => clickMenu()}>
                                    <i style={{ color: 'white' }} className="fa-solid fa-bars"></i>
                                </div>
                                <div className='navbar-collapse left-menu-show menu1' >
                                    <ul className="navbar-nav navbar-nav1">
                                        {Navbar()}
                                    </ul>
                                </div>
                                {/* <div className='menu3 menumobile'>
                                    {renderMenu()}
                                </div> */}
                                <div className='navbar-right-top d-flex align-items-center'>

                                    <div className="dropdown">
                                        {/* <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{t('rbkey_LnggClnLBL', 'Vi')}</a> */}
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Vi</a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            {/* <li><a onClick={() => changeLanguageHandler('en')} className="dropdown-item" href="#">En - English </a></li> */}
                                            <li><a onClick={() => changeLanguageHandler('vi')} className="dropdown-item" href="#">Vi - Vietnamese</a></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown avt-user-web">
                                        <Tooltip target=".custom-tooltip-user">
                                            <span>{userFirstName + ' ' + userMiddleName + ' ' + userLastName}</span>
                                        </Tooltip>
                                        <a className="custom-tooltip-user nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div className="d-none d-sm-inline" >
                                                <img className='img-thumbnail-header img-circle' width={30} height={30} src={userLogo} />
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-child-one dropdown-menu-end">
                                            <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                                            <li>
                                                <a className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a>
                                                <ul className="dropdown-menu submenu submenu-left dropdown-menu-end">
                                                    {userRoles.map((top_menu, i) => {

                                                        return (
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
                                    <div className='dropdown avt-user-mobile' >
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                                <img className='img-thumbnail-header img-circle' width={30} height={30} src={userLogo} />
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-child-one dropdown-menu-end">
                                            <li><a className="dropdown-item" href="/profile/user">{t('rbkey_PrflLBL', 'Hồ sơ')}</a></li>
                                            <li>
                                                <a className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">{t('rbkey_RlLBL', 'Vai trò')}</a>
                                                <ul className="dropdown-menu submenu submenu-left dropdown-menu-end">
                                                    {userRoles.map((top_menu, i) => {
                                                        return (
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

                                    <NavLink className="pl-2  border-left-top" style={{ borderLeft: '1px solid white' }}> <NotionBar /></NavLink>
                                    <NavLink className=" border-left-top " style={{ fontSize: '1.3rem', color: 'white' }} to={{ pathname: 'other/contact' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-headphones" viewBox="0 0 16 16">
                                            <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z" />
                                        </svg>
                                    </NavLink>

                                    {location.pathname != "/other/search" &&
                                        <>
                                            <span className="search-header-large p-input-icon-right pl-2 pt-1 border-left-top" style={{ borderLeft: '1px solid white' }}>
                                                <InputText style={{ minWidth: '220px' }}
                                                    value={sessionStorage.getItem('searchTerm')}
                                                    placeholder="Tìm kiếm tất cả khóa học"
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <i className="pi pi-search pr-1" />
                                            </span>
                                            <div className='search-device-small' onClick={() => clickIconSearch()}>
                                                <i className="pi pi-search pr-1" />
                                            </div>
                                        </>
                                    }

                                    {/* <NavLink onClick={clickSearchBtn} className="pl-2 pt-1 border-left-top" style={{ fontSize: '1.3rem', color: 'white' }} to={{ pathname: '/other/search' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </NavLink> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {location.pathname != "/other/search" &&
                        <span id='search-header-small' className="search-header-small-cl p-input-icon-right pt-1 border-left-top" style={{ width: '100%' }}>
                            <InputText style={{ width: '100%' }}
                                value={sessionStorage.getItem('searchTerm')}
                                placeholder="Tìm kiếm tất cả khóa học"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </span>
                    }
                </nav>

                <div id='content' >
                    <div className={(lstAudioBookStore && lstAudioBookStore.data) && 'show-player-adio'}>
                        <div className='container'>
                            <div className='menu2' >
                                <div className='submenu d-flex justify-content-end'>
                                    <ul className="navsub-nav m-0 p-2">
                                        {SubItems()}
                                    </ul>
                                </div>
                            </div>

                            <div id='contentHeight' className='content-wapper'>
                                <Routes>
                                    {newLayoutRouters.map(({ path, component: Component }, index) =>
                                        <Route path={path} key={index} element={<Component />} />
                                    )}
                                </Routes>
                                <Outlet />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-center p-2" style={{ background: '#fff', fontSize: '10px' }}><span id="footerSpan">BẢN QUYỀN THUỘC VỀ TRƯỜNG ĐÀO TẠO VÀ PHÁT TRIỂN NGUỒN NHÂN LỰC VIETINBANK</span></div>
            </div>

            {
                lstAudioBookStore?.data &&
                <PlayerAudio />
            }

        </>)
}
export default NewLayout;