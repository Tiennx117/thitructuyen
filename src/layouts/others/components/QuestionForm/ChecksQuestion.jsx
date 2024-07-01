import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import PropTypes from 'prop-types';
import '../exam.scss';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
import ReactPlayer from 'react-player';
const ChecksQuestion = (props) => {
    const { datamrqquestion } = props
    //const [checked, setChecked]=useState(datamrqquestion?.MRQInfo.Table1)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const offautosb = useSelector(state => state.exam.offautosb);
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];
        console.log('e', e)
        //console.log('_selectedCategories',_selectedCategories)
        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                let selectedCategory = _selectedCategories[i];
                if (selectedCategory == e.target.value) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectedCategories(_selectedCategories);
        props.onChange(_selectedCategories)
    }

    useEffect(() => {
        let arr = []
        for (let i = 0; i < datamrqquestion?.MRQInfo.Table1.length; i++) {
            arr.push(datamrqquestion?.MRQInfo.Table1[i]?.NM_ANSWR_ID)
        }
        setSelectedCategories(arr)
        props.onChange(arr)
    }, [datamrqquestion])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID,props.nodeId,props.time5s)
    //     }
    // }, [props.time5s])
    useEffect(() => {
        if (props.count == 0) {
            props.onChange(selectedCategories)
            props.onSubmit('submit')
        }
    }, [props.count])
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
    function renderCheckbox() {
        return (
            datamrqquestion?.MRQInfo.Table.map((dataItem, index) => {
                return (
                    <div key={dataItem?.NM_ANSWR_ID} className="field-checkbox">
                        <Checkbox inputId={dataItem?.NM_ANSWR_ID} name="category" value={dataItem?.NM_ANSWR_ID} onChange={onCategoryChange} checked={selectedCategories.some((item) => item === dataItem?.NM_ANSWR_ID)} />
                        <label htmlFor={dataItem?.NM_ANSWR_ID} >
                            <div dangerouslySetInnerHTML={{ __html: dataItem?.VC_ANSWR_TXT }}></div>
                            {dataItem?.BT_OPTN_IMG === true && renderImgQ(dataItem)}

                        </label>
                    </div>
                )
            })
        )
    }

    const openVideo = () => {
        console.log('hahaha')
    }
    const renderImg = () => {
        if (datamrqquestion?.InlineImage == "True") {
            if (datamrqquestion?.AttachedFile == "0") {
                return (
                    <>
                    </>
                )
            }
            else {
                const lastThreeCharacters = datamrqquestion.AttachedFileURL.substr(datamrqquestion.AttachedFileURL.length - 3);
                if(lastThreeCharacters=='mp3'){
                    return (
                        <>
                        <audio controls>
                            <source src={datamrqquestion.AttachedFileURL} type="audio/mpeg"/>
                        </audio>
                        </>
                    )
                }
                else{
                    return (
                        <>
                            {datamrqquestion.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={datamrqquestion.AttachedFileURL}
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
                                <div> <ImagePreview width={270} height={170} preview src={datamrqquestion.AttachedFileURL}></ImagePreview></div>
                            }
    
                        </>
                    )
                }
                
            }
        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(datamrqquestion.AttachedFileURL)}>{datamrqquestion.AttachedFile} </a></div>
                </>
            )
        }

    }
    return (
        <>
            {/* <div className="card">
                <div className="question-title card-header bg-transparent">
                    <div className="media align-items-center">
                        <div className="question-form media-left">
                            <span class="badge bg-secondary">Chọn nhiều đáp án đúng</span>
                        </div>
                        <div className="media-body">
                        </div>
                        <div className="media-right" style={{ float: 'right' }}>
                            <span>Điểm:&nbsp;2</span>&nbsp;&nbsp;<BsFlagFill />
                        </div>
                    </div>
                </div> */}
            <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{(props.oder)}:&nbsp;</div>
                <p dangerouslySetInnerHTML={{ __html: datamrqquestion?.Question }}></p>
                {datamrqquestion.Attachment == "True" && renderImg()}
                <div style={{ marginTop: '1rem' }}>{renderCheckbox()}</div>

            </div>
            {/* </div> */}
        </>
    )
}
ChecksQuestion.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};
ChecksQuestion.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default ChecksQuestion;
