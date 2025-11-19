import React from 'react';
import setup from '../../config/setup';
import { anyObject } from '../../../../../../common_types/object';
import { RootState, useAppDispatch } from '../../../../../../store';
import { restore } from '../../config/store/async_actions/restore';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
export interface Props {
    item: anyObject;
}

const RestoreButton: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    async function handle_delete(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();

        let confirm = await (window as anyObject).s_confirm(
            'Are you sure you want to restore this BRANCH?',
        );
        if (confirm) {
            const password = await (window as anyObject).s_confirm2(
                `To restore this branch, type your password below.`,
                'Restore Branch',
                true, // Enable input
            );

            if (password) {
                console.log('Password entered:', password);
                dispatch(
                    restore({
                        id: props.item.id,
                        password: password,
                    }) as any,
                );
            }
        }
    }
    if (state.show_active_data) {
        return <></>;
    }
    return (
        <>
            <a
                onClick={(e) => handle_delete(e)}
                href={`/${setup.route_prefix}/delete/${props.item.id}`}
            >
                Restore
            </a>
        </>
    );
};

export default RestoreButton;
