/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
import axios from 'axios';
import { anyObject } from '../../../../common_types/object';
import { Button, Modal } from 'react-bootstrap';
export interface Props {}

const SideBar: React.FC<Props> = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    setTimeout(() => {
        init_nav_action();
        active_link(window.location.href);
    }, 1000);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsModalOpen(true); // Show Bootstrap modal for logout confirmation
        } catch (error) {
            setError(error);
        }
    };

    const handleConfirm = async () => {
        try {
            await axios.post('/api/v1/auth/logout');
            setIsModalOpen(false); // Close modal after logout
            // Optionally redirect or update UI after logout
            window.location.href = '/login'; // Example redirect
        } catch (error) {
            setError(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close modal without logging out
    };

    return (
        <>
            <ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-home" label="Dashboard" />
                <MenuSingle to="/students" icon="icon-user" label="Students" />
                <MenuSingle
                    to="/add-new"
                    icon="icon-calendar"
                    label="Add New"
                />
                <MenuSingle
                    to="/payment"
                    icon="icon-calendar"
                    label="Payment"
                />
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

                <MenuSingle
                    to="/settings"
                    icon="icon-receipt"
                    label="Settings"
                />

                <MenuSingle
                    onClick={handleSubmit}
                    to=""
                    icon="icon-power-off"
                    label="Logout"
                />

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

            {/* Bootstrap Logout Confirmation Modal */}
            <Modal show={isModalOpen} onHide={handleCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function active_link(hash) {
    let url = new URL(hash);
    (window as any).jQuery(`.sidebar-submenu a`).removeClass('active');
    (window as any)
        .jQuery(`.sidebar-submenu a[href="${url.hash}"]`)
        .addClass('active');
}
function init_nav_action() {
    var animationSpeed = 300,
        subMenuSelector = '.sidebar-submenu';
    (window as any).jQuery('.sidebar-menu').on('click', 'li a', function (e) {
        var $this = (window as any).jQuery(this);
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
