import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function task_details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let data2 = await models.TasksModel.findOne({
            where: {
                id: params.id,
            },
        });
        let data = await models.TaskUsersModel.findAll({
            where: {
                task_id: params.id,
            },
            include: [
                {
                    model: models.UserStaffsModel,
                    as: 'staff',
                    attributes: {
                        exclude: ['password'],
                    },
                },
                {
                    model: models.UserTeachersModel,
                    as: 'teacher',
                    attributes: {
                        exclude: ['password'],
                    },
                },
            ],
        });

        if (data) {
            return response(200, 'data founded', { data2, data });
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

export default task_details;
