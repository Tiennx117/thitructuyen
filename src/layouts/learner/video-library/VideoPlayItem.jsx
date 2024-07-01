import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from 'primereact/sidebar';
import { Image } from 'components/Image';
import { videoService } from "services/videoService";
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import { Button } from "primereact/button";
import DetailVideoPLY from "./detailVideo/DetailVideoPLY";
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import FormAddVideoPLYLst from "./FormAddVideoPLYLst";
const VideoPlayItem = (props) => {
    const userDefault = getCurrentUserDefault();
    const [Keysearch, setKeysearch] = useState("");
    const { closeVisibleIT, iDPlay, dataPlyIt, onBlack, btnrepeat, onRepeatItem, indexDT } = props;
    const defaultImg = window.location.origin + '/images/screenshot_1a.png';
    const onClose = () => {
        closeVisibleIT();
    }
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };

    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "NAMEASC",
        orderBy: 'DT_MDFCTN_DT'
    });
    const [filterBy2, setfilterBy2] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "NAMEASC",
        orderBy: 'DT_MDFCTN_DT'
    });
    const [videolist, setvideolist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecordsLst, setTotalRecordsLst] = useState(0);
    const [visibleMore, setVisibleMore] = useState(false);
    const [visibleMorePLS, setvisibleMorePLS] = useState(false);
    const [videoinPlyLst, setvideoinPlyLst] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataItem, setdataItem] = useState([])
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [ChangeText, onChangeText] = useState("");
    const [visiblefull, setvisiblefull] = useState(false);
    const [editCheck, seteditCheck] = useState(false);
    const [valueTitle, setvalueTitle] = useState("");

    useEffect(() => {
        // call api here
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);
    }, [Keysearch, iDPlay]);
    const loadApi = async (filterBy1) => {
        debugger;
        setLoading(true);
        const params = {
            UserID: userDefault.UserId,
            PageNumber: 1,
            RecordsPerPage: filterBy1.RecordsPerPage,
            SortBy: filterBy1.SortBy,
            SeartchText: '',
            VideoplayID: iDPlay,
            orderBy: filterBy1.orderBy
        };
        let result1 = await videoService.getvideoinplaylist({ ...params });
        let result = await videoService.getallvideoplay({ ...params, SeartchText: Keysearch });
        setvideoinPlyLst(result1.data?.VideoDetailList)
        setTotalRecordsLst(result.data?.TotalRecords);

        setvideolist(result.data?.VideoDetailList);
        if (result1.data.TotalRecords > result1.data.VideoDetailList.length && result1.data.VideoDetailList.length == 10) {
            setvisibleMorePLS(true);
        }
        if (result.data.TotalRecords > result.data.RecordsPerPage && result.data.VideoDetailList.length == 10) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
            setvisibleMorePLS(false);
        }
        setLoading(false);
    };

    const onShowMore = async () => {
        let videoTemp;
        filterBy1.PageNumber++;
        setfilterBy1(filterBy1);
        const params = {
            UserID: userDefault.UserId,
            PageNumber: filterBy1.PageNumber,
            RecordsPerPage: filterBy1.RecordsPerPage,
            SortBy: filterBy1.SortBy,
            SeartchText: Keysearch,
            VideoplayID: iDPlay
        };
        let result = await videoService.getallvideoplay(params);
        if (result.data.VideoDetailList.length > 0) {
            videoTemp = [...videolist, ...result.data.VideoDetailList];
            setvideolist(videoTemp);
        }
        if (
            result.data.TotalRecords <= result.data.RecordsPerPage ||
            result.data.PageNumber * result.data.RecordsPerPage >=
            result.data.TotalRecords
        ) {
            setVisibleMore(false);
        }
    };
    const onShowMorePLS = async () => {
        let videoTemp;
        filterBy2.PageNumber++;
        setfilterBy2(filterBy2);
        const params = {
            UserID: userDefault.UserId,
            PageNumber: filterBy2.PageNumber,
            RecordsPerPage: filterBy2.RecordsPerPage,
            SortBy: filterBy2.SortBy,
            SeartchText: Keysearch,
            VideoplayID: iDPlay
        };
        let result = await videoService.getvideoinplaylist(params);
        if (result.data.VideoDetailList.length > 0) {
            videoTemp = [...videoinPlyLst, ...result.data.VideoDetailList];
            setvideoinPlyLst(videoTemp);
        }
        if (
            result.data.TotalRecords <= result.data.RecordsPerPage ||
            result.data.PageNumber * result.data.RecordsPerPage >=
            result.data.TotalRecords
        ) {
            setvisibleMorePLS(false);
        }
    };



    const onDeleteItem = async (dataItem) => {
        let param = {
            VideoID: dataItem.VideoId,
            VideoplayID: iDPlay
        }
        await videoService.deletevideoplaylist(param);
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);
    }
    const onAddItem = async (dataItem) => {
        let param = {
            VideoID: dataItem.VideoId,
            VideoplayID: iDPlay
        }
        await videoService.addvideoplaylist(param);
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);
    }

    const clickTitle = (dataItem) => {
        setdataItem(dataItem);
        setVisibleRight(true);
    }
    function closeDetail() {
        setVisibleRight(false);
        loadApi(filterBy1);
    }

    const startVD = () => {
        setdataItem(videoinPlyLst[0]);
        setVisibleRight(true);
    }

    const changeUp = (index) => {
        const newArray = [...videoinPlyLst];
        const clickedItem = newArray[index];
        newArray.splice(index, 1); // Xóa phần tử click khỏi mảng
        newArray.splice(index - 1, 0, clickedItem); // Chèn phần tử click vào vị trí trước nó
        setvideoinPlyLst(newArray);
    }
    const changeDown = (index) => {
        const newArray = [...videoinPlyLst];
        const clickedItem = newArray[index];
        newArray.splice(index, 1); // Xóa phần tử click khỏi mảng
        newArray.splice(index + 1, 0, clickedItem); // Chèn phần tử click vào vị trí trước nó
        setvideoinPlyLst(newArray);
    }
    const onRepeat = () => {
        onRepeatItem(indexDT);
    }
    function onKeySearchChange() {
        let newText = ChangeText;
        setKeysearch(newText);
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim()
            setKeysearch(newText);
        }
    }

    const onDelete = (id) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn xóa danh sách phát?',
            accept: () => deleteItem(id)
        });
    }
    const deleteItem = async (id) => {
        let params = {
            VideoplayID: id
        }
        await videoService.deletevideoplay(params);
        let _filterBy1 = { ...filterBy1, PageNumber: 1 }
        loadApi(_filterBy1);
        onClose();
    }
    const onEditItem = (id, title) => {
        setiDPlaylist(id);
        seteditCheck(true);
        setvalueTitle(title);
        setvisiblefull(true);
    }

    const rendervideoplaylist = () => {

        return (
            <div style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2) ', borderRadius: 10, paddingBottom: 10 }}>
                <div style={{ marginLeft: 20, fontSize: 20, fontWeight: '700' }}>Danh sách video phát</div>

                {videoinPlyLst?.length > 0
                    ?
                    videoinPlyLst.map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{ margin: 20, display: 'flex', border: '1px solid #3333' }}>
                                    <img
                                        src={
                                            item.VideoThumbnailUrl != ""
                                                ? item?.VideoThumbnailUrl.substring(2)
                                                : defaultImg
                                        }
                                        onError={handleImageError}
                                        alt="Thumbnail"
                                        style={{ width: "60px", height: "60px" }}
                                    />
                                    <div style={{ marginLeft: 10 }}>
                                        <div onClick={() => clickTitle(item)} style={{ width: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                                            <span title={item.VideoTitle} style={{ fontSize: 16, fontWeight: '600' }}>{item.VideoTitle}</span>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: 70 }}>{item.VideoDuration}</div>
                                            <div style={{ width: 120 }}>| {item.ViewCount} lượt xem</div>
                                            <div style={{ width: 120 }}>| {item.TimeDuration}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        {index > 0 ?
                                            <i style={{
                                                position: "relative",
                                                top: "10px",
                                                right: 0,
                                                fontSize: 20,
                                                cursor: 'pointer'
                                            }} className="fa-solid fa-circle-up" onClick={() => changeUp(index)}>
                                            </i>
                                            :
                                            <i style={{
                                                position: "relative",
                                                top: "10px",
                                                right: 0,
                                                fontSize: 20,
                                                cursor: 'pointer'
                                            }} className="fa-solid fa-circle-down" onClick={() => changeDown(index)}>
                                            </i>
                                        }
                                        {/* {item.IsFavourite == false ? (
                                            <i
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "10px",
                                                    right: "-10px",
                                                    fontSize: 20,
                                                }}
                                                className="fa-regular fa-heart"
                                            ></i>
                                        ) : (
                                            <i
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "10px",
                                                    right: "-10px",
                                                    fontSize: 20,
                                                }}
                                                className="fa-solid fa-heart"
                                            ></i>
                                        )} */}
                                        <i style={{
                                            fontSize: 20, cursor: 'pointer', position: "relative",
                                            top: "10px", right: -20
                                        }}
                                            onClick={() => onDeleteItem(item)}
                                            className="fa-solid fa-minus"></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
                            <Image style={{ width: '30%' }} src="/images/video-default.png"></Image>
                            <span style={{ fontSize: 16, marginTop: 20 }}>Không có video nào trong danh sách phát</span>
                        </div>
                    </div>
                }

                {visibleMorePLS && (
                    <div className="loadMoreBtn" style={{ marginRight: 10, marginBottom: 10 }}>
                        <a style={{ cursor: 'pointer' }} onClick={() => onShowMorePLS()}>Hiển thị thêm</a>
                    </div>
                )}
            </div>

        )
    }

    const renderAllVideo = () => {
        return (
            <div style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2) ', borderRadius: 10, marginTop: 20, paddingBottom: 10 }}>
                {/* <div>
                    <span style={{ marginLeft: 20, fontSize: 20, fontWeight: '700' }}>Video gợi ý</span>
                </div> */}
                <div style={{ width: '100%' }}>
                    <TabView style={{
                        width: '40%',
                        backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '6px'
                    }} activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                        <TabPanel header="Video gợi ý" >
                            <div>Không có video khả dụng</div>
                        </TabPanel>
                        <TabPanel header="Tất cả video" >
                            <div className="p-inputgroup" style={{ width: '100%' }}>
                                <InputText onKeyDown={(e) => keyDown(e)}
                                    onChange={(e) => onChangeText(e.target.value)}
                                    placeholder="Nhập từ khoá tìm kiếm" value={ChangeText} />
                                <Button onClick={() => {
                                    onKeySearchChange();
                                }} icon="pi pi-search" />

                            </div>
                            {videolist?.map((item, index) => {
                                return (
                                    <div key={index} style={{ margin: 20, display: 'flex', border: '1px solid #3333' }}>
                                        <img
                                            src={
                                                item.VideoThumbnailUrl != ""
                                                    ? item?.VideoThumbnailUrl.substring(2)
                                                    : defaultImg
                                            }
                                            onError={handleImageError}
                                            alt="Thumbnail"
                                            style={{ width: "60px", height: "60px" }}
                                        />
                                        <div style={{ marginLeft: 10 }}>
                                            <div onClick={() => clickTitle(item)} style={{ width: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                                                <span title={item.VideoTitle} style={{ fontSize: 16, fontWeight: '600' }}>{item.VideoTitle}</span>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ width: 70 }}>{item.VideoDuration}</div>
                                                <div style={{ width: 120 }}>| {item.ViewCount} lượt xem</div>
                                                <div style={{ width: 120 }}>| {item.TimeDuration}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            {/* {item.IsFavourite == false ? (
                                            <i
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "10px",
                                                    right: "0px",
                                                    fontSize: 20,
                                                }}
                                                className="fa-regular fa-heart"
                                            ></i>
                                        ) : (
                                            <i
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "10px",
                                                    right: "0px",
                                                    fontSize: 20
                                                }}
                                                className="fa-solid fa-heart"
                                            ></i>
                                        )} */}
                                            <i style={{
                                                position: "relative",
                                                top: "10px",
                                                right: -10,
                                                fontSize: 20,
                                                cursor: 'pointer'
                                            }} className="fa-solid fa-circle-plus"
                                                onClick={() => onAddItem(item)}></i>

                                        </div>
                                    </div>
                                )
                            })}
                            {visibleMore && (
                                <div className="loadMoreBtn" style={{ marginRight: 10, marginBottom: 10 }}>
                                    <a style={{ cursor: 'pointer' }} onClick={() => onShowMore()}>Hiển thị thêm</a>
                                </div>
                            )}
                        </TabPanel>

                    </TabView>
                </div>
            </div>
        )
    }

    const rendervideolist = () => {
        return (
            <div style={{
                width: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2) ',
                borderRadius: '10px', marginRight: '20px', padding: 10, marginLeft: '0.5rem'
            }}>
                <Image style={{ width: '90%' }} src="/images/VideoImage.png"></Image>
                <div style={{ marginTop: '20px' }}>
                    <span style={{ fontWeight: '700' }}>{dataPlyIt.Tilte} ({dataPlyIt.TotalRecords})</span>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 30 }}>
                    <i style={{ fontSize: 24, cursor: 'pointer' }} onClick={() => onEditItem(dataPlyIt.VideoplayID, dataPlyIt.Tilte)} className="fa-solid fa-pen-to-square"></i>
                    <i style={{ fontSize: 24, cursor: 'pointer', marginLeft: 20 }} onClick={() => onDelete(dataPlyIt.VideoplayID)} className="fa-regular fa-trash-can"></i>
                    {/* <i style={{ fontSize: 24, cursor: 'pointer', color: btnrepeat != '' ? '#1AA1DC' : '#333' }} onClick={() => onRepeat()} className="fa-solid fa-rotate-right"></i> */}
                    {dataPlyIt?.VideoDetailList?.length > 0 &&
                        <Button onClick={() => startVD()} style={{ width: '110px', height: '35px', cursor: 'pointer', borderRadius: 20, marginLeft: 50 }}>
                            <i style={{ fontSize: '24px', marginRight: 10 }} className="fa-solid fa-caret-right"></i>
                            <span style={{ fontSize: '16px' }}>Phát</span>
                        </Button>
                    }

                </div>
            </div>
        );
    };



    return (
        <div>
            <div style={{
                display: 'flex', justifyContent: 'flex-end', fontSize: 16,
                color: '#5d9cec', cursor: 'pointer', fontWeight: '600'
            }}
                onClick={() => onClose()}>Quay lại</div>
            <div className="row">
                <div className="col-4 ">
                    <LoadingPanel loading={loading}> {rendervideolist()}</LoadingPanel>
                </div>
                <div className="col-8 ">
                    <div>
                        <LoadingPanel loading={loading}> {rendervideoplaylist()}</LoadingPanel>
                    </div>
                    <div >
                        <LoadingPanel loading={loading}> {renderAllVideo()}</LoadingPanel>
                    </div>

                </div>
                {/* <Sidebar visible={visiblefull} position="right" onHide={() => onClose()} style={{ width: '30%' }}> */}


                {/* </Sidebar> */}

                <Sidebar
                    className="sidebar-header-none"
                    visible={visibleRight}
                    onHide={() => {
                        closeDetail();
                    }}
                    position="right"
                    style={{ width: "80%" }}
                >
                    {
                        <>
                            <Button
                                style={{ position: "absolute", right: "0" }}
                                icon="pi pi-times"
                                className="p-button-rounded p-button-secondary p-button-text"
                                aria-label="Cancel"
                                onClick={() => {
                                    closeDetail();
                                }}
                            />
                            <DetailVideoPLY iDPlay={iDPlay} dataObj={dataItem} version="v1" btnrepeat={btnrepeat} />
                        </>
                    }
                </Sidebar>
                <FormAddVideoPLYLst
                    valueTitle={valueTitle}
                    subAddList={(data) => subAddList(data)}
                    visiblefull={visiblefull}
                    onclickshow={() => {
                        setvisiblefull(false);
                        seteditCheck(false);
                    }}
                    editCheck={editCheck} >
                </FormAddVideoPLYLst>
            </div>
        </div>
    )
}

export default VideoPlayItem;