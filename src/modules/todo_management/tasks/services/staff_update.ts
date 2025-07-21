import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { InferCreationAttributes } from 'sequelize';
import moment from 'moment/moment';

async function staff_update(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let taskModel = new models.TasksModel();
    let taskUserModel = new models.TaskUsersModel();
    let params = req.params as any;
    console.log('staff founded');
    let ssss = 'completed';
    let body = req.body as anyObject;
    let t_attachment = '';

    let user = (req as any).user;
    let auth_user = await models.BranchTeachersModel.findOne({
        where: {
            user_teacher_id: (req as any).user?.id || null,
        },
    });
    if (body['attachment']?.ext) {
        t_attachment =
            'uploads/tasks/' +
            moment().format('YYYYMMDDHHmmss') +
            body['attachment'].name;
        await (fastify_instance as any).upload(
            body['attachment'],
            t_attachment,
        );
    }
    console.log(
        'body----------------------------------------------------------',
        body,
    );

    try {
        let data2 = await models.TaskUsersModel.findByPk(body.id);
        console.log('data2', data2);

        if (data2) {
            let inputs2: InferCreationAttributes<typeof taskUserModel> = {
                is_complete: ssss || body?.is_complete,
                attachment: t_attachment || data2.attachment,
                description: body.description,
            };
            (await data2.update(inputs2)).save();
            return response(200, 'data updated', data2);
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

export default staff_update;
