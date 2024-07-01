import axios from 'axios'
import Course from 'layouts/learner/components/Course';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const globalSearchService = {

    //Tổng quan
    getglobalsearchdata(filterText, searchType) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, "GlobalSearchContent": filterText, "GlobalSearchType": searchType };

        return axios.post(PATH_APILMS_V2 + '/globalsearch/getglobalsearchdata', body);
    },

}
export { globalSearchService };
