import React from 'react';
import setup from '../../config/setup';
import { Link } from 'react-router-dom';
export interface Props {
    page_title: string;
}

const HeaderComplete: React.FC<Props> = (props: Props) => {
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
                            <Link to={`/${setup.route_prefix}/completed`}>
                                <span className="material-symbols-outlined fill">
                                    arrow_back
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HeaderComplete;
