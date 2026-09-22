import "@/styles/Typewarningsizebig.css";
interface TypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_829?: React.ReactNode;
}
const Typewarningsizebig = (props: TypewarningsizebigProps) => {
    const { id, className = "", slot_1_829 } = props;

    return (
        <div
            className={["component-1_828", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_828" className="Pixso-symbol-1_828 pixso-relative-flex">
                {slot_1_829 ?? (
                    <p
                        id="1_829"
                        className="Pixso-paragraph-1_829 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typewarningsizebig;
