import React, { useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Image } from "primereact/image";
import { useState } from "react";
import PropTypes from 'prop-types';
import GalleryManager from 'modules/gallery/GalleryManager';
import { appSetting } from "shared/app-settings";
import { useDispatch, useSelector  } from 'react-redux';
import { setSelectedItems } from "store/gallery/gallerySlice";
const SelectImgItem = React.forwardRef((props, ref) => {
    //const ref = useRef(null);
    const dispatch = useDispatch();
    const gallerySelecteds = useSelector(state => state.gallery.selectedItems);
    const [displayBasic, setDisplayBasic] = useState(false);
    
    const onShow = ()=>{
        if(props.multiple){
            dispatch(setSelectedItems(props.value||[]));
        }
        
        setDisplayBasic(!displayBasic);
    }
    const onSelecteImage = (value) => {
        
        if(props.multiple){
            props.onSelectImage(gallerySelecteds);
            
        }else{
            props.onSelectImage(value);
        }
        setDisplayBasic(!displayBasic);
    }
    const clearItem = (value)=>{
        props.onSelectImage(null);
    }
    const clearItemMultiple = (index)=>{
        
        let value = Object.assign([], props.value);
        value.splice(index, 1)
        props.onSelectImage(Object.assign([], value));
       
    }
    const renderBody = () => {

        if (props.multiple==false && props.value) {
            return (<div className="d-flex flex-row justify-content-between w-100 border-bottom mb-1" >
                <div className="p-2 bd-highlight">
                    <Image src={appSetting.ADDRESS_API + '/' + props.value?.path} alt="Image" width="50" preview />
                </div>
                <div className="p-2 bd-highlight flex-grow-1">{props.value?.name}</div>
                <div className="p-2 bd-highlight"><i onClick={()=>clearItem(props.value)} className="p-button-rounded p-button p-button-text p-1 pi pi-times mr-2 flex align-items-center"></i></div>
            </div>)
        }
        if (props.multiple && props.value) {
            return (<>
            {props.value?.map((item, index)=>{
                return(<div key={item.id} className="d-flex flex-row justify-content-between w-100 border-bottom mb-1" >
                    <div className="p-2 bd-highlight">
                        <Image src={appSetting.ADDRESS_API + '/' + item?.path} alt="Image" width="50" preview />
                    </div>
                    <div className="p-2 bd-highlight flex-grow-1">{item?.name}</div>
                    <div className="p-2 bd-highlight"><i onClick={()=>clearItemMultiple(index)} className="p-button-rounded p-button p-button-text p-1 pi pi-times mr-2 flex align-items-center"></i></div>
                </div>)
            })}
                

                
            </>)
        }
    }
    return (<>
    {props.label?<label>{props.label}</label>:''}
       
        <div className="d-flex flex-column w-100 border">
            {renderBody()}
            <div className="align-items-center text-center" style={{height:'50px'}}>
                {/* <Button className="p-button-outlined p-button-secondary w-25" type="button" label="Chọn" onClick={() => setDisplayBasic(!displayBasic)}></Button> */}
                <i title="Upload/Chọn ảnh" onClick={() => onShow()} className="pi pi-image mt-2" style={{cursor:'pointer', fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}} />

            </div>

        </div>
        <Dialog header="Gallery" visible={displayBasic} style={{ width: '90vw' }} onHide={() => {
            setDisplayBasic(!displayBasic);
        }}>
            <GalleryManager multiple={props.multiple} onSelectImage={onSelecteImage} />
        </Dialog>
    </>)
});
SelectImgItem.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    onSelectImage: PropTypes.func,
    multiple: PropTypes.bool,
    label:PropTypes.string
};
SelectImgItem.defaultProps = {
    multiple: false,
    onSelectImage: () => { }
}

export { SelectImgItem as default, SelectImgItem };