import React, { useState } from 'react';
import NavbarSwitch from './NavbarSwitch';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

export interface Props {}

const TopHeader: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="page-main-header">
                <div
                    className="main-header-left"
                    semilight-bg-color="bg-default-light-colo"
                >
                    <div className="logo-wrapper">
                        <a href="#/">Nurul Hikma Model Madrasah</a>
                    </div>
                </div>
                <div
                    className="main-header-right row"
                    header-bg-color="bg-default-light-colo"
                >
                    <NavbarSwitch />
                    <div className="nav-right col">
                        <ul className="nav-menus">
                            <li className="onhover-dropdown">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6 className="m-0 txt-dark f-16">
                                            My Account
                                            <i className="fa fa-angle-down pull-right ms-2" />
                                        </h6>
                                    </div>
                                </div>
                                <ul className="profile-dropdown onhover-show-div p-20">
                                    <li>
                                        <a href="/admission-officer#/settings">
                                            <i className="icon-user" />
                                            Edit Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={handleSubmit} href="#">
                                            <i className="icon-power-off" />
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-lg-none mobile-toggle">
                            <i className="icon-more" />
                        </div>
                    </div>
                </div>
            </div>

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

export default TopHeader;
