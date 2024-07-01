const upDateDataLocal= async(useID,nodeID,time5s,visibleDialog1)=>{
    if(time5s!==-999){
        if(visibleDialog1==true){
            if(nodeID>0){
                localStorage.setItem('timelocal' + '_' + useID + '_' + nodeID, time5s)
            }
            
        }
       
    }
    
}
export { upDateDataLocal };