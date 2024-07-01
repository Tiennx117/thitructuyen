import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import MyUploadForm from './MyUploadForm';
import ReactPlayer from 'react-player'
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useState, useRef } from 'react';
import { videoService } from "services/videoService";
import Search from "layouts/others/components/Search";
import DetailVideo from './detailVideo/detailVideo'
import MyVideoDetail from './detailVideo/MyVideoDetail'
import { RiMore2Fill } from 'react-icons/ri'
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";

const MyUploadContainer = () => {
    const { t } = useTranslation()
    const [video, setvideo] = useState([])
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false);
    const [openform, setopenform] = useState(false)
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
        SearchText: '',
        statusBy: ''
    });
    const [visibleRight, setVisibleRight] = useState(false)
    const [visibleRight1, setVisibleRight1] = useState(false)
    const [basicFirst, setBasicFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0)
    const [dataItem, setDataItem] = useState({})
    const [dataHeight, setdataHeight] = useState({});
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
    const filterUploadStatus = [
        {
            value: '',
            text: 'Tất cả'
        },
        {
            value: 'A',
            text: 'Tán thành'
        },
        {
            value: 'R',
            text: 'Từ chối'
        },
        {
            value: 'P',
            text: 'Đang chờ phê duyệt'
        },
        {
            value: 'U',
            text: 'Đang xử lý'
        },
        {
            value: 'F',
            text: 'Thất bại'
        }
    ]
    const onChangeFilter1 = (item) => {
        setfilterBy1({ ...filterBy1, statusBy: item.value });
    }

    useEffect(() => {
        // call api here
        loadApi(filterBy1);
    }, [filterBy1]);
    const onBasicPageChange = (event) => {
        if (event.first > 0) {
            let filterBy2 = { ...filterBy1, PageNumber: (event.first / 10) + 1 }
            setfilterBy1(filterBy2)
        }
        else {
            let filterBy2 = { ...filterBy1, PageNumber: 1 }
            setfilterBy1(filterBy2)
        }
        setBasicFirst(event.first);
    };
    const loadApi = async (value) => {
        //
        setLoading(true)
        let result = await videoService.getvideosuploadbylearner(value);
        setTotalRecords(result.data?.Recordcount)
        setvideo(result.data?.ChannelList[0]?.VideoDetailList)
        setLoading(false)
    }
    function closeDetail() {
        setVisibleRight(false);
        loadApi(filterBy1);
    }
    function closeDetail1() {
        setVisibleRight1(false);
        loadApi(filterBy1);
    }
    function closeDetail1() {
        setVisibleRight1(false);
        loadApi(filterBy1);
    }
    const onClickSortList = (sortBy) => {
        let filterBy2 = { ...filterBy1, SortBy: sortBy }
        setfilterBy1(filterBy2)
        loadApi(filterBy2);
    }
    const searchTitle = (value) => {
        let filterBy2 = { ...filterBy1, SearchText: value }
        setfilterBy1(filterBy2)
    }
    const onClickSearch = () => {
        loadApi(filterBy1)
    }
    const clickTitleEdit = async (item) => {
        let obj1 = {
            CorporateId: 1,
            VideoID: item.VideoId
        }
        let result = await videoService.getvideosinfobylearner(obj1);
        setVisibleRight(true)
        setDataItem(item)
        setdataHeight(result.data.Highlights)

    }
    const clickTitle = async (item) => {
        setVisibleRight1(true)
        setDataItem(item)

    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            loadApi(filterBy1)
        }
    }
    const changEditVideo = () => {
        setVisibleRight(false);
        loadApi(filterBy1);
    }
    const onChangeFilter = (item) => {
        setfilterBy1({ ...filterBy1, SortBy: item.value });
    }

    const onDelete = (itemID) => {
        var obj = {
            VideoId: itemID,
            CorporateId: 1,
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc muốn xóa video này không? ',
            accept: () => deleteVideo(obj)
        });
    }
    const deleteVideo = async (id) => {
        await videoService.deletelearnervideo(id);
        loadApi(filterBy1);
    }
    const defaultImg = window.location.origin + '/images/Screenshot_1a.png';;
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };

    const rendervideo = () => {
        return (video.map((dataItem, index) => {
            return (
                <>
                    <div key={index} className="row g-0 mb-4" style={{ border: '1px solid #ccc', boxShadow: '5px 5px 5px rgb(0 0 0 / 35%)' }}>
                        <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px' }}>
                            <ReactPlayer
                                url={appSetting.ADMIN_URL + dataItem?.URLAttachment}
                                className="image-play"
                                light={<img src={dataItem.VideoThumbnailUrl != "" ? dataItem?.VideoThumbnailUrl.substring(2) : defaultImg} onError={handleImageError} alt='Thumbnail' style={{ width: '100%', height: '100%' }} />}

                                width='100%'
                                height='100%'
                                pip={true}
                                playing={false}
                                controls={true}
                                loop={true}
                                volume={true}
                                muted={false}>
                            </ReactPlayer>
                        </div>
                        <div className="col-md-8 ">
                            <div className={classNames("d-flex flex-column justify-content-between", styles.uploadContentVideo)} >
                                <div>
                                    <h5 className={classNames(" d-flex justify-content-between", styles.uploadTitleVideo)}>
                                        {dataItem.VideoStatus == 'P' ?
                                            <span style={{ cursor: "pointer" }} onClick={() => clickTitleEdit(dataItem)} >{dataItem?.VideoTitle}</span> :
                                            <span style={{ cursor: "pointer" }} onClick={() => clickTitle(dataItem)} >{dataItem?.VideoTitle}</span>
                                        }

                                        <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                            <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><a onClick={() => onDelete(dataItem.VideoId)} className="dropdown-item cursor-pointer">Xóa</a></li>
                                            </ul>
                                        </div>
                                    </h5>
                                    <div className="videoDesc" dangerouslySetInnerHTML={{ __html: dataItem.VideoDescription }}></div>
                                </div>

                                <div>
                                    {dataItem.VideoStatus == 'I' &&
                                        <span className={styles.boxStateVideo}>
                                            <span style={{ color: "white" }} className="ml-3 mr-3">{dataItem?.VideoStatusName}</span>
                                        </span>
                                    }
                                    {dataItem.VideoStatus == 'R' &&
                                        <span className={styles.boxStateVideo1}>
                                            <span style={{ color: "white" }} className="ml-3 mr-3">{dataItem?.VideoStatusName}</span>
                                        </span>
                                    }
                                    {dataItem.VideoStatus == 'P' &&
                                        <span className={styles.boxStateVideo2}>
                                            <span style={{ color: "white" }} className="ml-3 mr-3">{dataItem?.VideoStatusName}</span>
                                        </span>
                                    }
                                    {dataItem.VideoStatus == 'A' &&
                                        <span className={styles.boxStateVideo3}>
                                            <span style={{ color: "white" }} className="ml-3 mr-3">{dataItem?.VideoStatusName}</span>
                                        </span>
                                    }

                                </div>
                                <div>
                                    <span className="d-flex justify-content-between videoViewCount" >
                                        <span>{dataItem?.VideoChannelTitle} • <span>{dataItem?.ViewCount} lượt xem</span></span>
                                        <span>Được ra mắt vào ngày: <span>{dataItem?.UploadVideoDate}</span></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
        }))

    }
    return (
        <>
            <Card className={styles.uploadContainer}>
                <div className="d-flex flex-row justify-content-between">
                    <span className=".p-card .p-card-title titleHeadfs21">TẢI LÊN CỦA TÔI</span>
                    <div className="d-flex flex-row justify-content-end">
                        <div >
                            <div className={classNames("dropdown")}>
                                <DropdownFilter items={filterUploadStatus} onChange={onChangeFilter1} />
                            </div>
                        </div>

                        <div>
                            <div className={classNames("dropdown", styles.sortdropdown)}>
                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                            </div>
                        </div>

                        <div className="input-group" style={{ width: '300px' }}>
                            <input style={{ height: 'auto' }} onKeyDown={(e) => keyDown(e)} onChange={event => searchTitle(event.target.value)} type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2" onClick={() => onClickSearch()}><i className="pi pi-search"></i></span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* <div className={classNames("flex-row d-flex justify-content-end", styles.titleHead)}>
                    <div className="d-flex flex-row">

                        <div className={classNames("dropdown", styles.sortdropdown)}>
                            <a style={{ cursor: 'pointer' }} className={classNames("dropdown-toggle", styles.recent)} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {filterBy1.SortBy === 'RECENT' && 'Gần đây'}
                                {filterBy1.SortBy === 'NAMEASC' && 'A đến Z'}
                                {filterBy1.SortBy === 'NAMEDESC' && 'Z đến A'}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a onClick={() => onClickSortList('RECENT')} className="dropdown-item" >Gần đây</a></li>
                                <li><a onClick={() => onClickSortList('NAMEASC')} className="dropdown-item" >A đến Z</a></li>
                                <li><a onClick={() => onClickSortList('NAMEDESC')} className="dropdown-item" >Z đến A</a></li>
                            </ul>
                        </div>
                        &nbsp;
                        <div className="input-group" style={{ minWidth: '400px' }}>
                            <input onKeyDown={(e) => keyDown(e)} onChange={event => searchTitle(event.target.value)} type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2" onClick={() => onClickSearch()}><i className="pi pi-search"></i></span>
                            </div>
                        </div>

                    </div>
                </div> */}
                <div className="mt-3">
                    <div className="card mb-3" style={{}}>
                        <LoadingPanel loading={loading}> {rendervideo()}</LoadingPanel>
                    </div>
                </div>
                <div>
                    <Paginator first={basicFirst}
                        rows={filterBy1.RecordsPerPage}
                        totalRecords={totalRecords}
                        onPageChange={onBasicPageChange}></Paginator>
                </div>
                {/* <div className="d-flex justify-content-end" style={{ zIndex: "9", position: "fixed", bottom: "15px", right: "34px", textAlign: "center" }}>
                    <Button onClick={() => setopenform(true)} icon="pi pi-plus" title='Thêm mới video' className="p-button-rounded " />
                </div> */}
            </Card>
            <div style={{ height: "" }}>
                <MyUploadForm openform={openform} onChange={data => { setopenform(data); loadApi(filterBy1) }} />
            </div>
            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <MyVideoDetail dataObj={{ dataItem, dataHeight }} onChange={() => changEditVideo()} />
                    </>
                }
            </Sidebar>


            <Sidebar className='sidebar-header-none' visible={visibleRight1} onHide={() => closeDetail1()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail1()} />
                        <DetailVideo dataObj={dataItem} />
                    </>
                }
            </Sidebar>

        </>
    )
}
export default MyUploadContainer;