import "@/styles/Typedisablesizebig.css";
interface TypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_833?: React.ReactNode;
}
const Typedisablesizebig = (props: TypedisablesizebigProps) => {
    const { id, className = "", slot_1_833 } = props;

    return (
        <div
            className={["component-1_832", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_832" className="Pixso-symbol-1_832 pixso-relative-flex">
                {slot_1_833 ?? (
                    <p
                        id="1_833"
                        className="Pixso-paragraph-1_833 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typedisablesizebig;
