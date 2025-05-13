import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
    label: string;
    path: string;
    icon: string;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

interface Props {
    title?: string;
    subtitle?: string;
    menuSections?: MenuSection[];
}

const T1: React.FC<Props> = ({
    title = 'Nurul Hiqamah Model Madrasa',
    subtitle = 'Super Admin Dashboard',
    menuSections = [
        {
            title: 'User Management',
            items: [
                {
                    label: 'Admin Management',
                    path: '/user-admins',
                    icon: 'groups',
                },
            ],
        },
        {
            title: 'Branch Management',
            items: [
                {
                    label: 'Branches Management',
                    path: '/branches',
                    icon: 'groups',
                },
            ],
        },
    ],
}) => {
    return (
        <div className="admin_dashboard">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <div className="menu_list custom_scroll">
                {menuSections.map((section, index) => (
                    <div key={section.title}>
                        <h3 className="mt-4 ms-0">{section.title}</h3>
                        <ul className="dashboard_links">
                            {section.items.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path}>
                                        <span className="material-symbols-outlined fill">
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {index < menuSections.length - 1 && (
                            <div
                                style={{
                                    height: '1px',
                                    width: '98%',
                                    backgroundColor: '#808080',
                                    margin: '10px 0',
                                }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default T1;
