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
    await body('branch_id')
        .not()
        .isEmpty()
        .withMessage('the branch_id field is required')
        .run(req);
    await body('staff_id')
        .not()
        .isEmpty()
        .withMessage('the staff_id field is required')
        .run(req);
    await body('teacher_id')
        .not()
        .isEmpty()
        .withMessage('the teacher_id field is required')
        .run(req);
    await body('account_log_id')
        .not()
        .isEmpty()
        .withMessage('the account_log_id field is required')
        .run(req);
    await body('transaction_date')
        .not()
        .isEmpty()
        .withMessage('the transaction_date field is required')
        .run(req);
    await body('base_salary')
        .not()
        .isEmpty()
        .withMessage('the base_salary field is required')
        .run(req);
    await body('deductions')
        .not()
        .isEmpty()
        .withMessage('the deductions field is required')
        .run(req);
    await body('pay_amount')
        .not()
        .isEmpty()
        .withMessage('the pay_amount field is required')
        .run(req);
    await body('bonses')
        .not()
        .isEmpty()
        .withMessage('the bonses field is required')
        .run(req);
    await body('payment_type')
        .not()
        .isEmpty()
        .withMessage('the payment_type field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function update(
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
    let model = new models.BranchEmployeePayrollTransactionsModel();

    let inputs: InferCreationAttributes<typeof model> = {
        account_log_id: body.account_log_id,
        staff_id: body.staff_id,
        teacher_id: body.teacher_id,
        branch_id: body.branch_id,
        transaction_date: body.transaction_date,
        base_salary: body.base_salary,
        deductions: body.deductions,
        pay_amount: body.pay_amount,
        bonuses: body.bonuses,
        payment_type: body.payment_type,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.BranchEmployeePayrollTransactionsModel.findByPk(
            body.id,
        );
        if (data) {
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
