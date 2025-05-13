import setup_type from './setup_type';

const prefix: string = 'Academic Calendar';
const setup: setup_type = {
    prefix,
    module_name: 'academic_calendars',

    route_prefix: 'academic-calendars',

    api_host: location.origin,
    api_prefix: 'academic-calendars',

    store_prefix: 'branchAcademicCalendar',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
