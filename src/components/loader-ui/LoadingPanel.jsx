import React from 'react';
import PropTypes from 'prop-types';
//import DefaultLoader from './Loader';
import { ProgressSpinner } from 'primereact/progressspinner';
const DefaultLoader = ()=>{
    return(<div className='d-block w-100 m-4'><ProgressSpinner className='w-100' style={{width: '50px', height: '50px'}} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s"/> </div>)
}
const LoadingPanel = (props)=>{
    const Loader = props.loader;
    const ariaLabel =props.ariaLabel;
    if(props.loading===true)
    return(<>{React.isValidElement(Loader) ? Loader : <Loader ariaLabel={ariaLabel} />}</>)
    else{
        return(<>{props.children}</>)
    }
}
LoadingPanel.propTypes = {
    loading: PropTypes.bool,
    ariaLabel: PropTypes.string,
    loader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.node,
      ]),
}
LoadingPanel.defaultProps = {
    ariaLabel:'loading',
    loader: DefaultLoader
}
export { LoadingPanel }