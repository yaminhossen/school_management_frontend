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
    // await body('exam_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the exam_id field is required')
    //     .run(req);
    // await body('class_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the class_id field is required')
    //     .run(req);
    // await body('subject_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the subject_id field is required')
    //     .run(req);
    // await body('student_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the student_id field is required')
    //     .run(req);
    // await body('obtained_mark')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the obtained_mark field is required')
    //     .run(req);
    // await body('other_mark')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the other_mark field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}

async function mark_store(
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
    let model = new models.ExamStudentMarksModel();

    let inputs1: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id,
        exam_id: body.exam_id,
        class_id: body.class_id,
        student_id: body.student_id,
        subject_id: body.subject_id,
        obtained_mark: body.mark == '' ? null : body.mark,
        other_mark: body.other_mark == '' ? null : body.other_mark,
    };

    console.log('thsi is update data11', body);
    console.log('thsi is update data12', body.mark);
    console.log('thsi is update data13', body.other_mark);

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.ExamStudentMarksModel.findOne({
            where: {
                exam_id: body.exam_id,
                class_id: body.class_id,
                student_id: body.student_id,
                subject_id: body.subject_id,
            },
        });
        if (data) {
            let inputs: InferCreationAttributes<typeof model> = {
                branch_id: body.branch_id,
                exam_id: body.exam_id,
                class_id: body.class_id,
                student_id: body.student_id,
                subject_id: body.subject_id,
                obtained_mark: body.mark || data.obtained_mark,
                // obtained_mark:
                //     body?.studentMarks?.obtained_mark || data.obtained_mark,
                other_mark: body.other_mark || data.other_mark,
            };
            (await data.update(inputs)).save();
            return response(200, 'data updated', data);
        } else {
            let newData = (await model.update(inputs1)).save();
            return response(200, 'data created', newData);
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

export default mark_store;
