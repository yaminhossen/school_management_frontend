import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import user_branch_staff_slice from '../views/pages/user_management/user_branch_staff/config/store';
import user_admins_slice from '../views/pages/user_management/user_admins/config/store';
import user_staffs_slice from '../views/pages/user_management/user_staffs/config/store';
import user_teachers_slice from '../views/pages/user_management/user_teachers/config/store';
import user_parents_slice from '../views/pages/user_management/user_parents/config/store';
import user_students_slice from '../views/pages/user_management/user_students/config/store';
import user_branch_admins_slice from '../views/pages/user_management/user_branch_admins/config/store';
import branches_slice from '../views/pages/branch_management/branches/config/store';
import branch_buildings_slice from '../views/pages/branch_management/branch_buildings/config/store';
import branch_building_rooms_slice from '../views/pages/branch_management/branch_building_rooms/config/store';
import branch_building_room_beds_slice from '../views/pages/branch_management/branch_building_room_beds/config/store';
import branch_contacts_slice from '../views/pages/branch_management/branch_contacts/config/store';

const store = configureStore({
    reducer: {
        user_branch_staff: user_branch_staff_slice.reducer,
        common_store: commonStore.reducer,
        user_admins: user_admins_slice.reducer,
        user_staffs: user_staffs_slice.reducer,
        user_teachers: user_teachers_slice.reducer,
        user_parents: user_parents_slice.reducer,
        user_students: user_students_slice.reducer,
        user_branch_admins: user_branch_admins_slice.reducer,
        branches: branches_slice.reducer,
        branch_buildings: branch_buildings_slice.reducer,
        branch_building_rooms: branch_building_rooms_slice.reducer,
        branch_building_room_beds: branch_building_room_beds_slice.reducer,
        branch_contacts: branch_contacts_slice.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
