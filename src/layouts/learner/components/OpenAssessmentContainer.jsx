import { classNames } from 'primereact/utils';
import styles from './style/openAssessment.module.scss';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { learnerRouters } from '../learnerRoutes';
import React, { useState, useEffect, useRef } from 'react';
import { assessmentService } from 'services/assessmentService';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Sidebar } from 'primereact/sidebar';
import Exam from 'layouts/others/components/Exam';
import DiemBaiThi from 'layouts/others/components/DiemBaiThi';




const OpenAssessmentContainer = (props) => {
    const [visibleFullScreen, setVisibleFullScreen] = useState(false)
    const [visibleFullScreenFB, setVisibleFullScreenFB] = useState(false)
    const [type, settype] = useState('')
    const [dataNode, setDataNode] = useState([]);
    const [visibleExam, setvisibleExam] = useState(false)
    useEffect(() => {
        // call api here
        if (props.nodeId) {
            loadApi();
        }
    }, [props.nodeId]);

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
            "CourseLaunchId": props.courseLaunchId,
            "NodeId": props.nodeId,
            "StudentId": props.studentId,
        }
        let result = await assessmentService.openassessment(params);
        setDataNode(result.data);

    }
    // const sentID = async (data) => {

    // }
    const start = () => {
        if (dataNode?.IsReadyAssessment == false) {
            alert("Bài thi chưa sẵn sàng")
        } else {
            //sentID(dataNode)
            settype('START')
            //setVisibleFullScreen(true)
            setvisibleExam(true);
            let dataBinding = { ...dataNode, TypeProcess: 'START' }
            props.onClickOpenExam(dataBinding);
        }
    }
    const resumeassessment = () => {
        //sentID(dataNode)
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

    function toHHMMSS(time) {
        if (time == null || time == undefined || time == '') {
            return "Chưa quy định"
        } else {
            var sec_num = parseInt(time, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            return hours + ':' + minutes + ':' + seconds;
        }

    }

    function checkAttemptLeft(maxAttemptAllow) {
        if (maxAttemptAllow) {
            const a = maxAttemptAllow.split("/");
            if (a[0] > 0) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    return (
        <>
            <div>
                <div className={styles.titleHeader} >
                    <div className='align-self-center'>
                        <p style={{ paddingTop: '5px' }}>{dataNode.CourseName}</p>
                    </div>
                </div>

                {dataNode.WelcomeMessage ?
                    <div className="d-flex flex-row" style={{ padding: '20px 20px 0 20px' }}>
                        <div className="">
                            <p><strong>{dataNode.WelcomeMessage}</strong></p>
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
                                        <div className=""><strong>{dataNode.NodeName}</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Tổng thời gian làm bài</div>
                                        <div className={styles.laBoxValue}>{toHHMMSS(dataNode.AssessmentAllowedDuration)}</div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Tổng số câu hỏi</div>
                                        <div className={styles.laBoxValue}>{dataNode.TotalQuestionCount} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Tổng điểm</div>
                                        <div className={styles.laBoxValue}>{dataNode.TotalMarks} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Điểm vượt qua</div>
                                        <div className={styles.laBoxValue}>{dataNode.PassingMark} </div>
                                    </div>
                                </div>
                                <div className={styles.colSM4}>
                                    <div className={styles.laBoxTotal1}>
                                        <div className={styles.laBoxTitle}>Điểm trừ</div>
                                        <div className={styles.laBoxValue}>{dataNode.NegativeMarking}% </div>
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
                                        <div className="" style={{ marginBottom: '10px' }}>Mã khóa học</div>
                                        <div className=""><strong>{props.courseCode ? props.courseCode : ''} </strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={styles.laBoxTotal2}>
                                        <div className={styles.laBoxTitle2}>Mô tả: </div>
                                        <div className={styles.laBoxValue2}>
                                            {dataNode.CourseDescription ?
                                                <p dangerouslySetInnerHTML={{ __html: dataNode.CourseDescription }}></p>
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

            <div className='d-flex justify-content-center'>
                {dataNode.IsCourseExpired == true ?
                    <>
                        <p>Đã hết hạn</p>
                    </>
                    :
                    <>
                        {dataNode.Status == "N" ?
                            <div className={styles.launchAssinButtonSec}>
                                <button data-toggle="dropdown" className={styles.labButton} onClick={() => start()}>BẮT ĐẦU </button>
                            </div>
                            :
                            <>
                                {dataNode.Status == "S" ?
                                    <>
                                        {dataNode.ActiveNodes == "" ?
                                            <>
                                                {
                                                    dataNode.IsResumeAssessment == "True" ?
                                                        <>
                                                            {dataNode.AttemptsLeft != -1 ?
                                                                <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                                    <Button data-toggle="dropdown" onClick={() => resumeassessment()} className={styles.labButtonRework}>Tiếp tục thi </Button>
                                                                </div>
                                                                :
                                                                <div className={styles.launchAssinButtonSec} style={{ alignSelf: 'center' }}>
                                                                    <Button data-toggle="dropdown" className={styles.labButton} disabled style={{ cursor: 'not-allowed', opacity: '0.6' }}>BẮT ĐẦU </Button>
                                                                </div>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            <div className={styles.launchAssinButtonSec} style={{ alignSelf: 'center' }}>
                                                                <Button data-toggle="dropdown" className={styles.labButton} disabled style={{ cursor: 'not-allowed', opacity: '0.6' }}>BẮT ĐẦU </Button>
                                                            </div>
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                {dataNode.IsResumeAssessment == "True" ?
                                                    <>
                                                        {dataNode.IsFinalized == "False" && dataNode.AttemptsLeft >= 0 ?
                                                            <>
                                                                {dataNode.AttemptsLeft > 0 ?
                                                                    <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                                        <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnRework(dataNode)}>Làm lại </Button>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {
                                                                            dataNode.AttemptsLeft == 0 && dataNode.AttemptsLeftLevel == "-" &&
                                                                            <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                                                <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnRework(dataNode)}>Làm lại </Button>
                                                                            </div>
                                                                        }
                                                                    </>

                                                                }

                                                                <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                                                    <Button data-toggle="dropdown" onClick={() => resumeassessment()} className={styles.labButtonRework}>Tiếp tục thi </Button>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className={styles.launchAssinButtonSec} style={{ alignSelf: 'center' }}>
                                                                <Button data-toggle="dropdown" className={styles.labButton} disabled style={{ cursor: 'not-allowed', opacity: '0.6' }}>BẮT ĐẦU </Button>
                                                            </div>
                                                        }

                                                    </>
                                                    :
                                                    <>
                                                        {dataNode.AssessmentAttemptLeftTime == 0 && (dataNode.AllowCurrentAssessmentTime == null || dataNode.AllowCurrentAssessmentTime != null) ?
                                                            <div className={styles.launchAssinButtonSec}>
                                                                <button data-toggle="dropdown" className={styles.labButton} onClick={() => start()}>BẮT ĐẦU </button>
                                                            </div> :
                                                            <>
                                                                {dataNode.AssessmentAttemptLeftTime < 0 && (checkAttemptLeft(dataNode.AttemptsLeftLevel) == true || dataNode.AttemptsLeftLevel == "-") && (dataNode.AttemptsLeft > 0 || (dataNode.AttemptsLeft == 0 && dataNode.IsAssessmentEvaluated == true && dataNode.IsShowLastAttemptButton == false)) ?
                                                                    <div className={styles.launchAssinButtonSec}>
                                                                        <button data-toggle="dropdown" className={styles.labButton} onClick={() => start()}>BẮT ĐẦU </button>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {dataNode.AssessmentAttemptLeftTime > 0 && dataNode.IsFinalized == "False" &&
                                                                            <div className={styles.launchAssinButtonSec}>
                                                                                <button data-toggle="dropdown" className={styles.labButton} onClick={() => start()}>BẮT ĐẦU </button>
                                                                            </div>

                                                                        }

                                                                    </>

                                                                }


                                                            </>
                                                        }

                                                    </>

                                                }
                                            </>
                                        }
                                    </> :
                                    <>
                                    </>
                                }
                            </>
                        }

                        {dataNode.Status == "C" ?
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row' style={{ alignSelf: 'center' }}>
                                    {dataNode.IsFinalized == "False" && dataNode.AttemptsLeft > 0 && (dataNode.IsAssessmentEvaluated != true || (dataNode.IsAssessmentEvaluated == true && dataNode.IsStart == true)) ?
                                        <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                            <Button data-toggle="dropdown" href="javascript:void(0);" className={styles.labButtonRework} onClick={() => confirmBtnRework(dataNode)}>Làm lại </Button>
                                        </div> : ''
                                    }

                                    {/* {dataNode.IsFinalized == "False" && dataNode.AttemptsLeft > 0 && dataNode.AttemptsLeft != "" ?
                                        <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                            <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnFin(dataNode)}>Hoàn thành </Button>
                                        </div> : ''
                                    } */}


                                    {/* {dataNode.ReportReqd == "True" ? bug http://jira.thienhoang.net/browse/ATVTTTTH-1995 */}
                                    {dataNode.IsShowLastAttemptButton == true && dataNode.ReportReqd == "True" ?
                                        <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                            <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => btnRpAssessment(dataNode)}>Báo cáo thi </Button>
                                        </div>
                                        : ''
                                    }
                                </div>

                                <div className='d-flex align-items-end' >
                                    {(dataNode.IsResumeAssessment == "False" && dataNode.IsStart == false) || dataNode.IsFinalized == "True" || (dataNode.IsResumeAssessment == "True" && dataNode.AttemptsLeftLevel == "-" && dataNode.IsStart == false) || (dataNode.IsStart == true && dataNode.IsShowLastAttemptButton == true && dataNode.AttemptsLeft == 0) || (dataNode.AttemptsLeft < 0 && dataNode.IsFinalized == "False" && dataNode.IsShowLastAttemptButton == true) ?
                                        <div>
                                            <p>Bạn không thể xem lại vì quản trị đã khóa chức năng này. Hãy liên hệ quản trị.</p>
                                        </div>
                                        :
                                        ''}
                                </div>
                            </div>

                            : ''
                        }
                        {dataNode.Status == "P" &&
                            <div className='d-flex flex-column'>
                                {dataNode.IsShowLastAttemptButton == true && dataNode.ReportReqd == "True" &&
                                    <div className={classNames('d-flex justify-content-center', styles['launchAssinButtonSec'])} style={{ marginLeft: '1rem' }}>
                                        <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => btnRpAssessment(dataNode)}>Báo cáo thi </Button>
                                    </div>
                                }

                                {dataNode.IsFinalized == "False" && dataNode.AttemptsLeft != 0 ?
                                    // <div className={styles.launchAssinButtonSec} style={{ marginLeft: '1rem' }}>
                                    //     <Button data-toggle="dropdown" className={styles.labButtonRework} onClick={() => confirmBtnFin(dataNode)}>Hoàn thành </Button>
                                    // </div>
                                    <div className='d-flex align-items-end ' >
                                        <p>Bạn không thể xem lại vì quản trị đã khóa chức năng này. Hãy liên hệ quản trị.</p>
                                    </div>
                                    :
                                    <div className='d-flex align-items-end ' >
                                        <p>Bạn không thể xem lại vì quản trị đã khóa chức năng này. Hãy liên hệ quản trị.</p>
                                    </div>
                                }
                            </div>
                        }
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
OpenAssessmentContainer.propTypes = {
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
OpenAssessmentContainer.defaultProps = {
    onClickOpenExam: () => { }
}
export { OpenAssessmentContainer }