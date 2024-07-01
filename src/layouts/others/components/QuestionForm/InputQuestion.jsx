import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types';
import '../exam.scss';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import ReactPlayer from 'react-player';
const test = [
    {
        id: '1',
        VC_ANSWR_TXT: 'test 1'
    },
    {
        id: '2',
        VC_ANSWR_TXT: 'test 2'
    }
]
const InputQuestion2 = (props) => {
    const { datafibquestion } = props
    const offautosb = useSelector(state => state.exam.offautosb);
    const [dataInput, setdataInput] = useState([])
    const convertStr = (arr) => {
        let arr1 = [...arr]
        let a = 0
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] == '' || arr1[i] == "") {
                a++
            }
        }
        if (a == arr1.length) {
            return ""
        }
        else {
            return arr1.join("~")
        }

    }
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID,props.nodeId,props.time5s)
    //     }
    // }, [props.time5s])

    useEffect(() => {
        if (datafibquestion?.AnswerDetails.Table1?.length > 0) {
            let t = JSON.parse(JSON.stringify(datafibquestion?.AnswerDetails.Table1));
            let temp = [...t];
            temp = temp.map(x => x.VC_ANSWR_TXT);
            setdataInput(temp)
            props.onChange(convertStr(temp))
        } else {
            let arrdata = []
            for (let i = 0; i < datafibquestion?.AnswerCount; i++) {
                arrdata.push('')
            }
            setdataInput(arrdata)
            props.onChange(convertStr(arrdata))
        }
    }, [datafibquestion])
    useEffect(() => {
        if (props.count == 0) {
            props.onChange(convertStr(dataInput))
            props.onSubmit('submit')
        }
    }, [props.count])
    // useEffect(() => {
    //     props.onChange(dataInput)
    // }, [])
    const renderImg = () => {
        if (datafibquestion?.InlineImage == "True") {
            if (datafibquestion?.AttachedFile == "0") {
                return (
                    <></>
                )
            }
            else {
                const lastThreeCharacters = datafibquestion.AttachedFileURL.substr(datafibquestion.AttachedFileURL.length - 3);
                if(lastThreeCharacters=='mp3'){
                    return (
                        <>
                        <audio controls>
                            <source src={datafibquestion.AttachedFileURL} type="audio/mpeg"/>
                        </audio>
                        </>
                    )
                }
                else{
                    return (
                        <>
                            {datafibquestion.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={datafibquestion.AttachedFileURL}
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
                                <div> <ImagePreview width={270} height={170} preview src={datafibquestion.AttachedFileURL}></ImagePreview></div>
                            }
                            
                        </>
                    )
                }
                
            }
        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(datafibquestion.AttachedFileURL)}>{datafibquestion.AttachedFile} </a></div>
                </>
            )
        }

    }
    const onChangeInput = (value, index) => {
        dataInput[index] = value
        let temp1 = [...dataInput];
        setdataInput(temp1);
        props.onChange(convertStr(temp1))
    }
    const renderInput = () => {
        return (
            datafibquestion?.AnswerDetails?.Table.map((dataItem, index) => {
                return (<>
                    <div key={index}>
                        <input autofocus type="text" style={{ marginTop: '1rem', width: '50%' }} className="form-control" value={dataInput[index]} onChange={e => onChangeInput(e.target.value, index)} placeholder={"Nhập câu trả lời " + (index + 1)} aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </>)
            })
        )
    }
    return (
        <>

            <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{(props.oder)}:&nbsp;</div>
                <p dangerouslySetInnerHTML={{ __html: datafibquestion?.Question }}></p>
                {datafibquestion.Attachment == "True" && renderImg()}
                {/* <div className="input-group mb-3 w-30" onChange={event => setdataInput(event.target.value)} style={{ width: '30%', marginTop: '1rem' }}>
                    <input type="text" className="form-control" value={dataInput} placeholder="Nhập câu trả lời" aria-label="Username" aria-describedby="basic-addon1" />
                </div> */}
                {renderInput()}
            </div>
        </>
    )
}
InputQuestion2.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
InputQuestion2.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
const InputQuestion = memo(InputQuestion2)
export default InputQuestion;