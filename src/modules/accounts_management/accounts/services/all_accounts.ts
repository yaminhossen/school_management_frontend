import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Op, fn, col } from 'sequelize';

async function details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    const models = await db();
    const accountLogsModel = models.AccountLogsModel;
    const params = req.params as any;

    try {
        // Fetch accounts and sum income and expenses
        const data = await models.AccontsModel.findAll({
            include: [
                {
                    model: accountLogsModel,
                    as: 'account_log',
                    attributes: [
                        'type',
                        [fn('SUM', col('amount')), 'totalAmount'],
                    ],
                    // group: ['type'], // Grouping by type
                },
            ],
            attributes: {
                include: [
                    [fn('SUM', col('account_log.amount')), 'totalIncome'],
                ],
            },
        });

        // Prepare the result with totals for income and expenses
        const result = {
            totalIncome: 0,
            totalExpenses: 0,
            accounts: data,
        };

        // Process the account logs to get totals
        data.forEach((account) => {
            if (account.account_log) {
                account.account_log.forEach((log) => {
                    const totalAmount =
                        parseFloat(log.getDataValue('totalAmount')) || 0;
                    if (log.type === 'income') {
                        result.totalIncome += totalAmount;
                    } else if (log.type === 'expense') {
                        result.totalExpenses += totalAmount;
                    }
                });
            }
        });

        // Return the response with totals
        return response(200, 'Data retrieved successfully', data);
    } catch (error: any) {
        const uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default details;
