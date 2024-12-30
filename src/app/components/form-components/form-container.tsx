



export const FormContainer = ({ children, title }: { children: React.ReactNode, title?: string }) => {
    return (
        <div className="form-container w-[60%] mx-auto flex flex-col gap-4 *:flex *:flex-col *:gap-1">
            <h3>{title}</h3>
            {children}
        </div>
    )
}