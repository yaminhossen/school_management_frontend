import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as branch_class_subjects_model from './branch_class_subjects_model';
import * as branch_class_subject_teachers_model from './branch_class_subject_teachers_model';
import * as user_teacher_model from './user_teacher_model';
import * as branch_teachers_model from './branch_teachers_model';
import * as branch_class_routines_model from './branch_class_routines_model';
import * as branch_class_routine_day_times_model from './branch_class_routine_day_times_model';
// import * as project_model from '../../user_admin copy/models/project_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let post = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';

const sequelize = new Sequelize(
    `mysql://${user}:${pass}@${host}:${post}/${database}`,
    {
        logging: false,
    },
);

interface models {
    BranchClassSubjectsModel: typeof branch_class_subjects_model.DataModel;
    BranchClassSubjectTeachersModel: typeof branch_class_subject_teachers_model.DataModel;
    UserTeacherModel: typeof user_teacher_model.DataModel;
    BranchTeachersModel: typeof branch_teachers_model.DataModel;
    BranchClassRoutinesModel: typeof branch_class_routines_model.DataModel;
    BranchClassRoutineDayTimesModel: typeof branch_class_routine_day_times_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const BranchClassSubjectsModel =
        branch_class_subjects_model.init(sequelize);
    const BranchClassSubjectTeachersModel =
        branch_class_subject_teachers_model.init(sequelize);
    const UserTeacherModel = user_teacher_model.init(sequelize);
    const BranchTeachersModel = branch_teachers_model.init(sequelize);
    const BranchClassRoutinesModel =
        branch_class_routines_model.init(sequelize);
    const BranchClassRoutineDayTimesModel =
        branch_class_routine_day_times_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync({ force: false });

    // UserStudentsModel.hasOne(UserStudentInformationsModel, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_student_id',
    //     as: 'student_info',
    // });

    BranchClassSubjectsModel.hasOne(BranchClassRoutinesModel, {
        sourceKey: 'id',
        foreignKey: 'branch_class_subject_id',
        as: 'subject_routine',
    });

    BranchClassRoutinesModel.hasMany(BranchClassRoutineDayTimesModel, {
        sourceKey: 'id',
        foreignKey: 'branch_class_routine_id',
        as: 'day_time',
    });

    // UserStudentsModel.hasMany(UserStudentInformationsModel, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_student_id',
    //     as: 'student_infos',
    // });

    let models: models = {
        BranchClassSubjectsModel,
        BranchClassSubjectTeachersModel,
        UserTeacherModel,
        BranchTeachersModel,
        BranchClassRoutinesModel,
        BranchClassRoutineDayTimesModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
