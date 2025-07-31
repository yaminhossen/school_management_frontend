import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Sequelize } from 'sequelize';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function teacher_class_details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let branchClassesModel = models.BranchClassesModel;
    let branchClassSubjectsModel = models.BranchClassSubjectsModel;
    let userStudentInformationsModel = models.UserStudentInformationsModel; // Assuming this is your model
    let params = req.params as any;
    let user = (req as any).user;
    console.log(' req user for ', user);
    console.log(' req user for ', params);

    try {
        let data = await models.BranchClassSubjectTeachersModel.findAll({
            where: {
                branch_teacher_id: params.id,
            },
            include: [
                {
                    model: branchClassesModel,
                    as: 'a_class',
                },
                {
                    model: branchClassSubjectsModel,
                    as: 'subject',
                },
            ],
        });

        if (data) {
            // Group data by class and count subjects for each class
            const groupedData = data.reduce((acc: any, item: any) => {
                const classId = item.a_class.id;

                if (!acc[classId]) {
                    acc[classId] = {
                        ...item.a_class.dataValues,
                        subjects: [],
                        subject_count: 0,
                    };
                }

                // Add subject to the class if not already added
                const subjectExists = acc[classId].subjects.find(
                    (s: any) => s.id === item.subject.id,
                );
                if (!subjectExists) {
                    acc[classId].subjects.push(item.subject.dataValues);
                    acc[classId].subject_count++;
                }

                return acc;
            }, {});

            const responseData = Object.values(groupedData);

            // Add total class count to response
            const totalClasses = responseData.length;

            return response(200, 'data found', {
                total_classes: totalClasses,
                classes: responseData,
            });
        } else {
            throw new custom_error(
                'not founddfdsfds',
                404,
                'datadgfghf not found',
            );
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

export default teacher_class_details;
