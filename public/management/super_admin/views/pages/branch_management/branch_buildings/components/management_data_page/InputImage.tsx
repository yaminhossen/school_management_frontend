import React, { useEffect, useRef, useState } from 'react';
export interface Props {
    name: string;
    label: string;
    defalut_preview?: string | null;
    clearPreview?: boolean;
}

const InputImage: React.FC<Props> = ({
    name,
    label,
    defalut_preview,
    clearPreview,
    ...props
}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        defalut_preview || null,
    );
    useEffect(() => {
        if (clearPreview) {
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input
            }
        }
    }, [clearPreview]);

    const handleFileChange = () => {
        const fileInput = fileInputRef.current;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <label>{label}</label>
            <div>
                <input
                    style={{ maxWidth: '213px', maxHeight: '80px' }}
                    type="file"
                    name={name}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {preview && (
                    <div>
                        <img
                            src={preview}
                            alt="Image Preview"
                            style={{ marginTop: '10px', maxHeight: '80px' }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default InputImage;
