import "@/styles/Notes0.css";
interface Notes0Props {
    id?: string;
    className?: string;
    slot_3001_8125?: React.ReactNode;
    slot_3001_8126?: React.ReactNode;
    slot_3001_8127?: React.ReactNode;
    slot_3001_8133?: React.ReactNode;
    slot_3001_8134?: React.ReactNode;
    slot_3001_8135?: React.ReactNode;
    slot_3001_8136?: React.ReactNode;
    slot_3001_8137?: React.ReactNode;
    slot_3001_8138?: React.ReactNode;
    slot_3001_8141?: React.ReactNode;
    slot_3001_8142?: React.ReactNode;
}
const Notes0 = (props: Notes0Props) => {
    const {
        id,
        className = "",
        slot_3001_8125,
        slot_3001_8126,
        slot_3001_8127,
        slot_3001_8133,
        slot_3001_8134,
        slot_3001_8135,
        slot_3001_8136,
        slot_3001_8137,
        slot_3001_8138,
        slot_3001_8141,
        slot_3001_8142
    } = props;

    return (
        <div
            className={["component-3001_8120", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8120"
                className="Pixso-symbol-3001_8120 pixso-position-relative"
            >
                <div id="3001_8121" className="Pixso-group-3001_8121">
                    <div id="3001_8122" className="Pixso-group-3001_8122">
                        <div id="3001_8123" className="Pixso-group-3001_8123">
                            <div
                                id="3001_8124"
                                className="Pixso-group-3001_8124"
                            >
                                {slot_3001_8125 ?? (
                                    <div
                                        id="3001_8125"
                                        className="Pixso-vector-3001_8125"
                                    ></div>
                                )}
                                {slot_3001_8126 ?? (
                                    <div
                                        id="3001_8126"
                                        className="Pixso-vector-3001_8126"
                                    ></div>
                                )}
                                {slot_3001_8127 ?? (
                                    <div
                                        id="3001_8127"
                                        className="vector-wrapper-3001_8127"
                                    >
                                        <div
                                            id="3001_8127"
                                            className="Pixso-vector-3001_8127"
                                        ></div>
                                    </div>
                                )}
                            </div>
                            <div
                                id="3001_8130"
                                className="Pixso-group-3001_8130"
                            >
                                <div
                                    id="3001_8132"
                                    className="Pixso-group-3001_8132"
                                >
                                    {slot_3001_8133 ?? (
                                        <div
                                            id="3001_8133"
                                            className="Pixso-vector-3001_8133"
                                        ></div>
                                    )}
                                    {slot_3001_8134 ?? (
                                        <div
                                            id="3001_8134"
                                            className="Pixso-vector-3001_8134"
                                        ></div>
                                    )}
                                    {slot_3001_8135 ?? (
                                        <div
                                            id="3001_8135"
                                            className="Pixso-vector-3001_8135"
                                        ></div>
                                    )}
                                    {slot_3001_8136 ?? (
                                        <div
                                            id="3001_8136"
                                            className="Pixso-vector-3001_8136"
                                        ></div>
                                    )}
                                    {slot_3001_8137 ?? (
                                        <div
                                            id="3001_8137"
                                            className="Pixso-vector-3001_8137"
                                        ></div>
                                    )}
                                    {slot_3001_8138 ?? (
                                        <div
                                            id="3001_8138"
                                            className="Pixso-vector-3001_8138"
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="3001_8139" className="Pixso-group-3001_8139">
                            {slot_3001_8141 ?? (
                                <div
                                    id="3001_8141"
                                    className="Pixso-vector-3001_8141"
                                ></div>
                            )}
                            {slot_3001_8142 ?? (
                                <div
                                    id="3001_8142"
                                    className="Pixso-vector-3001_8142"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Notes0;
