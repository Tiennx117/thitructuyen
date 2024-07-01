import React, { useState} from 'react'
import { ProgressCircle } from "components/progress-circle/ProgressCircle";
import { Card } from "primereact/card";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
const LMSContainer = ()=>{
    const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    return(
        <Card style={{minHeight:'400px'}}>
            <ProgressCircle value={50}/>
            <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} className="mr-2" />
            <Button icon="pi pi-plus" onClick={() => setVisibleCustomToolbar(true)} />
            <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                    <h3>Left Sidebar</h3>
                </Sidebar>
            <Sidebar className='sidebar-header-none' visible={visibleCustomToolbar} maskStyle={{backgroundColor:'red'}}>

     <button type="button" onClick={()=>setVisibleCustomToolbar(false)} className="p-sidebar-close p-sidebar-icon p-link" aria-label="Close"><span className="p-sidebar-close-icon pi pi-times" aria-hidden="true" /><span role="presentation" className="p-ink" /></button>

</Sidebar>
        </Card>
    )
}
export default LMSContainer;