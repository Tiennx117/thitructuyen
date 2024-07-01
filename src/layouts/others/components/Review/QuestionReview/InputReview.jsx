import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const InputQuestionRV = (props) => {
    const { item,index } = props
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    const renderInput = () => {
        return (
            item?.data.map((dataItem, index) => {
                return (<>
                    <div key={index}>
                        <input disabled type="text" style={{marginTop:'1rem',width:'50%'}} className="form-control" value={dataItem?.NM_RESPONSE_2==null?"":dataItem?.NM_RESPONSE_2} aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </>)
            })
        )
    }
    return (
        <>
            
            <div className="d-flex flex-column bd-highlight mb-1">
                <div className="p-2 bd-highlight"><span class="badge bg-secondary">Điền vào chỗ trống</span>
                
                    {item?.aswer==='N'?
                    <span className="p-2 bd-highlight" style={{color:'red'}}>Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    :
                    <>
                    <span className="p-2 bd-highlight" style={{ }}>Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    {renderInput()}
                    </>
                    
                    }
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
InputQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
InputQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default InputQuestionRV;
