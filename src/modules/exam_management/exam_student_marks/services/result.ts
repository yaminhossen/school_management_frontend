import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// Helper function to get grade based on score
function getGrade(score: number): string {
    if (score >= 80 && score <= 100) {
        return 'A+';
    } else if (score >= 70 && score < 80) {
        return 'A';
    } else if (score >= 60 && score < 70) {
        return 'A-';
    } else if (score >= 50 && score < 60) {
        return 'B';
    } else if (score >= 40 && score < 50) {
        return 'C';
    } else if (score >= 33 && score < 40) {
        return 'D';
    } else if (score < 33) {
        return 'F';
    } else {
        return 'Invalid';
    }
}

async function result(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let examMarksModel = models.ExamStudentMarksModel;
    let userStudentInformationsModel = models.UserStudentInformationsModel;
    let params = req.params as any;
    let user = (req as any).user;
    let auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: (req as any).user?.id || null,
        },
    });
    console.log('class user', params?.exam_id, params?.session);
    let exam_id = params?.exam_id;
    let session = params?.session;

    try {
        // Get all students by branch and session
        let students = await userStudentInformationsModel.findAll({
            where: {
                branch_id: auth_user?.branch_id || 1,
                session: params?.session || 2025,
            },
            attributes: ['user_student_id'],
        });

        // Process each student to get exam marks and sum by subject
        let results = await Promise.all(
            students.map(async (student: any) => {
                // Fetch exam marks for this student and exam
                let marks = await examMarksModel.findAll({
                    where: {
                        exam_id: exam_id,
                        student_id: student.user_student_id,
                    },
                    attributes: ['subject_id', 'obtained_mark'],
                });

                // Sum obtained_mark by subject_id
                let subjectMarks: { [key: number]: number } = {};
                marks.forEach((mark: any) => {
                    if (subjectMarks[mark.subject_id]) {
                        subjectMarks[mark.subject_id] +=
                            mark.obtained_mark || 0;
                    } else {
                        subjectMarks[mark.subject_id] = mark.obtained_mark || 0;
                    }
                });

                // Convert to array format
                let subjectMarksArray = Object.entries(subjectMarks).map(
                    ([subject_id, total_marks]) => ({
                        subject_id: parseInt(subject_id),
                        total_marks: total_marks,
                    }),
                );

                // Calculate total marks and average
                let totalMarks = subjectMarksArray.reduce(
                    (sum, subject) => sum + subject.total_marks,
                    0,
                );
                let averageMarks =
                    subjectMarksArray.length > 0
                        ? totalMarks / subjectMarksArray.length
                        : 0;

                // Calculate grade for the student based on average
                let studentGrade = getGrade(averageMarks);

                return {
                    student_id: student.user_student_id,
                    subject_marks: subjectMarksArray,
                    total_marks: totalMarks,
                    average_marks: averageMarks,
                    total_subjects: subjectMarksArray.length,
                    student_grade: studentGrade,
                };
            }),
        );

        // Filter out students who have no marks
        let studentsWithMarks = results.filter(
            (result) => result.total_subjects > 0,
        );

        // Calculate overall grade statistics
        let overallGradeCount: { [key: string]: number } = {
            'A+': 0,
            A: 0,
            'A-': 0,
            B: 0,
            C: 0,
            D: 0,
            F: 0,
        };

        let passCount = 0;
        let failCount = 0;

        studentsWithMarks.forEach((student) => {
            overallGradeCount[student.student_grade]++;

            if (student.student_grade === 'F') {
                failCount++;
            } else {
                passCount++;
            }
        });

        // Calculate overall grade percentages
        let totalStudents = studentsWithMarks.length;
        let overallGradePercentages: { [key: string]: number } = {};
        Object.keys(overallGradeCount).forEach((grade) => {
            overallGradePercentages[grade] =
                totalStudents > 0
                    ? (overallGradeCount[grade] / totalStudents) * 100
                    : 0;
        });

        // Calculate pass/fail percentages
        let passPercentage =
            totalStudents > 0 ? (passCount / totalStudents) * 100 : 0;
        let failPercentage =
            totalStudents > 0 ? (failCount / totalStudents) * 100 : 0;

        return response(200, 'data found', {
            students: studentsWithMarks,
            overall_statistics: {
                total_students: totalStudents,
                grade_count: overallGradeCount,
                grade_percentages: overallGradePercentages,
                pass_count: passCount,
                fail_count: failCount,
                pass_percentage: passPercentage,
                fail_percentage: failPercentage,
            },
        });
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

export default result;
