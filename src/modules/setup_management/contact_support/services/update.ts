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
    await body('id')
        .not()
        .isEmpty()
        .withMessage('the id field is required')
        .run(req);

    await body('name')
        .not()
        .isEmpty()
        .withMessage('the name field is required')
        .run(req);
    await body('title')
        .not()
        .isEmpty()
        .withMessage('the title field is required')
        .run(req);
    // await body('number')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the number field is required')
    //     .run(req);

    await body('number')
        .not()
        .isEmpty()
        .withMessage('the number field is required')
        .bail()
        .matches(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/)
        .withMessage('Phone number must be a valid Bangladeshi number')
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
    let model = new models.ContactSupportsModel();
    let user = (req as any).user;
    let auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: (req as any).user?.id || null,
        },
    });

    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: auth_user?.branch_id || 1,
        name: body.name,
        title: body.title,
        number: body.number,
        creator: user?.id || null,
    };
    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.ContactSupportsModel.findByPk(body.id);
        if (data) {
            (await data.update(inputs)).save();
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
