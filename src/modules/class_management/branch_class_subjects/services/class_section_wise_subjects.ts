import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function class_section_wise_subjects(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;
    let queryParams = req.query as any;
    let user = (req as any).user;
    let auth_user: any;
    if (user?.user_type === 'teacher') {
        auth_user = await models.BranchTeachersModel.findOne({
            where: {
                user_teacher_id: user?.id || null,
            },
        });
    } else if (user?.user_type === 'student') {
        auth_user = await models.UserStudentInformationsModel.findOne({
            where: {
                user_student_id: user?.id || null,
            },
        });
    } else {
        auth_user = await models.UserAdminsModel.findOne({
            where: {
                id: user?.id || null,
            },
        });
    }

    try {
        let data = await models.BranchClassSubjectsModel.findAll({
            where: {
                branch_class_id: params.id,
                branch_id: auth_user?.branch_id,
                branch_class_section_id: queryParams?.section_id,
            },
            // include: [
            //     {
            //         model: models.BranchClassSubjectsModel,
            //         as: 'subject',
            //         attributes: ['id', 'name'],
            //     },
            // ],
            // attributes: {
            //     exclude: ['password'],
            // },
        });

        // Filter unique records based on branch_class_subject_id
        // let uniqueSubjectIds = new Set();
        // let data = rawData.filter((item: any) => {
        //     if (!uniqueSubjectIds.has(item.branch_class_subject_id)) {
        //         uniqueSubjectIds.add(item.branch_class_subject_id);
        //         return true;
        //     }
        //     return false;
        // });

        if (data) {
            return response(200, 'data found', data);
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

export default class_section_wise_subjects;
