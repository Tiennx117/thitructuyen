import './style/searchLeaner.scss';
import { FaSearch} from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';
const SearchLeaner =(props)=>{
    const [title, setTitle] = useState('')
    function searchleaner(){
        props.onChange(title);
        //return title
    }
    function keyDown(e){
        if(e.key=='Enter'){
            props.onChange(title);
        }
    }
    return(
        <>
            <div className="search-box input-group mb-3">
                <input id="search-leaner" onKeyDown={(e)=>keyDown(e)} type="text" onChange={event => setTitle(event.target.value)} className="form-control" placeholder="Nhập từ khóa tìm kiếm" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" onClick={searchleaner}  type="button" id="button-addon2"><FaSearch/></button>
            </div>
        </>
    )
}
SearchLeaner.propTypes = {
    onChange: PropTypes.func
};
SearchLeaner.defaultProps = {
    onChange: () => { }
}
export default SearchLeaner;