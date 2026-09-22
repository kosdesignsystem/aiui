import "@/styles/Geometryblue.css";
interface GeometryblueProps {
    id?: string;
    className?: string;
    slot_3008_9911?: React.ReactNode;
    slot_3008_9912?: React.ReactNode;
    slot_3008_9915?: React.ReactNode;
    slot_3008_9916?: React.ReactNode;
    slot_3008_9919?: React.ReactNode;
    slot_3008_9920?: React.ReactNode;
    slot_3008_9921?: React.ReactNode;
}
const Geometryblue = (props: GeometryblueProps) => {
    const {
        id,
        className = "",
        slot_3008_9911,
        slot_3008_9912,
        slot_3008_9915,
        slot_3008_9916,
        slot_3008_9919,
        slot_3008_9920,
        slot_3008_9921
    } = props;

    return (
        <div
            className={["component-3008_9910", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3008_9910"
                className="Pixso-symbol-3008_9910 pixso-position-relative"
            >
                {slot_3008_9911 ?? (
                    <div id="3008_9911" className="vector-wrapper-3008_9911">
                        <div
                            id="3008_9911"
                            className="Pixso-vector-3008_9911"
                        ></div>
                    </div>
                )}
                {slot_3008_9912 ?? (
                    <div
                        id="3008_9912"
                        className="Pixso-vector-3008_9912"
                    ></div>
                )}
                <div id="3008_9913" className="Pixso-group-3008_9913">
                    {slot_3008_9915 ?? (
                        <div
                            id="3008_9915"
                            className="vector-wrapper-3008_9915"
                        >
                            <div
                                id="3008_9915"
                                className="Pixso-vector-3008_9915"
                            ></div>
                        </div>
                    )}
                </div>
                {slot_3008_9916 ?? (
                    <div
                        id="3008_9916"
                        className="Pixso-vector-3008_9916"
                    ></div>
                )}
                <div id="3008_9917" className="Pixso-group-3008_9917">
                    {slot_3008_9919 ?? (
                        <div
                            id="3008_9919"
                            className="vector-wrapper-3008_9919"
                        >
                            <div
                                id="3008_9919"
                                className="Pixso-vector-3008_9919"
                            ></div>
                        </div>
                    )}
                </div>
                {slot_3008_9920 ?? (
                    <div
                        id="3008_9920"
                        className="Pixso-vector-3008_9920"
                    ></div>
                )}
                {slot_3008_9921 ?? (
                    <div
                        id="3008_9921"
                        className="Pixso-vector-3008_9921"
                    ></div>
                )}
                <div id="3008_9922" className="Pixso-rectangle-3008_9922">
                    <div className="fill-paint-3008_9922-0"></div>
                </div>
            </div>
        </div>
    );
};
export default Geometryblue;
