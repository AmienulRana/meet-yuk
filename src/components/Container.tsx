
interface IContainer {
    children:React.ReactNode,
    className?: string;
}

export default function Container({ children, className}: IContainer){
    return (
        <div className={`max-w-[1900px] md:px-16 sm:px-8 px-4 ${className}`}>
            {children}
        </div>
    )
}