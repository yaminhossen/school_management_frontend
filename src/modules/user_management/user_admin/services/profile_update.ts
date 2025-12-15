import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
var bcrypt = require('bcrypt');
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment/moment';

async function validate(req: Request, models: any, user: any) {
    // await body('image')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the image field is required')
    //     .run(req);
    if (req?.body?.image) {
        await body('image')
            .not()
            .isEmpty()
            .withMessage('the image field is required')
            .run(req);
    }
    if (req?.body?.password) {
        await body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
            .run(req);
    }
    if (req?.body?.password) {
        await body('previous_password')
            .custom(async (previous_password) => {
                let data = await models.UserAdminsModel.findOne({
                    where: {
                        id: user.id,
                        role: 'admin',
                    },
                });
                let check_pass = await bcrypt.compare(
                    previous_password,
                    data.password,
                );
                if (!check_pass) {
                    throw new Error('previous password is incorrect');
                }
                return true;
            })
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}

async function profile_update(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let models = await db();
    let user = (req as any).user;
    let auth_user = await models.BranchStaffsModel.findOne({
        where: {
            user_staff_id: (req as any).user?.id || null,
        },
    });
    let validate_result = await validate(req as Request, models, user);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let body = req.body as anyObject;
    // let model = new models.UserAdminsModel();
    let model = new models.UserAdminsModel();
    let image_path = '';

    if (body['image']?.ext) {
        image_path =
            'uploads/admins/' +
            moment().format('YYYYMMDDHHmmss') +
            body['image'].name;
        await (fastify_instance as any).upload(body['image'], image_path);
    }

    let password = null;
    if (body.password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        password = await bcrypt.hash(body.password, saltRounds);
    }
    // if (password) {
    //     inputs.password = password;
    // }

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        // let data = await models.UserAdminsModel.findOne({
        //     where: {
        //         id: user?.id,
        //     },
        // });
        let data = await models.UserAdminsModel.findOne({
            where: {
                id: user?.id,
            },
        });
        if (data) {
            let inputs: InferCreationAttributes<typeof model> = {
                image: image_path || data.image,
                password: password || data.password,
            };
            inputs.image = image_path || data.image;
            inputs.password = password || data.password;
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

export default profile_update;
