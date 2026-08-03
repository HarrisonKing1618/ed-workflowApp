import "./Button.css"

export default function Button({
    text,
    type="button",
    onClick,
    className="",
    disabled
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
            disabled={disabled}
        >
           {text} 
        </button>
    )
}