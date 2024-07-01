import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { categoryService } from 'services/categoryService';
import { postService } from 'services/postService';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import CkEditor from 'components/ckeditor4/CkEditor';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
import { SelectImgItem} from 'components/SelectImgItem';
import { InputSwitch } from 'primereact/inputswitch';
import { postStatusText, ACTIVE, DEACTIVE } from 'shared/utils/appState';
const PostForm = () => {
    
    let navigate = useNavigate();
    const defaultValues = {
        title: '',
        summary: '',
        content: '',
        meta_keyword:'',
        meta_keywords:[],
        category_id: null,
        state: ACTIVE
    }
    let { post_id } = useParams();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(defaultValues);
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const onSubmit = async (values) => {
        console.log(values);
        
        values.meta_keyword = values.meta_keywords.toString();
        if(values.images){
            values.avatar = values.images?.path;
        }else  values.avatar = null;
        
        if(post_id==='new'){
            await postService.create(values);
        }else {
            await postService.update(values);
        }
        navigate('/admin/post-list');
    }
    const getById =  async (id)=>{
        let result = await postService.getById(id);
        setData(result.data);
        
        if(result.data.meta_keyword){
            result.data.meta_keywords =  result.data.meta_keyword.split(',');
        }
        result.data.images={
            path: result.data.avatar
        }
        reset(Object.assign(defaultValues, result.data));
    }
    const getCategories = async ()=>{
        let result = await categoryService.getAll();
        setCategories(result.data);
    }
    useEffect(() => {
        getCategories();
        if(post_id!='new'){
            getById(post_id);
        }
       // countryservice.getCountries().then(data => setCountries(data));
       
   }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Card title='Thông tin bài viết'>
                <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                    <Button type="submit" label="Save" className="mt-2" style={{ width: 100 }} />
                    
                    <div className='row'>
                        <div className="col-lg-8 col-md-12">
                            
                            <div className="field">
                                <label htmlFor="content">Nội dung<span className='text-danger'>*</span></label>
                                <Controller name="content" control={control} rules={{ required: 'Trường dữ liệu không được để trống!' }} render={({ field, fieldState }) => (
                                    <CkEditor  editor='content' id='content' 
                                        config={{ height: 500}}
                                        content={field.value} 
                                        events={{
                                            'change':(event)=>{
                                                field.onChange(event.editor.getData());
                                            }
                                        }}
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                {getFormErrorMessage('content')}
                            </div>

                        

                        </div>
                        <div className="col-lg-4 col-md-12">
                        <div className="field">
                                <label htmlFor="title">Tiêu đề <span className='text-danger'>*</span></label>
                                <Controller name="title" control={control} rules={{ required: 'Trường dữ liệu không được để trống!' }} render={({ field, fieldState }) => (
                                    <InputText id='title' {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                {getFormErrorMessage('title')}
                            </div>

                            <div className="field">
                                <label htmlFor="summary">Mô tả <span className='text-danger'>*</span></label>
                                <Controller name="summary" control={control} rules={{ required: 'Trường dữ liệu không được để trống!' }} render={({ field, fieldState }) => (
                                    <InputTextarea id='summary' {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                {getFormErrorMessage('summary')}
                            </div>
                        <div className="field">
                            <Controller name="images" control={control} render={({ field, fieldState }) => (
                                      <SelectImgItem label='Ảnh đại diện' {...field} value={field.value} onSelectImage={(e)=>{
                                        field.onChange(e);
                                      }} />
                                )} />
                        </div>

                        
                            <div className="field">
                                <label htmlFor="meta_keywords">Meta keyword</label>
                                <Controller name="meta_keywords" control={control} render={({ field, fieldState }) => (
                                    <Chips placeholder='Phân cách bằng dấu phẩy' id='meta_keywords' {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} separator="," />
                                )} />
                                
                            </div>   
                            <div className="field">
                                <label htmlFor="category_id">Loại</label>
                                <Controller name="category_id" control={control} render={({ field, fieldState }) => (
                                    <Dropdown value={field.value}  options={categories} onChange={(e)=>field.onChange(e.value)} optionLabel="name"optionValue="id"  filter showClear filterBy="name" placeholder="Select a category"/>
                                )} />
                                
                            </div>    
                            <div className='field'>
                            <Controller name="state" control={control} render={({ field, fieldState }) => (
                                <InputSwitch trueValue={ACTIVE} falseValue={DEACTIVE}  tooltip={field.value ==ACTIVE ? postStatusText.active : postStatusText.deactive }  checked={field.value} onChange={(e) => field.onChange(e.target.value)} />
                            )} />
                            </div>    
                        </div>
                    </div>
                    
                </form>
            </Card>
        </>
    )
}

export { PostForm as default, PostForm };