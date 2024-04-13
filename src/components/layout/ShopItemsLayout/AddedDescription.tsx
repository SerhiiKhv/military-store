import React, {useEffect, useState} from "react";
import {MdDeleteForever} from "react-icons/md";

export default function AddedDescription({description, setDescription}:
                                             {
                                                 description: string[]
                                                 setDescription: any
                                             }) {

    const [numInputs, setNumInputs] = useState(description.length);

    useEffect(() => {
        setNumInputs(description.length)
    }, [description.length]);

    const handleAddInput = () => {
        setNumInputs(prevNumInputs => prevNumInputs + 1);
        setDescription((prevImage: any) => [...prevImage, ""]);
    };

    const handleRemoveInput = () => {
        setNumInputs(prevNumInputs => Math.max(1, prevNumInputs - 1)); // Не дозволяємо видалення всіх полів
        setDescription((prevImage: any) => prevImage.slice(0, -1)); // Видаляємо останній рядок з масиву
    };

    const handleInputChange = (index: number, value: any) => {
        const updatedImage = [...description];
        updatedImage[index] = value;
        setDescription(updatedImage);
    };

    const clearPhotoLink = (index: number) => {
        const updatedImage = [...description];
        updatedImage.splice(index, 1);
        setDescription(updatedImage);
    }

    return (
        <div className="bg-gray-100 p-2 rounded-2xl items-center my-auto">
            <div>
                <div className="grid grid-cols-1 items-end gap-1">
                    <div>
                        <div>
                            {[...Array(numInputs)].map((_, index) => (
                                <div key={index} className="flex gap-1 items-center justify-center relative">
                                    <textarea value={description[index] || ""}
                                              onChange={e => handleInputChange(index, e.target.value)}
                                              className="h-60"/>

                                    <button
                                        type="button"
                                        onClick={() => clearPhotoLink(index)}
                                        className="absolute right-0 top-0 px-2 py-2 flex items-center justify-center gap-1"
                                    >
                                        <MdDeleteForever className="h-5 w-5"/>
                                    </button>
                                </div>
                            ))}

                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleAddInput}>
                                    Додати поле вводу
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}