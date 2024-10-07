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
import moment from 'moment';

async function validate(req: Request) {
    // await body('start_date')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the start_date field is required')
    //     .run(req);

    // await body('end_date')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the end_date field is required')
    //     .run(req);

    // await body('attachments')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the attachments field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}

async function expense_store(
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
    let data = new models.AccountLogsModel();
    let income_attachments: anyObject[] = [];
    for (let i = 0; i < parseInt(body.attachment?.length); i++) {
        let image_path = ``;
        // let image_file = body[`attachment${i}`];
        let image_file = body.attachment[i];
        if (image_file?.ext) {
            image_path =
                'uploads/accounts' +
                moment().format('YYYYMMDDHHmmss') +
                image_file.name;
            await (fastify_instance as any).upload(image_file, image_path);
        }
        income_attachments.push({
            file: image_path,
        });
    }

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: 1,
        account_category_id: body.category,
        account_id: body.account,
        receipt_no: body.receipt_no,
        amount_in_text: body.amount_in_text,
        amount: body.amount,
        date: body.date,
        type: 'expense',
    };
    console.log('thsi si s ikkkk');

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** expense_store data into database */
    try {
        (await data.update(inputs)).save();
        if (data) {
            if (income_attachments) {
                income_attachments.forEach(async (ss) => {
                    let ala_model = new models.AccountLogAttachmentsModel();
                    let ala_input: InferCreationAttributes<typeof ala_model> = {
                        branch_id: 1,
                        attachment_url: ss.file,
                        account_log_id: data.id || 1,
                    };
                    (await ala_model.update(ala_input)).save();
                });
            }
        }
        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default expense_store;
