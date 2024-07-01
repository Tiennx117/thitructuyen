import { WithUseFadeEffectHook } from "shared/components/WithUseFadeEffectHook"
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
const Demo1 = ()=>{
    return(
        <Card>
        <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
        <WithUseFadeEffectHook />
        </Card>
    )
}
export default Demo1;