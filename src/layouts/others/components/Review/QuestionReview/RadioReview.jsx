import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const RadioQuestionRV = (props) => {
    const {item,index}=props
    const[dataRadioN,setdataRadioN]=useState('')
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    useEffect(() => {
        //console.log('123',datamcqquestion)
        setdataRadioN(item.data[0]?.NM_RESPONSE_3)
    }, [item])
    function renderRadio(){
        return(
            item.data.map((dataItem,index) => {
                // console.log('dataItem',dataItem?.NM_ANSWR_ID)
                // console.log('dataRadioN',dataRadioN)
                let strID= String(dataItem?.NM_ANSWR_ID)
                let strdataRadioN = String(dataRadioN)
                return(
                    <>
                    <div className="field-radiobutton">
                    <RadioButton disabled name='flexRadioDefault' inputId={'flexRadioDefault'+index} value={dataItem?.NM_ANSWR_ID} onChange={(e) => setdataRadioN(e.value)} checked={strdataRadioN === strID} />
                    {/* <input className="form-check-input" value={dataItem?.NM_ANSWR_ID} type="radio" onChange={event=>setdataRadioN(event.target.value)} checked={strdataRadioN===strID}  name='flexRadioDefault' inputId={'flexRadioDefault'+index} /> */}
                    <label htmlFor={'flexRadioDefault'+index}>
                        <div dangerouslySetInnerHTML={{__html: dataItem?.VC_ANSWR_TXT}}></div>
                        
                    </label>
                </div>
                    </>
                )
            })
        )
    }
    return (
        <>
            <div className="d-flex flex-column bd-highlight mb-1">
                <div className="p-2 bd-highlight"><span class="badge bg-secondary">Chọn đáp án đúng</span>
                
                    {item?.aswer==='N'?
                    <span className="p-2 bd-highlight" style={{color:'red'}}>Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    :
                    <>
                <span className="p-2 bd-highlight">Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    <div className="pt-2 pl-2 mt-2 bd-highlight">
                    {renderRadio()}</div>
                    </>
                    
                    }
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
RadioQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
RadioQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default RadioQuestionRV;
