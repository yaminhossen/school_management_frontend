import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';

async function validate(req: Request) {
    await body('title')
        .not()
        .isEmpty()
        .withMessage('the title field is required')
        .run(req);
    await body('description')
        .not()
        .isEmpty()
        .withMessage('the description field is required')
        .run(req);
    await body('date')
        .not()
        .isEmpty()
        .withMessage('the date field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function task_assign(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let data = new models.TasksModel();
    let user = (req as any).user;

    let auth_user = await models.BranchStaffsModel.findOne({
        where: {
            user_staff_id: user?.id || null,
        },
    });
    const fstaffs = JSON.parse(body.staffs);
    const fteachers = JSON.parse(body.teachers);

    let staffs: anyObject[] = [];
    for (let i = 0; i < parseInt(fstaffs.length); i++) {
        staffs.push({
            staff_id: fstaffs[i],
        });
    }

    let teachers: anyObject[] = [];
    for (let i = 0; i < parseInt(fteachers.length); i++) {
        teachers.push({
            teacher_id: fteachers[i],
        });
    }

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: auth_user?.branch_id || 1,
        title: body.title,
        description: body.description,
        is_complete: body.is_complete,
        date: body.date,
        creator: user?.id || null,
    };
    console.log('form body form task assign page', body.title);
    console.log('form body form task assign page', body);

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        // let record = await models.TaskUsersModel.findOne({
        //     where: {
        //         task_id: body.id,
        //     },
        // });

        // if (record) {
        //     // Delete the record
        //     await record.destroy();
        // } else {
        //     // console.log(`Record with ID ${id} not found.`)
        // }
        if (data) {
            if (staffs) {
                staffs.forEach(async (ss) => {
                    let usl_model = new models.TaskUsersModel();
                    let usl_inputs: InferCreationAttributes<typeof usl_model> =
                        {
                            branch_id: auth_user?.branch_id || 1,
                            staff_id: ss.staff_id || null,
                            teacher_id: ss.teacher_id || null,
                            admin_id: ss.admin_id || null,
                            task_id: data.id,
                            creator: user?.id || null,
                        };
                    usl_inputs.branch_id = auth_user?.branch_id || 1;
                    usl_inputs.staff_id = ss.staff_id || null;
                    usl_inputs.teacher_id = ss.teacher_id || null;
                    usl_inputs.admin_id = ss.admin_id || null;
                    usl_inputs.task_id = data.id;
                    (await usl_model.update(usl_inputs)).save();
                });
            }
            if (teachers) {
                teachers.forEach(async (ss) => {
                    let usl_model = new models.TaskUsersModel();
                    let usl_inputs: InferCreationAttributes<typeof usl_model> =
                        {
                            branch_id: auth_user?.branch_id || 1,
                            staff_id: ss.staff_id || null,
                            teacher_id: ss.teacher_id || null,
                            admin_id: ss.admin_id || null,
                            task_id: data.id,
                            creator: user?.id || null,
                        };
                    usl_inputs.branch_id = auth_user?.branch_id || 1;
                    usl_inputs.staff_id = ss.staff_id || null;
                    usl_inputs.teacher_id = ss.teacher_id || null;
                    usl_inputs.admin_id = ss.admin_id || null;
                    usl_inputs.task_id = data.id;
                    (await usl_model.update(usl_inputs)).save();
                });
            }
        }
        return response(202, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default task_assign;
