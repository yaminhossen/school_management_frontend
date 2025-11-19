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
                await axios.post('/api/v1/auth/logout');
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
                        to="/user-admins"
                        label="Admins Management"
                    />
                    <MenuDropDownItem
                        to="/user-staffs"
                        label="Employee Management"
                    />
                    <MenuDropDownItem
                        to="/user-teachers"
                        label="Teachers Management"
                    />
                    <MenuDropDownItem
                        to="/user-students"
                        label="Students Management"
                    />
                </MenuDropDown>

                <MenuSingle
                    to="/branches"
                    icon="icon-location-pin"
                    label="Branches Management"
                />
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
