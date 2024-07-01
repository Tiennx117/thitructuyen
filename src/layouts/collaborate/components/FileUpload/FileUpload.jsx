import React from 'react';
import'./FileUpload.scss'
export default function FileUpload(){
     return(
        <>
             <div>
                    <div className="file-card" style={{float: 'left',width:'60%'}}>
                        <div className="file-inputs" style={{height: '50px'}}>
                            <div style={{float: 'left'}}>Tải lên</div><div style={{float: 'left',marginLeft: '5%'}}><input type="file"></input></div>
                            
                        </div>
                        <div classname="progress" id="upload">
                            <div id="upload-file" classname="progress-bar bg-info" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                        </div>
                    </div>
                    <div style={{float: 'left',fontSize: '12px'}}>
                        <span>Chú ý:</span><br/><span>- Kích thước tệp tối đa tải lên là 1024 MB</span><br/><span>- Các định dạng tệp được phép là:</span><br/><span>jpeg, jpg, png, bmp, pdf</span>
                    </div>
                </div>
        </>
     )
}