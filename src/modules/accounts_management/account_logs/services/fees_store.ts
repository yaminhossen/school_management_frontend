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
    // await body('branch_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the branch_id field is required')
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
    let data = new models.AccountLogsModel();
    let afc_model = new models.AccountFeeCollectionsModel();

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: 1,
        account_category_id: (req.body as anyObject).category_id || 1,
        account_id: (req.body as anyObject).account_id || 1,
        account_period_id: (req.body as anyObject).period_id || 1,
        money_receipt_book_id: (req.body as anyObject).mrb_id || 1,
        receipt_no: (req.body as anyObject).receipt_no,
        amount: (req.body as anyObject).amount,
        type: (req.body as anyObject).type,
    };
    let student_fees: anyObject[] = [];
    for (
        let i = 0;
        i <= parseInt((req.body as anyObject).total_fees_count);
        i++
    ) {
        // console.log('dklfs', i);
        let fees = (req.body as anyObject)[`fees_${i}`];
        if (fees) {
            let temp = {
                receipt_no: (req.body as anyObject).receipt_no,
                date: (req.body as anyObject).date,
                account_category_id: (req.body as anyObject)
                    .account_category_id,
                account_period_id: (req.body as anyObject).account_period_id,
                account_id: (req.body as anyObject).account_id,
                amount_in_text: (req.body as anyObject).amount_in_text,
                amount: (req.body as anyObject)[`fees_${i}`],
                type: (req.body as anyObject)[`fees_type_${i}`],
            };
            student_fees.push(temp);
        }
    }
    console.log('body for fees store', student_fees);
    // console.log('body for fees store', req.body as anyObject);

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data2 = await models.UserStudentInformationsModel.findOne({
            where: {
                user_student_id: (req.body as anyObject).student_id,
            },
        });
        console.log('data sclass', data2?.s_class);

        let s_class = data2?.s_class;

        // (await data.update(inputs)).save();
        if (data) {
            let afc_inputs: InferCreationAttributes<typeof afc_model> = {
                branch_id: (req.body as anyObject).branch_id,
                branch_student_id: (req.body as anyObject).student_id,
                branch_student_class_id: s_class || 1,
                date: (req.body as anyObject).date,
                amount: (req.body as anyObject).amount,
                account_category_id: (req.body as anyObject).category_id || 1,
                account_log_id: data.id || 1,
            };
            // (await afc_model.update(afc_inputs)).save();
        }

        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}
export default store;
