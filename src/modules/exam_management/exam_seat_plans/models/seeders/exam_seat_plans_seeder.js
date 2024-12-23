'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        let data = [];
        function set_data(
            id,
            branch_id,
            exam_id,
            class_id,
            student_id,
            building_id,
            room_id,
            seat_no,
        ) {
            data.push({
                id,
                branch_id,
                exam_id,
                class_id,
                student_id,
                building_id,
                room_id,
                seat_no,
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }

        set_data(1, 1, 1, 1, 1, 1, 1, 'A11');
        set_data(2, 2, 2, 2, 2, 2, 2, 'A12');
        set_data(3, 3, 3, 3, 3, 3, 3, 'A13');

        await queryInterface.bulkDelete('exam_seat_plans', null, {});
        await queryInterface.bulkInsert('exam_seat_plans', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_admin/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('exam_seat_plans', null, {});
    },
};
