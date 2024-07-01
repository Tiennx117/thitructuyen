import Image from 'components/Image';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { wakaService } from 'services/wakaService';
// import '../styleepub.scss'
import { Button } from 'primereact/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import DropdownFilter from '../../my-learning/DropdownFilter';
import PlayerEpubMobile from './Waka/readbook/PlayerEpubMobile';
import { Sidebar } from 'primereact/sidebar';

const ReadBook = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookId, setbookId] = useState('');
    const [data, setdata] = useState();
    const [isload, setisload] = useState(false);
    useEffect(() => {
        setisload(false);
        document.body.style.overflow = "hidden";
        getdata();
    }, []) //
    const getdata = async () => {
        let id = searchParams.get("id");
        setbookId(id);
        let params = {
            iss: 254,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 1,
            ci: id
        }
        let token = await wakaService.tokenDetailContentWakaMobile(params);
        let result = await wakaService.detailContent(token.data);
        setdata(result.data.data);
        setisload(true);
    };
    return (
        <>
        {
            isload && 
            <PlayerEpubMobile visibleRightEpub={true} bookId={bookId} url={data?.epub_link}  />
        }
        </>
        
        // <PlayerEpubMobile visibleRightEpub={true} bookId={46033} url={'https://waka.vn/static/enterprise/0/0/1/46033_3/OEBPS/content.opf?token=85357743f203fe1d59e4c73e7da1898446033'} />
    )
};
export default ReadBook;