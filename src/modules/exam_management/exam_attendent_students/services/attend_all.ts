import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function attend_all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let studentMarksModel = models.ExamStudentMarksModel;
    let params = req.params as any;

    try {
        let attendentStudents = await models.ExamAttendentStudentsModel.findAll(
            {
                where: {
                    exam_id: 2,
                    class_id: 1,
                    subject_id: 1,
                },
            },
        );

        let studentIds = attendentStudents.map(
            (student: any) => student.student_id,
        );

        let marks = await models.ExamStudentMarksModel.findAll({
            where: {
                exam_id: 2,
                subject_id: 1,
                student_id: studentIds,
            },
        });

        let combinedData = attendentStudents.map((student: any) => {
            let studentMark = marks.find(
                (mark: any) =>
                    mark.exam_id === student.exam_id &&
                    mark.student_id === student.student_id &&
                    mark.subject_id === student.subject_id,
            );
            return {
                ...student.toJSON(),
                studentMarks: studentMark ? studentMark.toJSON() : null,
            };
        });

        if (combinedData.length > 0) {
            return response(200, 'data created', combinedData);
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

export default attend_all;
