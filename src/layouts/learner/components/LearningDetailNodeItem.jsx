
import React, { useState, useEffect, useRef, Component } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Image } from 'components/Image';
import { classNames } from 'primereact/utils';
import styles from './style/learningDetail.module.scss';
import { ProgressCircle } from "components/progress-circle/ProgressCircle";
import { ProgressCircleFs40 } from "components/progress-circle/ProgressCircleFs40";
import { OpenAssessmentContainer } from './OpenAssessmentContainer';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { learningService } from 'services/learningService';
import { Dialog } from 'primereact/dialog';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { openWindow } from "shared/utils";
import { FormHomeWorkContainer } from './FormHomeWorkContainer';
import Exam from 'layouts/others/components/Exam';
import { OverlayPanel } from 'primereact/overlaypanel';
import { setvisibleDialog } from 'store/perFormExam/perFormExam';
import { useSelector, useDispatch } from 'react-redux';
import { OpenVideoDisplay } from './OpenVideoDisplay';
import './style/custom-tabview.scss';
import { appSetting } from "shared/app-settings";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';


const Start1 = window.location.origin + '/images/play-icon.png';
const BackGround = window.location.origin + '/images/bg-39.jpg'
const IconItemDetail = window.location.origin + '/images/course-icon.png'

const LearningDetailNodeItem = (props) => {
    const [reason, setReason] = useState('');
    const [dataCourse] = useState(props.dataCourse);
    const [studentLauchID, setStudentLauchID] = useState(0);
    const op = useRef(null);
    const op1 = useRef(null);
    const op2 = useRef(null);
    const [nodeLauchID, setNodeLauchID] = useState(0);
    const [courseName, setCourseName] = useState('');
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const courseLauchID = props.idCourse
    const CourseCode = props.courseCode
    const nodeData = props.dataNodeTree
    //console.log('nodeData', nodeData.NodeID)
    const defaultCourseNode = {
        TotalRecords: 0,
        TotalUnreadRecords: 0,
        LearningNodeItems: []
    };
    const userDefault = getCurrentUserDefault();
    const oauth = useSelector(state => state.oauth);

    const toastBR = useRef(null);
    const dispatch = useDispatch();

    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleRightVideo, setVisibleRightVideo] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const visibleDialog1 = useSelector(state => state.exam.visibleDialog);
    const [nodeName] = useState(props.nodeName);
    const [dataCourseNode, setDataCourseNode] = useState(defaultCourseNode);
    const [checkedCompleteNode, setSheckedCompleteNode] = useState(false);

    // useEffect(() => {
    //     if (props.idCourse) {
    //         loadApi();
    //     }
    // }, [props.idCourse]);



    const loadApi = async () => {
        props.loadApiFromNodeItem();
    }

    //#region    

    const { control, formState: { errors }, handleSubmit, reset, getValues } = useForm({ reason });
    const onSubmit = (data) => {
        reset();
    };

    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };

    const ReAttemptRequest = async (data, reason) => {
        if (reason) {
            setDisplayResponsive(false);
            //showBottomRight("Yêu cầu vào lại bài thi đã được gửi.");
            const params = {
                NodeID: data.NodeID,
                CourseID: data.CourseID,
                ResourceID: data.ResourceID,
                NodeTypeName: data.NodeTypeName,
                NodeTypeId: data.NodeTypeId,
                MaxAttemptAllow: data.MaxAttemptAllow,
                ReattemptAllowed: data.ReattemptAllowed,
                Asssign: data.Asssign,
                IsCourseExpired: data.IsCourseExpired,
                ActionNodeIds: data.ActionNodeIds,
                IsResetAttempts: data.IsResetAttempts,
                ReasonForResetReattempst: reason,
                IsMandatorycourse: data.IsMandatorycourse,
            };
            let messResult = await learningService.resetreattempstforcoursenode(params);

            window.alert(messResult.data);
            loadApi();
        }
    };

    function checkAttemptLeft(maxAttemptAllow) {
        if (maxAttemptAllow) {
            const a = maxAttemptAllow.split("/");
            if (a[0] === '0') {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    function toExamDetail(node) {
        props.clickPlay(node)

    };

    const confirmComplete = async (data, e) => {
        if(confirm("Bạn có chắc chắn đã hoàn thành bài học?")){
            setSheckedCompleteNode(true);
            const params = {
                NodeID: data.NodeID,
                CourseID: data.CourseID,
                ResourceID: data.ResourceID,
                NodeTypeName: data.NodeTypeName,
                NodeTypeId: data.NodeTypeId,
                MaxAttemptAllow: data.MaxAttemptAllow,
                ReattemptAllowed: data.ReattemptAllowed,
                Asssign: data.Asssign,
                IsCourseExpired: data.IsCourseExpired,
                ActionNodeIds: data.ActionNodeIds,
                IsResetAttempts: data.IsResetAttempts,
                ReasonForResetReattempst: reason,
                IsMandatorycourse: data.IsMandatorycourse,
            };
            await learningService.setProgressAsync(params);

            loadApi();
        } else { setSheckedCompleteNode(false);}
    };
    //#endregion
    return (
        <>
            {props.modeViewType == true && props.courseType == "P" ?
                <div className='wrapper' style={{ margin: 0, padding: 0 }}>
                    <tr className="box1" style={{ margin: 0, padding: 0 }}>
                        <td style={{ width: '100%', padding: '0.5rem' }}>
                            <div className='pl-2 d-flex flex-column'>
                                <span className={styles.nodeName} >{nodeData.NodeName}</span>
                                <div className='d-flex flex-row flex-3'>
                                    <div>
                                        {/* <span className={classNames('pt-2 ', styles.nodeDescription)} style={{ marginLeft: '0' }} dangerouslySetInnerHTML={{ __html: nodeData.NodeTypeName }}></span> */}

                                    </div>
                                </div>
                                <span style={{ marginTop: '0.5rem' }}><i className="pi pi-eye"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.ViewCount} </span>{nodeData.NodeTypeName != "Assessment" ? <><span style={{ marginLeft: '30px' }} title='Thời lượng của bài học được ghi nhận khi hoàn thành'><i className="pi pi-clock"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.DURATION}&nbsp;phút</span></span></> : <></>} </span>
                                {
                                    // Người dùng đã thực hiện học 2 lần mà chưa hoàn thành được bài giảng
                                    (nodeData.NodeProgress < 100 && nodeData.AttemptsCount > 1 && nodeData.NodeTypeName != "Assessment") ? (<p style={{marginTop: 5}}>
                                        <label>
                                            <input type="checkbox" style={{position: 'relative', top: 2, left: 0}}
                                                checked={checkedCompleteNode}
                                                onChange={(e) => confirmComplete(nodeData, e)}
                                            />
                                            <span> Xác nhận hoàn thành bài giảng</span>
                                        </label>
                                    </p>) : ''
                                }
                            </div>
                        </td>
                        {(nodeData.SkillDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) || (nodeData.NodeDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) ?
                            <td></td>
                            :
                            <>
                                {dataCourse?.LearningFlag != "" || props.isMyLearningAPINode ?
                                    <>
                                        {
                                            (!nodeData.IsSentApproval && !nodeData.IsDisabledPlay && ((((nodeData.IsDisabled != true && nodeData.IsCourseExpired == false) || (nodeData.ReattemptAllowed == true && nodeData.IsCourseExpired == true)) && checkAttemptLeft(nodeData.MaxAttemptAllow) == false) || (nodeData.URL == null && nodeData.ScormZippedUrl == null && nodeData.IsCourseExpired == false)))
                                                ?
                                                <td style={{ width: '100px' }}>
                                                    <a title='Bắt đầu' onClick={() => toExamDetail(nodeData)} >
                                                        {/* <Image src={Start1} style={{ height: '40px', cursor: 'pointer' }}></Image> */}
                                                        <ProgressCircleFs40 value={nodeData.NodeProgress} />
                                                    </a>
                                                </td>
                                                :
                                                <td style={{ width: '100px', opacity: '0.5' }}>
                                                    {/* <a title='Không thể truy cập' className='d-flex flex-column align-items-center tooltip-button'> */}
                                                    <a title='Không thể truy cập' >
                                                        {/* <Image src={Start1} style={{ height: '40px', cursor: 'not-allowed' }}></Image> */}
                                                        <ProgressCircleFs40 value={nodeData.NodeProgress} />
                                                    </a>
                                                </td>
                                        }
                                    </>
                                    :
                                    ''
                                }
                            </>
                        }
                    </tr>

                    {/* Item hover*/}
                    <div className="box2" style={{ margin: 0, padding: 0 }}>
                        <tr >{/* dòng trên*/}
                            <td style={{ width: '100%', borderBottomLeftRadius: 0 }}>
                                <div className='pl-2 d-flex flex-column'>
                                    <span className={styles.nodeName} >{nodeData.NodeName}</span>
                                    <div className='d-flex flex-row flex-3'>
                                        <div>
                                            {/* <span className={classNames('pt-2 ', styles.nodeDescription)} style={{ marginLeft: '0' }} dangerouslySetInnerHTML={{ __html: "" }}></span> */}
                                        </div>
                                    </div>
                                    <span style={{ marginTop: '0.5rem' }}><i className="pi pi-eye"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.ViewCount} </span>{nodeData.NodeTypeName != "Assessment" ? <><span style={{ marginLeft: '30px' }} title='Thời lượng của bài học được ghi nhận khi hoàn thành'><i className="pi pi-clock"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.DURATION}&nbsp;phút</span></span></> : <></>} </span>
                                    {
                                        // Người dùng đã thực hiện học 2 lần mà chưa hoàn thành được bài giảng
                                        (nodeData.NodeProgress < 100 && nodeData.AttemptsCount > 1 && nodeData.NodeTypeName != "Assessment") ? (<p style={{marginTop: 5}}>
                                            <label>
                                                <input type="checkbox" style={{position: 'relative', top: 2, left: 0}}
                                                    checked={checkedCompleteNode}
                                                    onChange={(e) => confirmComplete(nodeData, e)}
                                                />
                                                <span> Xác nhận hoàn thành bài giảng</span>
                                            </label>
                                        </p>) : ''
                                    }
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            {(nodeData.SkillDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) || (nodeData.NodeDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) ?
                                <td></td>
                                :
                                <>
                                    {dataCourse?.LearningFlag != "" || props.isMyLearningAPINode ?
                                        <>
                                            {
                                                (!nodeData.IsSentApproval && !nodeData.IsDisabledPlay && ((((nodeData.IsDisabled != true && nodeData.IsCourseExpired == false) || (nodeData.ReattemptAllowed == true && nodeData.IsCourseExpired == true)) && checkAttemptLeft(nodeData.MaxAttemptAllow) == false) || (nodeData.URL == null && nodeData.ScormZippedUrl == null && nodeData.IsCourseExpired == false)))
                                                    ?
                                                    <td style={{ width: '100px', borderBottomRightRadius: 0 }}>
                                                        <a title='Bắt đầu' onClick={() => toExamDetail(nodeData)} >
                                                            <ProgressCircleFs40 value={nodeData.NodeProgress} />
                                                        </a>
                                                    </td>
                                                    :
                                                    <td style={{ width: '100px', borderBottomRightRadius: 0, opacity: '0.5' }}>
                                                        <a title='Không thể truy cập' >
                                                            <ProgressCircleFs40 value={nodeData.NodeProgress} />
                                                        </a>
                                                    </td>
                                            }
                                        </>
                                        :
                                        ''
                                    }
                                </>
                            }
                        </tr>
                        {/* dòng dưới*/}
                        <tr class="d-flex justify-content-between" style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, background: '#fff' }}>
                            {nodeData.MappedSkills != '' || (nodeData.IsShowResetReattempstButton == true && nodeData.MaxAttemptAllow != "-" && checkAttemptLeft(nodeData.MaxAttemptAllow) == true) || (nodeData.IsResetAttempts == true && nodeData.IsShowResetReattempstButton == true) ?
                                <td >
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex flex-row flex-3'>
                                            <div>
                                                {nodeData.MappedSkills != '' ?
                                                    <>
                                                        <a className={styles.nodeMappingSkill} onClick={(e) => op.current.toggle(e)}>
                                                            Xem kỹ năng được map
                                                        </a>
                                                        <OverlayPanel ref={op} showCloseIcon>
                                                            <div className={styles.overlayPanel} style={{ display: 'block' }}>
                                                                <div className={styles.overlayPanelTop} >
                                                                    KỸ NĂNG ĐẠT ĐƯỢC
                                                                </div>

                                                                <div className={styles.overlayPanelBottom}>
                                                                    <table className={styles.overlayTable}>
                                                                        <thead className={styles.overlayTableHead}>
                                                                            <tr>
                                                                                <th>Kỹ năng</th>
                                                                                <th>Danh mục kỹ năng</th>
                                                                                <th>Cấp độ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className={styles.overlayTableContent}>
                                                                            {nodeData.MappedSkills.map((itemMap, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{itemMap.SkillName}</td>
                                                                                    <td>{itemMap.SkillCategory}</td>
                                                                                    <td>{itemMap.SkillLevel}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </OverlayPanel>
                                                    </> : ''
                                                }

                                            </div>
                                        </div>

                                        {(nodeData.IsShowResetReattempstButton == true && nodeData.MaxAttemptAllow != "-" && checkAttemptLeft(nodeData.MaxAttemptAllow) == true) || (nodeData.IsResetAttempts == true && nodeData.IsShowResetReattempstButton == true) ?
                                            <React.Fragment>
                                                <Button className="p-button-sm justify-content-center" style={{ borderRadius: '5px', width: '70%' }} onClick={() => setDisplayResponsive(true)}>
                                                    <i class="fas fa-clock-rotate-left mr-2" style={{ fontSize: '11px' }}></i> Gửi yêu cầu vào lại
                                                </Button>


                                                <Dialog header="Lý do yêu cầu vào lại" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '37vw' }} >
                                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="mb-3 field">
                                                            <span className="p-float-label">
                                                                <Controller name="reason" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                                    <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                                )} />
                                                            </span>
                                                            {getFormErrorMessage('reason', errors)}
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-end">
                                                            {/* <button className="btn btn-primary mr-3" type="submit" onClick={() => ReAttemptRequest(item, getValues('reason'))} >Gửi</button> */}
                                                            <Button className="btn btn-primary mr-3" label="Gửi" autoFocus type="submit" onClick={() => ReAttemptRequest(nodeData, getValues('reason'))} />
                                                            <Button label="Đóng" onClick={() => setDisplayResponsive(false)} className="p-button-text" />
                                                        </div>
                                                    </form>
                                                </Dialog>
                                            </React.Fragment>
                                            :
                                            ''}
                                    </div>
                                </td> : ''
                            }


                            {(nodeData.SkillDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) || (nodeData.NodeDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) ?
                                <td colSpan={5} >
                                    <div className='d-flex justify-content-end'>
                                        <span style={{ color: 'red', marginRight: '20px', alignSelf: 'center' }}>Không khả dụng</span>
                                        <Button className={styles.btnRequiredRequest} onClick={(e) => op1.current.toggle(e)}>Xem yêu cầu bắt buộc</Button>
                                    </div>


                                    <OverlayPanel ref={op1} showCloseIcon>
                                        <div className={styles.overlayPanel} style={{ display: 'block', width: '500px' }}>
                                            <div className={styles.overlayPanelTop} >
                                                Nội dung học/Kỹ năng bắt buộc
                                            </div>
                                            <div className={styles.overlayPanelBottom}>
                                                {nodeData.NodeDependencies != '' ?
                                                    <table className={styles.overlayTable}>
                                                        <thead className={styles.overlayTableHead}>
                                                            <tr>
                                                                <th>Nội dung học
                                                                    <br />QUẢN LÝ</th>
                                                                <th>PHỤ THUỘC LOẠI
                                                                </th>
                                                                <th>TỐI THIỂU
                                                                    <br />ĐIỂM (%)</th>
                                                                <th>TỐI THIỂU
                                                                    <br /></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className={styles.overlayTableContent}>
                                                            {nodeData.NodeDependencies.map((itemNode, index) => (
                                                                <tr key={index}>
                                                                    <td >{itemNode.DependentNodeName}</td>
                                                                    <td >{itemNode.DependencyTypeName}</td>
                                                                    <td >{itemNode.MinimumMarks}</td>
                                                                    <td >{itemNode.MinimumAttendence}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table> : ''
                                                }


                                            </div>

                                            <div className={styles.overlayPanelBottom}>
                                                {nodeData.SkillDependencies != '' ?
                                                    <table className={styles.overlayTable}>
                                                        <thead className={styles.overlayTableHead}>
                                                            <tr>
                                                                <th >KỸ NĂNG</th>
                                                                <th >DANH MỤC KỸ NĂNG</th>
                                                                <th >CẤP ĐỘ</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className={styles.overlayTableContent}>
                                                            {nodeData.SkillDependencies.map((itemSkill, index) => (
                                                                <tr key={index}>
                                                                    <td >{itemSkill.SkillName}</td>
                                                                    <td >{itemSkill.SkillCategory}</td>
                                                                    <td >{itemSkill.SkillLevel}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table> : ''
                                                }

                                            </div>
                                        </div>
                                    </OverlayPanel>

                                </td>
                                :
                                <>
                                    {nodeData.IsShowStatusForResetReattempstRequest == true ?
                                        <td className="">
                                            <div className='text-center d-flex flex-column' style={{ maxWidth: '220px' }}>
                                                <span className="">Yêu cầu</span>
                                                <span className={styles.requestReAttempt}>{nodeData.StatusForResetReattempstRequest}</span>
                                            </div>
                                        </td>
                                        : ''
                                    }

                                    <td>
                                        <div className='text-center d-flex flex-column'>
                                            <span className={styles.onHeading}>Ngày truy cập cuối cùng</span>
                                            <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.LastAccessDate}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='text-center d-flex flex-column'>
                                            <span className={styles.onHeading}>Số lần cho phép</span>
                                            <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.MaxAttemptAllow}</span>
                                        </div>
                                    </td>
                                    <td >
                                        <div className='text-center d-flex flex-column align-items-center'>
                                            {/* <span className={styles.onHeading}>Tiến trình</span> */}
                                            <ProgressCircle value={nodeData.NodeProgress} />
                                        </div>
                                    </td>



                                </>
                            }
                        </tr>
                    </div>

                </div>

                :
                //show bình thường
                <tr className="shadow-2">
                    <td>
                        <div className='pl-2 d-flex flex-column'>
                            <span className={styles.nodeName} >{nodeData.NodeName}</span>
                            <div className='d-flex flex-row flex-3'>
                                <div>
                                    {/* <p className={classNames('pt-2 ', styles.nodeDescription)} style={{ marginLeft: '0' }} dangerouslySetInnerHTML={{ __html: nodeData.NodeTypeName }}></p> */}
                                    {nodeData.MappedSkills != '' ?
                                        <>
                                            <a className={styles.nodeMappingSkill} onClick={(e) => op.current.toggle(e)}>
                                                Xem kỹ năng được map
                                            </a>
                                            <OverlayPanel ref={op} showCloseIcon>
                                                <div className={styles.overlayPanel} style={{ display: 'block' }}>
                                                    <div className={styles.overlayPanelTop} >
                                                        KỸ NĂNG ĐẠT ĐƯỢC
                                                    </div>

                                                    <div className={styles.overlayPanelBottom}>
                                                        <table className={styles.overlayTable}>
                                                            <thead className={styles.overlayTableHead}>
                                                                <tr>
                                                                    <th>Kỹ năng</th>
                                                                    <th>Danh mục kỹ năng</th>
                                                                    <th>Cấp độ</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className={styles.overlayTableContent}>
                                                                {nodeData.MappedSkills.map((itemMap, index) => (
                                                                    <tr key={index}>
                                                                        <td>{itemMap.SkillName}</td>
                                                                        <td>{itemMap.SkillCategory}</td>
                                                                        <td>{itemMap.SkillLevel}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </OverlayPanel>
                                        </> : ''
                                    }
                                </div>
                            </div>

                            {(nodeData.IsShowResetReattempstButton == true && nodeData.MaxAttemptAllow != "-" && checkAttemptLeft(nodeData.MaxAttemptAllow) == true) || (nodeData.IsResetAttempts == true && nodeData.IsShowResetReattempstButton == true) ?
                                <React.Fragment>
                                    <Button className="p-button-sm justify-content-center" style={{ borderRadius: '5px', width: '70%' }} onClick={() => setDisplayResponsive(true)}>
                                        <i class="fas fa-clock-rotate-left mr-2" style={{ fontSize: '11px' }}></i> Gửi yêu cầu vào lại
                                    </Button>

                                    <Dialog header="Lý do yêu cầu vào lại" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '37vw' }} >
                                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3 field">
                                                <span className="p-float-label">
                                                    <Controller name="reason" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                        <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                    )} />
                                                </span>
                                                {getFormErrorMessage('reason', errors)}
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                {/* <button className="btn btn-primary mr-3" type="submit" onClick={() => ReAttemptRequest(item, getValues('reason'))} >Gửi</button> */}
                                                <Button className="btn btn-primary mr-3" label="Gửi" autoFocus type="submit" onClick={() => ReAttemptRequest(nodeData, getValues('reason'))} />
                                                <Button label="Đóng" onClick={() => setDisplayResponsive(false)} className="p-button-text" />
                                            </div>
                                        </form>
                                    </Dialog>
                                </React.Fragment>
                                :
                                ''}
                            <span style={{ marginTop: '0.5rem' }}><i className="pi pi-eye"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.ViewCount} </span>{nodeData.NodeTypeName != "Assessment" ? <><span style={{ marginLeft: '30px' }} title='Thời lượng của bài học được ghi nhận khi hoàn thành'><i className="pi pi-clock"></i>&nbsp;<span style={{ fontStyle: 'italic' }}>{nodeData.DURATION}&nbsp;phút</span></span></> : <></>} </span>
                            {
                                // Người dùng đã thực hiện học 2 lần mà chưa hoàn thành được bài giảng
                                (nodeData.NodeProgress < 100 && nodeData.AttemptsCount > 1 && nodeData.NodeTypeName != "Assessment") ? (<p style={{marginTop: 5}}>
                                    <label>
                                        <input type="checkbox" style={{position: 'relative', top: 2, left: 0}}
                                            checked={checkedCompleteNode}
                                            onChange={(e) => confirmComplete(nodeData, e)}
                                        />
                                        <span> Xác nhận hoàn thành bài giảng</span>
                                    </label>
                                </p>) : ''
                            }
                        </div>
                    </td>
                    {(nodeData.SkillDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) || (nodeData.NodeDependencies != '' && nodeData.NodeActive == false && nodeData.NodeDependancy != null) ?
                        <td colSpan={5} >
                            <div className='d-flex justify-content-end'>
                                <span style={{ color: 'red', marginRight: '20px', alignSelf: 'center' }}>Không khả dụng</span>
                                <Button className={styles.btnRequiredRequest} onClick={(e) => op1.current.toggle(e)}>Xem yêu cầu bắt buộc</Button>
                            </div>

                            <OverlayPanel ref={op1} showCloseIcon>
                                <div className={styles.overlayPanel} style={{ display: 'block', width: '500px' }}>
                                    <div className={styles.overlayPanelTop} >
                                        Nội dung học/Kỹ năng bắt buộc
                                    </div>
                                    <div className={styles.overlayPanelBottom}>
                                        {nodeData.NodeDependencies != '' ?
                                            <table className={styles.overlayTable}>
                                                <thead className={styles.overlayTableHead}>
                                                    <tr>
                                                        <th>Nội dung học
                                                            <br />QUẢN LÝ</th>
                                                        <th>PHỤ THUỘC LOẠI
                                                        </th>
                                                        <th>TỐI THIỂU
                                                            <br />ĐIỂM (%)</th>
                                                        <th>TỐI THIỂU
                                                            <br /></th>
                                                    </tr>
                                                </thead>
                                                <tbody className={styles.overlayTableContent}>
                                                    {nodeData.NodeDependencies.map((itemNode, index) => (
                                                        <tr key={index}>
                                                            <td >{itemNode.DependentNodeName}</td>
                                                            <td >{itemNode.DependencyTypeName}</td>
                                                            <td >{itemNode.MinimumMarks}</td>
                                                            <td >{itemNode.MinimumAttendence}</td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> : ''
                                        }
                                    </div>

                                    <div className={styles.overlayPanelBottom}>
                                        {nodeData.SkillDependencies != '' ?
                                            <table className={styles.overlayTable}>
                                                <thead className={styles.overlayTableHead}>
                                                    <tr>
                                                        <th >KỸ NĂNG</th>
                                                        <th >DANH MỤC KỸ NĂNG</th>
                                                        <th >CẤP ĐỘ</th>
                                                    </tr>
                                                </thead>
                                                <tbody className={styles.overlayTableContent}>
                                                    {nodeData.SkillDependencies.map((itemSkill, index) => (
                                                        <tr key={index}>
                                                            <td >{itemSkill.SkillName}</td>
                                                            <td >{itemSkill.SkillCategory}</td>
                                                            <td >{itemSkill.SkillLevel}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> : ''
                                        }
                                    </div>
                                </div>
                            </OverlayPanel>
                        </td>
                        :
                        <>
                            {
                                nodeData.NodeTypeName == "xAPI TinCan" ?
                                    <>
                                        {nodeData.IsShowStatusForResetReattempstRequest == true ?
                                            <td className="">
                                                <div className='text-center d-flex flex-column' style={{ maxWidth: '220px' }}>
                                                    <span className="">Yêu cầu</span>
                                                    <span className={styles.requestReAttempt}>{nodeData.StatusForResetReattempstRequest}</span>
                                                </div>
                                            </td>
                                            : <td></td>
                                        }

                                        <td>
                                            <div className='text-center d-flex flex-column'>
                                                <span className={styles.onHeading}>Ngày truy cập cuối cùng</span>
                                                <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.LastAccessDate}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='text-center d-flex flex-column'>
                                                <span className={styles.onHeading}>Tổng thời gian</span>
                                                <span className="pt-2" style={{ fontWeight: '600' }}>{(nodeData.TinCan && nodeData.TinCan.Duration) ? nodeData.TinCan.Duration : '-'}</span>
                                            </div>
                                        </td>
                                        {/* {
                                        (nodeData.TinCan && nodeData.TinCan.Completion) ?
                                        <td>
                                            <div className='text-center d-flex flex-column'>
                                                <span className={styles.onHeading}>Trạng thái</span>
                                                <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.TinCan.Completion ? 'Hoàn thiện' : 'Chưa hoàn thiện'}</span>
                                            </div>
                                        </td>: <></>
                                    } */}
                                        {
                                            // (nodeData.TinCan?.Raw || (nodeData.TinCan?.Completion == true && nodeData.TinCan?.Success == false)) ? //TH thứ 2 để vẫn hiển thị Quiz 0đ, và k hiển thị điểm của Video 
                                            nodeData.TinCan?.IsShowMark == true ? //show với quiz, tạm thời .. 
                                                <td>
                                                    <div className='text-center d-flex flex-column align-items-center'>
                                                        <span className={styles.onHeading}>Điểm đạt được</span>
                                                        {/* <ProgressCircle value={(nodeData.TinCan && nodeData.TinCan.Scaled) ? nodeData.TinCan.Scaled : 0} /> */}
                                                        {
                                                            nodeData.TinCan?.Success != null ?
                                                                <>
                                                                    {
                                                                        nodeData.TinCan.Success ?
                                                                            <span className="pt-2" title="Đã đạt" style={{ fontWeight: '600', color: 'green' }}>{nodeData.TinCan.Raw}</span> :
                                                                            <span className="pt-2" title="Chưa đạt" style={{ fontWeight: '600', color: 'red' }}>{nodeData.TinCan.Raw}</span>
                                                                    }
                                                                </>
                                                                :
                                                                <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.TinCan.Raw}</span>
                                                        }
                                                    </div>
                                                </td> : <></>
                                        }
                                        <td>
                                            <div className='text-center d-flex flex-column align-items-center'>
                                                {/* <span className={styles.onHeading} style={{ opacity: 0 }}>Hoàn</span> */}
                                                <ProgressCircle value={(nodeData.TinCan?.Scaled) ? nodeData.TinCan.Scaled : 0} />
                                            </div>
                                        </td>
                                        {dataCourse?.LearningFlag != "" || props.isMyLearningAPINode ?
                                            <>
                                                {
                                                    (!nodeData.IsSentApproval && !nodeData.IsDisabledPlay && ((((nodeData.IsDisabled != true && nodeData.IsCourseExpired == false) || (nodeData.ReattemptAllowed == true && nodeData.IsCourseExpired == true)) && checkAttemptLeft(nodeData.MaxAttemptAllow) == false) || (nodeData.URL == null && nodeData.ScormZippedUrl == null && nodeData.IsCourseExpired == false)))
                                                        ?
                                                        <td style={{ width: '100px' }}>
                                                            {/* <span className={styles.onHeading} style={{ opacity: 0 }}>Tiến trình</span> */} {/* để cho ngang hàng với ô tiến trình */}

                                                            <a title='Bắt đầu' className='btn-start d-flex flex-column align-items-center' onClick={() => toExamDetail(nodeData)}>
                                                                <Image src={Start1} style={{ height: '60px', cursor: 'pointer' }}></Image>
                                                                {/* <i className='bi bi-caret-up'></i> */}
                                                            </a>
                                                        </td>
                                                        :
                                                        <td style={{ width: '100px', opacity: '0.5' }}>
                                                            {/* <span className={styles.onHeading} style={{ opacity: 0 }}>Tiến trình</span> */}
                                                            <a title='Không thể truy cập' className='btn-start d-flex flex-column align-items-center'>
                                                                <Image src={Start1} style={{ height: '60px', cursor: 'not-allowed' }}></Image>
                                                            </a>
                                                        </td>
                                                }
                                            </>
                                            :
                                            ''
                                        }
                                    </> :
                                    <>
                                        {nodeData.IsShowStatusForResetReattempstRequest == true ?
                                            <td className="">
                                                <div className='text-center d-flex flex-column' style={{ maxWidth: '220px' }}>
                                                    <span className="">Yêu cầu</span>
                                                    <span className={styles.requestReAttempt}>{nodeData.StatusForResetReattempstRequest}</span>
                                                </div>
                                            </td>
                                            : <td></td>
                                        }
                                        <td>
                                            <div className='text-center d-flex flex-column'>
                                                <span className={styles.onHeading}>Ngày truy cập cuối cùng</span>
                                                <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.LastAccessDate}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='text-center d-flex flex-column'>
                                                <span className={styles.onHeading}>Số lần cho phép</span>
                                                <span className="pt-2" style={{ fontWeight: '600' }}>{nodeData.MaxAttemptAllow}</span>
                                            </div>
                                        </td>
                                        <td style={{ width: '100px' }}>
                                            <div className='text-center d-flex flex-column align-items-center'>
                                                {/* <span className={styles.onHeading}>Tiến trình</span> */}
                                                <ProgressCircle value={nodeData.NodeProgress} />
                                            </div>
                                        </td>
                                        {dataCourse?.LearningFlag != "" || props.isMyLearningAPINode ?
                                            <>
                                                {
                                                    (!nodeData.IsSentApproval && !nodeData.IsDisabledPlay && ((((nodeData.IsDisabled != true && nodeData.IsCourseExpired == false) || (nodeData.ReattemptAllowed == true && nodeData.IsCourseExpired == true)) && checkAttemptLeft(nodeData.MaxAttemptAllow) == false) || (nodeData.URL == null && nodeData.ScormZippedUrl == null && nodeData.IsCourseExpired == false)))
                                                        ?
                                                        <td style={{ width: '100px' }}>
                                                            {/* <span className={styles.onHeading} style={{ opacity: 0 }}>Tiến trình</span> */} {/* để cho ngang hàng với ô tiến trình */}

                                                            <a title='Bắt đầu' className='btn-start d-flex flex-column align-items-center' onClick={() => toExamDetail(nodeData)}>
                                                                <Image src={Start1} style={{ height: '60px', cursor: 'pointer' }}></Image>
                                                                {/* <i className='bi bi-caret-up'></i> */}
                                                            </a>
                                                        </td>
                                                        :
                                                        <td style={{ width: '100px', opacity: '0.5' }}>
                                                            {/* <span className={styles.onHeading} style={{ opacity: 0 }}>Tiến trình</span> */}
                                                            <a title='Không thể truy cập' className='btn-start d-flex flex-column align-items-center'>
                                                                <Image src={Start1} style={{ height: '60px', cursor: 'not-allowed' }}></Image>
                                                            </a>
                                                        </td>
                                                }
                                            </>
                                            :
                                            ''
                                        }
                                    </>
                            }
                        </>
                    }
                </tr>
            }
        </ >
    )
}
LearningDetailNodeItem.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    nameCourseType: PropTypes.string,
};

export default LearningDetailNodeItem