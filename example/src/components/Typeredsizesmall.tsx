import "@/styles/Typeredsizesmall.css";
interface TyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_839?: React.ReactNode;
}
const Typeredsizesmall = (props: TyperedsizesmallProps) => {
    const { id, className = "", slot_1_839 } = props;

    return (
        <div
            className={["component-1_838", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_838" className="Pixso-symbol-1_838 pixso-relative-flex">
                {slot_1_839 ?? (
                    <p
                        id="1_839"
                        className="Pixso-paragraph-1_839 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typeredsizesmall;
