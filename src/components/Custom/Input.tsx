import React, {useState} from "react";

export const Input = ({
                          type,
                          placeholder,
                          value,
                          label,
                          classNameDiv,
                          onChange,
                          classNameInput
                      }: {
    type?: string,
    classNameDiv?: string,
    classNameInput?: string,
    placeholder?: string,
    value?: string,
    label?: string

    onChange(e: any): any
}) => {

    const [error, setError] = useState<String>('')
    const validateForm = () => {
        if (!value) {
            setError(`Is required.`);
        }
    };

    return (
        <div className={classNameDiv}>
            <label>{label}</label>
            <input type={type}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   className={classNameInput}
                   onBlur={validateForm}/>
            {error && <p className="text-red-500 -mt-4">{error}</p>}
        </div>
    )
}