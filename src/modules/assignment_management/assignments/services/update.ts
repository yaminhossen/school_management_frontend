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
import moment from 'moment/moment';

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
    await body('assignment_categories_id')
        .not()
        .isEmpty()
        .withMessage('the assignment_categories_id field is required')
        .run(req);
    await body('mark')
        .not()
        .isEmpty()
        .withMessage('the mark field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function update(
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
    let model = new models.AssignmentsModel();
    let data = await models.AssignmentsModel.findByPk(body.id);
    let prevFile = data?.attachment;
    let image_path = '';

    if (body['attachment']?.ext) {
        image_path =
            'uploads/teachers/' +
            moment().format('YYYYMMDDHHmmss') +
            body['attachment'].name;
        await (fastify_instance as any).upload(body['attachment'], image_path);
    }

    console.log('update body', body);
    console.log('attachemetn', image_path);
    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id || 1,
        title: body.title,
        description: body.description,
        assignment_categories_id: body.assignment_categories_id,
        attachment: image_path || prevFile || 'avatar.png',
        image: body.image,
        mark: body.mark,
        class_id: body.class,
        subject_id: body.subject,
        deadline: body.deadline,
        creator: 1,
    };
    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.AssignmentsModel.findByPk(body.id);
        if (data) {
            data.update(inputs);
            await data.save();
            return response(200, 'data updated', data);
        } else {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default update;
