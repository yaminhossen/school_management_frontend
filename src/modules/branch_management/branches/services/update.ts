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

    await body('branch_code')
        .not()
        .isEmpty()
        .withMessage('the branch_code field is required')
        .run(req);

    // await body('logo')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the logo field is required')
    //     .run(req);

    await body('address')
        .not()
        .isEmpty()
        .withMessage('the address field is required')
        .run(req);

    await body('email')
        .not()
        .isEmpty()
        .withMessage('the email field is required')
        .run(req);
    if (req.body?.email) {
        await body('email')
            .custom(async (email) => {
                const existing = await models.UserStaffsModel.findOne({
                    where: { email },
                });
                if (existing) {
                    throw new Error('Email already exists');
                }
                return true;
            })
            .run(req);
    }
    await body('primary_contact')
        .not()
        .isEmpty()
        .withMessage('the primary_contact field is required')
        .bail()
        .matches(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/)
        .withMessage('Phone number must be a valid Bangladeshi number')
        .run(req);

    await body('map')
        .not()
        .isEmpty()
        .withMessage('the map field is required')
        .run(req);

    await body('lat')
        .not()
        .isEmpty()
        .withMessage('the lat field is required')
        .run(req);

    await body('lng')
        .not()
        .isEmpty()
        .withMessage('the lng field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function update(
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
    let model = new models.BranchesModel();
    let image_path1 = '';

    if (body['logo']?.ext) {
        image_path1 =
            'uploads/accounts' +
            moment().format('YYYYMMDDHHmmss') +
            body['logo'].name;
        await (fastify_instance as any).upload(body['logo'], image_path1);
    }

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.BranchesModel.findByPk(body.id);
        if (data) {
            let inputs: InferCreationAttributes<typeof model> = {
                name: body.name,
                branch_code: body.branch_code,
                logo: image_path1 || data.logo,
                address: body.address,
                primary_contact: body.primary_contact,
                email: body.email,
                map: body.map,
                lat: body.lat,
                lng: body.lng,
            };
            data.update(inputs);
            await data.save();
            return response(200, 'data updated', data);
        } else {
            throw new custom_error('Forbidden', 403, 'operation not possible');
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
