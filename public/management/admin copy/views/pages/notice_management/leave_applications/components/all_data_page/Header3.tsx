import React from 'react';
import HeadSearch from './HeadSearch';
import HeadTitle from './HeadTitle';
import HeadRightButtons from './HeadRightButtons';
import HeadSearch3 from './HeadSearch3';
import HeadTitle3 from './HeadTitle3';
export interface Props {}

const Header3: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="action_bar">
                <div className="navigation">
                    <ul>
                        <li className="search_li">
                            <HeadSearch3></HeadSearch3>
                        </li>
                    </ul>
                </div>
                <HeadTitle3></HeadTitle3>
                <div className="control">
                    <HeadRightButtons></HeadRightButtons>
                </div>
            </div>
        </>
    );
};

export default Header3;
