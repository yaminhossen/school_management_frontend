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
            full_name,
            phone_number,
            address,
            photo,
        ) {
            data.push({
                id,
                branch_id,
                full_name,
                phone_number,
                address,
                photo,
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }

        set_data(
            1,
            1,
            'Abdur Rahman',
            '01876787343',
            'Mirpur, Dhaka',
            'assets/images/file.pdf',
        );
        set_data(
            2,
            1,
            'Rajib Hossain',
            '01876787344',
            'Kustia, Khulna',
            'assets/images/file.pdf',
        );
        set_data(
            3,
            1,
            'Jahid Hasan',
            '01876787345',
            'Demra, Dhaka',
            'assets/images/file.pdf',
        );

        await queryInterface.bulkDelete('account_customers', null, {});
        await queryInterface.bulkInsert('account_customers', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_admin/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('account_customers', null, {});
    },
};