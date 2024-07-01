import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../exam.scss';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import ReactPlayer from 'react-player';
const RadioTFQuestion = (props) => {

    const { datatfquestion } = props
    const [dataRadio, setdataRadio] = useState('')
    const offautosb = useSelector(state => state.exam.offautosb);
    //props.onChange(dataRadio)
    useEffect(() => {
        setdataRadio(datatfquestion?.UserResponse.toLowerCase())
        props.onChange(datatfquestion?.UserResponse.toLowerCase())
    }, [datatfquestion])
    useEffect(() => {
        if (props.count == 0) {
            props.onChange(dataRadio)
            props.onSubmit('submit')
        }
    }, [props.count])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID, props.nodeId, props.time5s)
    //     }
    // }, [props.time5s])
    const renderImg = () => {
        if (datatfquestion?.InlineImage == "True") {
            if (datatfquestion?.AttachedFile == "0") {
                return (
                    <></>
                )
            }
            else {
                const lastThreeCharacters = datatfquestion.AttachedFileURL.substr(datatfquestion.AttachedFileURL.length - 3);
                if(lastThreeCharacters=='mp3'){
                    return (
                        <>
                        <audio controls>
                            <source src={datatfquestion.AttachedFileURL} type="audio/mpeg"/>
                        </audio>
                        </>
                    )
                }
                else{
                return (
                    <>
                        {datatfquestion.AttachedFileURL.indexOf('mp4') > 0 ?
                            <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                <ReactPlayer
                                    // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                    url={datatfquestion.AttachedFileURL}
                                    width='100%'
                                    height='100%'
                                    pip={true}
                                    playing={true}
                                    controls={true}
                                    loop={false}
                                    volume={true}
                                    muted={false}>
                                </ReactPlayer>

                            </div>
                            :
                            <div> <ImagePreview width={270} height={170} preview src={datatfquestion.AttachedFileURL}></ImagePreview></div>
                        }
                        
                    </>
                )}
            }

        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(datatfquestion.AttachedFileURL)}>{datatfquestion.AttachedFile} </a></div>
                </>
            )
        }

    }
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    return (
        <>
            {/* <div className="card">
            <div className="question-title card-header bg-transparent">
            <div className="media align-items-center">
                    <div className="question-form media-left">
                    <span class="badge bg-secondary">Chọn đáp án đúng</span>
                    </div>
                    <div className="media-body">
                        
                    </div>
                    <div className="media-right" style={{float:'right'}}>
                        <span>Điểm:&nbsp;2</span>&nbsp;&nbsp;<BsFlagFill/>
                    </div>
                </div>
            </div> */}
            <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{(props.oder)}:&nbsp;</div>
                <p dangerouslySetInnerHTML={{ __html: datatfquestion?.Question }}></p>
                {datatfquestion.Attachment == "True" && renderImg()}
                <div >
                    <div className="field-radiobutton">
                        {/* <input className="form-check-input" onChange={(event)=>setdataRadio(event.target.value)} value="True" checked={dataRadio==="True"} type="radio" name="flexRadioDefault1" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                       Đúng
                    </label> */}
                        <RadioButton inputId="flexRadioDefault1" value="true" onChange={(e) => {
                            setdataRadio(e.value);
                            props.onChange(e.value)
                        }} checked={dataRadio === "true"} name='flexRadioDefault1' />
                        <label htmlFor="flexRadioDefault1">
                            Đúng
                        </label>
                    </div>
                    <div className="field-radiobutton">
                        {/* <input className="form-check-input" onChange={(event)=>setdataRadio(event.target.value)} value="Fales" checked={datatfquestion==="Fales"} type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                       Sai
                    </label> */}
                        <RadioButton inputId="flexRadioDefault2" value="false" onChange={(e) => {
                            setdataRadio(e.value)
                            props.onChange(e.value)
                        }} checked={dataRadio === "false"} name='flexRadioDefault2' />
                        <label htmlFor="flexRadioDefault2">
                            Sai
                        </label>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}
RadioTFQuestion.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
RadioTFQuestion.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default RadioTFQuestion;
