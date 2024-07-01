import './demo.scss';
import styles from './demo.module.scss';
import { Card } from 'primereact/card';
import LoadingUI from 'components/loader-ui/LoadingUI';
import { Skeleton } from 'primereact/skeleton';
import { CourseSkeletonList } from 'components/lms/CourseSkeleton';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel'
import Image, { ImagePreview } from 'components/Image';
const Skeabc = () => {
  return (
    <div className="d-flex flex-column">
      <Skeleton className="mb-2" width="210px" height="260px"></Skeleton>
      <Skeleton width="210px" className="mb-2"></Skeleton>
      <Skeleton width="210px" className="mb-2"></Skeleton>
      <div className="flex justify-content-between" style={{ width: '210px' }}>
        <Skeleton width="4rem" height="1rem"></Skeleton>
        <Skeleton width="4rem" height="1rem"></Skeleton>
      </div>
    </div>
  )
}
const DemoTest = () => {
  return (

    // <Card title='1111' >
    
    //   <LoadingPanel loading={true} loader={<CourseSkeletonList row={2} col={5} />}>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    //   </LoadingPanel>

    // </Card>

    <Card>
        <div className='row'>
            <div className='col'>
                <div style={{
                    backgroundImage: `url(${'/images/no-image.jpg'})`,
                    backgroundRepeat: 'no-repeat',
                    width: '250px',
                    height: '100px'
                }}>
                    backgroundImage inline css
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='col'>

                <div className="bg-test">
                    backgroundImage class css
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='col'>
                <ImagePreview preview src={window.location.origin + '/images/add-icon.png'} />

            </div>
        </div>

        <div className='row'>
            <div className='col'>
                <span>sử dụng module scope css </span>
                <div className={styles['demo-module']} style={{ width: '200px', height: '200px' }}>
                    <div className={styles['bg-module']} style={{ width: '200px', height: '200px' }}>

                    </div>
                </div>
            </div>
        </div>





    </Card>
  )
}
export default DemoTest;