import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const CkeditorQuestionRV = (props) => {
    const { item, index } = props
    return (
        <>
            <div className="d-flex flex-column bd-highlight">
                <div className="p-2 bd-highlight"><span class="badge bg-secondary">Câu tự luận</span>
                    {item?.aswer === 'N' ?
                        <span className="p-2 bd-highlight" style={{ color: 'red' }}>Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                        :
                        <>
                            <span className="p-2 bd-highlight">Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                            <div className="pt-2 bd-highlight">
                                <p className="pb-0 mb-0 mt-2" style={{ fontWeight: 'bold'}}>Trả lời: </p>
                                <span>{item?.data[0].NM_RESPONSE_7}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
CkeditorQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
CkeditorQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default CkeditorQuestionRV;
