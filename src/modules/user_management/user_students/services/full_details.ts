import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let educationalBackgroundsModel =
        models.UserStudentEducationalBackgroundsModel;
    let informationsModel = models.UserStudentInformationsModel;
    let contactNumbersModel = models.UserStudentContactNumbersModel;
    let skillsModel = models.UserStudentSkillsModel;
    let studentParentsModel = models.UserStudentParentsModel;
    let languagesModel = models.UserStudentLanguagesModel;
    let documentValuesModel = models.UserStudentDocumentValuesModel;
    let documentTitlesModel = models.UserStudentDocumentTitlesModel;
    let studentsModel = models.UserStudentsModel;
    let parentsModel = models.UserParentsModel;
    let params = req.params as any;
    let user = (req as any).user;

    try {
        let data = await studentsModel.findOne({
            where: {
                id: user?.id,
            },
            attributes: {
                exclude: ['password'],
            },
            include: [
                {
                    model: educationalBackgroundsModel,
                    as: 'educational_backgrounds',
                },
                {
                    model: informationsModel,
                    as: 'student_info',
                },
                // {
                //     model: informationsModel,
                //     as: 'student_infos',
                // },
                {
                    model: contactNumbersModel,
                    as: 'student_numbers',
                },
                {
                    model: documentTitlesModel,
                    as: 'document_titles',
                    include: [
                        {
                            model: documentValuesModel,
                            as: 'values_title',
                        },
                    ],
                },
                {
                    model: documentValuesModel,
                    as: 'document_values',
                },
                {
                    model: languagesModel,
                    as: 'languages',
                },
                {
                    model: studentParentsModel,
                    as: 'parents',
                    include: [
                        {
                            model: parentsModel,
                            as: 'parent_details',
                        },
                    ],
                },
                {
                    model: skillsModel,
                    as: 'skills',
                },
            ],
        });

        if (data) {
            return response(200, 'data founded', data);
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

export default details;
