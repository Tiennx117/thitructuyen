import PropTypes from 'prop-types';
import dayjs from 'dayjs';
const CreatedComponent = (props)=>{
    let created_at_utc = props.created_at_utc? dayjs(props.created_at_utc).format('DD/MM/YYYY HH:mm:ss'):'(không xác định)';
    let updated_at_utc = props.updated_at_utc? dayjs(props.updated_at_utc).format('DD/MM/YYYY HH:mm:ss'):'(không xác định)';
    return(
        <div className="d-flex flex-column flex-sm-row">
            <div className="mr-auto p-2"><span style={{fontSize:'12px'}}>{props.created_by} tạo lúc {created_at_utc}</span></div>
            <div className="p-2"><span style={{fontSize:'12px'}}>{props.updated_by} chỉnh sửa lúc {updated_at_utc}</span></div>
        </div>)
}
CreatedComponent.propTypes = {
    created_uid: PropTypes.number,
    created_by: PropTypes.string,
    created_at_utc: PropTypes.string,
    updated_by: PropTypes.string,
    updated_at_utc: PropTypes.string,
  };
export { CreatedComponent as default, CreatedComponent }