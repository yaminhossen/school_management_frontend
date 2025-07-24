import React from 'react';
import { anyObject } from '../../../../../common_types/object';

interface Props {
    selectedList: anyObject[]; // Now should be array with 0 or 1 item
    setSelectedList: (list: anyObject[]) => void;
}

const DropDownSelectedItem: React.FC<Props> = ({
    selectedList,
    setSelectedList,
}) => {
    const selected = selectedList[0];

    return (
        <div className="selected_item">
            {selected ? (
                <span>
                    {selected.name}
                    <button
                        type="button"
                        className="remove_btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedList([]);
                        }}
                        style={{ marginLeft: '8px' }}
                    >
                        ×
                    </button>
                </span>
            ) : (
                <span className="placeholder">Select parent</span>
            )}
        </div>
    );
};

export default DropDownSelectedItem;
