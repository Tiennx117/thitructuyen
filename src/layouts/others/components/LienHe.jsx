import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { lienheService } from "services/lienheService";
import './accordion.scss';

const LienHe = (props) => {
    const [selectedName, setSelectedName] = useState(null);
    const [contactus, setContactus] = useState([]);
    const [helpurl, setHelpurl] = useState("");

    const getcustomercaredata = async () => {
        setSelectedName(null);
        let result = await lienheService.getcustomercaredata();
        setContactus(result.data[0].ContactUS);
        setHelpurl(result.data[0].HelpURL);
    }

    useEffect(() => {
        getcustomercaredata();
    }, []);

    return (
        <>
            <div className="row">
                <div className="mt-2">
                    <Card style={{boxShadow:'none'}} title={<div style={{fontSize:'16px',color:'black'}}>
                        {selectedName !== null ? <> <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => getcustomercaredata()}><i className="fa-solid fa-arrow-left"></i></button> {selectedName}</> : 'LIÊN HỆ CHÚNG TÔI'}
                        <span className='bottom-title-lh'></span>
                    </div>}>
                        <div className="row">
                            <p dangerouslySetInnerHTML={{ __html: contactus }}></p>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
export default LienHe;