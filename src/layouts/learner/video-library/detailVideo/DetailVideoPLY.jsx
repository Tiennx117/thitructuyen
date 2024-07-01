import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import ReactPlayer from 'react-player'
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'components/Image';
import PropTypes from 'prop-types';
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";

const DetailVideoPLY = (props) => {
    const { iDPlay, btnrepeat } = props;
    const [visibleMorePLS, setvisibleMorePLS] = useState(false);
    const userDefault = getCurrentUserDefault();
    const [videoinPlyLst, setvideoinPlyLst] = useState([]);
    const [visibleMore, setVisibleMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalRecordsLst, setTotalRecordsLst] = useState(0);
    const [videolist, setvideolist] = useState([]);
    const [Keysearch, setKeysearch] = useState("");
    const [courseLauchID, setcourseLauchID] = useState(props.dataObj.VideoId);
    const [dataDetai] = useState(props.dataObj)
    const [dataItem, setDataItem] = useState({})
    const [dataItemV1, setDataItemV1] = useState({});
    const [IsFavourite, setIsFavourite] = useState(false);
    const [lstvideoplay, setlstvideoplay] = useState([]);
    const initialArray = ['41908', '42058', '42084', '42048', '41814'];
    const [dataArray, setDataArray] = useState(initialArray);
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
    });
    const defaultImg = window.location.origin + '/images/screenshot_1a.png';
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };
    const loadApi = async () => {
        setLoading(true);
        var obj = {
            CorporateID: 1,
            CorporateId: 1,
            IsViewCountDisable: true,
            PageNumber: 1,
            RecordsPerPage: 10,
            VideoChannelId: "null",
            videoId: courseLauchID
        }
        let result = await videoService.getvideosuploadbylearner(obj);
        const params = {
            UserID: userDefault.UserId,
            PageNumber: 1,
            RecordsPerPage: filterBy1.RecordsPerPage,
            SortBy: filterBy1.SortBy,
            SeartchText: Keysearch,
            VideoplayID: iDPlay,
            orderBy: filterBy1.orderBy
        };
        let result1 = await videoService.getvideoinplaylist({ ...params });
        let result2 = await videoService.getallvideoplay(params);

        let arr = []
        for (let i = 0; i < result1.data?.VideoDetailList.length; i++) {
            arr.push(result1.data?.VideoDetailList[i].VideoId)
        }
        setlstvideoplay(arr)
        setvideoinPlyLst(result1.data?.VideoDetailList)
        setTotalRecordsLst(result2.data?.TotalRecords);

        setvideolist(result2.data?.VideoDetailList);
        if (result2.data.TotalRecords > result2.data.VideoDetailList.length && result2.data.VideoDetailList.length == 10) {
            setvisibleMorePLS(true);
        }
        if (result2.data.TotalRecords > result2.data.RecordsPerPage && result2.data.VideoDetailList.length == 10) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
            setvisibleMorePLS(false);
        }

        setDataItem(result.data?.ChannelList[0]?.VideoDetailList[0]);
        getDetail();
        setLoading(false);

    }
    const loadApi1 = async () => {
        var obj = {
            CorporateID: 1,
            CorporateId: 1,
            IsViewCountDisable: true,
            PageNumber: 1,
            RecordsPerPage: 10,
            VideoChannelId: "null",
            videoId: courseLauchID
        }
        let result = await videoService.getvideosuploadbylearner(obj);
        setDataItem(result.data?.ChannelList[0]?.VideoDetailList[0]);
    }
    const getDetail = async () => {
        //version v1
        const params = {
            "PageNumber": 1,
            "RecordsPerPage": 10,
            "videoId": courseLauchID,
            "VideoChannelId": props.dataObj.VideoChannelId ? props.dataObj.VideoChannelId : "null",
        }
        let resultV1 = await videoService.getvideoplaydetails(params);
        setDataItemV1(resultV1.data);
        if (resultV1.data.IsFavourite == true) {
            setIsFavourite(true);
        }
    }
    useEffect(() => {
        loadApi();
    }, [courseLauchID]);
    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    const removeFavoriteVideo = async () => {
        const params = {
            "PageNumber": 1,
            "RecordsPerPage": 10,
            "videoId": props.dataObj.VideoId,
            "VideoChannelId": props.dataObj.VideoChannelId ? props.dataObj.VideoChannelId : "null",
            "Kvtoken": "", //token của bên thứ 3
            "VideoId": props.dataObj.VideoId,
            "IsFavourite": false
        }
        await videoService.addremovefavouritevideos(params);
        loadApi1();
        setIsFavourite(false);
    }
    const addFavoriteVideo = async () => {
        const params = {
            "PageNumber": 1,
            "RecordsPerPage": 10,
            "videoId": props.dataObj.VideoId,
            "VideoChannelId": props.dataObj.VideoChannelId ? props.dataObj.VideoChannelId : "null",
            "Kvtoken": "", //token của bên thứ 3
            "VideoId": props.dataObj.VideoId,
            "IsFavourite": true
        }
        await videoService.addremovefavouritevideos(params);
        loadApi1();
        setIsFavourite(true);
    }
    const clickTitle = (item) => {
        setcourseLauchID(item.VideoId)
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
                                <div style={{
                                    margin: 20, display: 'flex', border: '1px solid #3333',
                                    backgroundColor: item.VideoId == courseLauchID ? '#3333' : 'white'
                                }}>
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
                                        <div onClick={() => clickTitle(item)} style={{ width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                                            <span title={item.VideoTitle} style={{ fontSize: 16, fontWeight: '600' }}>{item.VideoTitle}</span>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: 70, fontSize: 13 }}>{item.VideoDuration}</div>
                                            <div style={{ width: 100, fontSize: 13 }}>| {item.ViewCount} lượt xem</div>
                                            <div style={{ width: 100, fontSize: 13 }}>| {item.TimeDuration}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', marginLeft: 10 }}>
                                        {index > 0 ?
                                            <i title="Chuyển icon lên trên" style={{
                                                position: "relative",
                                                top: "10px",
                                                right: 0,
                                                fontSize: 20,
                                                cursor: 'pointer'
                                            }} className="fa-solid fa-circle-up" onClick={() => changeUp(index)}>
                                            </i>
                                            :
                                            <i title="Chuyển icon xuống dưới" style={{
                                                position: "relative",
                                                top: "10px",
                                                right: 0,
                                                fontSize: 20,
                                                cursor: 'pointer'
                                            }} className="fa-solid fa-circle-down" onClick={() => changeDown(index)}>
                                            </i>
                                        }
                                        <i title="Xóa video khỏi danh sách phát" style={{
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
                <div>
                    <span style={{ marginLeft: 20, fontSize: 20, fontWeight: '700' }}>Video gợi ý</span>
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
                                <i title="Thêm video vào danh sách phát" style={{
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
            </div>
        )
    }
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
            orderBy: filterBy1.orderBy
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
    function getNextElement(arr, currentElement) {
        let newArr = [...arr]
        const currentIndex = arr.indexOf(currentElement);

        if (currentIndex === -1) {
            return null;
        }

        const nextIndex = (currentIndex + 1) % arr.length;
        const nextElement = arr[nextIndex];
        return nextElement !== undefined ? nextElement : courseLauchID;
        // return nextElement;
    }
    const handleVideoEnded = () => {
        const arr = getNextElement(lstvideoplay, courseLauchID);
        setcourseLauchID(arr);
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

    return (
        <div className="row">
            <div className="col-7">
                {props.version == 'v1' ? //Xem ở tab History, Favorite
                    <Card>
                        <div className="" style={{ width: '100%', height: '70vh', paddingLeft: '0px', paddingRight: '0px' }}>
                            <ReactPlayer
                                url={appSetting.ADMIN_URL + dataItemV1?.URLAttachment}
                                width='100%'
                                height='100%'
                                pip={true}
                                playing={true}
                                controls={true}
                                loop={btnrepeat != '' ? true : false}
                                volume={true}
                                muted={false}
                                onEnded={handleVideoEnded}
                            >
                            </ReactPlayer>
                        </div>

                        <div>
                            <div style={{}}>
                                <div style={{ fontWeight: "500", fontSize: "16px", marginBottom: '5px' }}>
                                    {dataItemV1?.VideoTitle}
                                </div>
                            </div>
                            <div style={{ fontSize: "14px" }} dangerouslySetInnerHTML={{ __html: dataItemV1?.VideoDescription ? dataItemV1.VideoDescription : "Không có mô tả." }}></div>
                            <hr></hr>
                            <div >
                                Được ra mắt vào ngày {dataItemV1?.VideoCreationDate}
                                <span >
                                    {IsFavourite == true ?
                                        <Button style={{ float: 'right', display: 'inline-block', padding: '5px 30px', fontSize: '12px', fontWeight: '500', borderRadius: '25px' }} onClick={() => removeFavoriteVideo()}>Xóa khỏi mục yêu thích</Button>
                                        :
                                        <Button style={{ float: 'right', display: 'inline-block', padding: '5px 30px', fontSize: '12px', fontWeight: '500', borderRadius: '25px' }} onClick={() => addFavoriteVideo()}>Thêm vào mục yêu thích</Button>
                                    }
                                </span>
                            </div>

                        </div>

                    </Card>
                    :
                    <Card>
                        <div className="" style={{ width: '100%', height: '70vh', paddingLeft: '0px', paddingRight: '0px' }}>
                            <ReactPlayer
                                url={appSetting.ADMIN_URL + dataDetai?.URLAttachment}
                                width='100%'
                                height='100%'
                                pip={true}
                                playing={true}
                                controls={true}
                                loop={btnrepeat != '' ? true : false}
                                volume={true}
                                muted={false}>
                            </ReactPlayer>
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ fontWeight: "500", fontSize: "16px" }}>
                                    {dataDetai?.VideoTitle}
                                </div>
                                {dataDetai?.VideoStatusName != null ?
                                    <div style={{ marginRight: "10%" }}>
                                        <kbd style={{ height: "30px", color: "white", backgroundColor: "#4e596b", borderColor: "#4e596b", borderRadius: "4px", fontSize: "16px" }}>{dataDetai?.VideoStatusName}</kbd>
                                    </div>
                                    : ""
                                }

                            </div>
                            <div style={{ fontSize: "18px" }}>{dataDetai?.VideoDescription != "" ? dataDetai?.VideoDescription : "Không có mô tả"}</div>
                            <div><span style={{ fontWeight: "700" }}>Kênh: </span> {dataDetai?.VideoChannelTitle}</div>
                            <div><span style={{ fontWeight: "700" }}>Từ khóa: </span> {dataDetai?.Keywords != "" ? dataDetai?.Keywords : "Không có từ khóa nào khả dụng"}</div>
                            {dataDetai.VideoRejectedReason &&
                                <div><span style={{ fontWeight: "700" }}>Lý do từ chối: </span> {dataDetai.VideoRejectedReason}</div>
                            }
                            <hr></hr>
                            <div>Được ra mắt vào ngày {dataDetai?.UploadVideoDate}</div>
                        </div>
                    </Card>
                }
            </div>
            <div className="col-5">
                <div>
                    <LoadingPanel loading={loading}> {rendervideoplaylist()}</LoadingPanel>
                </div>
                <div >
                    <LoadingPanel loading={loading}> {renderAllVideo()}</LoadingPanel>
                </div>
                {/* {visibleMore && (
                    <div className="loadMoreBtn">
                        <a style={{ cursor: 'pointer' }} onClick={() => onShowMore()}>Hiển thị thêm</a>
                    </div>
                )} */}
            </div>

        </div>
    )
}
DetailVideoPLY.propTypes = {
    version: PropTypes.string,

};
export default DetailVideoPLY;