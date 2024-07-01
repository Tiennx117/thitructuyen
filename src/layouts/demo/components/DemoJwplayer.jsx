//import JWPlayer from '@jwplayer/jwplayer-react';
import ReactJWPlayer from 'react-jw-player';
const DemoJwplayer = () => {
    return (<>
        1212 oceans.mp4
        {/* <JWPlayer
            config={
                { key: '3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4=' }
            }
            file='http://vjs.zencdn.net/v/oceans.mp4'
            library='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
        /> */}
        <ReactJWPlayer
            licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
            playerId='my-unique-id'
            playerScript='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
            file='http://vjs.zencdn.net/v/oceans.mp4'
        />,
    </>)
}
export default DemoJwplayer;