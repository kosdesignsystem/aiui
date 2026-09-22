import "@/styles/Phone.css";
interface PhoneProps {
    id?: string;
    className?: string;
    slot_3454_7678?: React.ReactNode;
    slot_3454_7680?: React.ReactNode;
}
const Phone = (props: PhoneProps) => {
    const { id, className = "", slot_3454_7678, slot_3454_7680 } = props;

    return (
        <div
            className={["component-3454_7676", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3454_7676"
                className="Pixso-symbol-3454_7676 pixso-position-relative"
            >
                <div id="3454_7677" className="Pixso-group-3454_7677">
                    {slot_3454_7678 ?? (
                        <div
                            id="3454_7678"
                            className="Pixso-vector-3454_7678"
                        ></div>
                    )}
                    <div id="3454_7679" className="Pixso-group-3454_7679">
                        {slot_3454_7680 ?? (
                            <div
                                id="3454_7680"
                                className="Pixso-vector-3454_7680"
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Phone;
