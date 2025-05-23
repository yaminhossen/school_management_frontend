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

async function validate(req: Request, models: any) {
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

    await body('email')
        .custom(async (email) => {
            const existing = await models.UserTeachersModel.findOne({
                where: { email },
            });
            if (existing) {
                throw new Error('Email already exists');
            }
            return true;
        })
        .run(req);

    await body('phone_number')
        .not()
        .isEmpty()
        .withMessage('the phone_number field is required')
        .bail()
        .matches(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/)
        .withMessage('Phone number must be a valid Bangladeshi number')
        .run(req);

    await body('guardian_contact_number')
        .not()
        .isEmpty()
        .withMessage('the guardian_contact_number field is required')
        .bail()
        .matches(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/)
        .withMessage('Phone number must be a valid Bangladeshi number')
        .run(req);

    await body('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        // .withMessage('the password field is required')
        .run(req);

    await body('parmenent_address')
        .not()
        .isEmpty()
        .withMessage('the parmenent ddress field is required')
        .run(req);

    await body('present_address')
        .not()
        .isEmpty()
        .withMessage('the present address field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */

    let models = await db();
    let validate_result = await validate(req as Request, models);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let body = req.body as anyObject;
    let data = new models.UserTeachersModel();
    let user_teacher_info_model = new models.UserTeacherInformationsModel();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);

    let user = (req as any).user;
    let auth_user = await models.BranchTeachersModel.findOne({
        where: {
            user_teacher_id: (req as any).user?.id || null,
        },
    });

    let teacher_image = '';
    let national_id_image = '';
    let certificate1_image = '';
    let certificate2_image = '';

    if (body['teacher_image']?.ext) {
        teacher_image =
            'uploads/teachers/' +
            moment().format('YYYYMMDDHHmmss') +
            body['teacher_image'].name;
        await (fastify_instance as any).upload(
            body['teacher_image'],
            teacher_image,
        );
    }

    if (body['national_id']?.ext) {
        national_id_image =
            'uploads/teachers/' +
            moment().format('YYYYMMDDHHmmss') +
            body['national_id'].name;
        await (fastify_instance as any).upload(
            body['national_id'],
            national_id_image,
        );
    }

    if (body['certificate_1']?.ext) {
        certificate1_image =
            'uploads/teachers/' +
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
        image: teacher_image,
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
            let usi_model = new models.UserTeacherInformationsModel();
            let bs_model = new models.BranchTeachersModel();
            let usi_inputs: InferCreationAttributes<
                typeof user_teacher_info_model
            > = {
                user_teacher_id: data.id || body.teacher_id,
                parmenent_address: body.parmenent_address,
                present_address: body.present_address,
                guardian_contact_number: body.guardian_contact_number,
                is_married: body.is_married,
                country: body.country,
                district: body.district,
                post_code: body.post_code,
                gender: body.gender,
                joining_date: body.joining_date,
                department: body.department,
                qualification: body.qualification,
                blood_group: body.blood_group,
                national_id: national_id_image,
                certificate_no_1: certificate1_image,
                certificate_no_2: certificate2_image,
                creator: user?.id || null,
            };
            let bs_inputs: InferCreationAttributes<typeof bs_model> = {
                user_teacher_id: data.id || body.staff_id,
                // class_teacher_id: body.class,
                joining_date: body.joining_date,
                department: body.department,
                branch_id: auth_user?.branch_id || 1,
                creator: user?.id || null,
            };
            (await usi_model.update(usi_inputs)).save();
            (await bs_model.update(bs_inputs)).save();
        }
        return response(200, 'data created', { data, user_teacher_info_model });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
