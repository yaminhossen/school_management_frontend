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
    await body('branch_id')
        .not()
        .isEmpty()
        .withMessage('the branch_id field is required')
        .run(req);

    await body('name')
        .not()
        .isEmpty()
        .withMessage('the name field is required')
        .run(req);

    await body('driver_number')
        .not()
        .isEmpty()
        .withMessage('the driver_number field is required')
        .run(req);

    await body('assistant_number_1')
        .not()
        .isEmpty()
        .withMessage('the assistant_number_1 field is required')
        .run(req);

    await body('assistant_number_2')
        .not()
        .isEmpty()
        .withMessage('the assistant_number_2 field is required')
        .run(req);

    await body('present_address')
        .not()
        .isEmpty()
        .withMessage('the present_address field is required')
        .run(req);

    await body('driver_licence')
        .not()
        .isEmpty()
        .withMessage('the driver_licence field is required')
        .run(req);

    await body('permanent_address')
        .not()
        .isEmpty()
        .withMessage('the permanent_address field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function store(
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
    let data = new models.BranchTransportDriversModel();

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: body.branch_id,
        name: body.name,
        driver_number: body.driver_number,
        assistant_number_1: body.assistant_number_1,
        assistant_number_2: body.assistant_number_2,
        present_address: body.present_address,
        driver_licence: body.driver_licence,
        permanent_address: body.permanent_address,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
