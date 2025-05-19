import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as branch_classes_model from './branch_classes_model';
import * as branch_class_routines_model from './branch_class_routines_model';
import * as branch_class_students_model from './branch_class_students_model';
import * as branch_class_rooms_model from './branch_class_rooms_model';
import * as user_students_model from './user_students_model';
import * as user_student_informations_model from './user_student_informations_model';
import * as branch_admin_model from './branch_admin_model';
import * as branch_class_routine_day_times_model from './branch_class_routine_day_times_model';
import * as branch_class_subjects_model from './branch_class_subjects_model';
import * as branch_teachers_model from './branch_teachers_model';
import * as user_teacher_model from './user_teacher_model';
import * as branche_building_rooms_model from './branche_building_rooms_model';
import * as branch_class_sections_model from './branch_class_sections_model';
import * as branch_class_resources_model from './branch_class_resources_model';
import * as branch_class_fees_model from './branch_class_fees_model';
import * as branch_class_fee_types_model from './branch_class_fee_types_model';
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
    BranchClassesModel: typeof branch_classes_model.DataModel;
    BranchClassRoutinesModel: typeof branch_class_routines_model.DataModel;
    BranchClassStudentsModel: typeof branch_class_students_model.DataModel;
    BranchClassRoomsModel: typeof branch_class_rooms_model.DataModel;
    UserStudentsModel: typeof user_students_model.DataModel;
    UserStudentInformationsModel: typeof user_student_informations_model.DataModel;
    BranchAdminsModel: typeof branch_admin_model.DataModel;
    BranchClassRoutineDayTimesModel: typeof branch_class_routine_day_times_model.DataModel;
    BranchClassSubjecsModel: typeof branch_class_subjects_model.DataModel;
    BranchTeachersModel: typeof branch_teachers_model.DataModel;
    UserTeachersModel: typeof user_teacher_model.DataModel;
    BranchBuildingRoomsModel: typeof branche_building_rooms_model.DataModel;
    BranchClassSectionsModel: typeof branch_class_sections_model.DataModel;
    BranchClassResourcesModel: typeof branch_class_resources_model.DataModel;
    BranchClassFeesModel: typeof branch_class_fees_model.DataModel;
    BranchClassFeesTypesModel: typeof branch_class_fee_types_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const BranchClassesModel = branch_classes_model.init(sequelize);
    const BranchClassRoutinesModel =
        branch_class_routines_model.init(sequelize);
    const BranchClassStudentsModel =
        branch_class_students_model.init(sequelize);
    const BranchClassRoomsModel = branch_class_rooms_model.init(sequelize);
    const UserStudentsModel = user_students_model.init(sequelize);
    const UserStudentInformationsModel =
        user_student_informations_model.init(sequelize);
    const BranchAdminsModel = branch_admin_model.init(sequelize);
    const BranchClassRoutineDayTimesModel =
        branch_class_routine_day_times_model.init(sequelize);
    const BranchClassSubjecsModel = branch_class_subjects_model.init(sequelize);
    const BranchTeachersModel = branch_teachers_model.init(sequelize);
    const UserTeachersModel = user_teacher_model.init(sequelize);
    const BranchBuildingRoomsModel =
        branche_building_rooms_model.init(sequelize);
    const BranchClassSectionsModel =
        branch_class_sections_model.init(sequelize);
    const BranchClassResourcesModel =
        branch_class_resources_model.init(sequelize);
    const BranchClassFeesModel = branch_class_fees_model.init(sequelize);
    const BranchClassFeesTypesModel =
        branch_class_fee_types_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    BranchClassStudentsModel.hasOne(UserStudentsModel, {
        sourceKey: 'branch_student_id',
        foreignKey: 'id',
        as: 'info',
    });

    BranchClassStudentsModel.hasOne(UserStudentInformationsModel, {
        sourceKey: 'branch_student_id',
        foreignKey: 'user_student_id',
        as: 'info_details',
    });

    BranchClassRoutinesModel.hasMany(BranchClassRoutineDayTimesModel, {
        sourceKey: 'id',
        foreignKey: 'branch_class_routine_id',
        as: 'routines',
    });

    BranchClassRoutinesModel.hasOne(BranchClassSubjecsModel, {
        sourceKey: 'branch_class_subject_id',
        foreignKey: 'id',
        as: 'subject',
    });

    BranchClassRoutineDayTimesModel.hasOne(BranchTeachersModel, {
        sourceKey: 'branch_teacher_id',
        foreignKey: 'id',
        as: 'b_teacher',
    });

    BranchClassRoutineDayTimesModel.hasOne(BranchBuildingRoomsModel, {
        sourceKey: 'branch_class_room_id',
        foreignKey: 'id',
        as: 'room',
    });

    BranchTeachersModel.hasOne(UserTeachersModel, {
        sourceKey: 'user_teacher_id',
        foreignKey: 'id',
        as: 'teacher',
    });

    // User.hasMany(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'projects',
    // });

    // User.hasOne(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'project',
    // });

    // Project.belongsToMany(User, {
    //     through: 'project_user',
    // });
    // User.belongsToMany(Project, {
    //     through: 'project_user',
    // });

    let models: models = {
        BranchClassesModel,
        BranchClassRoutinesModel,
        BranchClassStudentsModel,
        BranchClassRoomsModel,
        UserStudentsModel,
        UserStudentInformationsModel,
        BranchAdminsModel,
        BranchClassRoutineDayTimesModel,
        BranchClassSubjecsModel,
        BranchTeachersModel,
        UserTeachersModel,
        BranchBuildingRoomsModel,
        BranchClassSectionsModel,
        BranchClassResourcesModel,
        BranchClassFeesModel,
        BranchClassFeesTypesModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
