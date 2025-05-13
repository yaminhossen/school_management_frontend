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

    await body('email')
        .not()
        .isEmpty()
        .withMessage('the email field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

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
    let model = new models.UserAdminsModel();

    let password = null;
    if (body.password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        password = await bcrypt.hash(body.password, saltRounds);
    }

    /** store data into database */
    try {
        let data = await models.UserAdminsModel.findByPk(body.id);
        if (data) {
            let inputs: InferCreationAttributes<typeof model> = {
                name: body.name || data.name,
                email: body.email || data.email,
                phone_number: body.phone_number || data.phone_number,
                image: body.image || data.image,
                password: password || data.password,
                token: body.token || data.token,
                forget_code: body.forget_code || data.forget_code,
                user_agent: body.user_agent || data.user_agent,
                parmanent_address:
                    body.parmanent_address || data.parmanent_address,
                country: body.country || data.country,
                district: body.district || data.district,
                post_code: body.post_code || data.post_code,
                alternative_number:
                    body.alternative_number || data.alternative_number,
                qualification: body.qualification || data.qualification,
                gender: body.gender || data.gender,
                is_married: body.is_married || data.is_married,
                blood_group: body.blood_group || data.blood_group,
                joining_date: body.joining_date || data.joining_date,
                role: body.role || data.role,
                national_id: body.national_id || data.national_id,
                certificate_no_1:
                    body.certificate_no_1 || data.certificate_no_1,
                certificate_no_2:
                    body.certificate_no_2 || data.certificate_no_2,
            };
            data.update(inputs);
            await data.save();
            return response(201, 'data updated', data);
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
