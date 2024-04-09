import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@/components/icons/DeleteIcon";
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

    return (
        <div className="bg-gray-100 p-2 rounded-2xl items-center my-auto">
            <div>
                <div className="grid grid-cols-1 items-end gap-1">
                    <div>
                        <div>
                            {[...Array(numInputs)].map((_, index) => (
                                <div className="flex gap-1 items-center justify-center">
                                    <textarea
                                        key={index}
                                        className="h-60"
                                        value={description[index] || ""}
                                        onChange={e => handleInputChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="flex justify-center gap-4">
                                <button
                                    className="button"
                                    onClick={handleAddInput}>
                                    Додати поле вводу
                                </button>

                                <button
                                    className="button"
                                    onClick={handleRemoveInput}>
                                    Видалити останнє поле вводу
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}