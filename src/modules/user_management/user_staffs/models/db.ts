import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_staffs_model from './user_staffs_model';
import * as user_staff_informations_model from './user_staff_informations_model';
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
    UserStaffsModel: typeof user_staffs_model.DataModel;
    UserStaffInformationsModel: typeof user_staff_informations_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserStaffsModel = user_staffs_model.init(sequelize);
    const UserStaffInformationsModel =
        user_staff_informations_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    UserStaffsModel.hasOne(UserStaffInformationsModel, {
        sourceKey: 'id',
        foreignKey: 'user_staff_id',
        as: 'staff_infos',
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
        UserStaffsModel,
        UserStaffInformationsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
