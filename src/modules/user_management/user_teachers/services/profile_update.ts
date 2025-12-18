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
var bcrypt = require('bcrypt');

async function validate(req: Request, models: any, user: any) {
    if (req?.body?.password) {
        await body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
            .run(req);
    }
    if (req?.body?.password) {
        await body('previous_password')
            .custom(async (previous_password) => {
                let data = await models.UserTeachersModel.findOne({
                    where: {
                        id: user.id,
                        // role: 'super-admin',
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
    let validate_result = await validate(req as Request, models, user);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let body = req.body as anyObject;
    let model = new models.UserTeachersModel();
    let image_path = '';

    if (body['image']?.ext) {
        image_path =
            'uploads/teachers/' +
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

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.UserTeachersModel.findOne({
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

export default profile_update;
