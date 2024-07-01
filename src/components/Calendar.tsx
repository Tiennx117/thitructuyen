import React,{ useState, memo } from "react";
import { Calendar as CalendarPrime, CalendarProps } from "primereact/calendar";
import { addLocale } from 'primereact/api';
import * as dayjs from 'dayjs';

addLocale('vi', {
    firstDayOfWeek: 1,
    dayNames: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7 ', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7 ', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    today: 'Hôm nay',
    clear: 'Xoá'
});

const CalendarInner = React.forwardRef((props: CalendarProps, ref:any) => {
    let innerValue: any = null;
    if(props.value){
        innerValue = dayjs(props.value?.toLocaleString()).toDate();
        
    }
   
    const onChange = (e: any) => {
        props.onChange?.(e);
    }
    

return(<CalendarPrime {...props}  value={innerValue}  ref={ref}  locale="vi" />)
})
const Calendar = CalendarPrime;
export { Calendar as default,  Calendar}