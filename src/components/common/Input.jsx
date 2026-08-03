import "./Input.css"

export default function Input({
    label,
    type,
    name,
    value,
    onChange,
    error
}) {
    return (
        <div className="input-group">
            
            <label htmlFor={name}>{label}</label>

            <input 
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                error
                />
                {error && <p className="error">{error}</p>}
        </div>
    )   
}
