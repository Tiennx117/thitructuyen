import { classNames } from 'primereact/utils';
import styles from './style/openAssessment.module.scss';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { learnerRouters } from '../learnerRoutes';
import React, { useState, useEffect, useRef } from 'react';
import { checklistService } from 'services/checklistService';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Sidebar } from 'primereact/sidebar';
import Exam from 'layouts/others/components/Exam';
import DiemBaiThi from 'layouts/others/components/DiemBaiThi';




const OpenCheckList = (props) => {
    const [dataCheckList, setDataCheckList] = useState([]);

    const [visibleFullScreen, setVisibleFullScreen] = useState(false)
    const [visibleFullScreenFB, setVisibleFullScreenFB] = useState(false)
    const [type, settype] = useState('')
    const [dataNode, setDataNode] = useState([]);
    const [visibleExam, setvisibleExam] = useState(false);

    useEffect(() => {
        if (props.parameter.NodeID) {
            loadApi();
        }
    }, [props.parameter.NodeID]);
    console.log('pa', props.parameter)
    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    const loadApi = async () => {
        const params = {
            "CourseLaunchId": props.parameter.CourseID,
            "NodeID": props.parameter.NodeID,
            "LearnerId": props.parameter.UserID,
        }
        let result = await checklistService.canlearnerexecute(params);

        const paramsGetDetail = {
            "CourseLaunchId": props.parameter.CourseID,
            "NodeID": props.parameter.NodeID,
            "LearnerId": props.parameter.UserID,
            "ContentId": props.parameter.ResourceID,
        }
        let resultGetDetail = await checklistService.getchecklistdetail(paramsGetDetail);
        setDataCheckList(resultGetDetail.data);

    }
    const sentID = async (data) => {

    }
    const start = () => {
        if (dataNode?.IsReadyAssessment == false) {
            alert("Bài thi chưa sẵn sàng")
        } else {
            sentID(dataNode)
            settype('START')
            //setVisibleFullScreen(true)
            setvisibleExam(true);
            let dataBinding = { ...dataNode, TypeProcess: 'START' }
            props.onClickOpenExam(dataBinding);
        }
    }
    const resumeassessment = () => {
        sentID(dataNode)
        settype('RESUMEASSESSMENT')
        setvisibleExam(true);
        let dataBinding = { ...dataNode, TypeProcess: 'RESUMEASSESSMENT' }
        props.onClickOpenExam(dataBinding);
    }
    const closeSidebar = () => {
        setVisibleFullScreen(false);
        loadApi();
    }


    const closeFullScreenFB = () => {
        setVisibleFullScreenFB(false)
    }
    //#region Button Làm lại
    const confirmBtnRework = async (data) => {
        confirmDialogGlobal({
            style: { width: '600px' },
            message: 'Hành động này sẽ xóa tất cả các câu trả lời cho bài thi này trong lần truy cập trước. Những câu trả lời này sẽ không thể phục hồi ngay cả khi bài đánh giá bị hủy mà không hoàn thành và trạng thái của bài đánh giá sẽ được đặt lại. Bạn có chắc chắn muốn tiếp tục không?',
            accept: () => actBtnRework(data),
        });
    }
    const actBtnRework = async (data) => {
        start();
        // resetassessment(data);
        // startassessment(data);
        loadApi();
        // gettfquestion(data);
        // setautosubmissionlefttime(data);
        // submittf(data);
    }
    //#endregion


    //#region Btn Báo cáo thi
    const btnRpAssessment = async (data) => {
        setVisibleFullScreenFB(true);
    }
    //#endregion

    //#region Btn Hoàn thành
    const confirmBtnFin = async (data) => {
        confirmDialogGlobal({
            style: { width: '600px' },
            message: 'Bạn có chắc chắn muốn hoàn thành bài thi? Bấm Đồng ý, bạn sẽ không thể truy cập làm lại bài thi.',
            accept: () => actBtnFin(data),
        });
    }
    const actBtnFin = async (data) => {
        const params = {
            "CourseLaunchId": data.CourseLaunchId,
            "NodeId": data.NodeId,
            "StudentId": data.StudentId,
        }
        await assessmentService.finalizeassessment(params);
        loadApi();
    }

    //#endregion


    return (
        <>
            <div>
                <div className={styles.titleHeader} >
                    <div className='align-self-center'>
                        <p style={{ paddingTop: '5px' }}>{dataCheckList.CourseLaunchName} checklist</p>
                    </div>
                </div>

                {dataCheckList?.WelcomeMessage ?
                    <div className="d-flex flex-row" style={{ padding: '20px 20px 0 20px' }}>
                        <div className="">
                            <p><strong>{dataCheckList.WelcomeMessage}</strong></p>
                        </div>
                    </div> : ''
                }

                <div className="card-group">
                    <div className="card">
                        <div className="card-body">
                            <div className="row" style={{ marginBottom: '30px' }}>
                                <div className="">
                                    <div className="">
                                        <div className="" style={{ marginBottom: '10px' }}>Tên khóa học</div>
                                        <div className=""><strong>{dataCheckList.CourseLaunchName}</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Tổng số câu hỏi</div>
                                        <div className={styles.laBoxValue}>{dataCheckList.TotalQuestions} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Tổng số điểm</div>
                                        <div className={styles.laBoxValue}>{dataCheckList.FullMarks} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Điểm vượt qua</div>
                                        <div className={styles.laBoxValue}>{dataCheckList.PassingMarks} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Điểm trừ</div>
                                        <div className={styles.laBoxValue}>{dataCheckList.NegativeMarkingPercentage}% </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row" style={{ marginBottom: '30px' }}>
                                <div className="">
                                    <div className="">
                                        <div className="" style={{ marginBottom: '10px' }}> &nbsp;</div>
                                        <div className=""><strong>{props.courseCode ? props.courseCode : <>&nbsp;</>} </strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={styles.laBoxTotal2}>
                                        <div className={styles.laBoxTitle2}>Mô tả: </div>
                                        <div className={styles.laBoxValue2}>
                                            {dataCheckList.CourseLaunchDescription ?
                                                <p dangerouslySetInnerHTML={{ __html: dataCheckList.CourseLaunchDescription }}></p>
                                                :
                                                <i>Không có mô tả</i>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div>
                {dataCheckList.IsCourseExpired == true ?
                    <>
                        <p>Bài kiểm tra đã hết hạn.</p>
                    </>
                    :
                    <>
                        {dataCheckList.NodeStatus == "N" ?
                            <div className='d-flex justify-content-center'>
                                <div className={styles.launchAssinButtonSec}>
                                    <button data-toggle="dropdown" className={styles.labButton} onClick={() => start()}>BẮT ĐẦU </button>
                                </div>
                            </div>
                            :
                            <>
                                {dataCheckList.NodeStatus == "S" &&
                                    <div className='d-flex justify-content-center'>
                                        <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                            <Button data-toggle="dropdown" onClick={() => resumeassessment()} className={styles.labButtonRework}>Tiếp tục thi </Button>
                                        </div>
                                    </div>
                                }
                            </>
                        }

                        {dataCheckList.NodeStatus == "E" ?
                            <>
                                <div className='d-flex justify-content-center'>
                                    {dataCheckList.ForceAttempt == true &&
                                        <>
                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => btnRpAssessment(dataCheckList)}>Xem </Button>
                                            </div>
                                        </>
                                    }
                                </div>

                            </> :
                            ''
                        }

                        {/* {dataCheckList.Status == "C" ?
                            <div className='d-flex flex-column'>
                                <div className='d-flex justify-content-center'>
                                    <div className='d-flex flex-row' style={{ alignSelf: 'center' }}>
                                        {dataCheckList.IsFinalized == "False" && dataCheckList.AttemptsLeft != 0 ?
                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                <Button data-toggle="dropdown" href="javascript:void(0);" className={styles.labButtonRework} onClick={() => confirmBtnRework(dataCheckList)}>Làm lại </Button>
                                            </div> : ''
                                        }

                                        {dataCheckList.IsFinalized == "False" && dataCheckList.AttemptsLeft != 0 && dataCheckList.AttemptsLeft != "" ?
                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnFin(dataCheckList)}>Hoàn thành </Button>
                                            </div> : ''
                                        }

                                        {dataCheckList.IsShowLastAttemptButton == true && dataCheckList.ReportReqd == "True" ?
                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => btnRpAssessment(dataCheckList)}>Báo cáo thi </Button>
                                            </div>
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <div className='d-flex align-items-end' >
                                        {(dataCheckList.IsResumeAssessment == "False" && dataCheckList.IsStart == false) || dataCheckList.IsFinalized == "True" || (dataCheckList.IsResumeAssessment == "True" && dataCheckList.AttemptsLeftLevel == "-" && dataCheckList.IsStart == false) || (dataCheckList.IsStart == true && dataCheckList.IsShowLastAttemptButton == true && dataCheckList.AttemptsLeft == 0) ?
                                            <div>
                                                <p>Bạn không thể xem lại vì quản trị đã khóa chức năng này. Hãy liên hệ quản trị.</p>
                                            </div>
                                            :
                                            ''}
                                    </div>
                                </div>
                            </div>

                            : ''
                        }

                        {dataCheckList.Status == "P" ?
                            <>
                                <div className='d-flex justify-content-center'>
                                    {dataCheckList.IsShowLastAttemptButton == true && dataCheckList.ReportReqd == "True" &&
                                        <>
                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => btnRpAssessment(dataCheckList)}>Báo cáo thi </Button>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='d-flex justify-content-center'>
                                    {dataCheckList.IsFinalized == "False" && dataCheckList.AttemptsLeft != 0 ?
                                        <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                            <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnFin(dataCheckList)}>Hoàn thành </Button>
                                        </div> :
                                        <React.Fragment>
                                            <div className='d-flex align-items-flex-end' >
                                                <p>Bạn không thể xem lại vì quản trị đã khóa chức năng này. Hãy liên hệ quản trị.</p>
                                            </div>
                                        </React.Fragment>

                                    }
                                </div>
                            </> :
                            ''
                        } */}
                    </>
                }
            </div>

            <Sidebar className='sidebar-header-none' visible={visibleFullScreenFB} fullScreen onHide={() => closeFullScreenFB()}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeFullScreenFB()} />
                        <DiemBaiThi data={dataNode} />
                    </>
                }
            </Sidebar>
        </>
    )
}
OpenCheckList.propTypes = {
    nodeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    courseLaunchId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    studentId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onClickOpenExam: PropTypes.func,
    courseCode: PropTypes.string,

};

export { OpenCheckList }