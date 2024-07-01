import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import Exam from '../Exam';
import { useEffect, useState, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { performExamService } from "services/performExamService";
import { useSelector, useDispatch } from 'react-redux';
import { render } from 'react-dom';
import { setTextCountDown, setShowReview, setvisibleDialog, setoffautosb } from 'store/perFormExam/perFormExam';
import RadioTFQuestionRV from "./QuestionReview/RadioTFReview"
import InputQuestionRV from "./QuestionReview/InputReview";
import RadioQuestionRV from "./QuestionReview/RadioReview"
import CheckQuestionRV from "./QuestionReview/ChecksReview";
import SentenceQuestionRV from "./QuestionReview/SentenceReview";
import SortQuestionRV from "./QuestionReview/SortReview";
import CkeditorQuestionRV from "./QuestionReview/CkeditorReview";
const ReviewExam = (props) => {
    const { courseName,contentName,CourseCode,strquestionTypeList,strquestionIdList, dataResumeas, openassessment, answeredListID, CourseLaunch_Id, NodeId, ContentId, questionIdList, questionTypeList, sortQuestionReview } = props
    const dispatch = useDispatch();
    //const { openassessment, essay, course_id, CourseLaunch_Id, condition, AttemptsLeft } = props
    const showReview = useSelector(state => state.exam.showReview);
    const [dataReviewExam, setDataReviewExam] = useState([])
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userMiddleName = useSelector(state => state.oauth.UserMiddleName) || '';
    const userLastName = useSelector(state => state.oauth.UserLastName) || '';
    const EmailId = useSelector(state => state.oauth.EmailId) || '';
    const textCountDown = useSelector(state => state.exam.textCountDown);
    const [a, setA] = useState()
    const [n, setN] = useState()
    useEffect(() => {
        if (showReview == true) {
            loadApi()
        }
    }, [showReview])
    const loadApi = async () => {
        const paramReview = {
            "CourseLaunchId": CourseLaunch_Id,
            "NodeId": NodeId,
            "ContentId": ContentId,
            "StudentId": 0,
        }
        // let answered = [...answeredListID]
        // console.log('ans', answeredListID)
        let ReviewAssessmentReport = await performExamService.ReviewAssessmentReport(paramReview);
        let arrID = [...questionIdList]

        let arrType = [...questionTypeList]
        let data = []
        for (let i = 0; i < arrType.length - 1; i++) {
            data = [...data, ...[{ id: arrID[i], aswer: '', type: arrType[i], data: [] }]]
        }
        let dataReview = ReviewAssessmentReport?.data.ReviewAssessmentReportDetail?.Table

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < dataReview.length; j++) {
                if (data[i].id == dataReview[j].NM_QSTN_ID) {
                    data[i].data = [...data[i].data, ...[dataReview[j]]]
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == 1) {
                if (data[i].data[0].NM_RESPONSE_1 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 2) {
                if (data[i].data[0].NM_RESPONSE_2 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 3) {
                if (data[i].data[0].NM_RESPONSE_3 == 0 || data[i].data[0].NM_RESPONSE_3 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 4) {
                if (data[i].data[0].NM_RESPONSE_4 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 5) {
                if (data[i].data[0].NM_RESPONSE_5 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 6) {
                if (data[i].data[0].NM_RESPONSE_6 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
            if (data[i].type == 7) {
                if (data[i].data[0].NM_RESPONSE_7 == null) {
                    data[i].aswer = 'N'
                }
                else {
                    data[i].aswer = 'A'
                }
            }
        }
        console.log('data Cuối cùng', data)
        let n = 0
        let a = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].aswer == 'A') {
                a++
            }
            if (data[i].aswer == 'N') {
                n++
            }
        }
        setA(a)
        setN(n)
        setDataReviewExam(data)
        //console.log('openassessment', data)
    }
    const close = () => {
    }
    const renderReview = (data) => {
        return (
            data.map((item, index) => {
                if (item?.type == 1) {
                    return (
                        <>
                            <RadioTFQuestionRV item={item} index={index}></RadioTFQuestionRV>
                        </>
                    )
                }
                if (item?.type == 2) {
                    return (
                        <>
                            <InputQuestionRV item={item} index={index}></InputQuestionRV>
                        </>
                    )
                }
                if (item?.type == 3) {
                    return (
                        <>
                            <RadioQuestionRV item={item} index={index}></RadioQuestionRV>
                        </>
                    )
                }
                if (item?.type == 4) {
                    return (
                        <>
                            <CheckQuestionRV item={item} index={index}></CheckQuestionRV>
                        </>
                    )
                }
                if (item?.type == 5) {
                    return (
                        <>
                            <SentenceQuestionRV strquestionIdList={strquestionIdList} strquestionTypeList={strquestionTypeList} CourseLaunch_Id={CourseLaunch_Id} NodeId={NodeId} questionIdList={questionIdList} questionTypeList={questionTypeList}   item={item} index={index}></SentenceQuestionRV>
                        </>
                    )
                }
                if (item?.type == 6) {
                    return (
                        <>
                            <SortQuestionRV sortQuestionReview={sortQuestionReview} item={item} index={index}></SortQuestionRV>
                        </>
                    )
                }
                if (item?.type == 7) {
                    return (
                        <>
                            <CkeditorQuestionRV item={item} index={index}></CkeditorQuestionRV>
                        </>
                    )
                }
            })
        )

    }
    function toHHMMSS(time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }
    return (
        <>

            <div className="card">
                <div className='d-flex' style={{ backgroundColor: '#e0e3e5', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='' style={{ fontSize: '1.5rem', fontWeight: 600 }}><span style={{ marginLeft: '2rem', marginTop: '2rem' }}> RÀ SOÁT BÀI THI</span></div>
                    <div className=''>
                        <div className="d-flex flex-column bd-highlight " style={{ fontSize: '1.2rem', }}>
                            <div className="pt-1 pr-2 bd-highlight">{userFirstName + ' ' + userMiddleName + ' ' + userLastName}</div>
                            <div className="pb-1 pr-2 bd-highlight">Email:{EmailId}</div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div className="d-flex flex-column bd-highlight" style={{ marginLeft: '2rem', fontSize: '1.1rem', }}>
                            <div className="bd-highlight">Tên khóa học</div>
                            <div className="pt-2 bd-highlight" style={{ fontWeight: 'bold' }}>{courseName}</div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="d-flex flex-column bd-highlight" style={{ fontSize: '1.1rem', marginLeft: '20px' }}>
                            <div className="bd-highlight">Mã khóa học</div>
                            <div className="pt-2 bd-highlight" style={{ fontWeight: 'bold' }}>{CourseCode}</div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div className="d-flex flex-column bd-highlight " style={{ marginLeft: '2rem', fontSize: '1.1rem', }}>
                            <div className="bd-highlight">Tên bài thi</div>
                            <div className="pt-2 bd-highlight" style={{ fontWeight: 'bold' }}>{contentName}</div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="d-flex flex-column bd-highlight" style={{ fontSize: '1.1rem', marginLeft: '20px' }}>
                            <div className="bd-highlight">Số câu đã trả lời</div>
                            <div className="pt-2 bd-highlight" style={{ fontWeight: 'bold', }}>
                                {a == openassessment?.TotalQuestionCount ?
                                    <p style={{ color: 'green' }}> {a}/{openassessment?.TotalQuestionCount}</p>
                                    :
                                    <p style={{ color: 'red' }}> {a}/{openassessment?.TotalQuestionCount}</p>
                                }

                            </div>
                        </div>
                    </div>

                </div>

                <div className="card-body">
                    {renderReview(dataReviewExam)}
                </div>
                {/* <div className="card-footer bg-transparent border-success">
                    <div style={{ float: 'right' }}> <Button onClick={() => props.onchange()} > Nộp bài </Button></div>

                </div> */}
            </div>
        </>
    )
}
ReviewExam.propTypes = {
    onchange: PropTypes.func,
};
ReviewExam.defaultProps = {
    onchange: () => { },
}
export default ReviewExam;