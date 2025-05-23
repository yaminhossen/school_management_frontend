import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import { responseObject, Request } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

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
async function destroy(
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

    try {
        let data = await models.UserTeachersModel.findOne({
            where: {
                id: body.id,
            },
        });
        let data2 = await models.UserTeacherInformationsModel.findOne({
            where: {
                user_teacher_id: body.id,
            },
        });
        let data3 = await models.BranchTeachersModel.findOne({
            where: {
                user_teacher_id: body.id,
            },
        });
        let data4 = await models.UserAdminsModel.findOne({
            where: {
                teacher_id: body.id,
            },
        });

        if (data || data2 || data3 || data4) {
            if (data4) {
                await data4.destroy();
            }
            if (data3) {
                await data3.destroy();
            }
            if (data2) {
                await data2.destroy();
            }
            if (data) {
                await data.destroy();
            }
            return response(200, 'data permanently deleted', {});
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

export default destroy;
