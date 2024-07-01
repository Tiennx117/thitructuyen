import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import Exam from '../Exam';
import { useEffect, useState, useRef } from 'react';
import DiemBaiThi from '../DiemBaiThi';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
const Thongbaosubmit = (props) => {
    const dispatch = useDispatch();

    const [visible, setvisible] = useState(false)
    useEffect(() => {
        if (props.tbSubmit) {
            setvisible(props.tbSubmit || false);
        }
    }, [props.tbSubmit])
    const exit = () => {
        setvisible(false)
        const action = setvisibleDialog(false)
        dispatch(action);
        props.onchange()
    }
    return (
        <>
            <Dialog header="Thông báo" visible={visible} style={{ width: "50vw", backgroundColor: '#d3d3d3' }} onHide={() => exit()}>
                <h5>Bạn đã gửi thành công</h5>
                <div>
                    <Button label="Đóng" onClick={() => exit()} icon="pi pi-check" autoFocus />

                </div>
            </Dialog>
        </>
    )
}
Thongbaosubmit.propTypes = {
    onchange: PropTypes.func
};
Thongbaosubmit.defaultProps = {
    onchange: () => { }
}
export default Thongbaosubmit;