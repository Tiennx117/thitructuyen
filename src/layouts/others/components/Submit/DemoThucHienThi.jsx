import { useEffect, useState } from "react";
import { openWindow } from "shared/utils";
import { appSetting } from "shared/app-settings";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { filedetailsService } from "services/filedetailsService";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from 'react';
import { performExamService } from "services/performExamService";
import { setFormNotificationAutoSB, setShowReview, setHideExam, setErr, updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
const DemoThucHienThi = (props) => {
    const { CourseLaunch_Id, NodeId, ContentId } = props
    const dispatch = useDispatch();
    //const [visibleFullScreenFB, setVisibleFullScreenFB] = useState(false);
    const loadApiOverView = useSelector(state => state.exam.loadApiOverView);
    const visibleFullScreenFB = useSelector(state => state.exam.formNotificationAutoSB);
    const [a, setA] = useState(0)
    const [n, setN] = useState(0)
    const [dataOverviewSB, setDataOverviewSB] = useState([])
    const visibleDialog1 = useSelector(state => state.exam.visibleDialog);
    //function renderfilecontroldetails() {
    //return (
    //dataFileDetails()
    // )
    //}
    useEffect(() => {
        if (loadApiOverView == false) {
            console.log('loadApiOverView')
            if (visibleFullScreenFB == true) {
                loadApi()
            }
        }


    }, [loadApiOverView,visibleFullScreenFB ]);
    const loadApi = async () => {
        const paramReview = {
            "CourseLaunchId": CourseLaunch_Id,
            "NodeId": NodeId,
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
        }
        setA(a)
        setN(n)
        setDataOverviewSB(dataOverview)
        console.log('OverviewAssessmentReport', OverviewAssessmentReport.data.OverviewAssessmentReportDetail.Table)
    }
    const footerContent = (
        <div>
            <Button label="Thoát" onClick={() => {
                const action1 = setFormNotificationAutoSB(false)
                dispatch(action1);
                const action2 = setShowReview(false)
                dispatch(action2);
            }} />
        </div>
    );


    const closeFullScreenFB = () => {
        const action1 = setFormNotificationAutoSB(false)
        dispatch(action1);
        const action2 = setShowReview(false)
        dispatch(action2);
    }
    const handleClickOpen = () => {
        const action1 = setFormNotificationAutoSB(true)
        dispatch(action1);
    };
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
        return (
            <>
                <div className="d-flex justify-content-end" >
                    <div className="displayedTime mr-5"><h1 style={{ color: 'red' }}>
                        HẾT GIỜ</h1></div>
                </div>
            </>
        )

    }
    return (
        <>
            {/* <Dialog visible={visibleFullScreenFB} fullScreen onHide={() => closeFullScreenFB()} style={{ minWidth: '90%' }}> */}
            <Dialog
                visible={visibleFullScreenFB}
                style={{ width: '50vw' }}
                // onHide={() => setvisible(false)} 
                focusOnShow={false}
                onHide={() => {
                    const action1 = setFormNotificationAutoSB(false)
                    dispatch(action1)
                    const action2 = setShowReview(false)
                    dispatch(action2);
                }}
                header={overView}
            >

                <div className="card-header">
                    <div className="media-body text-center" style={{ marginTop: '10px' }}>
                        <h2>
                            Bạn đã nộp bài thành công !
                        </h2>

                        <div className="d-flex justify-content-around mt-5">
                            <div>
                                <span style={{ fontSize: '20px' }}>Số câu đã trả lời</span>
                                <p className="mt-4" style={{ fontSize: '19px' }}>{a}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '20px' }}>Số câu chưa trả lời</span>
                                <p className="mt-4" style={{ fontSize: '19px' }}>{n}</p>
                            </div>
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

                <div className="card-body">

                </div>

            </Dialog>
        </>
    );
}


export default DemoThucHienThi;