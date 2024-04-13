import React from "react";
import {CharacteristicsType} from "@/components/Types/ShopItem";
import {MdDeleteForever} from "react-icons/md";

export default function ShopItemModelAddedElement({name, props, setProps, buttonName}:
                                                {
                                                    name: string
                                                    props: CharacteristicsType[],
                                                    setProps: any,
                                                    buttonName: string
                                                }) {
    function addSize() {
        setProps((oldSizes: any) => {
            return [...oldSizes, {name: '', price: ''}]
        })
    }
    function editSize(e: React.ChangeEvent<HTMLInputElement>, index: number, prop: keyof {
        nameCharacteristics: string;
        valueCharacteristics: string
    }) {
        const newValue = e.target.value;

        setProps((prevSizes: any )=> {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeSize(indexToRemove: number) {
        setProps((prev: any) => prev.filter((v: any, i: number) => i !== indexToRemove))
    }


    return (
        <div>
            <label>{name}</label>
            <div className="bg-gray-200 p-2 rounded-md mb-2">
                {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex gap-2 items-end">
                        <div>
                            <label>Characteristic name</label>
                            <input type="text" placeholder="Characteristic name"
                                   value={size.nameCharacteristics}
                                   onChange={e => editSize(e, index, 'nameCharacteristics')}/>
                        </div>

                        <div>
                            <label>Characteristic value</label>
                            <input type="text" placeholder="Characteristic value"
                                   value={size.valueCharacteristics}
                                   onChange={e => editSize(e, index, 'valueCharacteristics')}/>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeSize(index)}
                                className="delete mb-4 p-2">
                                <MdDeleteForever className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center">
                    <button className="button w-full"
                            type="button"
                            onClick={addSize}>
                        {buttonName}
                    </button>
                </div>

            </div>
        </div>
    )
}