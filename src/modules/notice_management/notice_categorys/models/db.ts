import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as notice_categorys_model from './notice_categorys_model';
import * as branch_admin_model from './branch_admin_model';
import * as notices_model from './notices_model';
import * as user_admins_model from './user_admins_model';
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
    NoticeCategorysModel: typeof notice_categorys_model.DataModel;
    BranchAdminsModel: typeof branch_admin_model.DataModel;
    NoticesModel: typeof notices_model.DataModel;
    UserAdminsModel: typeof user_admins_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const NoticeCategorysModel = notice_categorys_model.init(sequelize);
    const BranchAdminsModel = branch_admin_model.init(sequelize);
    const NoticesModel = notices_model.init(sequelize);
    const UserAdminsModel = user_admins_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    // Project.hasOne(User, {
    //     sourceKey: 'user_id',
    //     foreignKey: 'id',
    //     as: 'user',
    // });

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
        NoticeCategorysModel,
        BranchAdminsModel,
        NoticesModel,
        UserAdminsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
