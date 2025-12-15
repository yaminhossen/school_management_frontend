import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import InputImage, { InputImageRef } from './InputImage';
export interface Props {}

const UpdatePass: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const form = formRef.current;
        let formData = new FormData(e.target);

        try {
            const response = await axios.post(
                '/api/v1/admin-users/profile-update',
                formData,
            );
            (window as any).toaster('Password updated successfully');
            form?.reset();
        } catch (error) {
            // setError(error); // Set error state
        }
    };
    const [error2, setError2] = useState(null);
    const [errors2, setErrors2] = useState<{ image?: string }>({});
    const [data2, setData2] = useState<any>();
    const formRef2 = useRef<HTMLFormElement>(null);
    const inputImageRef = useRef<InputImageRef>(null); // ref for InputImage

    const fetchData2 = async () => {
        try {
            const response = await axios.get(
                '/api/v1/admin-users/admin-details',
            );
            setData2(response.data.data);
        } catch (error) {
            setError2(error2);
        }
    };

    useEffect(() => {
        fetchData2();
    }, []);

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef2.current;
        if (!form) return;

        const formData = new FormData(form);
        const image = formData.get('image') as File;
        const newErrors: { image?: string } = {};

        if (!image || image.size === 0) {
            newErrors.image = 'Please select the image.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors2(newErrors);
            return;
        }

        setErrors2({});

        try {
            await axios.post('/api/v1/admin-users/profile-update', formData);
            (window as any).toaster('Form submitted successfully!');
            form.reset();
            inputImageRef.current?.reset(); // reset preview manually
            fetchData2();
        } catch (error) {
            setError(error2);
        }
    };

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form
                    onSubmit={handleSubmit}
                    className="form_600 mx-auto pt-3"
                    ref={formRef}
                >
                    <div className="form-group form-horizontal">
                        <label>Previous Password</label>
                        <div
                            className="form_elements_valid"
                            style={{ position: 'relative' }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Previous Password"
                                name="previous_password"
                                style={{
                                    paddingRight: '40px',
                                    width: '214px',
                                }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="material-symbols-outlined visible_icon"
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    color: '#eeeeee',
                                    fontSize: '24px',
                                    userSelect: 'none',
                                }}
                            >
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>New Password</label>
                        <div
                            className="form_elements_valid"
                            style={{ position: 'relative' }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                style={{
                                    paddingRight: '40px',
                                    width: '214px',
                                }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="material-symbols-outlined visible_icon"
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    color: '#eeeeee',
                                    fontSize: '24px',
                                    userSelect: 'none',
                                }}
                            >
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </div>
                    </div>
                    <div className="form-group student_submit form-horizontal">
                        {/* <label></label> */}
                        <div className="form_elementss">
                            <button className="btn btn-sm btn-outline-info">
                                update
                            </button>
                        </div>
                    </div>
                </form>
                <form
                    onSubmit={handleSubmit2}
                    className="form_600 mx-auto pt-3"
                    ref={formRef}
                >
                    <div className="form-group form-horizontal">
                        <label>Previous Photo</label>
                        <div className="form_elements">
                            <img
                                width={150}
                                height={150}
                                src={data2?.image}
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>New Photo</label>
                        <div className="form_elements">
                            <InputImage
                                ref={inputImageRef}
                                label=""
                                name="image"
                                defalut_preview=""
                            />
                            {errors2.image && (
                                <p style={{ color: 'red' }}>{errors2.image}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-group student_submit form-horizontal">
                        <div className="form_elementss">
                            <button className="btn btn-sm btn-outline-info">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePass;
