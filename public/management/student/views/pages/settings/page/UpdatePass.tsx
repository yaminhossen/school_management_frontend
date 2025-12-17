import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import InputImage, { InputImageRef } from './InputImage';
export interface Props {}

const UpdatePass: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const [showPreviousPassword, setShowPreviousPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [errors, setErrors] = useState<{ image?: string }>({});
    const [profileData, setProfileData] = useState<any>();
    const inputImageRef = useRef<InputImageRef>(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-students/basic-information',
            );
            setProfileData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);

        try {
            await axios.post('/api/v1/user-students/profile-update', formData);
            (window as any).toaster('Profile updated successfully!');
            form.reset();
            inputImageRef.current?.reset();
            fetchProfileData();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <div
                    style={{
                        maxWidth: '1000px',
                        margin: '40px auto',
                        padding: '30px',
                        backgroundColor: '#3e4a54',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '30px',
                            color: '#00d9ff',
                            textAlign: 'center',
                        }}
                    >
                        Update Profile
                    </h2>

                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '40px',
                                marginBottom: '30px',
                            }}
                        >
                            {/* Left Section - Password Update */}
                            <div
                                style={{
                                    padding: '25px',
                                    backgroundColor: '#303841',
                                    borderRadius: '8px',
                                    border: '1px solid #4a5761',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '20px',
                                        color: '#e0e0e0',
                                    }}
                                >
                                    Change Password
                                </h3>

                                <div style={{ marginBottom: '20px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#b0bec5',
                                        }}
                                    >
                                        Previous Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={
                                                showPreviousPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Enter previous password"
                                            name="previous_password"
                                            style={{
                                                width: '100%',
                                                padding: '12px 40px 12px 12px',
                                                border: '1px solid #4a5761',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                transition: 'border-color 0.3s',
                                                outline: 'none',
                                                backgroundColor: '#263238',
                                                color: '#e0e0e0',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#00d9ff')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#4a5761')
                                            }
                                        />
                                        <span
                                            onClick={() =>
                                                setShowPreviousPassword(!showPreviousPassword)
                                            }
                                            className="material-symbols-outlined"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '12px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                color: '#90a4ae',
                                                fontSize: '20px',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {showPreviousPassword
                                                ? 'visibility_off'
                                                : 'visibility'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '0' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#b0bec5',
                                        }}
                                    >
                                        New Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={
                                                showNewPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Enter new password"
                                            name="password"
                                            style={{
                                                width: '100%',
                                                padding: '12px 40px 12px 12px',
                                                border: '1px solid #4a5761',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                transition: 'border-color 0.3s',
                                                outline: 'none',
                                                backgroundColor: '#263238',
                                                color: '#e0e0e0',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#00d9ff')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#4a5761')
                                            }
                                        />
                                        <span
                                            onClick={() =>
                                                setShowNewPassword(!showNewPassword)
                                            }
                                            className="material-symbols-outlined"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '12px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                color: '#90a4ae',
                                                fontSize: '20px',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {showNewPassword
                                                ? 'visibility_off'
                                                : 'visibility'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Photo Update */}
                            <div
                                style={{
                                    padding: '25px',
                                    backgroundColor: '#303841',
                                    borderRadius: '8px',
                                    border: '1px solid #4a5761',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '20px',
                                        color: '#e0e0e0',
                                    }}
                                >
                                    Update Photo
                                </h3>

                                <div style={{ marginBottom: '20px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#b0bec5',
                                        }}
                                    >
                                        Current Photo
                                    </label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            padding: '10px',
                                        }}
                                    >
                                        <img
                                            width={120}
                                            height={120}
                                            src={profileData?.image}
                                            alt="Current profile"
                                            style={{
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                                border: '2px solid #00d9ff',
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#b0bec5',
                                        }}
                                    >
                                        Upload New Photo
                                    </label>
                                    <InputImage
                                        ref={inputImageRef}
                                        label=""
                                        name="image"
                                        defalut_preview=""
                                    />
                                    {errors.image && (
                                        <p
                                            style={{
                                                color: '#dc3545',
                                                fontSize: '13px',
                                                marginTop: '6px',
                                                marginBottom: '0',
                                            }}
                                        >
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '10px',
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-outline-info"
                                style={{
                                    padding: '12px 50px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    borderRadius: '6px',
                                    transition: 'all 0.3s',
                                    border: '2px solid #00d9ff',
                                    color: '#00d9ff',
                                    backgroundColor: 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        '#00d9ff';
                                    e.currentTarget.style.color = '#303841';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        'transparent';
                                    e.currentTarget.style.color = '#00d9ff';
                                }}
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePass;
