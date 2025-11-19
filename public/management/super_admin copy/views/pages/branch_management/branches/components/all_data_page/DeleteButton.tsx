import React from 'react';
import setup from '../../config/setup';
import { anyObject } from '../../../../../../common_types/object';
import { RootState, useAppDispatch } from '../../../../../../store';
import { soft_delete } from '../../config/store/async_actions/soft_delete';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
export interface Props {
    item: anyObject;
}

const DeleteButton: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    async function handle_delete(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();

        let confirm = await (window as anyObject).s_confirm(
            'The BRANCH will be deleted along with all its associated data, including students, parents, class,  fee records, routines, and other related information. Please proceed with caution.',
        );
        if (confirm) {
            const password = await (window as anyObject).s_confirm2(
                `To delete this branch, type your password below.`,
                'Delete Branch',
                true, // Enable input
            );

            if (password) {
                console.log('Password entered:', password);
                dispatch(
                    soft_delete({
                        id: props.item.id,
                        password: password,
                    }) as any,
                );
            }
        }
    }
    if (!state.show_active_data) {
        return <></>;
    }
    return (
        <>
            <a
                onClick={(e) => handle_delete(e)}
                href={`/${setup.route_prefix}/delete/${props.item.id}`}
            >
                Delete
            </a>
        </>
    );
};

export default DeleteButton;
