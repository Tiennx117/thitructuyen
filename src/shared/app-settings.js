export const appSetting = {
    // ADDRESS_API: window.appSetting.ADDRESS_API,
    ADDRESS_WEB: window.appSetting.ADDRESS_WEB,
    ADMIN_URL: window.appSetting.ADMIN_URL,
    URL_API: window.appSetting.API_URL,
    ADFSLogoutURL: window.appSetting.ADFSLogoutURL,
    ADDRESS_LOGGER: window.appSetting.ADDRESS_LOGGER,
    LIST_API_LOG: window.appSetting.LIST_API_LOG,
    LIST_API_LOG_ERROR: window.appSetting.LIST_API_LOG_ERROR,
    SITE_RECRUITMENT: window.appSetting.SITE_RECRUITMENT,
    ADDRESS_CRAWLER: window.appSetting.ADDRESS_CRAWLER,
    CLIENT_ID: window.appSetting.CLIENT_ID,
    CLIENT_SECRET: window.appSetting.CLIENT_SECRET,

    GOOGLE_CLIENT_ID: window.appSetting.GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI: window.appSetting.GOOGLE_REDIRECT_URI,
    DEFAULT_PAGE: window.appSetting.DEFAULT_PAGE,
    AUTH_XAPI: window.appSetting.AUTH_XAPI,
    END_POINT_XAPI: window.appSetting.END_POINT_XAPI,
    WAKA_API: window.appSetting.WAKA_API,
    WAKA_ISS: window.appSetting.WAKA_ISS,
    RASA_SOCKET_URL: window.appSetting.RASA_SOCKET_URL,
    RASA_TITLE: window.appSetting.RASA_TITLE,
    RASA_SUBTITLE: window.appSetting.RASA_SUBTITLE,
}
export const CLIENT = {
    client_id: 'VPKHCN',
    client_secret: 'Q2jGsMahbmcgdHLDrG5oIGtob2EgaOG7jWMgdsOgIGPDtG5nIG5naOG7hyBxdeG7kWMgZ2lh',
    scope: 'offline_access openid',
    redirect_uri: `${window.location.protocol}//${window.location.host}/oauth-callback`,
    logout_redirect_uri: `${window.location.protocol}//${window.location.host}/logout`
};
export const AUTHORIZATION_BASE = `Basic ${btoa(CLIENT.client_id + ':' + CLIENT.client_secret)}`;

export const PATH_APILMS_V2 = window.appSetting.PATH_APILMS_V2;
export const PATH_APILMS_V = window.appSetting.PATH_APILMS_V;
export const PATH_APILOG_V2 = window.appSetting.PATH_APILOG_V2;
export const PARTIAL_VIEW = window.appSetting.PARTIAL_VIEW;
export const PATH_APICHATBOT = window.appSetting.PATH_APICHATBOT;
export const PATH_APISQLITE = window.appSetting.PATH_APISQLITE;

