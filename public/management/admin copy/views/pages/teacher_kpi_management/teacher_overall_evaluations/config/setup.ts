import setup_type from './setup_type';

const prefix: string = 'TeacherOverallEvaluations';
const setup: setup_type = {
    prefix,
    module_name: 'teacher_overall_evaluations',

    route_prefix: 'teacher-overall-evaluations',

    api_host: location.origin,
    api_prefix: 'teacher-overall-evaluations',

    store_prefix: 'teacherOverallEvaluation',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
