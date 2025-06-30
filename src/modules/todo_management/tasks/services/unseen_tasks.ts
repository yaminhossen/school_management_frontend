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
    // await body('title')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the title field is required')
    //     .run(req);

    // await body('description')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the description field is required')
    //     .run(req);

    // await body('date')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the date field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}

async function unseen_tasks(
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
    let data = new models.TaskUsersModel();
    let user = (req as any).user;
    let params = req.params as any;
    console.log(
        'this route is hit by the admission oficer --------------------------------------------------------',
        params,
    );

    let auth_user = await models.BranchStaffsModel.findOne({
        where: {
            user_staff_id: user?.id || null,
        },
    });

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: auth_user?.branch_id || 1,
        is_seen: 'yes',
        creator: user?.id || null,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** unseen_tasks data into database */
    try {
        let data = await models.TaskUsersModel.findAll({
            where: {
                staff_id: user?.id,
                branch_id: auth_user?.branch_id,
                is_seen: 'no',
                is_complete: 'pending',
                status: 'active',
            },
        });
        if (!data) {
            throw new custom_error('not found', 404, 'task not found');
        }
        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default unseen_tasks;
