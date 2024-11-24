import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject, anyObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Sequelize, Op } from 'sequelize';

async function month_wise_statement(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let body = req.body as anyObject;
    let params = req.params as any;

    // Use the values from the request body or set default values
    let month1 = body.month1 || '2024-09-12'; // Start date
    let month2 = body.month2 || '2024-09-22'; // End date

    // Add one day to month2
    const endDate = new Date(month2);
    endDate.setDate(endDate.getDate() + 1); // Increment by one day
    const formattedEndDate = endDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

    try {
        let data = await models.AccountLogsModel.findAll({
            where: {
                date: {
                    [Op.between]: [month1, formattedEndDate],
                },
                type: 'income',
            },
            // include: [
            //     {
            //         model: accountCategoriesModel,
            //         as: 'category',
            //     },
            //     {
            //         model: accountsModel,
            //         as: 'account',
            //     },
            // ],
            order: [['date', 'ASC']],
            // limit: 5,
        });

        if (data) {
            return response(200, 'data created', { data });
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

export default month_wise_statement;
