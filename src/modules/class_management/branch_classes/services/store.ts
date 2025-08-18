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

/** validation rules */
async function validate(req: Request, models: any, auth_user: any) {
    await body('name')
        .not()
        .isEmpty()
        .withMessage('the name field is required')
        .run(req);

    if (req.body?.name) {
        await body('name')
            .custom(async (name) => {
                const existing = await models.BranchClassesModel.findOne({
                    where: {
                        name: name,
                        branch_id: auth_user?.branch_id,
                    },
                });
                if (existing) {
                    throw new Error(`${req.body?.name} class already exists`);
                }
                return true;
            })
            .run(req);
    }

    await body('code')
        .not()
        .isEmpty()
        .withMessage('the code field is required')
        .run(req);

    await body('capacity')
        .not()
        .isEmpty()
        .withMessage('the capacity field is required')
        .run(req);

    await body('prerequisities')
        .not()
        .isEmpty()
        .withMessage('the prerequisities field is required')
        .run(req);

    // await body('rules')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the rules field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let models = await db();
    let user = (req as any).user;
    let auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: (req as any).user?.id || null,
        },
    });
    console.log('auth_User', auth_user?.branch_id);

    let validate_result = await validate(req as Request, models, auth_user);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */

    let body = req.body as anyObject;
    let data = new models.BranchClassesModel();
    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: auth_user?.branch_id || 0,
        name: body.name,
        code: body.code,
        capacity: body.capacity,
        fee: body.fee,
        prerequisities: body.prerequisities,
        student_instructions: body.student_instructions,
        parent_instructions: body.parent_instructions,
        policies: body.policies,
        rules: body.rules,
        waiver_rules: body.waiver_rules,
        discount_rules: body.discount_rules,
        creator: user?.id || null,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        return response(201, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
