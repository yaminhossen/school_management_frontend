import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function staff_all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let data = await models.UserStaffsModel.findAll({
            attributes: {
                exclude: ['password'],
            },
            // include: [
            //     {
            //         model: models.TaskUsersModel,
            //         as: 'taskstaffs',
            //         required: false,
            //         where: [
            //             {
            //                 task_id: 3,
            //             },
            //         ],
            //     },
            // ],
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

export default staff_all;
