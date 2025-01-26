import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function exam_wise(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let branchClassSubjectsModel = models.BranchClassSubjectsModel;
    // let branchClassRoutinesModel = models.BranchClassRoutinesModel;
    // let branchClassRoutineDayTimesModel =
    //     models.BranchClassRoutineDayTimesModel;
    // let buildingRoomsModel = models.BranchBuildingRoomsModel;
    // let hallGuardPlansModel = models.ExamGuardPlansModel;
    let examsModel = models.ExamsModel;
    let examMarksModel = models.ExamStudentMarksModel;
    let params = req.params as any;
    console.log('class', params.id);
    try {
        // const { exam_id } = req.query; // Get `exam_id` from query parameters

        // if (!exam_id) {
        //     throw new custom_error(
        //         'Exam ID is required',
        //         400,
        //         'Missing exam_id',
        //     );
        // }

        let data = await examMarksModel.findAll({
            where: {
                class_id: 1,
                student_id: 1,
                exam_id: 2, // Filter by exam_id
            },
            include: [
                {
                    model: examsModel,
                    as: 'exams',
                },
            ],
        });

        if (data && data.length > 0) {
            // Group the data by title
            const groupedData = data.reduce((acc: any, item: any) => {
                const title = item.exams?.title || 'Unknown'; // Default to "Unknown" if title is missing
                if (!acc[title]) {
                    acc[title] = [];
                }
                acc[title].push(item);
                return acc;
            }, {});

            return response(200, 'Data grouped by title', groupedData);
        } else {
            throw new custom_error('Not found', 404, 'Data not found');
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('Server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default exam_wise;
