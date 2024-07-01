import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import Exam from '../Exam';
import { useEffect, useState, useRef } from 'react';
import DiemBaiThi from '../DiemBaiThi';
import { Sidebar } from 'primereact/sidebar';
import Thongbaosubmit from './thongbaosubmit';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { render } from 'react-dom';
import { performExamService } from "services/performExamService";
import { setLoadApiOverView, setformAutoSubmit, setCountAutoSubmit, setVisibleSubmitPassPoints, setShowReview, setvisibleDialog, setoffautosb } from 'store/perFormExam/perFormExam';


const NotificationSubmitPassPoints = (props) => {
    const dispatch = useDispatch();
    const { NodeID, ContentId, openassessment, CourseLaunch_Id, AttemptsLeft } = props
    //const [visible, setvisible] = useState(false)
    const visible = useSelector(state => state.exam.visibleSubmitPassPoints);
    const condition = useSelector(state => state.exam.condition);
    const [visibleFullScreenFB, setVisibleFullScreenFB] = useState(false)
    const [visibleExam, setvisibleExam] = useState(false)
    const [tbSubmit, settbSubmit] = useState(false)
    const [renderExam, setrenderExam] = useState(false)
    const [a, setA] = useState(0)
    const [n, setN] = useState(0)
    const [dataOverviewSB, setDataOverviewSB] = useState([])
    const [essay, setEssay] = useState(false)
    const countAutoSubmit = useSelector(state => state.exam.countAutoSubmit);
    const formAutoSubmit = useSelector(state => state.exam.formAutoSubmit);
    const [useID] = useState(getCurrentUserDefault().UserId)
    useEffect(() => {
        if (props.NodeID) {
            loadApi()
        }
    }, [props.NodeID]);
    const reattempt = () => {
        const action = setVisibleSubmitPassPoints(false)
        dispatch(action);
        setvisibleExam(true)
        const action1 = setShowReview(false)
        dispatch(action1);
        const action3 = setCountAutoSubmit(0)
        dispatch(action3);
        const action4 = setformAutoSubmit(false)
        dispatch(action4);
        //settype('START')
        //setrenderExam(true)
        localStorage.removeItem('timelocal' + '_' + useID + '_' + props.NodeID);
        props.onchange()
    }
    const loadApi = async () => {
        if (visible == true) {
            const paramReview = {
                "CourseLaunchId": CourseLaunch_Id,
                "NodeId": NodeID,
                "ContentId": ContentId,
                "StudentId": 0,
            }

            let OverviewAssessmentReport = await performExamService.OverviewAssessmentReport(paramReview);
            let dataOverview = OverviewAssessmentReport.data.OverviewAssessmentReportDetail.Table
            let a = 0
            let n = 0
            for (let i = 0; i < dataOverview.length; i++) {
                if (dataOverview[i].BT_RSLTS_ANSWRS == 0) {
                    n++
                }
                if (dataOverview[i].BT_RSLTS_ANSWRS == 1) {
                    a++
                }
                if (dataOverview[i].NM_QSTN_TYP == 7) {
                    setEssay(true)
                }
            }
            setA(a)
            setN(n)
            setDataOverviewSB(dataOverview)
        }

        // dispatch(setLoadApiOverView(true))



    }
    const renderreattempt = (val) => {
        return (
            <> {val == false && <Button style={{ marginLeft: '3rem' }} label="Làm lại" onClick={() => reattempt()} icon="pi pi-check" />}</>

        );
    }
    const render = (value) => {
        if (value === true) {
            return (<>
                <Exam visibleExam={visibleExam} CourseLaunch_Id={CourseLaunch_Id} type='START'></Exam>
            </>)
        }
    }
    const renderBC = (value) => {
        //console.log('val', value)
        if (value?.ReportReqd === "True") {
            return (<>
                <Sidebar className='sidebar-header-none' visible={visibleFullScreenFB} fullScreen onHide={() => closeFullScreenFB()}>
                    {
                        <>
                            <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeFullScreenFB()} />
                            <DiemBaiThi data={value} />
                        </>
                    }
                </Sidebar>
            </>)
        }
        else {
            return (
                <>
                    <Thongbaosubmit tbSubmit={tbSubmit} onchange={() => settbSubmit(false)}></Thongbaosubmit>
                </>
            )

        }

    }
    const closeFullScreenFB = () => {
        const action1 = setoffautosb(false)
        dispatch(action1);
        setVisibleFullScreenFB(false)
        const action = setvisibleDialog(false)
        dispatch(action);
        localStorage.removeItem('timelocal' + '_' + useID + '_' + props.NodeID);
        const action3 = setCountAutoSubmit(0)
        dispatch(action3);
        const action4 = setformAutoSubmit(false)
        dispatch(action4);
    }
    const close = () => {
        const action = setvisibleDialog(false)
        dispatch(action);
        const action1 = setoffautosb(false)
        const action2 = setShowReview(false)
        dispatch(action2);
        dispatch(action1);
        console.log('props.NodeID', props.NodeID)
        localStorage.removeItem('timelocal' + '_' + useID + '_' + props.NodeID);
        const action3 = setVisibleSubmitPassPoints(false)
        dispatch(action3);
        const action4 = setCountAutoSubmit(0)
        dispatch(action4);
        const action5 = setformAutoSubmit(false)
        dispatch(action5);
    }
    const done = () => {
        const action = setVisibleSubmitPassPoints(false)
        dispatch(action);
        if (openassessment?.ReportReqd === "True") {
            setVisibleFullScreenFB(true)
        }
        else {
            settbSubmit(true)
        }
        const action1 = setShowReview(false)
        dispatch(action1);
        localStorage.removeItem('timelocal' + '_' + useID + '_' + props.NodeID);
        props.onchange()
        const action3 = setCountAutoSubmit(0)
        dispatch(action3);
        const action4 = setformAutoSubmit(false)
        dispatch(action4);
        dispatch(setoffautosb(false));
    }
    const footerContent = (
        <div>
            {openassessment.ReportReqd === "True" &&
                <Button label="Xem báo cáo thi" onClick={() => done()} icon="pi pi-check" />
            }

            {condition == true ? '' : (AttemptsLeft > 0 ? renderreattempt(essay) : '')}
            <Button style={{ marginLeft: '3rem' }} label="Thoát" onClick={() => close()} icon="pi pi-check" />
        </div>
    );
    const renderEssay = () => {
        return (
            dataOverviewSB.map((dataItem, index) => {
                if (dataItem?.NM_QSTN_TYP == 7) {
                    return (
                        <>
                            <div className="p-3">
                                <span>
                                    Tự luận câu {index + 1}: {dataItem?.DSCRPTV_COUNT == null ? 0 : dataItem?.DSCRPTV_COUNT} ký tự
                                </span>

                            </div>
                        </>
                    )
                }
            })
        )

    }
    const overView = () => {
        if (formAutoSubmit == true) {
            return (
                <>
                    <div className="d-flex justify-content-end" >
                        <div className="displayedTime mr-5"><h1 style={{ color: 'red' }}>
                            HẾT GIỜ</h1></div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }


    }
    return (
        <>
            <Dialog focusOnShow={false} header={overView} visible={visible} style={{ width: "50vw", backgroundColor: '#d3d3d3' }} onHide={() => close()} footer={footerContent}>

                <div className="card-header">
                    <div className="media-body " style={{ marginTop: '10px' }}>
                        <div className='text-center'>
                            <h2>
                                Bài thi đã được nộp thành công!
                            </h2>
                        </div>

                        <div style={{ marginTop: '1.5rem', width: '100%' }}>
                            <p style={{ fontSize: '1.2rem' }}>
                                {essay == true ? 'Bài thi chứa câu hỏi tự luận. Điểm cho bài thi sẽ được cập nhập sau khi câu tự luận được chấm điểm.' : (condition == true ? 'Xin chúc mừng! Bạn đã vượt qua bài thi này.' : 'Bạn đã không vượt qua bài thi.')}
                            </p>
                        </div>

                        <div style={{ marginTop: '-10px', width: '100%' }}>
                            <span style={{ fontSize: '1.2rem' }}>Số câu đã trả lời: </span>
                            {a == openassessment?.TotalQuestionCount ?
                                <span style={{ fontSize: '1.2rem', color: 'green', fontWeight: 'bold' }}>{a}/{openassessment?.TotalQuestionCount}</span>
                                :
                                <span style={{ fontSize: '1.2rem', color: 'red', fontWeight: 'bold' }}>{a}/{openassessment?.TotalQuestionCount}</span>
                            }
                        </div>
                        <div className="d-flex flex-column text-left mt-4">
                            {renderEssay()}
                        </div>
                        {/* <Button className="rounded-pill" label="Thoát" style={{ float: 'right', marginRight: '30px', marginTop: '13rem' }} onClick={() => {
            const action1 = setFormNotificationAutoSB(false)
            dispatch(action1)
            const action = setvisibleDialog(false)
            dispatch(action)
            const action2 = setShowReview(false)
            dispatch(action2);
        }} /> */}

                    </div>
                </div>

            </Dialog>
            {/* {render(renderExam)} */}
            {renderBC(openassessment)}



        </>
    )
}
NotificationSubmitPassPoints.propTypes = {
    onchange: PropTypes.func,
    onchangereattempt: PropTypes.func,
};
NotificationSubmitPassPoints.defaultProps = {
    onchange: () => { },
    onchangereattempt: () => { },
}
export default NotificationSubmitPassPoints;