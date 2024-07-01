import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { lienheService } from "services/lienheService";
import './accordion.scss';

const Help = (props) => {
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
                    <Card title={<div>
                        {selectedName !== null ? <> <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => getcustomercaredata()}><i className="fa-solid fa-arrow-left"></i></button> {selectedName}</> : 'TRỢ GIÚP'}
                    </div>}>
                        <div className="row">
                            <iframe src={helpurl} width="100%" height="500px"></iframe>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
export default Help;