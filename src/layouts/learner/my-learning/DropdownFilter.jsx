import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
function DropdownFilter(props) {
    const [selected, setSelected] = useState(props.items?.[0]);
    const changeLanguageHandler = (item) => {
        setSelected(item);
        props.onChange(item);
    }
    //  (item)=>{

    // }
    useEffect(() => {
        if (props.items.length > 0) {
            setSelected(props.items?.[0]);
        }
    }, [props.items.length])
    return (
        <div className={classNames('dropdown', props.className)}>
            <a className="nav-link dropdown-toggle fw-bold fsx-14px cursor-pointer text-uppercase" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#3d4758', fontSize: '13px !important' }}>
                {selected?.text}
            </a>
            <ul className="dropdown-menu cursor-pointer">
                {props.items?.map((item, index) => {
                    return (<li key={index}><a onClick={() => changeLanguageHandler(item)} className="dropdown-item" >{item?.text}</a></li>)
                })}
                {/* <li><a onClick={() => changeLanguageHandler('en')} className="dropdown-item" href="#">EN</a></li>
                <li><a onClick={() => changeLanguageHandler('vi')} className="dropdown-item" href="#">VI</a></li> */}
            </ul>
        </div>
    )
}
DropdownFilter.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
    style: PropTypes.object,
};
DropdownFilter.defaultProps = {
    onChange: () => { }
}
export default DropdownFilter;