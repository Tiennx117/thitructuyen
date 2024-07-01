import { useLocation } from 'react-router-dom';

const  useQuery=()=>{
    return new URLSearchParams(useLocation().search);
  }
  function useUrlParam(paramName) {
    var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
    var match = window.location.search.match(reParam);
  
    return (match && match.length > 1) ? match[1] : null;
  }
  export { useQuery, useUrlParam };