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

    try {
        let data = await models.MeetingsModel.findOne({
            where: {
                id: body.id,
            },
        });

        // Check if the main subject exists
        if (!data) {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }

        // Deactivate main data
        data.status = 'deactive';
        await data.save();

        const meetingAgendas = await models.MeetignAgendasModel.findAll({
            where: { meeting_id: body.id },
        });

        // Deactivate all dayTimes entries
        if (meetingAgendas && meetingAgendas.length > 0) {
            for (const agenda of meetingAgendas) {
                agenda.status = 'deactive';
                await agenda.save();
            }
        }

        return response(205, 'All related data deactivated', data);
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
