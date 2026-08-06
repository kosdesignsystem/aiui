import "@/styles/Error.css";
interface ErrorProps {
    visible_3042298610_1086140708?: boolean;
    Property1?: string;
    id?: string;
    className?: string;
    slot_431_165257?: React.ReactNode;
    slot_431_165260?: React.ReactNode;
}
const Error = (props: ErrorProps) => {
    const {
        visible_3042298610_1086140708 = true,
        Property1,
        id,
        className = "",
        slot_431_165257,
        slot_431_165260
    } = props;

    return (
        <div
            className={["component-431_165255", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165255" className="Pixso-symbol-431_165255">
                {Property1 === "dark" && (
                    <div id="431_165256" className="Pixso-symbol-431_165256">
                        {slot_431_165257 ?? (
                            <div
                                id="431_165257"
                                className="Pixso-vector-431_165257"
                            ></div>
                        )}
                    </div>
                )}
                {Property1 === "light" && (
                    <div id="431_165259" className="Pixso-symbol-431_165259">
                        {slot_431_165260 ?? (
                            <div
                                id="431_165260"
                                className="Pixso-vector-431_165260"
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Error;
