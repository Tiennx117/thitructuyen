import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { RadioButton } from 'primereact/radiobutton';
import '../exam.scss';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import ReactPlayer from 'react-player';
const RadioQuestion = (props) => {
    const { datamcqquestion } = props
    const [dataRadioN, setdataRadioN] = useState('')
    const offautosb = useSelector(state => state.exam.offautosb);

    //props.onChange(dataRadioN)
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    useEffect(() => {
        //console.log('123',datamcqquestion)
        console.log('datamcqquestion?.AttachedFileURL', datamcqquestion?.AttachedFileURL)
        setdataRadioN(datamcqquestion?.MCQInfo.Table1[0]?.NM_ANSWR_ID)
        props.onChange(datamcqquestion?.MCQInfo.Table1[0]?.NM_ANSWR_ID)
        console.log('da vao day')
    }, [datamcqquestion])
    useEffect(() => {
        if (props.count == 0) {
            props.onChange(dataRadioN)
            props.onSubmit('submit')
        }
    }, [props.count])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID,props.nodeId,props.time5s)
    //     }
    // }, [props.time5s])
    // useEffect(() => {
    //     props.onChange(dataRadioN)
    // }, [])
    const renderImg = () => {
        if (datamcqquestion?.InlineImage == "True") {
            if (datamcqquestion?.AttachedFile == "0") {
                return (
                    <>
                    </>
                )
            }
            else {
                const lastThreeCharacters = datamcqquestion.AttachedFileURL.substr(datamcqquestion.AttachedFileURL.length - 3);
                if(lastThreeCharacters=='mp3'){
                    return (
                        <>
                        <audio controls>
                            <source src={datamcqquestion.AttachedFileURL} type="audio/mpeg"/>
                        </audio>
                        </>
                    )
                }else{
                    return (
                        <>
                            {datamcqquestion.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={datamcqquestion.AttachedFileURL}
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
                                <div> <ImagePreview preview width={270} height={170} src={datamcqquestion?.AttachedFileURL}>{console.log('datamcqquestion?.AttachedFileURL', datamcqquestion?.AttachedFileURL)}</ImagePreview></div>
                            }
                        </>
                    )
                }
                
            }

        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(datamcqquestion?.AttachedFileURL)}>{datamcqquestion?.AttachedFile} </a></div>
                </>
            )
        }

    }
    const renderImgQ = (dataItem) => {
        //debugger
        //console.log('123',dataItem)
        if (dataItem?.BT_OPTN_AS_IMG == true) {
            if(dataItem?.VC_OPTN_IMG_URL.indexOf('mp3') > 0){
                return(
                    <>
                     <audio controls>
                            <source src={dataItem?.VC_OPTN_IMG_URL} type="audio/mpeg"/>
                        </audio>
                    </>
                )
            }
            else{
                if(dataItem?.VC_OPTN_IMG_URL.indexOf('mp4') > 0){
                    return(
                        <>
                         <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={dataItem?.VC_OPTN_IMG_URL}
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
                        </>
                    )
                }
                else{
                    return(
                        <>
                        <div style={{ marginTop: '2rem' }}> <ImagePreview width={270} height={170} preview src={dataItem?.VC_OPTN_IMG_URL}></ImagePreview></div>
                        </>
                    )
                }
            }
            // return (
            //     <>
            //         <div style={{ marginTop: '2rem' }}> <ImagePreview width={270} height={170} preview src={dataItem?.VC_OPTN_IMG_URL}></ImagePreview></div>
            //     </>
            // )
        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(dataItem?.VC_OPTN_IMG_URL)}>{dataItem?.VC_OPTN_IMG} </a></div>
                </>
            )
        }

    }
    function renderRadio() {
        return (
            datamcqquestion?.MCQInfo.Table.map((dataItem, index) => {
                // console.log('dataItem',dataItem?.NM_ANSWR_ID)
                // console.log('dataRadioN',dataRadioN)
                let strID = String(dataItem?.NM_ANSWR_ID)
                let strdataRadioN = String(dataRadioN)
                return (
                    <>
                        <div className="field-radiobutton">
                            <RadioButton name='flexRadioDefault' inputId={'flexRadioDefault' + index} value={dataItem?.NM_ANSWR_ID} onChange={(e) => {
                                setdataRadioN(e.value);
                                props.onChange(e.value)
                            }} checked={strdataRadioN === strID} />
                            {/* <input className="form-check-input" value={dataItem?.NM_ANSWR_ID} type="radio" onChange={event=>setdataRadioN(event.target.value)} checked={strdataRadioN===strID}  name='flexRadioDefault' inputId={'flexRadioDefault'+index} /> */}
                            <label htmlFor={'flexRadioDefault' + index}>
                                <div dangerouslySetInnerHTML={{ __html: dataItem?.VC_ANSWR_TXT }}></div>
                                {dataItem?.BT_OPTN_IMG == true && renderImgQ(dataItem)}

                            </label>
                        </div>
                    </>
                )
            })
        )
    }
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

                <p dangerouslySetInnerHTML={{ __html: datamcqquestion?.Question }}></p>
                {datamcqquestion.Attachment == "True" && renderImg()}
                {renderRadio()}
            </div>
            {/* </div> */}
        </>
    )
}
RadioQuestion.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
RadioQuestion.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default RadioQuestion;
