import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import Exam from '../Exam';
import { useEffect, useState, useRef } from 'react';
import DiemBaiThi from '../DiemBaiThi';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setErr, setvisibleDialog } from 'store/perFormExam/perFormExam';
const Err = (props) => {
    const dispatch = useDispatch();

    const visible = useSelector(state => state.exam.err);
    const exit = () => {
        const action = setvisibleDialog(false)
        dispatch(action);
        const action1 = setErr(false)
        dispatch(action1);
    }
    return (
        <>
            <Dialog focusOnShow={false} header="Thông báo" visible={visible} style={{ width: "50vw", backgroundColor: '#d3d3d3' }} onHide={() => exit()}>
                <h5>Bài thi chưa sẵn sàng</h5>
                <div>
                    <Button label="Đóng" onClick={() => exit()} icon="pi pi-check" autoFocus />

                </div>
            </Dialog>
        </>
    )
}
Err.propTypes = {
    onchange: PropTypes.func
};
Err.defaultProps = {
    onchange: () => { }
}
export default Err;