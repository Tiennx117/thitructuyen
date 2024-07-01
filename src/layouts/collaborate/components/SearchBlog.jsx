import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';
const SearchFile = (props) => {
    const [title, setTitle] = useState('')
    function searchfile() {
        props.onChange(title);
        //return title
    }
    function keyDown(e){
        if(e.key=='Enter'){
            props.onChange(title);
        }
    }
    return (
        <>
            <div className="input-group-append search-box" style={{ width: '40%', borderRadius: '5px'}}>
                <input id="search-file" onKeyDown={(e)=>keyDown(e)} type="text" className="form-search form-control form-search" onChange={event => setTitle(event.target.value)} style={{ borderRight: 'none', fontSize:'small' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                <label style={{ borderLeft: 'none' }} className="input-group-text" onClick={searchfile} type="button" htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
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