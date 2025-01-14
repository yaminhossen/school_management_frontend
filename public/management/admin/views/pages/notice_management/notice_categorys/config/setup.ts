import setup_type from './setup_type';

const prefix: string = 'NoticeCategorys';
const setup: setup_type = {
    prefix,
    module_name: 'notice_categorys',

    route_prefix: 'notice-categorys',

    api_host: location.origin,
    api_prefix: 'notice-categorys',

    store_prefix: 'noticeCategory',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
