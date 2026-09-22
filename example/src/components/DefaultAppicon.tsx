import "@/styles/DefaultAppicon.css";
interface DefaultAppiconProps {
    id?: string;
    className?: string;
    slot_3662_10646?: React.ReactNode;
    slot_3662_10647?: React.ReactNode;
    slot_3662_10648?: React.ReactNode;
    slot_3662_10649?: React.ReactNode;
    slot_3662_10650?: React.ReactNode;
}
const DefaultAppicon = (props: DefaultAppiconProps) => {
    const {
        id,
        className = "",
        slot_3662_10646,
        slot_3662_10647,
        slot_3662_10648,
        slot_3662_10649,
        slot_3662_10650
    } = props;

    return (
        <div
            className={["component-3662_10644", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3662_10644"
                className="Pixso-symbol-3662_10644 pixso-position-relative"
            >
                <div id="3662_10645" className="Pixso-frame-3662_10645">
                    {slot_3662_10646 ?? (
                        <div
                            id="3662_10646"
                            className="Pixso-vector-3662_10646"
                        ></div>
                    )}
                    {slot_3662_10647 ?? (
                        <div
                            id="3662_10647"
                            className="Pixso-vector-3662_10647"
                        ></div>
                    )}
                    {slot_3662_10648 ?? (
                        <div
                            id="3662_10648"
                            className="Pixso-vector-3662_10648"
                        ></div>
                    )}
                    {slot_3662_10649 ?? (
                        <div
                            id="3662_10649"
                            className="Pixso-vector-3662_10649"
                        ></div>
                    )}
                    {slot_3662_10650 ?? (
                        <div
                            id="3662_10650"
                            className="Pixso-vector-3662_10650"
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DefaultAppicon;
