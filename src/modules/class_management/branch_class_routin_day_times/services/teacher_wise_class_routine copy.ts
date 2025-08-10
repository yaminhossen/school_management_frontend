import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function teacher_wise_class_routine(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let user = (req as any).user;

    try {
        // Step 1: First get teacher subject assignments to find class_id, section_id and subject details
        const teacherSubjects =
            await models.BranchClassSubjectTeachersModel.findAll({
                where: {
                    branch_teacher_id: user?.id,
                },
                include: [
                    {
                        model: models.BranchClassesModel,
                        as: 'class',
                        attributes: ['id', 'name'],
                        required: false,
                    },
                    {
                        model: models.BranchClassSectionsModel,
                        as: 'section',
                        attributes: ['id', 'title'],
                        required: false,
                    },
                    {
                        model: models.BranchClassSubjectsModel,
                        as: 'subject',
                        attributes: ['id', 'name', 'code'],
                        required: false,
                    },
                ],
            });

        if (!teacherSubjects || teacherSubjects.length === 0) {
            throw new custom_error(
                'not found',
                404,
                'No subject assignments found for this teacher',
            );
        }

        // Step 2: Get subject IDs from teacher assignments
        const subjectIds = teacherSubjects.map(
            (ts: any) => ts.branch_class_subject_id,
        );

        // Step 3: Now get routine data based on teacher subjects
        const routineData =
            await models.BranchClassRoutineDayTimesModel.findAll({
                where: {
                    branch_teacher_id: user?.id,
                    branch_class_subject_id: subjectIds,
                },
                include: [
                    {
                        model: models.BranchClassTeachersModel,
                        as: 'teacher',
                        attributes: ['id', 'name', 'email'],
                        required: false,
                    },
                    {
                        model: models.BranchBuildingRoomsModel,
                        as: 'room',
                        attributes: ['id', 'room_code', 'room_name'],
                        required: false,
                    },
                    {
                        model: models.BranchClassSubjectsModel,
                        as: 'subject',
                        attributes: ['id', 'name', 'code'],
                        required: false,
                    },
                ],
                order: [
                    ['day_no', 'ASC'],
                    ['start_time', 'ASC'],
                ],
            });

        // Step 4: Structure data hierarchically: Classes -> Sections -> Subjects -> Routine
        const hierarchicalData: any = {};

        console.log('=== DEBUGGING ===');
        console.log('Teacher Subjects Length:', teacherSubjects.length);
        console.log('Routine Data Length:', routineData.length);

        // First, create the structure based on teacher subjects
        teacherSubjects.forEach((teacherSubject: any) => {
            const classId = teacherSubject.branch_class_id;
            const className = teacherSubject.class?.name || `Class ${classId}`;
            const sectionId = teacherSubject.branch_class_section_id;
            const sectionTitle = `Section ${sectionId}`;
            const subjectId = teacherSubject.branch_class_subject_id;
            const subjectName =
                teacherSubject.subject?.name || 'Unknown Subject';
            const subjectCode = teacherSubject.subject?.code || '';

            // Initialize class
            if (!hierarchicalData[classId]) {
                hierarchicalData[classId] = {
                    class_id: classId,
                    class_name: className,
                    sections: {},
                };
            }

            // Initialize section
            if (!hierarchicalData[classId].sections[sectionId]) {
                hierarchicalData[classId].sections[sectionId] = {
                    section_id: sectionId,
                    section_title: sectionTitle,
                    subjects: {},
                };
            }

            // Initialize subject with empty routine
            if (
                !hierarchicalData[classId].sections[sectionId].subjects[
                    subjectId
                ]
            ) {
                hierarchicalData[classId].sections[sectionId].subjects[
                    subjectId
                ] = {
                    subject_id: subjectId,
                    subject_name: subjectName,
                    subject_code: subjectCode,
                    routine: Array(7)
                        .fill(null)
                        .map(() => ({
                            time: '',
                            room: '',
                            day_name: '',
                        })),
                };
            }
        });

        // Then, populate routine data where available
        console.log('Processing routine data:', routineData.length, 'records');

        // Debug: Print first routine record completely
        if (routineData.length > 0) {
            console.log(
                'First routine record:',
                JSON.stringify(routineData[0], null, 2),
            );
        }

        routineData.forEach((routine: any) => {
            const teacherSubject = teacherSubjects.find(
                (ts: any) =>
                    ts.branch_class_subject_id ===
                    routine.branch_class_subject_id,
            );

            if (!teacherSubject) {
                return;
            }

            const classId = teacherSubject.branch_class_id;
            const sectionId = teacherSubject.branch_class_section_id;
            const subjectId = routine.branch_class_subject_id;

            // Debug: Check what we have in routine
            console.log('Routine data fields:', {
                day_no: routine.day_no,
                day_name: routine.day_name,
                start_time: routine.start_time,
                end_time: routine.end_time,
                room: routine.room,
            });

            // Use day_no directly since: Saturday=0, Sunday=1, Monday=2, etc.
            let dayIndex = routine.day_no || 0; // Default to Saturday (0)

            if (
                hierarchicalData[classId]?.sections[sectionId]?.subjects[
                    subjectId
                ]
            ) {
                hierarchicalData[classId].sections[sectionId].subjects[
                    subjectId
                ].routine[dayIndex] = {
                    time: `${routine.start_time} - ${routine.end_time}`,
                    room: routine.room?.room_name || '',
                    day_name: routine.day_name,
                    day_no: routine.day_no,
                };

                console.log(
                    'Successfully updated routine for dayIndex:',
                    dayIndex,
                );
            }
        }); // Step 5: Convert to array format
        const result = Object.values(hierarchicalData).map(
            (classData: any) => ({
                ...classData,
                sections: Object.values(classData.sections).map(
                    (sectionData: any) => ({
                        ...sectionData,
                        subjects: Object.values(sectionData.subjects),
                    }),
                ),
            }),
        );

        return response(200, 'Teacher hierarchical routine data found', result);
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

export default teacher_wise_class_routine;
