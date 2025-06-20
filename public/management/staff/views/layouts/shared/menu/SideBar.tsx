/* eslint-disable no-undef */
import React, { useState } from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
import axios from 'axios';
import { anyObject } from '../../../../common_types/object';
export interface Props {}

const SideBar: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    setTimeout(() => {
        init_nav_action();
        active_link(window.location.href);
    }, 1000);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            let confirm = await (window as anyObject).s_confirm('Logout');
            if (confirm) {
                await axios.post('/api/v1/auth/staff/logout');
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-home" label="Dashboard" />
                <MenuSingle
                    to="/profile/major-information"
                    icon="icon-user"
                    label="Profile"
                />
                {/* <MenuSingle
                    to="/attendance"
                    icon="icon-receipt"
                    label="Attendance"
                /> */}
                {/* <MenuSingle to="/reports" icon="icon-receipt" label="Reports" /> */}

                {/* sdfds */}
                <MenuSingle
                    to="/leave-application/approved"
                    icon="icon-notepad"
                    label="Leave Application"
                />
                {/* <MenuSingle
                    to="/salary-report"
                    icon="icon-notepad"
                    label="Salary Report"
                /> */}
                <MenuSingle
                    to="/tasks/pending"
                    icon="icon-notepad"
                    label="Tasks"
                />
                <MenuSingle
                    to="/meeting-agendas"
                    icon="icon-notepad"
                    label="Meetings"
                />
                <MenuSingle to="/notices" icon="icon-bell" label="Notices" />
                {/* <MenuSingle
                    to="/reports"
                    icon="icon-bookmark-alt"
                    label="Reports"
                /> */}
                <MenuSingle
                    to="/settings"
                    icon="icon-bookmark-alt"
                    label="Settings"
                />

                <MenuSingle
                    onClick={handleSubmit}
                    to=""
                    icon="icon-power-off"
                    label="Logout"
                />
                {/* <MenuSingle to="/" icon="icon-power-off" label="Logout" /> */}

                {/* <li>
                    <a
                        href="http://admin.pixelstrap.com/universal/default/maintenance.html"
                        className="sidebar-header"
                    >
                        <i className="icon-settings" />
                        <span>Maintenance</span>
                    </a>
                </li> */}
            </ul>
        </>
    );
};

function active_link(hash) {
    let url = new URL(hash);
    (window as any).$(`.sidebar-submenu a`).removeClass('active');
    (window as any)
        .$(`.sidebar-submenu a[href="${url.hash}"]`)
        .addClass('active');
}
function init_nav_action() {
    var animationSpeed = 300,
        subMenuSelector = '.sidebar-submenu';
    (window as any).$('.sidebar-menu').on('click', 'li a', function (e) {
        var $this = (window as any).$(this);
        var checkElement = $this.next();
        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent('li').removeClass('active');
        } else if (
            checkElement.is(subMenuSelector) &&
            !checkElement.is(':visible')
        ) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent('li');
            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }

        if (e.target && e.target.href && e.target.href.includes('http')) {
            active_link(e.target.href);
        }
    });
}

export default SideBar;
