import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';

const MucLucContainer = () => {
    const { t } = useTranslation()
    return (
        <>
            <Card title='Khóa học Public'>
                {t('key-title', 'Không có dữ liệu hiển thị')}
            </Card>

        </>
    )
}
export default MucLucContainer;