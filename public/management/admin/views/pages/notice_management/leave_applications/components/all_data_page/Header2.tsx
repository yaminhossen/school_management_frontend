import React from 'react';
import HeadSearch from './HeadSearch';
import HeadTitle from './HeadTitle';
import HeadRightButtons from './HeadRightButtons';
import HeadSearch2 from './HeadSearch2';
import HeadTitle2 from './HeadTitle2';
export interface Props {}

const Header2: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="action_bar">
                <HeadTitle2></HeadTitle2>
                <div className="navigation">
                    <ul>
                        <li className="search_li">
                            <HeadSearch2></HeadSearch2>
                        </li>
                    </ul>
                </div>
                <div className="control">
                    <HeadRightButtons></HeadRightButtons>
                </div>
            </div>
        </>
    );
};

export default Header2;
