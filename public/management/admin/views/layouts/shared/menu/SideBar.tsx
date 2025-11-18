/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
import axios from 'axios';
import { anyObject } from '../../../../../admin/common_types/object';
export interface Props {}

const SideBar: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            // Check if jQuery is available
            if (typeof (window as any).$ !== 'undefined' || typeof (window as any).jQuery !== 'undefined') {
                init_nav_action();
                active_link(window.location.href);
            }
        }, 1000);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            let confirm = await (window as anyObject).s_confirm('Logout');
            if (confirm) {
                await axios.post('/api/v1/auth/teacher/logout');
            }
        } catch (error) {
            setError(error);
        }
    };
    return (
        <>
            <ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-home" label="Dashboard" />

                {/* User Management */}
                <MenuDropDown icon="icon-user" group_title="User Management">
                    <MenuDropDownItem
                        to="/user-staffs"
                        label="Employee Management"
                    />
                    <MenuDropDownItem
                        to="/user-teachers"
                        label="Teachers Management"
                    />
                    <MenuDropDownItem
                        to="/user-parents"
                        label="Parents Management"
                    />
                    <MenuDropDownItem
                        to="/user-students"
                        label="Students Management"
                    />
                </MenuDropDown>

                {/* Todo Management */}
                <MenuDropDown icon="icon-notepad" group_title="Todo Management">
                    <MenuDropDownItem to="/tasks" label="Tasks Management" />
                </MenuDropDown>

                {/* Branch Management */}
                <MenuDropDown
                    icon="icon-location-pin"
                    group_title="Branch Management"
                >
                    <MenuDropDownItem
                        to="/branch-buildings"
                        label="Branch Buildings"
                    />
                    <MenuDropDownItem
                        to="/branch-building-rooms"
                        label="Building Rooms"
                    />
                    <MenuDropDownItem
                        to="/branch-transport-drivers"
                        label="Transport Drivers"
                    />
                    <MenuDropDownItem
                        to="/branch-transports"
                        label="Transports"
                    />
                    <MenuDropDownItem
                        to="/academic-calendar-event-types"
                        label="Calendar Event Types"
                    />
                    <MenuDropDownItem
                        to="/academic-calendars"
                        label="Academic Calendars"
                    />
                </MenuDropDown>

                {/* Academic Management */}
                <MenuDropDown
                    icon="icon-briefcase"
                    group_title="Academic Management"
                >
                    <MenuDropDownItem to="/branch-classes" label="Classes" />
                    <MenuDropDownItem
                        to="/branch-class-sections"
                        label="Class Sections"
                    />
                    <MenuDropDownItem
                        to="/branch-class-subjects"
                        label="Class Subjects"
                    />
                    <MenuDropDownItem
                        to="/branch-class-routine-day-times/class-routine"
                        label="Class Routine"
                    />
                    <MenuDropDownItem to="/exams" label="Exam Management" />
                    <MenuDropDownItem
                        to="/exam-routines/at-a-glance"
                        label="Exam Routine (Glance)"
                    />
                    <MenuDropDownItem
                        to="/exam-routines"
                        label="Exam Routine Management"
                    />
                    <MenuDropDownItem
                        to="/student-overall-evaluations"
                        label="Student Evaluations"
                    />
                    <MenuDropDownItem
                        to="/student-evaluation-criterias"
                        label="Evaluation Criterias"
                    />
                </MenuDropDown>

                {/* Fees Management */}
                <MenuDropDown icon="icon-wallet" group_title="Fees Management">
                    <MenuDropDownItem
                        to="/branch-class-fee-types"
                        label="Class Fee Types"
                    />
                    <MenuDropDownItem
                        to="/branch-class-fees"
                        label="Class Fees"
                    />
                    <MenuDropDownItem to="/user-students" label="Due List" />
                </MenuDropDown>

                {/* Meeting Management */}
                <MenuDropDown
                    icon="icon-calendar"
                    group_title="Meeting Management"
                >
                    <MenuDropDownItem to="/meeting" label="Meetings" />
                    <MenuDropDownItem
                        to="/meeting-agendas"
                        label="Meeting Agendas"
                    />
                </MenuDropDown>

                {/* Account Management */}
                <MenuDropDown
                    icon="icon-briefcase"
                    group_title="Account Management"
                >
                    <MenuDropDownItem
                        to="/accounts"
                        label="Account Management"
                    />
                    <MenuDropDownItem
                        to="/account-categories"
                        label="Account Categories"
                    />
                    <MenuDropDownItem to="/journal" label="Journal" />
                    <MenuDropDownItem to="/debit" label="Debit" />
                    <MenuDropDownItem to="/credit" label="Credit" />
                    <MenuDropDownItem
                        to="/profit-loss"
                        label="Profit And Loss"
                    />
                    <MenuDropDownItem
                        to="/month-wise-statement"
                        label="Month Wise Statement"
                    />
                </MenuDropDown>

                {/* HRM Management */}
                <MenuDropDown icon="icon-user" group_title="HRM Management">
                    <MenuDropDownItem
                        to="/leave-applications/pending"
                        label="Leave Management"
                    />
                    <MenuDropDownItem to="/leave-types" label="Leave Types" />
                </MenuDropDown>

                {/* Notice Management */}
                <MenuDropDown icon="icon-bell" group_title="Notice Management">
                    <MenuDropDownItem
                        to="/notice-categorys"
                        label="Notice Categories"
                    />
                    <MenuDropDownItem to="/notices" label="Notice Management" />
                    <MenuDropDownItem to="/faqs" label="FAQ Management" />
                    <MenuDropDownItem
                        to="/policies"
                        label="Policy Management"
                    />
                    <MenuDropDownItem
                        to="/contact-supports"
                        label="Contact Support"
                    />
                </MenuDropDown>

                <MenuSingle
                    to="/settings"
                    icon="icon-settings"
                    label="Settings"
                />

                <MenuSingle
                    onClick={handleSubmit}
                    to="no-where"
                    icon="icon-power-off"
                    label="Logout"
                />
            </ul>
        </>
    );
};

