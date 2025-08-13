import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function admin_exam_routines(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let buildingRoomsModel = models.BranchBuildingRoomsModel;
    let hallGuardPlansModel = models.ExamGuardPlansModel;
    let branchClassSubjectsModel = models.BrachClassSubjectsModel;
    let examRoutinesModel = models.ExamRoutinesModel;
    let params = req.params as any;
    let user = (req as any).user;
    console.log('class', user);
    let body = req.body as any;

    try {
        let data = await examRoutinesModel.findAll({
            where: {
                class_id: body.branch_class_id,
                exam_id: body.branch_exam_id,
                section_id: body.branch_class_section_id,
            },
            include: [
                {
                    model: branchClassSubjectsModel,
                    as: 'subjects',
                },
                {
                    model: buildingRoomsModel,
                    as: 'room',
                },
                {
                    model: hallGuardPlansModel,
                    as: 'guard_plan',
                    // include: [
                    //     {
                    //         model: buildingRoomsModel,
                    //         as: 'room',
                    //     },
                    // ],
                },
            ],
        });
        // console.log('data', data);

        let s_class = await models.BranchClassesModel.findOne({
            where: {
                id: body.branch_class_id,
            },
        });

        let section = await models.BranchClassSectionsModel.findOne({
            where: {
                id: body.branch_class_section_id,
            },
        });
        let exams = await models.ExamsModel.findOne({
            where: {
                id: body.branch_exam_id,
            },
        });

        if (data) {
            return response(200, 'data foundeds', {
                data,
                s_class,
                exams,
                section,
            });
        } else {
            throw new custom_error('not found', 404, 'data not found');
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default admin_exam_routines;
