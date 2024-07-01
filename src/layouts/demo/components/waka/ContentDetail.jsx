import Image from 'components/Image';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { wakaService } from 'services/wakaService'
import { useQuery } from 'shared/hooks/useQuery';
import EpubWakaComponent from './EpubWakaComponent';
import { WakaChapter } from './WakaChapter';

const ContentDetail = () => {
    const { content_id } = useParams();
    const [data, setData] = useState();

    const queryParams = useQuery();
    console.log('content_id', content_id, queryParams.get('content_type'))
    let params = {
        iss: 262,
        did: 123,
        os: 'android',
        iat: Math.floor(Date.now() / 1000),
        ct: queryParams.get('content_type'),
        ci: content_id
    }
    const getDetailContent = async () => {
        let token = await wakaService.tokenDetailContentWaka(params);
        let result = await wakaService.detailContent( token.data);
        console.log(result);
        setData(result.data.data);
    }
    useEffect(() => {
        getDetailContent();
    }, [])
    return (<>
        <div className='d-flex flex-column w-50'>
            <div className='d-flex flex-row '>
                <div style={{ width: 120 }}>Tiêu đề</div>
                <div className='flex-grow-1'>{data?.name}</div>
            </div>

            <div className='d-flex flex-row '>
                <div style={{ width: 120 }}>Nội dung</div>
                <div className='flex-3' dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Không có mô tả." }}></div>
            </div>

            <div className='d-flex flex-row '>
                <div style={{ width: 120 }}>Thời lượng</div>
                <div className='flex-grow-1'>{data?.duration_info}</div>
            </div>

            <div className='d-flex flex-row '>
                <div style={{ width: 120 }}>Ảnh</div>
                <div className='flex-grow-1'><Image src={data?.thumb} /></div>
            </div>

            {queryParams.get('content_type') == 1 && <EpubWakaComponent url={data?.epub_link} />}

            {queryParams.get('content_type') == 52 && <>
                <WakaChapter id={content_id} />
            </>}


        </div>
    </>)
}
export default ContentDetail;