function active_link(hash) {
    try {
        let url = new URL(hash);
        const $ = (window as any).$ || (window as any).jQuery;
        if ($) {
            $(`.sidebar-submenu a`).removeClass('active');
            $(`.sidebar-submenu a[href="${url.hash}"]`).addClass('active');
        }
    } catch (error) {
        console.error('Error in active_link:', error);
    }
}

function init_nav_action() {
    const $ = (window as any).$ || (window as any).jQuery;
    
    if (!$) {
        console.error('jQuery is not available');
        return;
    }
    
    var animationSpeed = 300;
    var subMenuSelector = '.sidebar-submenu';
    
    // Remove any existing event handlers first to prevent duplicates
    $('.sidebar-menu').off('click.sidebarMenu');
    
    // Use namespaced event to prevent conflicts
    $('.sidebar-menu').on('click.sidebarMenu', 'li a', function (e) {
        var $this = $(this);
        var checkElement = $this.next();
        
        // Check if this link has a submenu next to it
        var hasSubmenu = checkElement.length > 0 && checkElement.is(subMenuSelector);
        
        // If it doesn't have a submenu, it's a regular link - let it navigate
        if (!hasSubmenu) {
            // This is a regular menu item, let it navigate
            if (e.target && e.target.href && e.target.href.includes('http')) {
                active_link(e.target.href);
            }
            return true; // Allow default navigation
        }

        // This has a submenu - prevent default and toggle dropdown
        e.preventDefault();

        // Toggle the dropdown
        if (checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent('li').removeClass('active');
        } else {
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
        
        return false; // Prevent default for dropdown headers
    });
}

export default SideBar;
