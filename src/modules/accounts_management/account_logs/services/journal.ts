import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject, anyObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Sequelize } from 'sequelize';

async function journal(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let body = req.body as anyObject;
    let accountCategoriesModel = models.AccountCategoriesModel;
    let params = req.params as any;
    console.log('starsdate end date body', body);
    console.log('starsdate end date body2', body.month2);

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
            total_income_query_days: 0, // Sum of income from the last 7 entries
            total_expense_query_days: 0,
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
        // Sum the amounts from the last 7 entries based on type
        data.forEach((log) => {
            const amount = log.amount ?? 0; // Default to 0 if undefined
            if (log.type === 'income') {
                data2.total_income_query_days += amount;
            } else if (log.type === 'expense') {
                data2.total_expense_query_days += amount;
            }
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
