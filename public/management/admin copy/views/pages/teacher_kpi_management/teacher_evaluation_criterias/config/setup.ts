import setup_type from './setup_type';

const prefix: string = 'TeacherEvaluationCriterias';
const setup: setup_type = {
    prefix,
    module_name: 'teacher_evaluation_criterias',

    route_prefix: 'teacher-evaluation-criterias',

    api_host: location.origin,
    api_prefix: 'teacher-evaluation-criterias',

    store_prefix: 'teacherEvaluationCriteria',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
