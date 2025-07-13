import React from 'react';
import HeadSearch from './HeadSearch';
import HeadTitle from './HeadTitle';
import HeadRightButtons from './HeadRightButtons';
import HeadSearchComplete from './HeadSearchComplete';
export interface Props {}

const HeaderComplete: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="action_bar">
                <div className="navigation">
                    <ul>
                        <li className="search_li">
                            <HeadSearchComplete></HeadSearchComplete>
                        </li>
                    </ul>
                </div>
                <HeadTitle></HeadTitle>
                <div className="control">
                    <HeadRightButtons></HeadRightButtons>
                </div>
            </div>
        </>
    );
};

export default HeaderComplete;
