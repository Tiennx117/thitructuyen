import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import ReactPlayer from 'react-player'
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const DetailVideo = (props) => {
    const [courseLauchID] = useState(props.dataObj.VideoId);
    const [dataDetai] = useState(props.dataObj)
    const [dataItem, setDataItem] = useState({})
    const [dataItemV1, setDataItemV1] = useState({});
    const [IsFavourite, setIsFavourite] = useState(false);
    const loadApi = async () => {
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
        getDetail();

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
            "videoId": props.dataObj.VideoId,
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
    }, []);
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

    return (
        <>
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
                            loop={false}
                            volume={true}
                            muted={false}>
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
                            loop={false}
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




        </>
    )
}
DetailVideo.propTypes = {
    version: PropTypes.string,

};
export default DetailVideo;