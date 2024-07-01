import he from 'he';
const decodeHtmlEntites = (data)=>{
    if(data){
        try
        {
            let objectJson = JSON.parse(he.decode(JSON.stringify(data)));
            return objectJson;
        }
        catch(ex)
        {
            console.log('decodeHtmlEntites exception', ex)
            return data;
        }
        
    }else return {};
   
}
export { decodeHtmlEntites }