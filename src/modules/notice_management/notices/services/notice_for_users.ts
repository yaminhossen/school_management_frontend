import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function all_students(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let NoticeSeenByUsersModel = models.NoticeSeenByUsersModel;
    let params = req.params as any;
    const Sequelize = require('sequelize');
    let user = (req as any).user;
    let auth_user;
    if (user.user_type === 'admin') {
        auth_user = await models.UserAdminsModel.findOne({
            where: {
                id: user?.id || null,
            },
        });
    } else if (user.user_type === 'teacher') {
        auth_user = await models.BranchTeachersModel.findOne({
            where: {
                user_teacher_id: user?.id || null,
            },
        });
    } else if (user.user_type === 'parent') {
        auth_user = await models.BranchParentsModel.findOne({
            where: {
                user_parent_id: user?.id || null,
            },
        });
    } else if (user.user_type === 'student') {
        auth_user = await models.UserStudentInfomationsModel.findOne({
            where: {
                user_student_id: user?.id || null,
            },
        });
    } else {
        auth_user = await models.BranchStaffsModel.findOne({
            where: {
                user_staff_id: user?.id || null,
            },
        });
    }
    // console.log(
    //     'auth_user--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
    //     auth_user, user,
    // );

    try {
        let data = await models.NoticesModel.findAll({
            where: {
                notice_for: {
                    [Sequelize.Op.in]: [params.user, 'all'],
                },
                branch_id: auth_user?.branch_id,
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

export default all_students;
