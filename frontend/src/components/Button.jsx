
export const Button = ({label, onClick, styles}) => {
    return (
        <div>
            <button onClick={onClick} className={`cursor-pointer bg-black text-white font-semibold w-30 rounded px-4 py-3 ${styles}`}>{label}</button>
        </div>
    )
}