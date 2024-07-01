import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { loadable } from 'shared/utils';
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import { NavLink } from 'react-router-dom';
import { videoService } from "services/videoService";
import { useEffect, useState } from "react";
import { Image } from 'components/Image';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { Button } from 'primereact/button';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import ReactPlayer from 'react-player';
import { Sidebar } from "primereact/sidebar";
import DetailVideo from './detailVideo/detailVideo'
import LstChannel from "./LstChannel";
import { setListChannel } from 'store/listchannel/listChannelSlice';
import { useSelector, useDispatch } from 'react-redux';
import ListVideoChannel from "./ListVideoChannel";
import './style/videoLibrary.module.scss';

const VideoLibraryContainer = () => {
    const dispatch = useDispatch();
    const [dataItem, setDataItem] = useState({})
    const [lstMenu, setlstMenu] = useState([]);
    const [visibleRight1, setVisibleRight1] = useState(false)
    const [lstItemChanel, setlstItemChanel] = useState([]);
    const [showRight, setShowRight] = useState(false);
    const [huyDangKy, sethuyDangKy] = useState(false);
    const [channelnamelist, setchannelnamelist] = useState([]);
    const [idItem, setidItem] = useState('');
    const [changTab, setChangTab] = useState(true);
    const [search, setsearch] = useState({
        "PageNumber": 1,
        "RecordsPerPage": 10,
        SortBy: "RECENT",
        CorporateId: 1,
    });
    const param1 = {
        SortBy: "RECENT",
    }
    const [renderComponent, setRenderComponent] = useState(false)
    useEffect(() => {
        // call api here
        loadApi(search);
    }, [search]);
    const loadApi = async (val) => {
        let result = await videoService.videolibrarymenulist();
        let result1 = await videoService.getchannelnamelist(param1);
        let result4 = await videoService.getlabel(val);
        setchannelnamelist(result1.data.channelLst);
        setlstMenu(result.data.VideoMenuListItem);
        setRenderComponent(true)
        dispatch(setListChannel(result1.data.channelLst))
    }

    const loadDetailChannel = async (val) => {
        let result = await videoService.videolibrarysubscribedvideolist(val);
        setlstItemChanel(result.data)
    }

    const clickTilteItem = async (item) => {
        sethuyDangKy(false);
        setShowRight(true);
        setidItem(item);
        setChangTab(true);
        // let obj = {
        //     ChannelId: item,
        //     CorporateId: 1,
        //     PageNumber: 1,
        //     RecordsPerPage: 10,
        //     SortBy: "RECENT"
        // }
        // let result = await videoService.videolibrarysubscribedvideolist(obj);
        // setlstItemChanel(result.data)

    }
    const clickItem = () => {
        setShowRight(false)
    }
    const filterItems = [
        {
            value: 'RECENT',
            text: 'Gần đây'
        },
        {
            value: 'NAMEASC',
            text: 'A đến Z'
        },
        {
            value: 'NAMEDESC',
            text: 'Z đến A'
        }
    ]

    // const filterCourse = async (value) => {
    //     setLoading(true);
    //     let result2 = await videoService.getfavoritevideos(value);
    //     setlstfavoritevideos(result2.data.VideoDetailList);
    //     setLoading(false);
    // }
    const onChangeFilter = (item) => {
        setsearch({ ...search, SortBy: item.value, ChannelId: idItem });
    }

    const btnHuyDangKy = (itemID) => {
        var obj = {
            ChannelId: itemID,
            CorporateId: 1,
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc muốn hủy đăng ký kênh này không? ',
            accept: () => huySub(obj)
        });


    }

    const huySub = async (id) => {
        sethuyDangKy(true);
        await videoService.subscribeunsubcribechannel(id);


        loadApi(search);


    }
    const btnDangKy = async (id) => {
        sethuyDangKy(false);
        let obj = {
            ChannelId: id
        }
        await videoService.subscribeunsubcribechannel(obj);
        loadApi(search);
    }
    const clickTitle = async (item) => {
        setVisibleRight1(true)
        setDataItem(item)

    }

    function closeDetail1() {
        setVisibleRight1(false);
        loadApi(search);
    }


    // useEffect(() => {
    //     // call api here
    //     loadDetailChannel(search);
    // }, [search]);

    const videoLibraryRouters = [
        {
            path: '/*',
            // component: './HomeContainer',
            component: loadable(() => import('./HomeContainer'))
        },
        {
            path: '/availableChannel',
            // component: './AvailableChannelContainer',
            component: loadable(() => import('./AvailableChannelContainer'))
        },
        {
            path: '/myUploads',
            component: loadable(() => import('./MyUploadContainer'))
        },
        {
            path: '/history',
            component: loadable(() => import('./HistoryContainer'))
        },
        {
            path: '/favourite',
            component: loadable(() => import('./FavoriteContainer'))
        },
        {
            path: '/videochannel',
            component: loadable(() => import('./VideoChanelDetail'))
        },
        {
            path: '/videoplaylist',
            component: loadable(() => import('./VideoplayList'))
        },
    ]
    return (
        <>
            <div className="my-learning-container row">
                <div className="col-3 scroll-wrapper" style={{ backgroundColor: "#d3d2d2" }}>
                    <nav className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2 " aria-label="Secondary navigation" style={{ backgroundColor: "#f8f9fa" }}>
                        {lstMenu && lstMenu.map((item, index) => {
                            return (
                                item.MenuRedirection !== "MyUploads" && //|| item.name !== "Tải lên của tôi"
                                <NavLink onClick={() => clickItem()} key={index} style={({ isActive }) => isActive ? { color: 'white', backgroundColor: "#1aa1dc", lineHeight: "35px", paddingLeft: "20px", borderRadius: "5px" } : { color: '#6c757d', lineHeight: "35px", paddingLeft: "20px", borderRadius: "5px" }}
                                    to={'/learner/video-library/' + item.Url} >
                                    <span style={{ textTransform: "uppercase", fontWeight: "500" }}>{item.name}</span>
                                </NavLink>
                            )
                        })}

                        <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", marginTop: "10px", marginLeft: "20px", }}>Đăng ký của tôi</div>
                        <LstChannel channelnamelist={channelnamelist} clickTilteItem={(e) => clickTilteItem(e)} > </LstChannel>
                    </nav>
                </div>

                <div className="col-9 scroll-wrapper d-flex flex-column" style={{ backgroundColor: "#d3d2d2" }}>
                    {renderComponent == true ?
                        <>
                            {showRight == false ?
                                <main className="container-fluid mt-2">
                                    <Routes>
                                        {
                                            videoLibraryRouters.map(({ path, component: Component }, index) => {
                                                return (<Route path={path} key={index} element={<Component />} />)
                                            })
                                        }
                                    </Routes>
                                    <Outlet />
                                </main>
                                :
                                <Card>
                                    <ListVideoChannel idChannel={idItem} subcribeStatus={true} onchangTab={() => setChangTab(false)} changTab={changTab}></ListVideoChannel>
                                </Card>
                            }
                        </> :
                        <></>
                    }
                </div>
            </div>

            <Sidebar className='sidebar-header-none' visible={visibleRight1} onHide={() => closeDetail1()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail1()} />
                        <DetailVideo version='v1' dataObj={dataItem} />
                    </>
                }
            </Sidebar>

        </>
    )
}
export default VideoLibraryContainer;