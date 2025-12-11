import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Op } from 'sequelize';

async function session_wise_exam(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;
    let user = (req as any).user;
    let auth_user;
    auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: user?.id || null,
        },
    });
    let session = params?.session;
    try {
        // Create date range for the session year
        let startDate = new Date(`${session}-01-01T00:00:00.000Z`);
        let endDate = new Date(`${session}-12-31T23:59:59.999Z`);

        let data = await models.ExamsModel.findAll({
            where: {
                is_active: 'active',
                branch_id: auth_user?.branch_id,
                month: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        if (data) {
            return response(200, 'data created', data);
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

export default session_wise_exam;
