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
    // await body('name')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the name field is required')
    //     .run(req);

    // await body('email')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the email field is required')
    //     .run(req);

    // await body('phone_number')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the phone_number field is required')
    //     .run(req);

    // await body('password')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the password field is required')
    //     .run(req);

    // await body('parmenent_address')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the parmenent_address field is required')
    //     .run(req);

    // await body('present_address')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the present_address field is required')
    //     .run(req);

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

    let user = (req as any).user;

    let staff_image = '';
    let national_id_image = '';
    let certificate1_image = '';
    let certificate2_image = '';

    if (body['image']?.ext) {
        staff_image =
            'uploads/staffs/' +
            moment().format('YYYYMMDDHHmmss') +
            body['image'].name;
        await (fastify_instance as any).upload(body['image'], staff_image);
    }

    if (body['national_id']?.ext) {
        national_id_image =
            'uploads/staffs/' +
            moment().format('YYYYMMDDHHmmss') +
            body['national_id'].name;
        await (fastify_instance as any).upload(
            body['national_id'],
            national_id_image,
        );
    }

    if (body['certificate_1']?.ext) {
        certificate1_image =
            'uploads/staffs/' +
            moment().format('YYYYMMDDHHmmss') +
            body['certificate_1'].name;
        await (fastify_instance as any).upload(
            body['certificate_1'],
            certificate1_image,
        );
    }

    if (body['certificate_2']?.ext) {
        certificate2_image =
            'uploads/staffs/' +
            moment().format('YYYYMMDDHHmmss') +
            body['certificate_2'].name;
        await (fastify_instance as any).upload(
            body['certificate_2'],
            certificate2_image,
        );
    }

    let inputs: InferCreationAttributes<typeof data> = {
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        role: body.role,
        image: staff_image,
        password: password,
        creator: user?.id || null,
    };

    console.log('staff from', body);

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        if (data) {
            let usi_model = new models.UserStaffInformationsModel();
            let bs_model = new models.BranchStaffsModel();
            let usi_inputs: InferCreationAttributes<typeof user_staff> = {
                user_staff_id: data.id,
                parmenent_address: body.parmenent_address,
                present_address: body.present_address,
                guardian_contact_number: body.guardian_contact_number,
                is_married: body.is_married,
                country: body.country,
                district: body.district,
                post_code: body.post_code,
                qualification: body.qualification,
                gender: body.gender,
                blood_group: body.blood_group,
                responsibility: body.responsibility,
                national_id: body.national_id,
                certificate1: body.certificate1,
                certificate2: body.certificate2,
                creator: user?.id || null,
            };
            (await usi_model.update(usi_inputs)).save();
            // (await bs_model.update(useb_inputs)).save();
        }
        return response(200, 'data created', { data, user_staff });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
