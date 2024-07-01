
import './style/openVideoDisplay.scss';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'components/Image';
import { useState, useEffect } from 'react';
import { learningService } from 'services/learningService';
import { Button } from 'primereact/button';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import ReactPlayer from 'react-player';

const OpenVideoDisplay = (props) => {
    const userDefault = getCurrentUserDefault();
    const [dataNode, setDataNode] = useState([]);


    useEffect(() => {
        if (props.nodeID) {
            loadApi();
        }
    }, [props.nodeID]);

    const loadApi = async () => {
        const params = {
            "CourseID": props.courseID,
            "NodeId": props.nodeID,

        }
        let result = await learningService.getvedioid(params);

        const paramsVideoDetails = {
            "UserID": userDefault.UserId,
            "PageNumber": 1,
            "RecordsPerPage": 10,
            "CorporateID": userDefault.CorporateId,
            "videoId": result.data.VideoId,
            "VideoChannelId": 0,
            "CourseId": props.courseID,
            "NodeId": props.nodeID,
            "NodeName": props.nodeName,
        }
        let rsVideoDetails = await learningService.getvideoplaydetails(paramsVideoDetails);
        setDataNode(rsVideoDetails.data);

    }

    return (
        <>
            {/* <Toast ref={toastBR} position="bottom-right" /> */}
            <div className="assignment-popup animated fadeInUpBig show" >
                <div className="assignment-header">
                    <a className="ah-left-img" href="javascript:void(0);">
                        <span className="img-heading">{props.nodeName}</span>
                    </a>
                </div>
                <div className="" style={{ width: '100%', height: 'auto', paddingLeft: '10px', paddingRight: '10px' }}>
                    <ReactPlayer
                        url={appSetting.ADMIN_URL + dataNode?.URLAttachment}
                        width='100%'
                        height='100%'
                        pip={true}
                        playing={true}
                        controls={true}
                        loop={true}
                        volume={true}
                        muted={false}>
                    </ReactPlayer>
                </div>

                <div className="open-video-display">
                    <div className="assignment-node-list-section">
                        <div className="assignment-disc-sec">
                            <span className="n-description">Mô tả video</span>
                            <span className="n-sub-description" dangerouslySetInnerHTML={{ __html: dataNode?.VideoDescription ? dataNode.VideoDescription : "Không có mô tả." }}></span>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
OpenVideoDisplay.propTypes = {
    nodeID: PropTypes.number,
    courseID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    nodeName: PropTypes.string,

};
export { OpenVideoDisplay }