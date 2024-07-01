import Image from "components/Image"
import { ProgressBar } from "primereact/progressbar";
import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/tooltip';
import { appSetting } from "shared/app-settings";
import { classNames } from "primereact/utils";
import { useHover } from "shared/hooks/useHover";
import { useEffect, useState } from 'react';
import { overViewService } from 'services/overViewService';
import ShareCourse from 'layouts/others/components/ShareCourse';
import { Link } from "react-router-dom";
function CourseItemV2(props) {
    const productId = 123;
    const category = 'electronics';
    const quantity = 5;
    const userData = { userId: 123, name: 'John Doe' };
    // Xây dựng query string
    const queryString = `?id=${productId}&category=${category}&quantity=${quantity}`;
    //-------------
    const urlImage = appSetting.ADDRESS_WEB + '/images/statistic-learning-hoctructuyen.png';
    const { dataItem, id, ismylearning } = props;

    const onClickTitleIner = () => {
        props.onClickTitle(dataItem);
    }
    // const openRating = () => {
    //     props.openRatingDisplay(dataItem);
    // }


    var url1 = dataItem?.CourseImage;
    var ur12 = dataItem?.Image;

    if (url1 != undefined) {
        url1 = url1.replace(/ImageWidth=125&ImageHeight=120/g, 'ImageWidth=600');
    }
    if (ur12 != undefined) {
        ur12 = ur12.replace(/ImageWidth=125&ImageHeight=120/g, 'ImageWidth=600');
    }

    const ranges = [{
        divider: 1E3,
        suffix: 'K'
    }, {
        divider: 1E6,
        suffix: 'M'
    }, {
        divider: 1E9,
        suffix: 'B'
    }];

    function formatNumber(input) {
        if (input != null && input != undefined && input != "") {
            for (let index = ranges.length - 1; index >= 0; index--) {
                if (input > ranges[index].divider) {
                    let quotient = input / ranges[index].divider;
                    if (quotient < 10) {
                        quotient = Math.floor(quotient * 10) / 10;
                    } else {
                        quotient = Math.floor(quotient);
                    }
                    return quotient.toString() + ranges[index].suffix;
                }
            }
            return input.toString();
        } else {
            return 0
        }
    }

    // const renderCourseInfo = (type) => {
    //     switch (type) {
    //         case "N":
    //             return "Theo lớp";
    //         default:
    //             return "Tự do";

    //     }
    // }
    return (
        <>
            <div className="course-item d-flex flex-column justify-content-between ml-2 mr-2 mb-2 course-small-device">
                <div className="bg-course d-flex justify-content-center">
                    {/* <Image src={appSetting.ADDRESS_WEB + '/images/course-icon.png'} /> */}
                    {/* <Image style={{ width: "100%", objectFit: "cover" }}
                    src={(decodeURIComponent(dataItem.CourseImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/ILT.jpg'
                        || decodeURIComponent(dataItem.CourseImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/Elearning.jpg'
                        || decodeURIComponent(dataItem.CourseImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/ebook.jpg'
                        || dataItem.CourseImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/ILT.jpg'
                        || dataItem.CourseImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/Elearning.jpg'
                        || dataItem.CourseImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=120&ImageFile=../Content/Specific/Images/ebook.jpg')
                        ? appSetting.ADDRESS_WEB + '/images/course-icon.png' : (dataItem.CourseImage) || appSetting.ADDRESS_WEB + '/images/course-icon.png'} /> */}
                    <Image src={url1 || ur12}></Image>

                    {/* {(<span onClick={() => openRating()} className="star-label cursor-pointer" style={{ minWidth: '30px' }}>{dataItem?.CourseRating} <i className="fa fa-star "></i></span>)} */}
                    {(<span className="star-label " style={{ minWidth: '30px' }}>{dataItem?.CourseRating} <i className="fa fa-star "></i></span>)}
                </div>
                {ismylearning &&
                    <div style={{ position: 'absolute', bottom: 86, right: 0, backgroundColor: '#aaaaaa', padding: "0 6px", borderRadius: 4 }}>
                        <span style={{ color: 'white', fontSize: 12 }}>{dataItem?.CourseInfo}</span>
                    </div>
                }

                <div className="progress-bar-main" style={{ display: 'block' }}>
                    <div className="progress-bar-inn" style={{ width: dataItem.Progress + '%' }} />
                </div>

                {/* title */}
                <div className="d-flex flex-row justify-content-between flex-grow-1 ml-2 mr-2 pt-2">
                    <span onClick={() => onClickTitleIner()} className="title-text fw-bold cursor-pointer" title={dataItem?.CourseName || dataItem?.Name} data-pr-tooltip="A Disabled Button" data-pr-position="top" dangerouslySetInnerHTML={{ __html: dataItem?.CourseName || dataItem?.Name }}>
                    </span>
                </div>



                {/* footer */}
                <div className="d-flex flex-row justify-content-between m-2" style={{ marginBottom: 0 }}>
                    <div className="mr-1">

                        <span className={classNames('p-1', (dataItem.CourseType === 'T' || dataItem.LearningType === 'T') ? 'fsx-10px' : 'fsx-11px')} style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>{dataItem.CourseTypeName || dataItem.TypeName || 'Video'}</span>
                    </div>

                    {/* {props.isMyLearning != false && */}
                    <div className="assign-status">
                        {/* <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>{dataItem.LearningFlag || dataItem.Status}</span> */}
                        <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>
                            <i className="pi pi-eye" style={{ marginRight: '3px', verticalAlign: 'middle' }}></i>
                            {formatNumber(dataItem.ViewCount)}
                        </span>
                    </div>
                    {/* } */}
                </div>


                {/* courseItem hover*/}
                <div className="hovered-img d-flex flex-column ">
                    <div className="title-content ">
                        {dataItem.CourseName?.length > 22 ?
                            <>
                                <span onClick={() => onClickTitleIner()} dangerouslySetInnerHTML={{ __html: dataItem.CourseName?.substring(0, 22) + "..." }}></span>
                            </>
                            :
                            <span onClick={() => onClickTitleIner()} dangerouslySetInnerHTML={{ __html: dataItem?.CourseName }}></span>
                        }
                        {dataItem.Name?.length > 22 ?
                            <>
                                <span onClick={() => onClickTitleIner()} dangerouslySetInnerHTML={{ __html: dataItem.Name?.substring(0, 22) + "..." }}></span>
                            </>
                            :
                            <span onClick={() => onClickTitleIner()} dangerouslySetInnerHTML={{ __html: dataItem?.Name }}></span>
                        }

                    </div>
                    {(dataItem.CourseName?.length > 22 || dataItem.Name?.length > 22) &&
                        <>
                            <span className="tooltip-text" style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: dataItem?.CourseName || dataItem?.Name }}></span>
                        </>
                    }

                    <div className="info">
                        <div className="one-third b-right hand-cursor">
                            <div className="stat" onClick={() => onClickTitleIner()}><span >Giờ tín chỉ</span>
                                {dataItem.CreditHours}</div>
                        </div>
                        <div className="one-third hand-cursor">
                            <div className="stat">
                                <span onClick={() => onClickTitleIner()}>Ngày hết hạn</span>{dataItem?.ExpiryDay} {dataItem?.ExpiryYear}
                            </div>
                        </div>
                        {dataItem.ChildNodeAction == "R" &&
                            <div className="play action-icon tooltips hand-cursor" style={{ zIndex: 9999 }}>
                                <i className="far fa-play-circle" style={{ fontSize: '26px' }} title="Bắt đầu" onClick={() => onClickTitleIner()}></i>
                                {/* <Link className="far fa-play-circle" style={{ fontSize: '26px' }} title="Bắt đầu"
                                    to={"/learner/my-learning/" + dataItem?.LaunchCode + "-" + dataItem?.CourseID}
                                //to={'/learner/my-learning/learning-deatil${queryString}'}
                                ></Link> */}
                                {/* <span className="tooltiptext">Bắt đầu</span> */}
                            </div>
                        }
                        <Link className="far fa-play-circle" style={{ fontSize: '26px' }} title="Bắt đầu"
                            //to={"/learner/my-learning/learning-deatil?isMyLearning=" + dataItem?.ApprovalStatus + "&courseLauchID=" + dataItem?.CourseLaunchId + "&isRated=" + dataItem?.IsRated + "&nameCourseType=" + dataItem?.CourseType + "&idCourse=" + dataItem?.CourseID}
                            to={"/learner/my-learning/" + dataItem?.LaunchCode + "-"+dataItem?.TypeLearner + "-" + dataItem?.CourseID}
                        ></Link>
                        <div className="progress-status hand-cursor" style={{ zIndex: 99 }} onClick={() => onClickTitleIner()}>
                            {dataItem.Status} | {dataItem.Progress}%
                        </div>
                    </div>

                    {dataItem?.CompletionDate != null && dataItem?.CompletionDate != "-" &&
                        <div className="info-complete-date">
                            <span>Ngày </span>
                            {dataItem.CompletionDate}
                        </div>
                    }



                    <div className="icons">
                        <div className="select action-icon tooltips hand-cursor" style={{ bottom: '0px' }}>
                            <i className="fa fa-bars" title="Chi tiết" onClick={() => onClickTitleIner()} />

                        </div>

                        {/* {props.isMyLearning != false && dataItem.CourseType != "T" &&
                            <div className="share action-icon tooltips hand-cursor" style={{ bottom: '0px' }}>
                                <i className="fa fa-share-alt" title="Chia sẻ" onClick={() => props.openShareDisplay()} />
                               
                            </div>
                        } */}
                    </div>
                </div>
            </div>

        </>
    )
}
CourseItemV2.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    percent: PropTypes.number,
    active: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
    showExpireDate: PropTypes.bool,
    onClickTitle: PropTypes.func
};
CourseItemV2.defaultProps = {
    showExpireDate: false,
    active: false,
    total: 0,
    percent: 0,
    onClick: () => { },
    onClickTitle: () => { }
}
export { CourseItemV2 }