import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';

const KhoaHocBatBuocContainer =()=>{
    const { t } = useTranslation()
    return(
        <>
        <Card title={t('key-title','Khoá học bắt buộc')}>
        {t('key-title','Không có dữ liệu hiển thị')}
        </Card>
        
        </>
    )
}
export default KhoaHocBatBuocContainer;