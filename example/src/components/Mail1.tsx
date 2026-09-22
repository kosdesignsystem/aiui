import "@/styles/Mail1.css";
interface Mail1Props {
    id?: string;
    className?: string;
    slot_3001_8145?: React.ReactNode;
    slot_3001_8147?: React.ReactNode;
    slot_3001_8150?: React.ReactNode;
    slot_3001_8151?: React.ReactNode;
    slot_3001_8152?: React.ReactNode;
    slot_3001_8153?: React.ReactNode;
    slot_3001_8154?: React.ReactNode;
}
const Mail1 = (props: Mail1Props) => {
    const {
        id,
        className = "",
        slot_3001_8145,
        slot_3001_8147,
        slot_3001_8150,
        slot_3001_8151,
        slot_3001_8152,
        slot_3001_8153,
        slot_3001_8154
    } = props;

    return (
        <div
            className={["component-3001_8143", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8143"
                className="Pixso-symbol-3001_8143 pixso-position-relative"
            >
                <div id="3001_8144" className="Pixso-group-3001_8144">
                    {slot_3001_8145 ?? (
                        <div
                            id="3001_8145"
                            className="Pixso-vector-3001_8145"
                        ></div>
                    )}
                    <div id="3001_8146" className="Pixso-group-3001_8146">
                        {slot_3001_8147 ?? (
                            <div
                                id="3001_8147"
                                className="Pixso-vector-3001_8147"
                            ></div>
                        )}
                        <div id="3001_8148" className="Pixso-group-3001_8148">
                            {slot_3001_8150 ?? (
                                <div
                                    id="3001_8150"
                                    className="Pixso-vector-3001_8150"
                                ></div>
                            )}
                            {slot_3001_8151 ?? (
                                <div
                                    id="3001_8151"
                                    className="Pixso-vector-3001_8151"
                                ></div>
                            )}
                            {slot_3001_8152 ?? (
                                <div
                                    id="3001_8152"
                                    className="Pixso-vector-3001_8152"
                                ></div>
                            )}
                            {slot_3001_8153 ?? (
                                <div
                                    id="3001_8153"
                                    className="Pixso-vector-3001_8153"
                                ></div>
                            )}
                            {slot_3001_8154 ?? (
                                <div
                                    id="3001_8154"
                                    className="Pixso-vector-3001_8154"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Mail1;
