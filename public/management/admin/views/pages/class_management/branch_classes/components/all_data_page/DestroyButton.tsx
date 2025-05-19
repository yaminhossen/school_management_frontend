import React from 'react';
import setup from '../../config/setup';
import { anyObject } from '../../../../../../common_types/object';
import { useAppDispatch } from '../../../../../../store';
import { destroy } from '../../config/store/async_actions/destroy';
export interface Props {
    item: anyObject;
    label?: string; // default label for the thing being deleted
}

const DestroyButton: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    async function handle_delete(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();

        const phrase = `Delete ${props.item?.name}`;

        const confirmed = await (window as anyObject).s_confirm(
            `To permanently delete this class, type "${phrase}" below.`,
            'Yes, delete it!',
            phrase, // ✨ pass the required input
        );

        if (confirmed) {
            dispatch(destroy({ id: props.item.id }) as any);
        }
        // const input = await (window as anyObject).s_confirm(
        //     `Type "Delete ${props.label}" to confirm deletion.`,
        // );

        // if (input === `Delete ${props.label}`) {
        //     dispatch(destroy({ id: props.item.id }) as any);
        // } else if (input !== null) {
        //     alert(
        //         `Deletion cancelled. You must type "Delete ${props.label}" exactly.`,
        //     );
        // }

        // let confirm = await (window as anyObject).s_confirm(
        //     'Delete permanently.',
        // );
        // if (confirm) {
        //     dispatch(destroy({ id: props.item.id }) as any);
        // }
    }
    return (
        <>
            <a
                onClick={(e) => handle_delete(e)}
                href={`/${setup.route_prefix}/destroy/${props.item.id}`}
            >
                Destroy
            </a>
        </>
    );
};

export default DestroyButton;
