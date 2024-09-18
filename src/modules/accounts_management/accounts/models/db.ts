import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as accounts_model from './accounts_model';
import * as account_logs_model from './account_logs_model';
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
    AccontsModel: typeof accounts_model.DataModel;
    AccountLogsModel: typeof account_logs_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const AccontsModel = accounts_model.init(sequelize);
    const AccountLogsModel = account_logs_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    AccontsModel.hasMany(AccountLogsModel, {
        sourceKey: 'id',
        foreignKey: 'account_id',
        as: 'account_log',
    });

    let models: models = {
        AccontsModel,
        AccountLogsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
