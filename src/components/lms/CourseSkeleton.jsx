import { Skeleton } from 'primereact/skeleton';
import PropTypes from 'prop-types';
const CourseSkeletonItem = () => {
    return (
        <div className="d-flex flex-column ml-3 mb-5">
            <Skeleton className="mb-2" width="210px" height="168px"></Skeleton>
            <Skeleton width="210px" className="mb-2"></Skeleton>
            <Skeleton width="210px" className="mb-2"></Skeleton>
            <div className="flex justify-content-between" style={{ width: '210px' }}>
                <Skeleton width="4rem" height="1rem"></Skeleton>
                <Skeleton width="4rem" height="1rem"></Skeleton>
            </div>
        </div>
    )
}
const CourseSkeletonList = (props) => {
    //const  count = props.count;
    const renderList = () => {
        let items = [];
        for (let i = 0; i < props.col; i++) {
           
            items.push(<CourseSkeletonItem key={i} />);
        }
        return (<>{items}</>);
    }
    const renderRow = ()=>{
        let items = []
        for (let i = 0; i < props.row; i++) {
           
            items.push(<div key={i} className='d-flex flex-row'>{renderList()}</div>);
        }
        return (<>{items}</>);
    }
    return (
        
        <div className='d-flex flex-column' style={{minHeight:'400px'}}>{renderRow()}</div>
      
    )
}
CourseSkeletonList.propTypes = {
    col: PropTypes.number,
    row: PropTypes.number,
};
CourseSkeletonList.defaultProps = {
    row: 1,
    col: 4
  };
export { CourseSkeletonItem, CourseSkeletonList }