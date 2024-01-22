

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}


export default function Input({label, type = 'text', placeholder, ...restProps}:IInput ) {
  return (
    <div className="w-full mt-4">
      <p className="mb-2">{label}</p>
      <input
        type={type}
        className="px-3 py-2 rounded-lg outline-0 border border-gray-400 w-full"
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
}
