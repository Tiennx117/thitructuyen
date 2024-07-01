import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { assessmentService } from 'services/assessmentService';

const DiemBaiThi = (props) => {
    const [expandedRows, setExpandedRows] = useState(null);

    const [dataAss] = useState(props.data);
    const [passingMark] = useState(props.data.PassingMark);
    const [dataFB, setDataFB] = useState({});
    const [infoAss, setInfoAss] = useState([]);
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userMiddleName = useSelector(state => state.oauth.UserMiddleName) || '';
    const userLastName = useSelector(state => state.oauth.UserLastName) || '';
    const EmailId = useSelector(state => state.oauth.EmailId) || '';


    useEffect(() => {
        loadApi(props.data);

    }, [expandedRows]);
    useEffect(() => {
        loadApi(props.data);

    }, [props.data]);
    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    const loadApi = async (data) => {
        const params = {
            "WelcomeMessage": data.WelcomeMessage,
            "ContentId": data.ContentId,
            "CourseId": data.CourseId,
            "CourseLaunchId": data.CourseLaunchId,
            "CourseName": data.CourseName,
            "CourseDescription": data.CourseDescription,
            "Description": data.Description,
            "ContentName": data.ContentName,
            "QuestionCount": data.QuestionCount,
            "TimeAllowed": data.TimeAllowed,
            "NodeId": data.NodeId,
            "NodeName": data.NodeName,
            "TotalMarks": data.TotalMarks,
            "IsRandomized": data.IsRandomized,
            "Status": data.Status,
            "Index": data.Index,
            "ParentScreenId": data.ParentScreenId,
            "TotalQuestionCount": data.TotalQuestionCount,
            "StudentId": data.StudentId,
            "IsStart": data.IsStart,
            "ReportReqd": data.ReportReqd,
            "TrainingMode": data.TrainingMode,
            "ForceAttempt": data.ForceAttempt,
            "ReattemptMessage": data.ReattemptMessage,
            "CriteriaIdList": data.CriteriaIdList,
            "QuestionCountList": data.QuestionCountList,
            "ExistingQuestionCount": data.ExistingQuestionCount,
            "AssessmentType": data.AssessmentType,
            "IsFinalized": data.IsFinalized,
            "AttemptsLeft": data.AttemptsLeft,
            "AttemptsRemaining": data.AttemptsRemaining,
            "NegativeMarking": data.NegativeMarking,
            "AllowFlagging": data.AllowFlagging,
            "Navigation": data.Navigation,
            "Restoration": data.Restoration,
            "ReviewModeEnable": data.ReviewModeEnable,
            "AssessmentAttemptLeftTime": data.AssessmentAttemptLeftTime,
            "AllowCurrentAssessmentTime": data.AllowCurrentAssessmentTime,
            "IsResumeAssessment": data.IsResumeAssessment,
            "AllowAutoSubmission": data.AllowAutoSubmission,
            "IsTimeBoundAssessment": data.IsTimeBoundAssessment,
            "Mode": data.Mode,
            "QuestionIdList": data.QuestionIdList,
            "QuestionTypeList": data.QuestionTypeList,
            "LastAttemptIndex": data.LastAttemptIndex,
            "ShowFeedback": data.ShowFeedback,
            "CurrentIndex": data.CurrentIndex,
            "Duration": data.Duration,
            "Submit": data.Submit,
            "FinalizeAssessment": data.FinalizeAssessment,
            "ActiveNodes": data.ActiveNodes,
            "CurrentQuestionId": data.CurrentQuestionId,
            "AttemptsLeftLevel": data.AttemptsLeftLevel,
            "AssessmentAllowedDuration": data.AssessmentAllowedDuration,
            "PassingMark": data.PassingMark,
            "AssessmentScore": data.AssessmentScore,
            "AssessmentMode": data.AssessmentMode,
            "IsReadyAssessment": data.IsReadyAssessment,
            "IsCourseExpired": data.IsCourseExpired,
            "IsAssessmentEvaluated": data.IsAssessmentEvaluated,
            "IsShowLastAttemptButton": data.IsShowLastAttemptButton,
            "IsSubmitD": data.IsSubmitD,
            "AltKeyLogout": data.AltKeyLogout,
        }
        let result = await assessmentService.getassessmentfeedbackreport(params);
        setDataFB(result.data.AssessmentFeedbackReportDetail);
        setInfoAss(result.data.AssessmentFeedbackReportDetail.Table1[0]);

    };

    function getQuestionTypeName(idType) {
        switch (idType) {
            case 1:
                return "Câu hỏi Đúng/Sai";
            case 2:
                return "Câu hỏi Điền vào chỗ trống";
            case 3:
                return "Câu hỏi Trắc nghiệm (1 đáp án)";
            case 4:
                return "Câu hỏi Trắc nghiệm (nhiều đáp án)";
            case 5:
                return "Câu hỏi Nối đáp án";
            case 6:
                return "Câu hỏi Sắp xếp";
            case 7:
                return "Câu hỏi Tự luận";
            default:
                return "Chưa rõ";
        }
    }

    return (
        <>
            <div className="d-flex flex-column text-center m-3">
                <h3>
                    {dataAss.NodeName}
                </h3>
                <div>
                    {dataAss.Description}
                </div>
            </div>
            <div style={{ paddingLeft: '15rem', fontWeight: '600' }} className="d-flex flex-column bd-highlight mb-3">
                <div className="p-2 bd-highlight"><span dangerouslySetInnerHTML={{ __html: userFirstName + ' ' + userMiddleName + ' ' + userLastName }}></span></div>
                <div className="p-2 bd-highlight">{EmailId}</div>
            </div>
            <Card title='Kết quả bài thi' className="mb-3" style={{ paddingLeft: '15rem' }}>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="float-input">Tên cuộc thi</label>
                        <span className="p-float-label">
                            <h6>{dataAss.CourseName}</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Chế độ thi</label>
                        <span className="p-float-label">
                            <h6>{dataAss.AssessmentMode}</h6>
                        </span>
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="float-input">Tên bài thi</label>
                        <span className="p-float-label">
                            <h6>{dataAss.NodeName}</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Tổng số điểm</label>
                        <span className="p-float-label">
                            {infoAss?.CH_ND_STTS == "P" ?
                                <h6>Đang chờ xử lý</h6>
                                :
                                <h6>{infoAss?.FL_MRKS_OBTND} / {infoAss?.FL_TTL_MRKS}</h6>
                            }

                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Tổng số câu hỏi</label>
                        <span className="p-float-label">
                            <h6>{dataAss.TotalQuestionCount}</h6>
                        </span>
                    </div>
                    {passingMark != "-" &&
                        <div className="col-3">
                            <label htmlFor="float-input">Xếp loại</label>
                            {
                                infoAss?.CH_ND_STTS == "P" ?
                                    <h6>Đang chờ xử lý</h6>
                                    :
                                    <span className="p-float-label">
                                        <h6>{infoAss?.FL_MRKS_OBTND >= passingMark ? 'Đỗ' : 'Trượt'}</h6>
                                    </span>
                            }
                        </div>
                    }
                </div>
            </Card>

            {dataFB.Table?.map((item, index) => (
                <div key={index} className="mb-3 " style={{ paddingLeft: '15rem' }}>
                    <div className='row'>
                        <span>
                            <a className='' style={{ display: 'inline-block', border: '1px solid #d9d9d9', background: '#e3e3e3', padding: '2px 10px', fontSize: '12px', color: '#3d4758', fontWeight: '400', borderRadius: '3px', marginTop: '10px' }}>{getQuestionTypeName(item.NM_QSTN_TYP)}</a>
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <label className="p-float-label">Câu hỏi <span>{index + 1}</span>: <span dangerouslySetInnerHTML={{ __html: item.VC_QSTN_TXT }}></span></label>

                        </div>
                        <div className="col-3">
                            <label className="p-float-label">Điểm: {item.FL_MRKS_OBTND == -1 ? "Đang chờ xử lý" : item.FL_MRKS_OBTND + '/' + item.FL_QSTN_LVL_MRKS}</label>
                        </div>
                    </div>
                    <div className='row'>
                        <i style={{ opacity: '0.6' }}>Phản hồi câu hỏi</i>
                        <p dangerouslySetInnerHTML={{ __html: item.VC_FDBCK }}></p>
                    </div>
                    <hr style={{ width: '80%' }}></hr>
                </div>
            ))}
        </>
    )
}
DiemBaiThi.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onCloseDiemBaiThi: PropTypes.func,

};
DiemBaiThi.defaultProps = {
    onCloseDiemBaiThi: () => { }
}
export default DiemBaiThi;