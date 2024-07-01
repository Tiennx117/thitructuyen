import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { useForm, Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';

const FormAddVideoPLYLst = (props) => {
    const { visiblefull, onclickshow, subAddList, editCheck, valueTitle } = props;
    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const [valueInput, setvalueInput] = useState(valueTitle)
    const [checked, setChecked] = useState(true);
    const toast = useRef(null);
    const closeShare = () => {
        reset();
        onclickshow();
        setvalueInput('')
    }
    const changInput = (e) => {
        setvalueInput(e.target.value);
    }
    const onSubmit = () => {
        if (valueInput != "") {
            let obj = {
                valueInput: valueInput,
                editCheck: editCheck
            }
            subAddList(obj);
            setvalueInput('');
            reset();
        }
        else {
            alert("Vui lòng nhập tên danh sách");
        }

    }
    useEffect(() => {
        // call api here
        setvalueInput(valueTitle)
    }, [valueTitle]);
    return (
        <>
            <Sidebar visible={visiblefull} position='center' onHide={() => closeShare()} style={{ width: '30%', minHeight: '35%' }}>
                <div style={{ position: 'absolute', zIndex: 9, top: 15, textAlign: 'center', right: 0, left: 0, width: '90%' }}>
                    <h4>{editCheck ? 'Chỉnh sửa danh sách phát' : 'Tạo danh sách phát mới'}</h4>
                </div>
                <form style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <input value={valueInput} onChange={(e) => changInput(e)} style={{ width: '100%' }} className="form-control" type="text" placeholder='Nhập tên danh sách'></input>
                            <span style={{ color: 'red', fontSize: 20, marginLeft: 10 }}> *</span>
                        </div>
                        {/* <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: '500' }}>Phát ngẫu nhiên</div>
                                <div style={{ fontStyle: 'italic' }}>Luôn phát ngẫu nhiên tất cả video</div>
                            </div>
                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                        </div> */}
                        <div style={{ marginTop: '20%', width: '100%', justifyContent: 'center', display: 'flow' }}>
                            <Button type='submit' style={{ borderRadius: 20, width: '100%', textAlign: 'center', paddingLeft: 30, paddingRight: 30, display: 'flow', backgroundColor: '#1aa1dc' , color:'#ffff'}}>Tạo mới</Button>
                        </div>
                    </div>

                </form>
            </Sidebar>
        </>
    )
}

export default FormAddVideoPLYLst;