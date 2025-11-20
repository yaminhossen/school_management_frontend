import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function all_branch_students(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let informationsModel = models.UserStudentInformationsModel;
    let params = req.params as any;
    let user = (req as any).user;
    let auth_user;
    auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: user?.id || null,
        },
    });

    try {
        let data = await informationsModel.count({
            where: {
                status: 'active',
            },
        });

        if (data) {
            return response(200, 'data created', { all_branch_students: data });
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

export default all_branch_students;
