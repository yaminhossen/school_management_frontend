import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_students_model from './user_students_model';
import * as user_student_educational_backgrounds_model from './user_student_educational_backgrounds_model';
import * as user_student_informations_model from './user_student_informations_model';
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
    UserStudentsModel: typeof user_students_model.DataModel;
    UserStudentEducationalBackgroundsModel: typeof user_student_educational_backgrounds_model.DataModel;
    UserStudentInformationsModel: typeof user_student_informations_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserStudentsModel = user_students_model.init(sequelize);
    const UserStudentEducationalBackgroundsModel =
        user_student_educational_backgrounds_model.init(sequelize);
    const UserStudentInformationsModel =
        user_student_informations_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync({ force: false });
    UserStudentsModel.hasOne(UserStudentEducationalBackgroundsModel, {
        sourceKey: 'id',
        foreignKey: 'user_student_id',
        as: 'educational_background',
    });
    UserStudentsModel.hasOne(UserStudentInformationsModel, {
        sourceKey: 'id',
        foreignKey: 'user_student_id',
        as: 'student_info',
    });
    UserStudentsModel.hasMany(UserStudentInformationsModel, {
        sourceKey: 'id',
        foreignKey: 'user_student_id',
        as: 'student_infos',
    });
    UserStudentInformationsModel.belongsTo(UserStudentsModel, {
        foreignKey: 'user_student_id',
        as: 'student',
    });
    let models: models = {
        UserStudentsModel,
        UserStudentEducationalBackgroundsModel,
        UserStudentInformationsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
