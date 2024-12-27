



export type CustomTextInputProps = {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    touched?: boolean;
}


export const CustomTextInput = ({ label, name, type, value, onChange, placeholder, error, onBlur, onFocus, touched, }: CustomTextInputProps) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {touched && error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}


export const CustomTextArea = ({ label, name, value, onChange, placeholder, error, onBlur, onFocus, touched, }: CustomTextInputProps) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {touched && error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}


