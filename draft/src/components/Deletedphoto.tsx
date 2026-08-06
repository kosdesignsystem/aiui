import "@/styles/Deletedphoto.css";
interface DeletedphotoProps {
    visible_3609200904_2572548750?: boolean;
    remainingdays?: string;
    id?: string;
    className?: string;
    slot_431_165363?: React.ReactNode;
    slot_431_165367?: React.ReactNode;
    slot_431_165368?: React.ReactNode;
    slot_431_165370?: React.ReactNode;
    slot_431_165371?: React.ReactNode;
    slot_431_165373?: React.ReactNode;
    slot_431_165374?: React.ReactNode;
}
const Deletedphoto = (props: DeletedphotoProps) => {
    const {
        visible_3609200904_2572548750 = true,
        remainingdays,
        id,
        className = "",
        slot_431_165363,
        slot_431_165367,
        slot_431_165368,
        slot_431_165370,
        slot_431_165371,
        slot_431_165373,
        slot_431_165374
    } = props;

    return (
        <div
            className={["component-431_165361", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165361" className="Pixso-symbol-431_165361">
                {remainingdays === "20-29" && (
                    <div id="431_165362" className="Pixso-symbol-431_165362">
                        {slot_431_165363 ?? (
                            <div
                                id="431_165363"
                                className="Pixso-vector-431_165363"
                            ></div>
                        )}
                    </div>
                )}
                {remainingdays === "11-19" && (
                    <div id="431_165366" className="Pixso-symbol-431_165366">
                        {slot_431_165367 ?? (
                            <div
                                id="431_165367"
                                className="Pixso-vector-431_165367"
                            ></div>
                        )}
                        {slot_431_165368 ?? (
                            <div
                                id="431_165368"
                                className="Pixso-vector-431_165368"
                            ></div>
                        )}
                    </div>
                )}
                {remainingdays === "6-10" && (
                    <div id="431_165369" className="Pixso-symbol-431_165369">
                        {slot_431_165370 ?? (
                            <div
                                id="431_165370"
                                className="Pixso-vector-431_165370"
                            ></div>
                        )}
                        {slot_431_165371 ?? (
                            <div
                                id="431_165371"
                                className="Pixso-vector-431_165371"
                            ></div>
                        )}
                    </div>
                )}
                {remainingdays === "1-5" && (
                    <div id="431_165372" className="Pixso-symbol-431_165372">
                        {slot_431_165373 ?? (
                            <div
                                id="431_165373"
                                className="Pixso-vector-431_165373"
                            ></div>
                        )}
                        {slot_431_165374 ?? (
                            <div
                                id="431_165374"
                                className="Pixso-vector-431_165374"
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Deletedphoto;
