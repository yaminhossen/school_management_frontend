import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as student_evaluations_model from './student_evaluations_model';
import * as branch_teachers_model from './branch_teachers_model';
import * as student_overall_evaluations_model from './student_overall_evaluations_model';
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
    StudentEvaluationsModel: typeof student_evaluations_model.DataModel;
    BranchTeachersModel: typeof branch_teachers_model.DataModel;
    StudentOverallEvaluationsModel: typeof student_overall_evaluations_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const StudentEvaluationsModel = student_evaluations_model.init(sequelize);
    const BranchTeachersModel = branch_teachers_model.init(sequelize);
    const StudentOverallEvaluationsModel =
        student_overall_evaluations_model.init(sequelize);
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
        StudentEvaluationsModel,
        BranchTeachersModel,
        StudentOverallEvaluationsModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
