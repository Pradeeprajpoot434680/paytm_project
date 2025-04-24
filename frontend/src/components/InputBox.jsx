export function InputBox({label,placeholder,onChange})
{
    return <div>
        <div className="text-xs font-semibold p-1 flex justify-start">{label}</div>
        <input onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" type="text" placeholder={placeholder}/>
    </div>
}