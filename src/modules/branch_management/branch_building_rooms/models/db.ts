import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as branche_building_rooms_model from './branche_building_rooms_model';
import * as branche_buildings_model from './branche_buildings_model';
import * as branch_admin_model from './branch_admin_model';
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
    BrancheBuildingRoomsModel: typeof branche_building_rooms_model.DataModel;
    BrancheBuildingsModel: typeof branche_buildings_model.DataModel;
    BranchAdminsModel: typeof branch_admin_model.DataModel;
    UserAdminsModel: typeof user_admins_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const BrancheBuildingRoomsModel =
        branche_building_rooms_model.init(sequelize);
    const BrancheBuildingsModel = branche_buildings_model.init(sequelize);
    const BranchAdminsModel = branch_admin_model.init(sequelize);
    const UserAdminsModel = user_admins_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    BrancheBuildingRoomsModel.hasOne(BrancheBuildingsModel, {
        sourceKey: 'building_id',
        foreignKey: 'id',
        as: 'buildings',
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
        BrancheBuildingRoomsModel,
        BrancheBuildingsModel,
        BranchAdminsModel,
        UserAdminsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
