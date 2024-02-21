import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Delete} from "@/components/icons/Delete";
import {Edit} from "@/components/icons/Edit";

export default function AddedImageViaLink(
    {photoLink, image, setPhotoLink, setIsFormValid}:
        {
            image: string,
            photoLink: string,
            setPhotoLink: any,
            setIsFormValid: any
        }
) {

    const [imagePhotoLink, setImagePhotoLink] = useState(image || '');
    const [errors, setErrors] = useState({photoLink: '',});
    const [inputFocused, setInputFocused] = useState('');

    useEffect(() => {
        setImagePhotoLink(image || '')
    }, [photoLink]);

    const handleInputFocus = (fieldName: string) => {
        setInputFocused(fieldName);
        setErrors(prev => ({...prev, [fieldName]: ''}));
    };

    const handleInputBlur = () => {
        setInputFocused('');
        validateForm();
    };

    const validateForm = () => {
        const newErrors = {...errors}

        if (inputFocused === 'photoLink' && photoLink.trim() !== '') {
            if (!/^https:.+/.test(photoLink)) {
                newErrors.photoLink = 'photoLink is invalid.';
            }
        }

        setErrors(newErrors);
        setIsFormValid(!!newErrors.photoLink);
    };

    const clearPhotoLink = () => {
        setPhotoLink('')
    }

    const editPhoto = () => {
        setImagePhotoLink(photoLink)
    }

    return (
        <div className="bg-gray-100 p-2 rounded-2xl items-center my-auto">
            <div>
                <Image src={imagePhotoLink || '/pizza.png'} alt={"avatar"} width={250} height={250}
                       className="rounded-xl w-full h-full mb-1 aspect-square object-cover"/>
            </div>
            <div>
                {errors.photoLink && <p className="text-red-500 -mb-4">{errors.photoLink}</p>}
                <div className="grid grid-cols-1 items-end gap-1">
                    <div>
                        <label>Photo link</label>
                        <input type="text"
                               value={photoLink}
                               onFocus={() => handleInputFocus('photoLink')}
                               onBlur={handleInputBlur}
                               onChange={e => setPhotoLink(e.target.value)}/>
                    </div>

                    <div className="flex gap-1 items-center">
                        <button
                            type="button"
                            className="button px-2 mb-4 flex items-center justify-center gap-1"
                            onClick={editPhoto}>
                            Edit <Edit className="h-5 w-5"/>
                        </button>

                        <button
                            type="button"
                            className="delete px-2 mb-4 flex items-center justify-center gap-1"
                            onClick={clearPhotoLink}>
                            Delete <Delete className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}