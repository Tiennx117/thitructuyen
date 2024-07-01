import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { appSetting } from 'shared/app-settings';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImgList from './ImgList';
import PropTypes from 'prop-types';
import './GalleryImg.scss';
const urlUpload = appSetting.ADDRESS_API+'/api/img/uploadmultiple';
const GalleryManager = (props) => {
    const accessToken = useSelector(state => state.oauth.access_token);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        //A FileList is not an Array, 
        Array.from(e.files).forEach(file => {
            _totalSize += file.size;
        });
        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        //A FileList is not an Array, 
        Array.from(e.files).forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 20000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 2 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const onBeforeUpload =(request)=>{
        
        request.xhr.open('POST', appSetting.ADDRESS_API, true);
        request.xhr.setRequestHeader('Authorization', 'Bearer '+accessToken);
        console.log(request);
        return request;
    }
    const customBase64Uploader = async (event) => {
        console.log(event);
        let bodyFormData = new FormData();
        Array.from(event.files).forEach(file=>{
            bodyFormData.append("files", file);
        });
        
        let result = await axios.post(urlUpload, bodyFormData ,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer ' +accessToken
            }
        })
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
        setTotalSize(0);
        event.options.clear();
    }
   
    
    return (
        <Card className='h-100vh'>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <TabView>
                <TabPanel header="Upload">
                    <FileUpload  ref={fileUploadRef} name="demo[]" url={urlUpload} multiple accept="image/*" maxFileSize={2000000}
                        customUpload uploadHandler={customBase64Uploader} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </TabPanel>
                <TabPanel header="Thư viện">
                    <ImgList multiple={props.multiple} onSelectImage={props.onSelectImage}/>
                
                </TabPanel>
               
            </TabView>





        </Card>
    )
}
GalleryManager.propTypes = {
    onSelectImage: PropTypes.func,
    multiple: PropTypes.bool
};
GalleryManager.defaultProps = {
    multiple: false,
    onSelectImage:()=>{}
}
export default GalleryManager;
