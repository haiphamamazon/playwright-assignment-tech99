
export class Constants {

    // Section timeouts
    static readonly TIMEOUTS = {
        WAIT_LOCATOR: 60000,
        WAIT_ELEMENT_TIMEOUT: 30000,
        WAIT_ELEMENT_VISIBLE: 10000,
        WAIT_ELEMENT_INVISIBLE: 5000,
        PAGE_EVENT_LOAD: 60000,
        PAGE_NAVIGATE: 60000,
        POPUP_EVENT_LOAD: 30000,
        DOM_CONTENT_LOADED: 5000,
        PERFORM_LOADING: 2
    };

    static readonly CI_WORKERS = Number(process.env.CI_WORKERS ?? 1);
    static readonly LOCAL_WORKERS = Number(process.env.LOCAL_WORKERS ?? 8);
    static readonly BASE_URL = 'https://www.demoblaze.com/';
    static readonly MAX_RETRY_ATTEMPTS = 1;
    static readonly DATA_FOLDER = '../data';
    static readonly DOWNLOAD_FOLDER = '../downloads';
    static readonly CONFIGS_FOLDER = '../configs';
    static readonly OUTPUT_FOLDER = '../output';

}
