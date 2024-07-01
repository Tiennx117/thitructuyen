import styles from './style/learningDetail.module.scss';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Image } from 'components/Image';
import { learningService } from 'services/learningService';
import RatingStar from './RatingStar';
import { Dialog } from 'primereact/dialog';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { RiMore2Fill } from 'react-icons/ri';


const RatingContainer = (props) => {
    const [dataRating, setDataRating] = useState({
        CommentList: []
    });
    const userDefault = getCurrentUserDefault();
    const [btnReport, setBtnReport] = useState(false);
    const [reasonReport, setReasonReport] = useState('');
    const [val2, setVal2] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [itemRp, setItemRp] = useState([]);


    useEffect(() => {
        // call api here
        if (props.courseLauchID) {
            loadApi();
        }
        //loadLazyData();
    }, [props.courseLauchID]);

    const loadApi = async () => {
        let params = {};
        if (props.courseType == "T") {
            params = {
                "CourseLaunchId": props.courseLauchID,
                "RedirectTo": "I",
            }

        } else {
            params = {
                "CourseLaunchId": props.courseLauchID,
            }
        }
        let result = await learningService.getratingcomments(params);
        setDataRating(result.data);
        setRedirect(result.data.RedirectTo);

    }

    const { register, control, formState: { errors }, handleSubmit, reset, setValue, getValues } = useForm({ reasonReport });
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };

    //#region Gửi nhận xét đánh giá
    const onSubmit = async (data) => {
        const params = {
            "CourseLaunchId": props.courseLauchID,
            "CommentText": data.txtRemarks,
            "RatingStars": data.numStar,
            "RedirectTo": redirect,
            "Flag": "U"
        }

        let resultAdd = await learningService.addratingcomment(params);
        setDataRating(resultAdd.data);
        setIsEdit(false);
        //loadApi();
    };

    const onSubmitNotFinish = async (data) => {
        const params = {
            "CourseLaunchId": props.courseLauchID,
            "CommentText": data.txtRemarks,
            "RatingStars": data.numStar,
            "RedirectTo": redirect,
            "Flag": "U"
        }
        let resultAdd = await learningService.addratingcomment(params);
        setDataRating(resultAdd.data);
        setIsEdit(false);
        //loadApi();
    };
    //#endregion

    //#region Gửi lý do báo cáo lạm dụng
    const openReport = (item) => {
        if (item.IsReportedRebuse == false) {
            // item chưa bị báo cáo
            setBtnReport(true)
            setItemRp(item)
        } else {
            window.alert("Bạn đã báo cáo bình luận này rồi!");
        }

    }
    const onSubmitKTG = (data) => {
        reset();
    };
    const sentReport = async (data, reasonReport) => {
        if (reasonReport) {
            const params = {
                "ItemId": data.CourseLaunchId,
                "ItemType": "CR",
                "reportAbuseComment": reasonReport,
                "PostedContentUserId": data.UserId,
            }
            await learningService.addrebusereportcomment(params);
            setBtnReport(false);
            reset();
            loadApi();
        }
    };
    //#endregion

    return (
        <div className={classNames('row', 'p-3', styles['rating-top-heading'])}>
            <div className='col-4 ' style={{}}>
                <span className='font-weight-bold'>
                    ĐÁNH GIÁ
                </span>
                <div className='flex-column'>
                    <div className='mt-4 flex-row d-flex '>
                        <div style={{ marginLeft: '-7px', display: 'inline-flex' }}>
                            <RatingStar activeStar={5} />
                        </div>
                        <div className={classNames('progress', styles['progress'])} style={{ width: '13rem' }}>
                            <div className={classNames('progress-bar bg-success', styles['progress-bar-cus'])} style={{ width: dataRating.FiveStarPercent, height: '100%', borderRadius: 0 }} aria-valuenow={dataRating.FiveStarPercent} aria-valuemin={0} aria-valuemax={100}>{dataRating.NumberOfFiveStar}</div>
                        </div>
                    </div>
                    <div className='mt-1 flex-row d-flex  '>
                        <div style={{ marginLeft: '-7px' }}>
                            <RatingStar activeStar={4} />
                        </div>
                        <div className={classNames('progress', styles['progress'])} style={{ width: '13rem' }}>
                            <div className={classNames('progress-bar', styles['progress-bar-cus'])} style={{ width: dataRating.FourStarPercent, height: '100%', borderRadius: 0 }} aria-valuenow={dataRating.FourStarPercent} aria-valuemin={0} aria-valuemax={100}>{dataRating.NumberOfFourStar}</div>                                                </div>
                    </div>
                    <div className='mt-1 flex-row d-flex  '>
                        <div style={{ marginLeft: '-7px' }}>
                            <RatingStar activeStar={3} />
                        </div>
                        <div className={classNames('progress', styles['progress'])} style={{ width: '13rem' }}>
                            <div className={classNames('progress-bar bg-info', styles['progress-bar-cus'])} style={{ width: dataRating.ThreeStarPercent, height: '100%', borderRadius: 0 }} aria-valuenow={dataRating.ThreeStarPercent} aria-valuemin={0} aria-valuemax={100}>{dataRating.NumberOfThreeStar}</div>
                        </div>
                    </div>
                    <div className='mt-1 flex-row d-flex  '>
                        <div style={{ marginLeft: '-7px' }}>
                            <RatingStar activeStar={2} />
                        </div>
                        <div className={classNames('progress', styles['progress'])} style={{ width: '13rem' }}>
                            <div className={classNames('progress-bar bg-warning', styles['progress-bar-cus'])} style={{ width: dataRating.TwoStarPercent, height: '100%', borderRadius: 0 }} aria-valuenow={dataRating.TwoStarPercent} aria-valuemin={0} aria-valuemax={100}>{dataRating.NumberOfTwoStar}</div>
                        </div>
                    </div>
                    <div className='mt-1 flex-row d-flex  '>
                        <div style={{ marginLeft: '-7px' }}>
                            <RatingStar activeStar={1} />
                        </div>
                        <div className={classNames('progress', styles['progress'])} style={{ width: '13rem' }}>
                            <div className={classNames('progress-bar bg-danger', styles['progress-bar-cus'])} style={{ width: dataRating.OneStarPercent, height: '100%', borderRadius: 0 }} aria-valuenow={dataRating.OneStarPercent} aria-valuemin={0} aria-valuemax={100}>{dataRating.NumberOfOneStar}</div>
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <div className={styles['average-rating']}>
                        {dataRating.AverageRating}
                    </div>
                    <div className='text-center'>
                        <RatingStar activeStar={dataRating.AverageRating} />
                    </div>

                    <div className='text-center'>
                        <i className='pi pi-user' /> Tổng số {dataRating.NumberOfComments}

                    </div>
                </div>

            </div>

            <div className='col-8' style={{ paddingLeft: '2rem' }}>
                {dataRating.CommentList.map((item, index) => (
                    <div key={index}>
                        {item.CourseProgress == 100 || props.courseType == "T" ?
                            <div className={classNames('row pl-2 pr-2 pt-2 shadow-2', styles.commentRating)}>
                                <div className='col-12'>
                                    {userDefault.UserId == item.UserId ?
                                        <>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className='d-flex flex-row justify-content-between align-items-center'>
                                                    <div>
                                                        <Image style={{ width: '46px', height: '46px' }} src={item.UserImagePath} className="" />
                                                    </div>
                                                    <div className='mr-auto pl-2'>
                                                        {item.UserName} &nbsp;<span style={{ color: '#AAAAAA' }}> {item.JobRole}</span>
                                                        {(isEdit == true || (item.CommentText == "" && item.CourseProgress == 100)) ?
                                                            <></> :
                                                            <>
                                                                <br />
                                                                <span style={{ color: '#AAAAAA' }}> {item.DateComment}</span>
                                                            </>
                                                        }

                                                    </div>
                                                    {(isEdit == true || (item.CommentText == "" && item.CourseProgress == 100)) ?
                                                        <>
                                                            <div className='field'>
                                                                {/* {setValue('numStar', item.RatingStars)} */}
                                                                <span className="p-float-label">
                                                                    <Controller name="numStar" control={control} rules={{ required: 'Vui lòng đánh giá khóa học', min: 1 }} render={({ field, fieldState }) => (
                                                                        <Rating className={styles['rating-color']} id={field.name} defaultValue={item.RatingStars} value={field.value} cancel={false} onChange={(e) => {
                                                                            field.onChange(e.value)
                                                                        }} />
                                                                    )} />
                                                                </span>
                                                            </div>
                                                        </>
                                                        :
                                                        <div className='d-flex flex-row'>
                                                            <RatingStar activeStar={item.RatingStars} isReportedRebuse={item.IsReportedRebuse} />
                                                            <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                                                <a id="dropdownMenuButton1" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                                                                    {/* <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", height: 'auto', paddingBottom: '4px' }}></RiMore2Fill> */}
                                                                    <i style={{ fontSize: '1.3rem' }} class="pi pi-ellipsis-v"></i>
                                                                </a>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a onClick={() => {
                                                                        setIsEdit(true);
                                                                        setValue('txtRemarks', item.CommentText)
                                                                        setValue('numStar', item.RatingStars)
                                                                    }} className="dropdown-item cursor-pointer">Chỉnh sửa</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                                {(isEdit == true || (item.CommentText == "" && item.CourseProgress == 100)) ?
                                                    <div className='field mt-3'>
                                                        <span className="p-float-label">
                                                            <Controller name="txtRemarks" control={control} rules={{ required: 'Vui lòng nhập nhận xét và đánh giá khóa học' }} render={({ field, fieldState }) => (
                                                                <InputTextarea className="comment-input" id={field.name} {...field} value={field.value} maxLength={250} rows={1} style={{ width: '100%', background: 'rgb(0 0 0 / 4%)' }} />
                                                            )} />
                                                        </span>
                                                        {getFormErrorMessage('txtRemarks', errors)}
                                                        {!errors.txtRemarks ?
                                                            <>
                                                                {getFormErrorMessage('numStar', errors)}
                                                            </> : ''
                                                        }
                                                        <Button className={classNames('p-button btn btn-info', '')} style={{ float: 'right' }}>Gửi nhận xét</Button>
                                                    </div> :
                                                    <>
                                                        <div className='field mt-2 pl-5 pr-3'>
                                                            <InputText className="comment-input" style={{ width: '100%', border: 'none' }} value={item.CommentText} disabled={true} />
                                                        </div>
                                                    </>
                                                }

                                            </form>
                                        </>
                                        :
                                        <>
                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                <div>
                                                    <Image style={{ width: '46px', height: '46px' }} src={item.UserImagePath} className="" />
                                                </div>
                                                <div className='mr-auto pl-2'>
                                                    {item.UserName} &nbsp;<span style={{ color: '#AAAAAA' }}> {item.JobRole}</span>
                                                    <br />
                                                    <span style={{ color: '#AAAAAA' }}> {item.DateComment}</span>

                                                </div>
                                                <div className='d-flex flex-row align-items-center'>
                                                    <RatingStar activeStar={item.RatingStars} isReportedRebuse={item.IsReportedRebuse} />
                                                    <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                                        <a id="dropdownMenuButton1" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                                                            {/* <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", height: 'auto', paddingBottom: '4px' }}></RiMore2Fill> */}
                                                            <i style={{ fontSize: '1.3rem' }} class="pi pi-ellipsis-v"></i>
                                                        </a>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            {/* <li><a onClick={() => onDeleteComment(it)} className="dropdown-item" href="#">Xóa</a></li> */}
                                                            <li><a onClick={() => openReport(item)} className="dropdown-item">Báo cáo lạm dụng</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='field mt-2 pl-5 pr-3'>
                                                <InputText className="comment-input" style={{ width: '100%', border: 'none' }} value={item.CommentText} disabled={true} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            :
                            <>
                                {item.CourseProgress != 100 && props.isRated == true &&
                                    <div className={classNames('row pl-2 pr-2 pt-2 shadow-2', styles.commentRating)}>
                                        <div className='col-12'>
                                            {userDefault.UserId == item.UserId ?
                                                <>
                                                    <form onSubmit={handleSubmit(onSubmitNotFinish)}>
                                                        <div className='d-flex flex-row justify-content-between align-items-center'>
                                                            <div>
                                                                <Image style={{ width: '46px', height: '46px' }} src={item.UserImagePath} className="" />
                                                            </div>
                                                            <div className='mr-auto pl-2'>
                                                                {item.UserName} &nbsp;<span style={{ color: '#AAAAAA' }}> {item.JobRole}</span>
                                                                {(isEdit == true || item.CommentText == "") ?
                                                                    <> </> :
                                                                    <>
                                                                        <br />
                                                                        <span style={{ color: '#AAAAAA' }}> {item.DateComment}</span>
                                                                    </>
                                                                }
                                                            </div>
                                                            {(isEdit == true || item.CommentText == "") ?
                                                                <>
                                                                    <div className='field'>
                                                                        <span className="p-float-label">
                                                                            <Controller name="numStar" control={control} rules={{ required: 'Vui lòng đánh giá khóa học', min: 1 }} render={({ field, fieldState }) => (
                                                                                <Rating className={styles['rating-color']} id={field.name} defaultValue={item.RatingStars} value={field.value} cancel={false} onChange={(e) => {
                                                                                    field.onChange(e.value)
                                                                                }} />
                                                                            )} />
                                                                        </span>
                                                                    </div>
                                                                </>
                                                                :
                                                                <div className='d-flex flex-row'>
                                                                    <RatingStar activeStar={item.RatingStars} isReportedRebuse={item.IsReportedRebuse} />
                                                                    <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                                                        <a id="dropdownMenuButton1" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i style={{ fontSize: '1.3rem' }} class="pi pi-ellipsis-v"></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                            <li><a onClick={() => {
                                                                                setIsEdit(true);
                                                                                setValue('txtRemarks', item.CommentText)
                                                                                setValue('numStar', item.RatingStars)
                                                                            }} className="dropdown-item cursor-pointer">Chỉnh sửa</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>

                                                        {(isEdit == true || (item.CommentText == "")) ?
                                                            <div className='field mt-3'>
                                                                <span className="p-float-label">
                                                                    <Controller name="txtRemarks" control={control} rules={{ required: 'Vui lòng nhập nhận xét và đánh giá khóa học' }} render={({ field, fieldState }) => (
                                                                        <InputTextarea className="comment-input" id={field.name} {...field} value={field.value} maxLength={250} rows={1} style={{ width: '100%', background: 'rgb(0 0 0 / 4%)' }} />
                                                                    )} />
                                                                </span>
                                                                {getFormErrorMessage('txtRemarks', errors)}
                                                                {!errors.txtRemarks ?
                                                                    <>
                                                                        {getFormErrorMessage('numStar', errors)}
                                                                    </> : ''
                                                                }
                                                                <Button className={classNames('p-button btn btn-info', '')} style={{ float: 'right' }}>Gửi nhận xét</Button>
                                                            </div> :
                                                            <>
                                                                <div className='field mt-2 pl-5 pr-3'>
                                                                    <InputText className="comment-input" style={{ width: '100%', border: 'none' }} value={item.CommentText} disabled={true} />
                                                                </div>
                                                            </>
                                                        }

                                                    </form>
                                                </>
                                                :
                                                <>
                                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                                        <div>
                                                            <Image style={{ width: '46px', height: '46px' }} src={item.UserImagePath} className="" />
                                                        </div>
                                                        <div className='mr-auto pl-2'>
                                                            {item.UserName} &nbsp;<span style={{ color: '#AAAAAA' }}> {item.JobRole}</span>
                                                            <br />
                                                            <span style={{ color: '#AAAAAA' }}> {item.DateComment}</span>
                                                        </div>
                                                        <div className='d-flex flex-row align-items-center'>
                                                            <RatingStar activeStar={item.RatingStars} isReportedRebuse={item.IsReportedRebuse} />
                                                            <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                                                <a id="dropdownMenuButton1" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i style={{ fontSize: '1.3rem' }} class="pi pi-ellipsis-v"></i>
                                                                </a>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a onClick={() => openReport(item)} className="dropdown-item">Báo cáo lạm dụng</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='field mt-2 pl-5 pr-3'>
                                                        <InputText className="comment-input" style={{ width: '100%', border: 'none' }} value={item.CommentText} disabled={true} />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                ))}

                <Dialog header="Bạn có chắc chắn muốn báo cáo nhận xét này không? Nêu lý do *" visible={btnReport} onHide={() => setBtnReport(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '37vw' }} >
                    <form className="row g-3" onSubmit={handleSubmit(onSubmitKTG)}>
                        <div className=" field">
                            <span className="p-float-label">
                                <Controller name="reasonReport" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                )} />
                            </span>
                            {getFormErrorMessage('reasonReport', errors)}
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <Button className="btn btn-primary mr-3" label="Đồng ý" onClick={() => sentReport(itemRp, getValues('reasonReport'))} />
                            <Button label="Hủy bỏ" onClick={() => setBtnReport(false)} className="p-button-text" />
                        </div>
                    </form>
                </Dialog>

                {dataRating.NumberOfComments == 0 && props.isRated != true ?
                    <p className='text-center mt-3'><i style={{ color: '#AAAAAA' }}>Chưa có đánh giá</i> </p>
                    : ''

                }

            </div>
        </div>
    )
}

RatingContainer.propTypes = {
    courseLauchID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isRated: PropTypes.bool,
    //iLTStatus: PropTypes.string, //đang k sử dụng
    courseType: PropTypes.string,

};
export { RatingContainer };