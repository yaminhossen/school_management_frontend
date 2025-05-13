import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DefaultSetOptions,
    // NonAttribute,
    // ForeignKey,
} from 'sequelize';

const tableName = 'user_admins';
const modelName = 'UserAdminModels';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type gender = 'male' | 'female';
type role = 'admin';
type blood_group = 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare name?: string;
    declare email?: string | null;
    declare phone_number?: string | null;
    declare image?: string;
    declare password?: string;
    declare token?: string | null;
    declare forget_code?: string | null;
    declare user_agent?: string | null;

    declare parmanent_address: string;
    declare country: string;
    declare district: string;
    declare post_code: string;
    declare alternative_number: string | null;
    declare qualification: string | null;
    declare gender: gender;
    declare is_married: boolean;
    declare blood_group: blood_group;
    declare joining_date: string;
    declare role: role;
    declare national_id: string;
    declare certificate_no_1: string;
    declare certificate_no_2: string;

    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            email: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            phone_number: {
                type: new DataTypes.STRING(20),
                allowNull: true,
            },
            image: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            password: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            token: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            forget_code: {
                type: new DataTypes.STRING(10),
                allowNull: true,
            },
            user_agent: {
                type: new DataTypes.STRING(150),
                allowNull: true,
            },

            parmanent_address: {
                type: new DataTypes.STRING(200),
                allowNull: true,
            },
            country: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            district: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            post_code: {
                type: new DataTypes.STRING(10),
                allowNull: true,
            },
            alternative_number: {
                type: new DataTypes.STRING(20),
                allowNull: true,
            },
            qualification: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            gender: {
                type: new DataTypes.ENUM('male', 'female'),
                allowNull: true,
            },
            is_married: {
                type: new DataTypes.BOOLEAN(),
                allowNull: true,
            },
            blood_group: {
                type: new DataTypes.ENUM(
                    'A+',
                    'A-',
                    'B+',
                    'B-',
                    'O+',
                    'O-',
                    'AB+',
                    'AB-',
                ),
                allowNull: true,
            },
            joining_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            role: {
                type: new DataTypes.ENUM('admin'),
                defaultValue: 'admin',
            },
            national_id: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            certificate_no_1: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            certificate_no_2: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
            },
            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
