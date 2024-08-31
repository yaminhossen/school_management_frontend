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

    // await body('account_category_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the account_category_id field is required')
    //     .run(req);

    // await body('account_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the account_id field is required')
    //     .run(req);

    // await body('account_period_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the account_period_id field is required')
    //     .run(req);

    // await body('money_receipt_book_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the money_receipt_book_id field is required')
    //     .run(req);

    // await body('amount')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the amount field is required')
    //     .run(req);

    // await body('type')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the type field is required')
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
    let data = new models.AccountLogsModel();
    let ac_model = new models.AccountCategoriesModel();
    let ap_model = new models.AccountPeriodsModel();
    let a_model = new models.AccountsModel();
    let mrb_model = new models.MoneyReceiptBooksModel();
    let afc_model = new models.AccountFeeCollectionsModel();

    let ac_inputs: InferCreationAttributes<typeof ac_model> = {
        branch_id: body.branch_id,
        title: body.ac_title,
        description: body.ac_description,
    };

    let ap_inputs: InferCreationAttributes<typeof ap_model> = {
        branch_id: body.branch_id,
        year_month: body.ap_year_month,
        description: body.ap_description,
    };

    let a_inputs: InferCreationAttributes<typeof a_model> = {
        branch_id: body.branch_id,
        title: body.accounts_title,
        description: body.accounts_description,
    };

    let mrb_inputs: InferCreationAttributes<typeof mrb_model> = {
        branch_id: body.branch_id,
        book_no: body.mrb_book_no,
        start_serial: body.mrb_start_serial,
        end_serial: body.mrb_end_serial,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await ac_model.update(ac_inputs)).save();
        (await ap_model.update(ap_inputs)).save();
        (await a_model.update(a_inputs)).save();
        (await mrb_model.update(mrb_inputs)).save();
        if (ac_model && ap_model && a_model && mrb_model) {
            let inputs: InferCreationAttributes<typeof data> = {
                branch_id: body.branch_id,
                account_category_id: ac_model.id || 1,
                account_id: a_model.id || 1,
                account_period_id: ap_model.id || 1,
                money_receipt_book_id: mrb_model.id || 1,
                receipt_no: body.receipt_no,
                amount: body.al_amount,
                type: body.al_type,
            };
            (await data.update(inputs)).save();
            if (data) {
                let afc_inputs: InferCreationAttributes<typeof afc_model> = {
                    branch_id: body.branch_id,
                    branch_student_id: 1,
                    branch_student_class_id: 1,
                    date: body.afc_date,
                    amount: body.afc_amount,
                    account_category_id: ac_model.id || 1,
                    account_log_id: data.id || 1,
                };
                (await afc_model.update(afc_inputs)).save();
            }
        }
        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
