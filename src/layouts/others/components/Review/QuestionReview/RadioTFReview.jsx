import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const RadioTFQuestionRV = (props) => {
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    const { item, index } = props
    const [dataRadio, setdataRadio] = useState('')
    useEffect(() => {
        let str = item?.data[0].NM_RESPONSE_1
        setdataRadio(str)
    }, [item])
    return (
        <>
            <div className="d-flex flex-column bd-highlight mb-2">
                <div className="p-2 bd-highlight">
                    <span class="badge bg-secondary">Chọn đúng sai</span> 
                

                {item?.aswer === 'N' ?
                    <span className="p-2 bd-highlight" style={{ color: 'red', lineHeight: '16px' }}>Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    :
                    <>
                       
                        {/* <div className="p-2 bd-highlight"> */}
                            <span className="p-2 bd-highlight" style={{ lineHeight: '16px'}}>Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                            <div className="p-2 bd-highlight mt-2">
                                <div className="">
                                    <RadioButton disabled inputId="flexRadioDefault1" value="true" onChange={(e) => setdataRadio(e.value)} checked={dataRadio === true} name='flexRadioDefault1' />
                                    <label htmlFor="flexRadioDefault1" className="ml-2">
                                        Đúng
                                    </label>
                                </div>
                            </div>
                            <div className="p-2 bd-highlight">
                                <div className="">
                                    <RadioButton disabled inputId="flexRadioDefault2" value="false" onChange={(e) => setdataRadio(e.value)} checked={dataRadio === false} name='flexRadioDefault2' />
                                    <label htmlFor="flexRadioDefault2" className="ml-2">
                                        Sai
                                    </label>
                                </div>
                            </div>
                        {/* </div> */}
                    </>

                }
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
RadioTFQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
RadioTFQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default RadioTFQuestionRV;
