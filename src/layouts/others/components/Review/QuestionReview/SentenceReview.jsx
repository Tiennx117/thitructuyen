import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import { performExamService } from "services/performExamService";
const SentenceQuestionRV = (props) => {
    const { strquestionTypeList,strquestionIdList,CourseLaunch_Id, NodeId, item, index,questionIdList,questionTypeList } = props
    const[dataleft,setDataleft]=useState([])
    const[dataright,setDataright]=useState([])
    useEffect(() => {
        loadApi();

    }, [index]);
    const loadApi = async (data) => {
        const paramSentenceQuestionRV = {
            "CourseLaunchId": CourseLaunch_Id,
            "NodeId": NodeId,
            "Index": index,
            "QuestionIdList": strquestionIdList,
            "QuestionTypeList": strquestionTypeList,
            "QuestionId": questionIdList[index],
        }
        let result = await performExamService.getmfquestion(paramSentenceQuestionRV);
        setDataleft(result.data.QuestionDetail.Table)
        setDataright(result.data.QuestionDetail.Table1)
        console.log('result',result)
    };
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    return (
        <>
            <div className="d-flex flex-column bd-highlight ">
                <div className="p-2 bd-highlight"><span class="badge bg-secondary">Chọn nối đáp án</span>
                    {item?.aswer === 'N' ?
                        <span className="p-2 bd-highlight" style={{ color: 'red' }}>Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html: item?.data[0].VC_QSTN_TXT }}></span></span>
                        :
                        <>
                            <span className="p-2 bd-highlight">Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html: item?.data[0].VC_QSTN_TXT }}></span></span>
                            <div className="pt-2 bd-highlight">
                                <div className="d-flex flex-row bd-highlight">
                                    <div className="p-2 bd-highlight">
                                        {dataleft?.map((item, index) => (
                                            <div index={index} style={{ backgroundColor: 'rgb(221, 221, 221)', padding: '8px', border: '1px soid black' }}>
                                                <div className="question-type5">
                                                    <div dangerouslySetInnerHTML={{ __html: item.VC_CHC_TXT }}></div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="p-2 bd-highlight">
                                        {dataright?.map((item, index) => (
                                            <div index={index} style={{ backgroundColor: 'rgb(221, 221, 221)', padding: '8px', border: '1px soid black' }}>
                                                <div className="question-type5">
                                                    <div dangerouslySetInnerHTML={{ __html: item.VC_CRRCT_MTCH }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>

            </div>
            {/* </div> */}
        </>
    )
}
SentenceQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
SentenceQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default SentenceQuestionRV;
