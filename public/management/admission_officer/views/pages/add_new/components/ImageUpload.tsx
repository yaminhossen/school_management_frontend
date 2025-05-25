import React, { useState, useEffect } from 'react';

interface ImageUploadProps {
    defaultImage?: string;
    name: string; // Dynamic name prop
}

const ImageUpload: React.FC<ImageUploadProps> = ({ defaultImage, name }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle default image
    useEffect(() => {
        if (defaultImage) {
            setPreview(defaultImage);
        }
    }, [defaultImage]);

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                setPreview(defaultImage || null);
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                setPreview(defaultImage || null);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(defaultImage || null);
            setError(null);
        }
    };

    const handleRemove = () => {
        setPreview(defaultImage || null);
        setError(null);
        // Reset input value
        const input = document.querySelector(
            `input[name="${name}"]`,
        ) as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    };

    return (
        <div className="form-group mb-3">
            {/* <label className="form-label">Image</label> */}
            <div className="form_elements">
                <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    placeholder="image"
                    name={name} // Dynamic name prop
                    onChange={handleImageChange}
                />
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
            {preview && (
                <div className="image-preview position-relative d-inline-block mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="img-fluid"
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            objectFit: 'contain',
                        }}
                    />
                    <button
                        onClick={handleRemove}
                        className="btn btn-sm position-absolute top-0 end-0"
                        style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'red',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            lineHeight: '1',
                        }}
                        aria-label="Remove image"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
