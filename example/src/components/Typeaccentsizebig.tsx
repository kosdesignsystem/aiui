import "@/styles/Typeaccentsizebig.css";
interface TypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_821?: React.ReactNode;
}
const Typeaccentsizebig = (props: TypeaccentsizebigProps) => {
    const { id, className = "", slot_1_821 } = props;

    return (
        <div
            className={["component-1_820", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_820" className="Pixso-symbol-1_820 pixso-relative-flex">
                {slot_1_821 ?? (
                    <p
                        id="1_821"
                        className="Pixso-paragraph-1_821 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typeaccentsizebig;
