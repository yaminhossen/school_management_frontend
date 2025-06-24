import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import { responseObject, Request } from '../../../common_types/object';
import response from '../helpers/response';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';

/** validation rules */
async function validate(req: Request) {
    await body('id')
        .not()
        .isEmpty()
        .withMessage('the id field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}
async function soft_delete(
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
    let body = req.body as { [key: string]: any };
    let user = (req as any).user;
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);
    // let auth_user = await models.BranchTeachersModel.findOne({
    //     where: {
    //         user_teacher_id: (req as any).user?.id || null,
    //     },
    // });
    console.log('user', user);

    try {
        const super_user = await models.UserStaffsModel.findOne({
            where: { id: user?.id },
        });

        if (!super_user) {
            throw new custom_error('Forbidden', 403, 'operation not possible');
        }
        console.log(
            'super user password',
            super_user.password,
            'password',
            body.password,
        );
        let check_pass = await bcrypt.compare(
            body.password,
            super_user.password,
        );

        if (!check_pass) {
            throw new custom_error('Forbidden', 403, 'password not matched');
        }

        const branch = await models.BranchesModel.findOne({
            where: { id: body.id },
        });

        if (!branch) {
            throw new custom_error('Forbidden', 403, 'operation not possible');
        }

        branch.status = 'active';
        await branch.save();

        return response(200, 'data deactivated', branch);
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

export default soft_delete;
