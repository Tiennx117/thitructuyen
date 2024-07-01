import { Editor } from 'primereact/editor';
import { BsFlagFill } from "react-icons/bs";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react'
import { InputTextarea } from "primereact/inputtextarea";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import '../exam.scss';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import { useExamDescriptive } from 'hooks/useExamDescriptive'
import useDebounce from 'shared/hooks/useDebounce';
import { lmslogService } from 'services/lmslogService';
import { vietUni } from 'shared/utils/vietuni-min';
import ReactPlayer from 'react-player';


const CkeditorQuestion = (props) => {

    const { item, addOrUpdate, getItemById } = useExamDescriptive();
    const { datadquestion, oder, CourseCode } = props
    //console.log('datadquestion',datadquestion)
    const [dataCkeditor, setdataCkeditor] = useState("")
    const [useID] = useState(getCurrentUserDefault().UserId)
    const offautosb = useSelector(state => state.exam.offautosb);
    const exam_id_DBlocal = useID + "_" + props.nodeId + "_" + datadquestion.QuestionId
    useEffect(() => {
        getId()

    }, [datadquestion.QuestionId])
    const getId = async () => {
        let ckeditorStr = await getItemById(exam_id_DBlocal)
        //console.log('ckeditorStr', exam_id_DBlocal, ckeditorStr?.answer)
        if (ckeditorStr) {
            //setdataCkeditor(ckeditorStr.answer);
            document.getElementById('textVietUni').value = ckeditorStr.answer;
            props.onChange(ckeditorStr.answer)
        } else {
            //console.log('datadquestion?.UserResponse', exam_id_DBlocal, datadquestion?.UserResponse)
            //setdataCkeditor(datadquestion?.UserResponse);
            document.getElementById('textVietUni').value = datadquestion?.UserResponse;
            let date = new Date()
            let time = date.getTime()
            let answer = {
                id: useID + "_" + props.nodeId + "_" + datadquestion.QuestionId,
                question_id: datadquestion.QuestionId,
                useID_nodeId: useID + "_" + props.nodeId,
                answer: datadquestion?.UserResponse,
                time: time
            }
            addOrUpdate(answer);
            props.onChange(datadquestion?.UserResponse)
        }
    }
    // useEffect(() => {
    //     //debugger
    //     try {
    //         props.onChange(document.getElementById('textVietUni').trim())
    //     } catch (e) { }

    // }, [])

    // useEffect(() => {
    //     props.onChange(dataCkeditor)
    // }, [])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         if (props.time5s !== undefined) {
    //             localStorage.setItem('timelocal' + '_' + useID + '_' + props.nodeId, props.time5s)
    //         }
    //     }
    // }, [props.time5s])
    const renderImg = () => {
        if (datadquestion?.InlineImage == "True") {
            if (datadquestion?.AttachedFile == "0") {
                return (
                    <>
                    </>
                )
            }
            else {
                const lastThreeCharacters = datadquestion.AttachedFileURL.substr(datadquestion.AttachedFileURL.length - 3);
                if(lastThreeCharacters=='mp3'){
                    return (
                        <>
                        <audio controls>
                            <source src={datadquestion.AttachedFileURL} type="audio/mpeg"/>
                        </audio>
                        </>
                    )
                }
                else{
                    return (
                        <>
                            {datadquestion.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={datadquestion.AttachedFileURL}
                                        width='100%'
                                        height='100%'
                                        pip={true}
                                        playing={true}
                                        controls={true}
                                        loop={true}
                                        volume={true}
                                        muted={false}>
                                    </ReactPlayer>
    
                                </div>
                                :
                                <div> <ImagePreview width={270} height={170} preview src={datadquestion.AttachedFileURL}></ImagePreview></div>
                            }
                            
                        </>
                    )
                }
                
            }

        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(datadquestion.AttachedFileURL)}>{datadquestion.AttachedFile} </a></div>
                </>
            )
        }

    }


    const debounceddataCkeditor = useDebounce(document.getElementById('textVietUni'), 500);
    //Effect for API call
    useEffect(
        () => {
            let valuetext = debounceddataCkeditor
            if (!debounceddataCkeditor) {
                valuetext = ''
            }
            try {
                lmslogService.createLog(props.courseId, props.nodeId, datadquestion.QuestionId, CourseCode, datadquestion.Question, valuetext)
            } catch {

            }
        },
        [debounceddataCkeditor] // Only call effect if debounced search term changes
    );

    //const [vietnameseTyping, setVietnameseTyping] = useState(false);
    useEffect(() => {
        const vUni = new vietUni();
        if (vUni) {
            // Enables Vietnamese typing for the InputTextarea
            const inputTextarea = document.getElementById('textVietUni');
            vUni.initTyper(inputTextarea);
            vUni.setMethod(4);
            // if (vietnameseTyping === true) {
            //     vUni.setMethod(4);
            // } else {
            //     vUni.setMethod(0);
            // }

        }
    }, []);

    function simulateSpaceKeyPress() {
        let inputTextarea = document.getElementById('textVietUni');
        if (inputTextarea) {
            const event = new KeyboardEvent('key', {
                key: ' ',
                keyCode: 32,
            });

            inputTextarea.dispatchEvent(event);
        }

    }

    // function simulateSpaceKeyPress() {
    //     let inputTextarea = document.getElementById('inputTextarea');
    //     if (inputTextarea) {
    //         const event = new KeyboardEvent('keydown', {
    //             key: ' ',
    //             keyCode: 32,
    //             which: 32,
    //             code: 'Space',
    //             bubbles: true,
    //         });

    //         inputTextarea.dispatchEvent(event);
    //     }
    // }



    return (
        <>
            <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }} >
                {/* <div className='d-flex flex-row justify-content-between'>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{props.oder}:&nbsp;</div>
                    <div>
                        {vietnameseTyping == false ?
                            <a className='vietnamese-typing-btn' onClick={() => setVietnameseTyping(!vietnameseTyping)}>Hỗ trợ gõ tiếng việt</a>
                            :
                            <a className='vietnamese-typing-btn-on' >Hỗ trợ gõ tiếng việt</a>
                        }

                    </div>
                </div> */}
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{props.oder}:&nbsp;</div>

                <p dangerouslySetInnerHTML={{ __html: datadquestion.Question }}></p>
                {datadquestion.Attachment == "True" && renderImg()}

                <InputTextarea id="textVietUni" style={{ minHeight: '300px', width: '100%' }}
                    onChange={(e) => {
                        let date = new Date()
                        let time = date.getTime()
                        let answer = {
                            id: useID + "_" + props.nodeId + "_" + datadquestion.QuestionId,
                            question_id: datadquestion.QuestionId,
                            useID_nodeId: useID + "_" + props.nodeId,
                            answer: e.target.value,
                            time: time
                        }
                        addOrUpdate(answer);
                        if (e.target.value) {
                            props.onChange(e.target.value)
                        }
                    }}
                    onBlur={(e) => {
                        console.log(e.target.value);
                        simulateSpaceKeyPress();

                        //setdataCkeditor(e.target.value);

                        if (e.target.value) {
                            props.onChange(e.target.value)
                        }
                        //props.onChange(e.target.value != undefined ? e.target.value : '')

                    }} />
            </div>

        </>
    )
}
CkeditorQuestion.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
CkeditorQuestion.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default CkeditorQuestion;