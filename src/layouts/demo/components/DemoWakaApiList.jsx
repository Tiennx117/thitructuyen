import Image from 'components/Image';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { wakaService } from 'services/wakaService';
import '../styleepub.scss'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { setvisibleDialog } from 'store/perFormExam/perFormExam';
import { useNavigate } from 'react-router-dom';
const DemoWakaApiList = () => { 
    const navigate = useNavigate();
    const [result, setResult] = useState();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [keySearch, setKeySearch] = useState();
    const [optionCategories, setOptionCateogries] = useState([]);
    const options = [
        { id: 0, name:'Tất cả'},
        { id: 1, name:'Sách ebook'},
        { id: 52, name:'Sách nói'},
    ]
    const [params, setParams] = useState({
        iss: 262,
        did: 123,
        os: 'android',
        iat: Math.floor(Date.now() / 1000),
        q:null,
        ct: 0,
        ci: 0,
        pn: 1,
        ps: 10
    })
    const loadCateogry = async () => {
       let result = await wakaService.listEnterpriseCategoryLocal({
            iss: 262,
            did: 123,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            ct: 0
        });
        setOptionCateogries(result.data.data);

    }
    
    const load = async () => {
        //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6IjAiLCJwbiI6IjEiLCJwcyI6IjEwIiwiaXNzIjoiMjYyIiwiZGlkIjoiMTIzIiwib3MiOiJhbmRyb2lkIiwiY3QiOiIwIiwiaWF0IjoiMTY5NDU3MzA0NiIsImV4cCI6MTY5NDU3NjY0Nn0.MIwvk0LgsCLnxwyq-iHRsLzhjlcs5GJ0LcfHG7pFYAA";
        let resultToken = await wakaService.tokenContentEnterpriseCategory(params);
        let token = resultToken.data;
        let result = await wakaService.listContentEnterpriseCategory(params, token);
        console.log(result);
        setResult(result.data.data);
    }

    const callDetailContent = async ()=>{
        //check api waka
        let paramsDetail = {
            iss:262,
            did: 1231231,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: 2849
        }
        let tokenDetail = await wakaService.tokenDetailContentWaka(paramsDetail);
        let reusltDetail = await wakaService.detailContent(tokenDetail.data);
        console.log('reusltDetail', reusltDetail)
    }

    const callChapter = async ()=>{
        //check api waka
        let paramsAudioChapter = {
            iss:262,
            did: 1231231,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: 2849
        }
        let token2 = await wakaService.tokenChapterAudio(paramsAudioChapter);
        let reuslt2 = await wakaService.listChapterAudio(token2.data);
        console.log('listChapterAudio', reuslt2)
    }

    const callSearchContent = async ()=>{
        let paramsSearch = {
            iss:262,
            did: 1231231,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            q : 'đừng đợi',
            pn: 1,
            ps: 10,
            ct:0

        }
        let tokenSearch = await wakaService.tokenSearchContentWaka(paramsSearch);
        let resultSearch = await wakaService.searchContent(tokenSearch.data);
        console.log('resultSearch', resultSearch)
    }
    const callStream = async ()=>{
        let paramsStream = {
            iss:262,
            did: 1231231,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            ci: 14204
        }

        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(tokenStream.data);
        console.log('resultStream', resultStream)
    }
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
        </div>
    );

    const onChangeSelect = (e) => {
        setSelectedCategory(e.target.value)
    }
    const onNext = (value)=>{
        if(!keySearch){
            setParams(draft=>{
                let newValue = {...draft,...value}
                newValue.pn = newValue.pn +1;
                return newValue;
            })
        }
    }

    const onPrev = (value)=>{
        if(!keySearch){
            setParams(draft=>{
                let newValue = {...draft,...value}
                newValue.pn = newValue.pn - 1;
                return newValue;
            })
        }
    }

    const onSearch = async (params, category)=>{
        if(params.q){
            let paramsSearch = {
                iss:262,
                did: 1231231,
                os: 'android',
                iat: Math.floor(Date.now() / 1000),
                q : params.q,
                pn: 1,
                ps: 10,
                ct: category
    
            }
            let tokenSearch = await wakaService.tokenSearchContentWaka(paramsSearch);
            let result = await wakaService.searchContent(tokenSearch.data);
            console.log(result.data.data.list);
            setResult(result.data.data.list)
        }else{
            load();
        }
    }

    useEffect(() => {
        load();
    }, [params.pn])

    

    useEffect(() => {
        load();
        loadCateogry();

        callDetailContent();
        callChapter();
        callSearchContent();
        callStream();
        
    }, [])

    

    return (
        <>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <InputText placeholder='Từ khoá' onChange={(e)=>{
                        setParams((data)=>{
                            
                            data.q = e.target.value
                            return data;
                        })
                    }} />
                    
                    <Dropdown
                        showClear
                        style={{ width: 460 }}
                        value={selectedCategory}
                        onChange={(e) => onChangeSelect(e)}
                        options={options} optionValue="id" optionLabel="name"
                        placeholder="--Chọn --" />
                    <Button onClick={()=>{onSearch(params, selectedCategory)}}>Tìm kiếm</Button>
                </div>
                <div className='book-container'>
                    {result?.map(item => {
                        return (
                            <div className="book-wrapper" key={item.id}>
                                <div className='d-flex flex-column'>
                                    <Image style={{ height: '450px', width: '320px' }} src={item.thumb} />
                                    <h3 className='fw-bold book-header'>{item.name}</h3>
                                    <div className='colblock w-100 book-summary'>
                                        <div className="m-0" dangerouslySetInnerHTML={{ __html: item?.description ? item?.description : "Không có mô tả." }}>

                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <Button onClick={()=>{
                                            navigate('/demo/demowakaDetaiContent/'+ item.id + '?content_type='+item.content_type)
                                        }}>Detail</Button>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                    {!result && 'Không có sách'}

                </div>

                <div className='d-flex flex-row justify-content-end m-2'>
                    <Button onClick={()=>onPrev(params)}>{'<'}</Button>
                    <Button onClick={()=>onNext(params)} className='ml-2'>{'>'}</Button>
                </div>
            </div>

        </>
    )
};
export default DemoWakaApiList;