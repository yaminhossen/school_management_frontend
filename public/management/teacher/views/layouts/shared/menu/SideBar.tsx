/* eslint-disable no-undef */
import React from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
export interface Props {}

const SideBar: React.FC<Props> = (props: Props) => {
    setTimeout(() => {
        init_nav_action();
        active_link(window.location.href);
    }, 1000);

    return (
        <>
            <ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-home" label="Dashboard" />
                <MenuSingle to="/profile" icon="icon-user" label="Profile" />
                <MenuSingle
                    to="/class-routine"
                    icon="icon-calendar"
                    label="Class Routine"
                />
                <MenuSingle
                    to="/exam-routine"
                    icon="icon-clipboard"
                    label="Exam Routine"
                />
                <MenuSingle
                    to="/hall-guard-routine"
                    icon="icon-clipboard"
                    label="Hall Guard Routine"
                />
                <MenuSingle to="/result" icon="icon-book" label="Result" />
                <MenuSingle
                    to="/attendance"
                    icon="icon-receipt"
                    label="Attendance"
                />
                <MenuSingle
                    to="/class-attendance"
                    icon="icon-receipt"
                    label="Class Attendance"
                />

                {/* sdfds */}

                <MenuSingle to="/" icon="icon-receipt" label="Home" />
                <MenuSingle
                    to="/students"
                    icon="icon-receipt"
                    label="Students"
                />
                <MenuSingle
                    to="/assignment"
                    icon="icon-receipt"
                    label="Assignment"
                />
                <MenuSingle
                    to="/course-materials"
                    icon="icon-receipt"
                    label="Course Materials"
                />
                <MenuSingle to="/reports" icon="icon-receipt" label="Reports" />
                <MenuSingle
                    to="/settings"
                    icon="icon-receipt"
                    label="Settings"
                />
                <MenuSingle
                    to="/analytics"
                    icon="icon-receipt"
                    label="Analytics"
                />

                {/* sdfds */}

                <MenuDropDown
                    section_title=""
                    group_title="Fee"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Due List" to="/users" />
                    <MenuDropDownItem label="Payment History" to="/users" />
                    <MenuDropDownItem label="Pay Fees" to="/users" />
                </MenuDropDown>

                <MenuSingle
                    to="/leave-application"
                    icon="icon-notepad"
                    label="Leave Application"
                />
                <MenuSingle
                    to="/academic-resources"
                    icon="icon-server"
                    label="Academic Resources"
                />
                <MenuSingle to="/notices" icon="icon-bell" label="Notices" />
                <MenuSingle
                    to="/my-activities"
                    icon="icon-ruler-pencil"
                    label="My Activities"
                />
                {/* <MenuSingle to="/" icon="icon-bookmark-alt" label="Reports" /> */}

                <MenuSingle to="/" icon="icon-power-off" label="Logout" />

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
