import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { lienheService } from "services/lienheService";
import Accordion from "./Accordion";
import './accordion.scss';
import { bottom } from "@popperjs/core";

const FAQ = (props) => {
    const [selectedName, setSelectedName] = useState(null);
    const [faqlist, setFaqlist] = useState([]);
    const [state, setState] = useState({});
    const getpublicfaq = async () => {
        setSelectedName(null);
        let result = await lienheService.getpublicfaq();
        setFaqlist(result.data.FAQList);
        let obj ={}
        for(let i=1;i<=result.data.FAQList?.length;i++){
            if(i==1){
                obj={...obj,...{ [`block${i}`]:true}}
            }
            else{
                obj={...obj,...{ [`block${i}`]:false}}
            }
        }
        setState(obj)
    }

    

    const toggle = (index) => () => {
        setState({ [`block${index}`]: !state[`block${index}`] });
    }

    const toggleExpand = (faq,expand) => () => {
        let obj ={}
        for(let i=1;i<= faq.length;i++){
            if(expand==true)
            {
                obj={...obj,...{ [`block${i}`]:true}}
            }
            else{
                obj={...obj,...{ [`block${i}`]:false}}
            }
        }
        setState(obj);
    }

    function renderfaqlist() {
        return (
            <dl className="accordion">
                {
                    faqlist.map((data, index) => (
                        <Accordion
                            onClick={toggle(index + 1)}
                            expand={state[`block${index + 1}`]}
                            title={data.QuestionText}
                            answer={data.AnswerText}
                            filename={data.FAQAttachmentName}
                            filepath={data.FAQAttachmentPath}
                        />
                    ))
                }
            </dl>
        )
    }

    useEffect(() => {
        getpublicfaq();
    }, []);

    return (
        <>
            <div className="row">
                <div className="mt-2">
                    <Card style={{ boxShadow: 'none' }} title={
                        <div className="row">
                            <div className="col-6" style={{fontSize:'16px',color:'black'}}>
                                <div>
                                    {selectedName !== null ? <> <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => getpublicfaq()}><i className="fa-solid fa-arrow-left"></i></button> {selectedName}</> : 'CÂU HỎI THƯỜNG GẶP'}
                                    <span className='bottom-title-faq'></span>
                                </div>
                            </div>
                            <div className="col-6">
                            </div>
                        </div>

                    }>
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6">
                            <div>
                                <div>
                                        <div className="d-flex justify-content-end" style={{ marginRight: '20px' }}>
                                            <button type="button" className="btn btntgl mr-3" style={{ border: '1px solid black' }} onClick={toggleExpand(faqlist,true)}>Mở rộng tất cả</button>
                                            <button type="button" className="btn btntgl" style={{ border: '1px solid black' }} onClick={toggleExpand(faqlist,false)}>Thu gọn tất cả</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'-30px'}}>
                            {
                                faqlist == null ? 'Không có câu hỏi thường gặp'
                                    :
                                    <div>
                                        {/* <div className="d-flex justify-content-end" style={{ marginRight: '20px' }}>
                                            <button type="button" className="btn btntgl mr-3" style={{ border: '1px solid black' }} onClick={toggleExpand(true)}>Mở rộng tất cả</button>
                                            <button type="button" className="btn btntgl" style={{ border: '1px solid black' }} onClick={toggleExpand()}>Thu gọn tất cả</button>
                                        </div> */}
                                        <div>
                                            {renderfaqlist()}
                                        </div>
                                    </div>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
export default FAQ;