import "@/styles/Typeredsizebig.css";
interface TyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_825?: React.ReactNode;
}
const Typeredsizebig = (props: TyperedsizebigProps) => {
    const { id, className = "", slot_1_825 } = props;

    return (
        <div
            className={["component-1_824", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_824" className="Pixso-symbol-1_824 pixso-relative-flex">
                {slot_1_825 ?? (
                    <p
                        id="1_825"
                        className="Pixso-paragraph-1_825 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typeredsizebig;
