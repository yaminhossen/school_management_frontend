import setup_type from './setup_type';

const prefix: string = 'Exam Routine';
const setup: setup_type = {
    prefix,
    module_name: 'exam_routines',

    route_prefix: 'exam-routines',

    api_host: location.origin,
    api_prefix: 'exam-routines',

    store_prefix: 'examRoutine',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
