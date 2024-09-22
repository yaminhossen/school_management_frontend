import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Sequelize } from 'sequelize';

async function journal(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let accountCategoriesModel = models.AccountCategoriesModel;
    let params = req.params as any;

    try {
        let data = await models.AccountLogsModel.findAll({
            // where: {
            //     id: params.id,
            // },

            include: [
                {
                    model: accountCategoriesModel,
                    as: 'category',
                },
            ],
            order: [['createdAt', 'DESC']], // Assuming 'createdAt' is the timestamp field
            limit: 5,
            // attributes: {
            //     include: [
            //         [
            //             Sequelize.literal(`(
            //                 SELECT SUM(logs.amount)
            //                 FROM account_logs AS logs
            //                 WHERE logs.type = 'income'
            //             )`),
            //             'total_income',
            //         ],
            //         [
            //             Sequelize.literal(`(
            //                 SELECT SUM(logs.amount)
            //                 FROM account_logs AS logs
            //                 WHERE logs.type = 'expense'
            //             )`),
            //             'total_expense',
            //         ],
            //     ],
            // },
        });
        // Initialize data2 object
        let data2 = {
            total_expense: 0,
            total_income: 0,
        };

        // Calculate total income and total expense
        data2.total_income = await models.AccountLogsModel.sum('amount', {
            where: {
                type: 'income',
            },
        });

        data2.total_expense = await models.AccountLogsModel.sum('amount', {
            where: {
                type: 'expense',
            },
        });

        if (data) {
            return response(200, 'data created', { data, data2 });
        } else {
            throw new custom_error('not found', 404, 'data not found');
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default journal;
