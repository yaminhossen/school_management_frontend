import React from 'react';
import setup from '../../config/setup';
import { Link } from 'react-router-dom';
import BackButton from '../../../../../components/BackButton';
import BackButton2 from '../../../../../components/BackButton2';
export interface Props {
    page_title: string;
}

const Header: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="action_bar">
                <div className="navigation">
                    <ul>
                        <li className="search_li"></li>
                    </ul>
                </div>
                <div className="title no_move" id="users_drag">
                    <h2>{props.page_title}</h2>
                </div>
                <div className="control">
                    <ul>
                        <li>
                            {/* <Link to={`/${setup.route_prefix}`}>
                                <span className="material-symbols-outlined fill">
                                    arrow_back
                                </span>
                            </Link> */}
                        </li>
                        <BackButton2></BackButton2>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
