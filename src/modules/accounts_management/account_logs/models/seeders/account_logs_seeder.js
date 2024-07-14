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
            account_category_id,
            account_id,
            account_period_id,
            money_receipt_book_id,
            amount,
            type,
        ) {
            data.push({
                id,
                branch_id,
                account_category_id,
                account_id,
                account_period_id,
                money_receipt_book_id,
                amount,
                type,
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }

        set_data(1, 1, 1, 1, 1, 1, 20000, 'income');
        set_data(2, 2, 2, 2, 2, 2, 30000, 'expense');
        set_data(3, 3, 3, 3, 3, 3, 40000, 'income');

        await queryInterface.bulkDelete('account_logs', null, {});
        await queryInterface.bulkInsert('account_logs', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_admin/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('account_logs', null, {});
    },
};
