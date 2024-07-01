import { useEffect, useState, useMemo  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { BCard } from "components/BCard";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { SelectButton } from 'primereact/selectbutton';
import { AutoComplete } from 'primereact/autocomplete';
import productService from "services/productService";
import { accountMemberService } from "services/accountMemberService";
import { Checkbox } from "primereact/checkbox";
import { appSetting } from 'shared/app-settings';
import { Image } from 'components/Image';
import { pagingDefaults } from 'shared/utils/appState';
import { mapPaginator } from 'shared/utils';
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { Button } from "primereact/button";
import { Calendar } from 'components/Calendar';
import dayjs from 'dayjs';
import getFormErrorMessage from 'shared/components/getFormErrorMessage';
import { orderService } from "services/orderService";
import { stateService } from 'services/stateService';
import { Dropdown } from 'primereact/dropdown';
import './order.scss';

const OrderForm = () => {
    //const [countries, setCountries] = useState([]);
    //const [keySearchPhone, setKeySearchPhone] = useState(null);
    let navigate = useNavigate();
    const [filterAccountMembers, setFilterAccountMembers] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    let { order_id } = useParams();
    useEffect(() => {
        if(order_id !=='new' ){
            getById(order_id);
        }
        loadStateOptions();
    },[]);
    const loadStateOptions = async ()=>{
        let result = await stateService.orders();
        let arr = []
        result.data.forEach(item=>{
            let obj = {
                label: item.text,
                value: item.value,
                command: (e) => {
                    setStateOrderSelected(e.item);
                }
            }
            arr.push(obj);
        })
        setStateOptions(arr);
    }
    const getById = async (order_id)=>{
        let result = await orderService.getById(order_id);
        reset(result.data);
    }
    const filterProduct = (params) => {
        let advanceSearch = mapPaginator(params);
        productService.filterProductVariant(advanceSearch).then(res => {
            //setCountries(res.data.data);
            setFilteredCountries(res.data.data);
            console.log(res)
        })
    }
    const filterAccountMember = async (params) => {
        let advanceSearch = mapPaginator(params);
        let result = await accountMemberService.filterPage(advanceSearch);
        setFilterAccountMembers(result.data.data);
    }
    useEffect(() => {
        // add html overscroll hidden
        document.body.classList.add('order--overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('order--overflow-y-disable');
        };
    }, []);
    const itemTemplate = (item) => {
        return (
            <div className="d-flex flex-row">
                <Image width='60' src={appSetting.ADDRESS_API + '/' + item.avatar_url} />
                <div className="d-flex flex-column">
                    <span className="m-2 font-weight-bold">{item.product_name}</span>
                    <div>
                        <span className="m-2">Mã: {item.product_variant_key}</span>
                        <span className="m-2">Barcode: {item.barcode}</span>
                    </div>
                </div>

            </div>
        );
    }
    const itemTemplateAccountMember = (item) => {
        return (
            <div className="d-flex flex-row">

                <div className="d-flex flex-column">
                    <span className="m-2 font-weight-bold">{item.full_name}</span>
                    <div>
                        <span className="m-2">SĐT: {item.phone}</span>
                        <span className="m-2">Email: {item.email}</span>
                    </div>
                </div>

            </div>
        );
    }
    const getFormErrorMessageArray = (index, fieldColumn) => {
        try {
            return errors['ticket_products'] && <small className="p-error">{errors['ticket_products'][index.toString()][fieldColumn]['message']}</small>
        }
        catch { }
    };
    const [value1, setValue1] = useState('Sản phẩm');
    const options = ['Sản phẩm', 'Mẫu mã'];
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredCountries] = useState(null);
    const searchAccount = (event) => {
        let advanceSearch  =Object.assign({},pagingDefaults);
        advanceSearch.key_search = event.query;
        filterAccountMember(advanceSearch);
    }
    const onSelectAccountMember = (e) => {
        setValue('phone', e.value.phone);
        setValue('full_name', e.value.full_name);
        setValue('date_of_birth', e.value.date_of_birth);
    }
    const searchProduct = (event) => {
        console.log(event);
        let advanceSearch  =Object.assign({},pagingDefaults);
        advanceSearch.key_search = event.query;
        filterProduct(advanceSearch);
    }
    const onSelectProduct = (e) => {
        //console.log(e.value);
        let productItem = e.value;
        let r = productItem.product_variant_values.map(el=>{
            return el.attribute_name +': '+ el.value;
        })
        
        let check = fields.filter(x => x.product_variant_id == productItem.id);
        
        if (check.length == 0 && check) {
            productItem.product_id = productItem.product_id;
            productItem.product_variant_id = productItem.id;
            productItem.quantity = 1;
            productItem.total = productItem.quantity * productItem.price;
            productItem.description = r.join(', ')
            append(productItem);

            setTotalAmout();
        }
        setSelectedProduct('');
    }
    const setTotal = (index) => {
        let price = getValues(`order_products.${index}.price`);
        let quantity = getValues(`order_products.${index}.quantity`);
        setValue(`order_products.${index}.total`, price * quantity);
        setTotalAmout();
    }
    const setTotalAmout = () => {
        let products = getValues(`order_products`);
        let total_amount = 0;
        products.forEach(item => {
            total_amount += item.quantity * item.price;
        });
        setValue('total_amount', total_amount);

    }
    const defaultValues = {
        date_of_birth: null,
        phone: '',
        order_date: new Date(),
        total_amount: 0,
        total_final: 0,
        free_ship: false,
        state: '1',
        total:0,
        total_loss:0,
        discount_percent:0,
        fee_ship:0,
        sub_fee: 0,
        order_products: []
    }
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "order_products",
    });

    const onSubmit = async (data) => {
        console.log(data);
        if(order_id==='new'){
            await orderService.create(data);
        }else await orderService.update(data);
        navigate('/admin/order-list')
    };
    const handleSubmitSave = (e) => {

        handleSubmit((e) => onSubmit(e))();
    }
    // const wTotal = useWatch({
    //     control,
    //     name: "order_products",
    // });
    const watchedFields = watch(['order_products','free_ship','fee_ship','discount_percent','sub_fee','total_bank','total_of_customer' ]);

    const totalOrder = useMemo(() => {
        console.log("watched fields changed: ", watchedFields[3]);
        let total = 0;
        watchedFields[0].forEach(el=>{
            total = total+el.price*el.quantity
        });
        if(watchedFields[3]){
            total = total - (Number(watchedFields[3]??0)/100 *total)
        }

        if(watchedFields[1]===false){
            total = total + Number(watchedFields[2]??0)
        }
        if(watchedFields[4]){
            total = total+ Number(watchedFields[4]??0)
        }
        let total_bank = watchedFields[5] ?? 0;
        let total_of_customer = watchedFields[6] ?? 0 
        let total_loss = total - total_bank - total_of_customer
        //setValue('total',total)
        return {
            total: total,
            total_loss: total_loss
        };
    }, [watchedFields]);
    
    return (
        <div className=" d-flex h-flex w-100 h-100">
            <div className="order d-flex flex-column w-100 justify-content-between">
                <div className="order__header d-flex flex-row justify-content-between">
                    <div>
                    <Button type="button" onClick={handleSubmitSave} label="Lưu lại" className="mt-2 mr-2 p-button-sm" style={{ width: 80 }} />
                    </div>
                    <div>
                    <Controller
                       
                        render={({ field }) => <Dropdown style={{width:'150px'}} name='state' value={field.value??''} scrollHeight={'600px'} options={stateOptions} onChange={(e)=>{field.onChange(e.value)}} placeholder="--Tình trạng--" />}
                        name='state'
                        control={control} />
                    
                    </div>
                    
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-auto order__content overflow-auto">
                
                    <div className="row">
                        <div className="col-7 pl-0">
                            <BCard title="Sản phẩm">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row m-2">
                                        {/* <SelectButton value={value1} options={options} onChange={(e) => setValue1(e.value)} /> */}
                                        <AutoComplete style={{ width: '100%' }} inputStyle={{ width: '100%' }} placeholder='Nhập tên, mã sản phẩm hoặc barcode...'
                                            value={selectedProduct}
                                            suggestions={filteredProducts} completeMethod={searchProduct}

                                            onSelect={onSelectProduct}
                                            itemTemplate={itemTemplate} onChange={(e) => setSelectedProduct(e.value)} aria-label="Sản phẩm" />
                                    </div>
                                    <table className="table table-bordered m-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Sản phẩm </th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">SL</th>
                                                <th scope="col">Thành tiền</th>
                                                {/* <th scope="col">Đơn vị tính</th> */}
                                                <th scope="col">Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td className="d-flex flex-column">
                                                            <span>{item.product_name} - {item.product_variant_key} </span>
                                                            <span>({item.description})</span>
                                                        </td>
                                                        <td>
                                                            <Controller
                                                                rules={{ required: 'Vui lòng nhập!' }}
                                                                render={({ field }) => <InputText {...field} value={field.value ?? ''} />}
                                                                name={`order_products.${index}.price`}
                                                                control={control} />
                                                            {getFormErrorMessageArray(index, 'price')}
                                                        </td>
                                                        <td>
                                                            <Controller
                                                                rules={{ required: 'Vui lòng nhập!' }}
                                                                render={({ field }) => <InputText {...field} value={field.value ?? ''}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.value);
                                                                        setTotal(index);
                                                                    }}
                                                                    type='number' />}
                                                                name={`order_products.${index}.quantity`}
                                                                control={control} />

                                                            {getFormErrorMessageArray(index, 'quantity')}
                                                        </td>
                                                        <td>
                                                            <Controller
                                                                render={({ field }) => <span>{field.value ?? ''}</span>}
                                                                name={`order_products.${index}.total`}
                                                                control={control} />
                                                        </td>
                                                        {/* <td><span>{item.calculation_unit_text}</span></td> */}
                                                        <td>
                                                            <Controller
                                                                render={({ field }) => <InputText {...field} value={field.value ?? ''} />}
                                                                name={`order_products.${index}.note`}
                                                                control={control} />
                                                        </td>
                                                        <td>

                                                            <Button icon="pi pi-trash" type='button' className="p-button-rounded p-button-text" onClick={() => {
                                                                remove(index);
                                                                setTotalAmout();
                                                            }
                                                            } />

                                                        </td>
                                                    </tr>
                                                );
                                            })}


                                        </tbody>
                                    </table>
                                </div>


                            </BCard>
                        </div>
                        <div className="col-5 pl-0">
                            <div className="d-flex flex-column">
                                <BCard className="mb-2" title="Thông tin">
                                    <div className="row">
                                    <div className="col-lg-4 col-md-12 d-flex flex-row">
                                    <div className="field mr-2">
                                            <label htmlFor="order_date">#Mã đơn hàng</label>
                                            <Controller name="code" control={control} rules={{required:'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                                                <InputText {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)}
                                                    className="w-100 mr-2" />
                                            )} />
                                            {getFormErrorMessage('code', errors)}

                                        </div>
                                    </div>
                                        
                                    <div className="col-lg-4 col-md-12 d-flex flex-row">
                                    <div className="field mr-2">
                                            <label htmlFor="order_date">Ngày tạo đơn</label>
                                            <Controller name="order_date" control={control} render={({ field, fieldState }) => (
                                                <Calendar
                                                    showButtonBar={true}
                                                    showTime
                                                    dateFormat="dd/mm/yy"
                                                    id="order_date"
                                                    value={field.value??''}
                                                    onChange={(e) => {
                                                        field.onChange(e.value);
                                                    }}
                                                    mask="99/99/9999 99:99"
                                                    showIcon
                                                />
                                            )} />

                                        </div>
                                    </div>


                                    </div>
                                           
                                </BCard>
                                <BCard className="mb-2" title="Khách hàng">

                                    <div className="d-flex flex-row justify-content-between">
                                        <div className="field mr-2 w-100">
                                            <label htmlFor="phone">SĐT <span className='text-danger'>*</span></label>
                                            <Controller name="phone" control={control} rules={{required:'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                                                <AutoComplete className="mr-2" style={{ width: '100%' }} inputStyle={{ width: '100%' }}
                                                    field="phone"
                                                    value={field.value ?? ''}
                                                    suggestions={filterAccountMembers}
                                                    completeMethod={searchAccount}
                                                    onSelect={(e) => onSelectAccountMember(e)}
                                                    itemTemplate={itemTemplateAccountMember}
                                                    onChange={(e) => { field.onChange(e.value) }}
                                                />
                                            )} />
                                            {getFormErrorMessage('phone', errors)}
                                        </div>

                                        <div className="field mr-2 w-100">
                                            <label htmlFor="full_name">Họ tên <span className='text-danger'>*</span></label>
                                            <Controller name="full_name" control={control} rules={{required:'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                                                <InputText {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)}
                                                    className="w-100 mr-2" />
                                            )} />
                                            {getFormErrorMessage('full_name', errors)}

                                        </div>
                                        <div className="field mr-2 w-100">
                                            <label htmlFor="date_of_birth">Ngày sinh</label>
                                            <Controller name="date_of_birth" control={control} render={({ field, fieldState }) => (
                                                <Calendar

                                                    showButtonBar={true}
                                                    dateFormat="dd/mm/yy"
                                                    {...field}
                                                    id="date_of_birth"
                                                    value={dayjs(field.value).$d ?? null}
                                                    onChange={(e) => {
                                                        field.onChange(e.value?.toLocaleDateString().slice(0, 10) ?? '');
                                                    }}
                                                    mask="99/99/9999"
                                                    showIcon
                                                />
                                            )} />

                                        </div>



                                    </div>

                                </BCard>

                                <BCard className="mb-2" title="Thanh toán">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <Controller name="free_ship" control={control} render={({ field, fieldState }) => (
                                                <><Checkbox checked={field.value} onChange={(e) => field.onChange(e.checked)} /> Miễn phí giao hàng</>
                                            )} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="fee_ship" className="col-sm-3 col-form-label">Phí vận chuyển</label>
                                        <div className="col-sm-9">
                                            <Controller name="fee_ship" control={control} render={({ field, fieldState }) => (
                                                <InputText {...field}  value={field.value ?? ''} />
                                            )} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="discount_percent" className="col-sm-3 col-form-label">Giảm giá đơn hàng (%)</label>
                                        <div className="col-sm-9">
                                            <Controller name="discount_percent" control={control} render={({ field, fieldState }) => (
                                                <InputText {...field}  value={field.value ?? ''}  />
                                            )} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="total_bank" className="col-sm-3 col-form-label">Tiền chuyển khoản</label>
                                        <div className="col-sm-9">
                                            <Controller name="total_bank" control={control} render={({ field, fieldState }) => (
                                                <InputText {...field}  value={field.value ?? ''}  />
                                            )} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="total_of_customer" className="col-sm-3 col-form-label">Tiền khách đưa</label>
                                        <div className="col-sm-9">
                                            <Controller name="total_of_customer" control={control} render={({ field, fieldState }) => (
                                                <InputText {...field}  value={field.value ?? ''} />
                                            )} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="sub_fee" className="col-sm-3 col-form-label">Phụ thu</label>
                                        <div className="col-sm-9">
                                            <Controller name="sub_fee" control={control} render={({ field, fieldState }) => (
                                                <InputText {...field}  value={field.value ?? ''} />
                                            )} />
                                        </div>
                                    </div>

                                    {/* <div className="d-flex flex-column">
                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Tổng tiền</span>
                                            <span>0 đ</span>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Giảm giá</span>
                                            <span>0 đ</span>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Sau giảm giá</span>
                                            <span>0 đ</span>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Cần thanh toán</span>
                                            <span>0 đ</span>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Đã thanh toán</span>
                                            <span>0 đ</span>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <span>Còn thiếu</span>
                                            <span>0 đ</span>
                                        </div>
                                    </div> */}



                                </BCard>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="order__footer d-flex flex-row justify-content-between">
                    
                    <strong className="align-self-center m-2 text-danger">Còn thiếu: {totalOrder.total_loss} đ</strong>
                    <strong className="align-self-center m-2 text-success">Tổng tiền: {totalOrder.total} đ</strong>
                        {/* <Controller
                            render={({ field }) => <span>Tổng tiền: {field.value ?? ''} đ</span>}
                            name={'total'}
                            control={control} /> */}
                    </div>
            </div>

        </div>
    )
}
export default OrderForm;