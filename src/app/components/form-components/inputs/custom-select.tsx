

export type CustomSelectProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string, label: string }[];
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    touched?: boolean;
}


export const CustomSelect = ({ label, name, value, onChange, options, error, onBlur, onFocus, touched, }: CustomSelectProps) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {touched && error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}