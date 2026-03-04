
export function InputBox({ label, placeholder="John", type, styles, reference }) {
    return <div className="flex flex-col gap-2.5">
        <div className="font-semibold">
            {label}
        </div>
        <input type={type} placeholder={placeholder} ref={reference} className={`border rounded border-gray-400 text-shadow-black outline-none p-2 min-w-90 ${styles}`}/>
    </div>
}