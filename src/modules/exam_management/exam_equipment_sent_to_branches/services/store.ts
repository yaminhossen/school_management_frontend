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
    await body('exam_id')
        .not()
        .isEmpty()
        .withMessage('the exam_id field is required')
        .run(req);
    await body('exam_equipment_id')
        .not()
        .isEmpty()
        .withMessage('the exam_equipment_id field is required')
        .run(req);
    await body('target_branch_id')
        .not()
        .isEmpty()
        .withMessage('the target_branch_id field is required')
        .run(req);
    await body('received')
        .not()
        .isEmpty()
        .withMessage('the received field is required')
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
    let data = new models.ExamEquipmentSentToBranchesModel();

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: body.branch_id,
        exam_id: body.exam_id,
        exam_equipment_id: body.exam_equipment_id,
        target_branch_id: body.exam_equipment_id,
        received: body.exam_equipment_id,
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
