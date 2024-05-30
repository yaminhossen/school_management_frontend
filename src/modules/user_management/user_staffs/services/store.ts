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
    await body('phone_number')
        .not()
        .isEmpty()
        .withMessage('the phone_number field is required')
        .run(req);
    await body('password')
        .not()
        .isEmpty()
        .withMessage('the password field is required')
        .run(req);
    await body('parmenent_address')
        .not()
        .isEmpty()
        .withMessage('the parmenent_address field is required')
        .run(req);
    await body('present_address')
        .not()
        .isEmpty()
        .withMessage('the present_address field is required')
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
    let data = new models.UserStaffsModel();
    let user_staff = new models.UserStaffInformationsModel();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);

    let inputs: InferCreationAttributes<typeof data> = {
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        image: body.image,
        password: password,
    };
    let user_staff_information_inputs: InferCreationAttributes<
        typeof user_staff
    > = {
        parmenent_address: body.parmenent_address,
        present_address: body.present_address,
        guardian_contact_number: body.guardian_contact_number,
        ismarried: body.ismarried,
        graduation: body.graduation,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        if (data) {
            (
                await user_staff.update({
                    ...user_staff_information_inputs,
                    user_staff_id: data.id,
                })
            ).save();
        }
        return response(200, 'data created', { data, user_staff });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
