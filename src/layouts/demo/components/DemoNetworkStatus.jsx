import {useState } from 'react'; 
import { useNetworkStatus } from "react-network-status";
import { appSetting } from 'shared/app-settings';

const DemoNetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState(true);
    const config = {
      timeout: 5000,
      interval: 1000,
      url: appSetting.ADMIN_URL,
    };
  
    useNetworkStatus((networkStatusUpdate) => {
      setNetworkStatus(networkStatusUpdate);
    }, config);
  
    return <div>You are: {networkStatus ? "online" : "offline"}</div>;
  };

  export default DemoNetworkStatus;