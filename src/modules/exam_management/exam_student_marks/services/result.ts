import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function result(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let examMarksModel = models.ExamStudentMarksModel;
    let userStudentInformationsModel = models.UserStudentInformationsModel;
    let params = req.params as any;
    let user = (req as any).user;
    let auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: (req as any).user?.id || null,
        },
    });
    console.log('class user', user);

    try {
        let data = await userStudentInformationsModel.findAll({
            where: {
                branch_id: auth_user?.branch_id || 1,
                session: params?.session || 2025,
            },
            attributes: ['user_student_id'],
        });

        return response(200, 'data found', data);
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

export default result;
