import { FaStar } from 'react-icons/fa';
import { AiFillPlayCircle } from "react-icons/ai";
import './style/demoFunctionalTranslation.scss'
import PropTypes from 'prop-types';
import Image from 'components/Image';
const imglearn = window.location.origin + '/images/learn.png';
const Course = (props) => {
    const { dataItem, id } = props;
    const onClickTitleIner = () => {
        props.onClickTitle(dataItem);
    }
    return (
        <div key={id} className="course-card card" style={{ minWidth: '15rem', maxWidth: '15rem', boxShadow: '4px 4px 8px 0px rgb(52 51 51 / 63%)' }}>
            {/* <img className="card-img" style={{maxHeight:'12rem'}} src={dataItem?.CourseImage}/> */}
            <Image className="card-img" style={{ maxHeight: '12rem', minHeight: '168px' }} src={dataItem?.CourseImage} />
            <div className="card-img-overlay" style={{ padding: '0rem', height: '10rem' }}>
                <p><span className="w3-tag w3-green" style={{ width: '3.2rem', height: '2rem', boxShadow: '4px 4px 8px 0px rgb(52 51 51 / 63%)' }}><FaStar style={{ marginTop: '-0.1rem' }} />&nbsp;<small>{dataItem?.CourseRating}</small></span></p>
            </div>
            <div className="card-body" style={{ textAlign: 'center', border: '1px solid #dddddd', padding: '0' }}>
                <div className="progress" style={{ marginTop: '-0.1rem', borderRadius: '0', height: '0.7rem' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: dataItem?.Progress + '%' }} aria-valuenow={dataItem?.Progress} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h5 onClick={() => onClickTitleIner()} className="cursor-pointer" style={{ padding: '1rem', textAlign: 'center', fontSize: '1rem', fontWeight: 600, height: '3rem' }}>{dataItem?.CourseName}</h5>
                <div className="box-action d-flex mt-4">
                    <div className="flex-fill" style={{ fontSize: '0.9rem' }}>
                        {dataItem?.CourseTypeName == 'Lớp học tập trung' ? 'Lớp tập trung' : dataItem?.CourseTypeName}
                    </div>
                    <div className="flex-fill" style={{ fontSize: '0.9rem' }}>
                        &nbsp;&nbsp;{dataItem?.LearningFlag}
                    </div>
                    <div className="flex-fill" style={{ textAlign: 'right', fontSize: '0.9rem' }}>
                        30&nbsp;<i className="fa fa-users  mr-2" style={{ color: 'green' }}></i>
                    </div>
                </div>
                {dataItem?.Status == 'Đang diễn ra' ? <div className="play-form media align-items-center">
                    <div className="play-icon media-left" >
                        <AiFillPlayCircle />
                    </div>
                    <div className="play-text media-body">
                        <span>Đang diễn ra</span>
                    </div>
                </div> : ''}

            </div>
        </div>
    )
}
Course.propTypes = {
    onClickTitle: PropTypes.func
};
Course.defaultProps = {
    onClickTitle: () => { }
}
export default Course;