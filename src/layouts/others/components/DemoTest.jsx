//import imgUrl from 'assets/bg.pnd'
import './demo.scss';
const DemoTest = () => {
    return (
        <>
            <div style={{
                backgroundImage: `url(${'/images/no-image.jpg'})`,
                backgroundRepeat: 'no-repeat',
                width: '250px',
                height: '100px'
            }}>
                backgroundImage inline css
            </div>
            <br />
            <div className="bg-test">
                backgroundImage class css
            </div>
        </>
    )
}
export default DemoTest;