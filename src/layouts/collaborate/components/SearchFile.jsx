
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const SearchFile = (props) => {
    const { title1 } = props;
    const [title, setTitle] = useState('')
    function searchfile() {
        debugger;
        props.onChange(title);
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            props.onChange(title);
        }
    }
    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    return (
        <>
            <div className="input-group-append search-box" style={{ width: '60%', borderRadius: '5px' }}>
                <input id="search-file" onKeyDown={(e) => keyDown(e)} value={title} type="text" className="form-search form-control form-search" onChange={handleChange} style={{ borderRight: 'none' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                <label style={{ borderLeft: 'none', marginLeft: "-6px", height: '33px' }} className="input-group-text rounded" onClick={searchfile} type="button" htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
            </div>
        </>
    )
}
SearchFile.propTypes = {
    onChange: PropTypes.func
};
SearchFile.defaultProps = {
    onChange: () => { }
}
export default SearchFile;