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

/** validation rules */
async function validate(req: Request) {
    // await body('branch_id')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the branch_id field is required')
    //     .run(req);

    await body('branch_class_id')
        .not()
        .isEmpty()
        .withMessage('the branch_class_id field is required')
        .run(req);

    await body('branch_teacher_id1')
        .not()
        .isEmpty()
        .withMessage('the branch_teacher_id field is required')
        .run(req);
    await body('branch_class_section_id')
        .not()
        .isEmpty()
        .withMessage('the branch_class_section_id field is required')
        .run(req);

    await body('room_id')
        .not()
        .isEmpty()
        .withMessage('the room_id field is required')
        .run(req);

    await body('name')
        .not()
        .isEmpty()
        .withMessage('the name field is required')
        .run(req);

    await body('code')
        .not()
        .isEmpty()
        .withMessage('the code field is required')
        .run(req);

    // await body('level')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the level field is required')
    //     .run(req);

    // await body('credit')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the credit field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
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
    let data = new models.BranchClassSubjectsModel();
    let room_model = new models.BranchClassRoomsModel();
    let day_times_model = new models.BranchClassRoutineDayTimesModel();
    let routine_model = new models.BranchClassRoutinesModel();
    let subject_teachers_model = new models.BranchClassSubjectTeachersModel();
    let user = (req as any).user;
    let auth_user = await models.BranchAdminsModel.findOne({
        where: {
            user_admin_id: (req as any).user?.id || null,
        },
    });

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: auth_user?.branch_id || 1,
        branch_class_id: body.branch_class_id,
        branch_class_section_id: body.branch_class_section_id,
        name: body.name,
        code: body.code,
        level: body.level,
        description: body.description,
        credit: body.credit || 0,
        additional_info: body.additional_info,
        creator: user?.id || null,
    };

    let class_routine: anyObject[] = [];
    for (let i = 0; i < parseInt(body.class_days); i++) {
        class_routine.push({
            day_name: body.day_name[i],
            day_no: body.day_no[i],
            start_time: body.start_time[i],
            end_time: body.end_time[i],
            // branch_class_subject_id: body.subject_id,
            branch_class_section_id: body.branch_class_section_id,
            branch_teacher_id: body.branch_teacher_id[i],
            branch_class_room_id: body.room[i],
        });
    }
    console.log('subject routing', body);
    console.log('subject routing', body.day_name);
    console.log('subject routinsdfdsfdsfsdg', body.day_name[1]);
    console.log('subject routing', class_routine);

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        if (data) {
            let r_model = new models.BranchClassRoutinesModel();
            let r_inputs: InferCreationAttributes<typeof r_model> = {
                branch_id: auth_user?.branch_id || 1,
                branch_class_id: body.branch_class_id,
                branch_class_section_id: body.branch_class_section_id,
                branch_class_subject_id: data.id || 0,
                branch_teacher_id: body.branch_teacher_id1,
                creator: user?.id || null,
            };
            (await r_model.update(r_inputs)).save();
            let bcst_model = new models.BranchClassSubjectTeachersModel();
            let bcst_inputs: InferCreationAttributes<typeof bcst_model> = {
                branch_id: auth_user?.branch_id || 1,
                branch_class_id: body.branch_class_id,
                branch_teacher_id: body.branch_teacher_id1,
                branch_class_subject_id: data.id || 0,
                branch_class_section_id: body.branch_class_section_id,
                branch_class_room_id: body.room_id,
                description: body.description,
                creator: user?.id || null,
            };
            (await bcst_model.update(bcst_inputs)).save();

            // this is for handeling order by data insert.
            // if (class_routine && Array.isArray(class_routine)) {
            //     for (const ss of class_routine) {
            //         console.log('Processing:', ss);

            //         let crdt_model =
            //             new models.BranchClassRoutineDayTimesModel();
            //         let crdt_inputs: InferCreationAttributes<
            //             typeof crdt_model
            //         > = {
            //             branch_id: auth_user?.branch_id || 1,
            //             branch_class_routine_id: r_model.id || 0,
            //             branch_teacher_id: ss.branch_teacher_id || 0,
            //             branch_class_subject_id: data.id || 0,
            //             branch_class_room_id: ss.branch_class_room_id || 0,
            //             day_name: ss.day_name,
            //             day_no: ss.day_no,
            //             start_time: ss.start_time || null,
            //             end_time: ss.end_time || null,
            //             creator: user?.id || null,
            //         };

            //         await crdt_model.update(crdt_inputs).save();
            //     }
            // }

            if (class_routine) {
                class_routine.forEach(async (ss) => {
                    console.log('sfldjfldsj', ss);
                    let crdt_model =
                        new models.BranchClassRoutineDayTimesModel();
                    let crdt_inputs: InferCreationAttributes<
                        typeof crdt_model
                    > = {
                        branch_id: auth_user?.branch_id || 1,
                        branch_class_routine_id: r_model.id || 0,
                        branch_teacher_id: body.branch_teacher_id || 0,
                        branch_class_subject_id: data.id || 0,
                        branch_class_room_id: body.room || 0,
                        day_name: body.day_name,
                        day_no: body.day_no,
                        start_time: body.start_time || null,
                        end_time: body.end_time || null,
                        creator: user?.id || null,
                    };
                    crdt_inputs.branch_id = auth_user?.branch_id || 1;
                    crdt_inputs.branch_class_routine_id = r_model.id || 0;
                    crdt_inputs.branch_teacher_id = ss.branch_teacher_id || 0;
                    crdt_inputs.branch_class_subject_id = data.id || 0;
                    crdt_inputs.branch_class_room_id =
                        ss.branch_class_room_id || 0;
                    crdt_inputs.day_name = ss.day_name;
                    crdt_inputs.day_no = ss.day_no;
                    crdt_inputs.start_time = ss.start_time || null;
                    crdt_inputs.end_time = ss.end_time || null;
                    (await crdt_model.update(crdt_inputs)).save();
                });
            }
        }
        return response(201, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
