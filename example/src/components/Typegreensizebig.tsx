import "@/styles/Typegreensizebig.css";
interface TypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_827?: React.ReactNode;
}
const Typegreensizebig = (props: TypegreensizebigProps) => {
    const { id, className = "", slot_1_827 } = props;

    return (
        <div
            className={["component-1_826", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_826" className="Pixso-symbol-1_826 pixso-relative-flex">
                {slot_1_827 ?? (
                    <p
                        id="1_827"
                        className="Pixso-paragraph-1_827 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typegreensizebig;
