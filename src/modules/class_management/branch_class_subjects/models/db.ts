import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as branch_class_subjects_model from './branch_class_subjects_model';
import * as branch_class_subject_teachers_model from './branch_class_subject_teachers_model';
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
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const BranchClassSubjectsModel =
        branch_class_subjects_model.init(sequelize);
    const BranchClassSubjectTeachersModel =
        branch_class_subject_teachers_model.init(sequelize);
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
        BranchClassSubjectsModel,
        BranchClassSubjectTeachersModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
