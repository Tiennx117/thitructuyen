import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { imgService } from 'services/imgService';
import { mapPaginator } from 'shared/utils';
import dayjs from 'dayjs';
import Permission from 'components/Permission';
import { Image } from 'primereact/image';
import { appSetting } from 'shared/app-settings';
import { Paginator } from 'primereact/paginator';
import { confirmDialog } from 'primereact/confirmdialog';
import './GalleryImg.scss';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss'
import { selected } from 'store/gallery/gallerySlice';
import { useDispatch, useSelector  } from 'react-redux';
function getUrlParam(paramName) {
    var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
    var match = window.location.search.match(reParam);
  
    return (match && match.length > 1) ? match[1] : null;
  }
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const ImgList = (props) => {
    const dispatch = useDispatch();
    const gallerySelecteds = useSelector(state => state.gallery.selectedItems);
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ });
    const [displayBasic, setDisplayBasic] = useState(false);
    let query = useQuery();
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 20,
        page: 0,
        sortField: 'created_at_utc',
        sortOrder: true,
        key_search:''
    });
    useEffect(() => {
        loadLazyData();
    }, [])
    const loadLazyData = () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        
        imgService.filterPage(advanceSearch).then(res => {
            setTotalRecords(res.data.total);
            setCustomers(res.data.data);
            setLoading(false);
        })
        //imitate delay of a backend call
    }
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        setLazyParams(event);
    }

    const onFilter = (event) => {
        event['first'] = 0;
        setLazyParams(event);
    }
    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedCustomers(value);
        setSelectAll(value.length === totalRecords);
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const onCustomPageChange3 = (event) => {
        setLazyParams(state=>{
            return {...state,...event};
        });
    }
    const confirmDelete = (data) => {
        confirmDialog({
            
            message: 'Bạn có chắc chắn xoá không?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger ',
            accept: ()=>deleteImg(data.id)
        });
    };
    const deleteImg = async (id)=>{
       await imgService.delete(id);
       loadLazyData();
    }
    const onChangeKeySearch=(event)=>{
        setLazyParams(state=>{
        state.key_search = event.target.value;
        return {...state};
        });
    
    }
    const onKeyDown = (event)=>{
        if(event.key === 'Enter'){
            loadLazyData();
         }
    }
    
    const returnFileUrl = (item) => {
       
        //CKEditor=editor2&CKEditorFuncNum=214&langCode=en (open voi win down ckeditor)
        let queryVal = query.get("CKEditor");
        if (queryVal != null) {
          let funcNum = getUrlParam('CKEditorFuncNum');
          let fileUrl = appSetting.ADDRESS_API + '/' + item.path //'http://c.cksource.com/a/1/img/sample.jpg';
          fileUrl = fileUrl.replace('\\','/')
          window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl, function () {
            // Get the reference to a dialog window.
            let dialog = this.getDialog();
            // Check if this is the Image Properties dialog window.
            if (dialog.getName() == 'image') {
              // Get the reference to a text field that stores the "alt" attribute.
              let element = dialog.getContentElement('info', 'txtAlt');
              // Assign the new value.
              if (element)
                element.setValue('alt text');
            }
            // Return "false" to stop further execution. In such case CKEditor will ignore the second argument ("fileUrl")
            // and the "onSelect" function assigned to the button that called the file manager (if defined).
            // return false;
          });
          window.close();
        }else{
            //console.log('item', item);
            if(props.multiple){
                dispatch(selected(item));
                //props.onSelectImage(gallerySelecteds);
            }else props.onSelectImage(item);
            
            
            
        }
    
      }
    const onOk = ()=>{
        props.onSelectImage(gallerySelecteds);
    }
    const onHide = () => {
        setDisplayBasic(!displayBasic);
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    return (
        <>
         {/* <ConfirmDialog /> */}
         <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <InputText value={lazyParams.key_search} onChange={onChangeKeySearch}  onKeyDown={onKeyDown} placeholder="Từ khoá..."/>
                                <Button icon="pi pi-search" onClick={()=>loadLazyData()} />
                            </div>
        </div>
        <div className="col-12 md:col-4">
            <Button label='Chọn' onClick={onOk}/>
            {gallerySelecteds.length? `Đã chọn ${gallerySelecteds.length}`:''}
            
        </div>
        <div className='image-grid'>
            {customers?.map(item=>{
                return(
                    <div key={item.id} className="d-flex flex-column justify-content-between border m-1 p-1" style={{width:250}}>
                     <Image imageStyle={{width:'100%',maxWith:'200px'}} src={appSetting.ADDRESS_API+'/'+item.path} preview />  
                    
                    <div className='d-flex flex-column justify-content-between'>
                        <h6>{item.name}</h6>
                        <div className='d-flex flex-row justify-content-center '>
                            <i onClick={()=>returnFileUrl(item)} className="p-button-rounded p-button p-button-text p-1 pi pi-check-circle mr-2 flex align-items-center"></i>
                            <i onClick={()=>setDisplayBasic(true)} className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i>
                            <a onClick={()=>confirmDelete(item)}><i className="p-button-rounded p-button p-button-text p-1 pi pi-trash mr-2 flex align-items-center"></i></a>
                        </div>
                    </div>
                     
                   </div>
                )
            })}
                   
        </div>
        <Paginator first={lazyParams.first} rows={lazyParams.rows} totalRecords={totalRecords} pageLinkSize={3} rowsPerPageOptions={[20, 50, 100]} onPageChange={onCustomPageChange3}></Paginator>

        <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide()}>
            <form className="p-fluid" >
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('name')}
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>
                    <Controller name="code" control={control} rules={{ required: 'Code is required.' }} render={({ field, fieldState }) => (
                        <InputText id={field.code} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('code')}
                </div>

                
                <Button type="submit" label="Save" className="mt-2" style={{ width: 100 }} />
                </form>
        </Dialog>

        </>
       
    )
};

ImgList.propTypes = {
    onSelectImage: PropTypes.func,
    multiple: PropTypes.bool
};
ImgList.defaultProps = {
    multiple: false,
    onSelectImage:()=>{}
}
export default ImgList;