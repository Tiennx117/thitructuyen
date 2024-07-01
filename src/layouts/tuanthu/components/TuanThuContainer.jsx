import { ProgressCircle } from "components/progress-circle/ProgressCircle";
import { Card } from "primereact/card";

import { useTranslation } from 'react-i18next';

const TuanThuContainer =()=>{
    const { t } = useTranslation()
    return(
        <>
        <Card title={t('key-title','Tuân thủ')} style={{height:'900px'}}>
            <ProgressCircle value={50}/>
            {t('key-title','Không có dữ liệu hiển thị')}
        </Card>
        </>
    )
}
export default TuanThuContainer;