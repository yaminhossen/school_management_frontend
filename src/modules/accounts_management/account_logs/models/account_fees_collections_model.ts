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

const tableName = 'account_fees_collections';
const modelName = 'AccountFeesCollectionsModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
// type is_approved = 'pending' | 'accepted' | 'rejected';
type status = 'active' | 'deactive';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare branch_student_id: number;
    declare branch_student_class_id: number;
    declare account_category_id: number;
    declare account_log_id: number;
    declare amount: number;
    declare total_discount: number;
    declare discount_attachment: string;
    declare discount_note: string;
    declare date: string;

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
            branch_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            branch_student_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            branch_student_class_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_category_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_log_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            amount: {
                type: DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            total_discount: {
                type: DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            discount_attachment: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            discount_note: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            status: {
                type: new DataTypes.ENUM('active', 'deactive'),
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
