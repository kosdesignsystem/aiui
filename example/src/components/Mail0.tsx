import "@/styles/Mail0.css";
interface Mail0Props {
    id?: string;
    className?: string;
    slot_3001_8157?: React.ReactNode;
    slot_3001_8159?: React.ReactNode;
    slot_3001_8162?: React.ReactNode;
    slot_3001_8163?: React.ReactNode;
    slot_3001_8164?: React.ReactNode;
    slot_3001_8165?: React.ReactNode;
    slot_3001_8166?: React.ReactNode;
}
const Mail0 = (props: Mail0Props) => {
    const {
        id,
        className = "",
        slot_3001_8157,
        slot_3001_8159,
        slot_3001_8162,
        slot_3001_8163,
        slot_3001_8164,
        slot_3001_8165,
        slot_3001_8166
    } = props;

    return (
        <div
            className={["component-3001_8155", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8155"
                className="Pixso-symbol-3001_8155 pixso-position-relative"
            >
                <div id="3001_8156" className="Pixso-group-3001_8156">
                    {slot_3001_8157 ?? (
                        <div
                            id="3001_8157"
                            className="Pixso-vector-3001_8157"
                        ></div>
                    )}
                    <div id="3001_8158" className="Pixso-group-3001_8158">
                        {slot_3001_8159 ?? (
                            <div
                                id="3001_8159"
                                className="Pixso-vector-3001_8159"
                            ></div>
                        )}
                        <div id="3001_8160" className="Pixso-group-3001_8160">
                            {slot_3001_8162 ?? (
                                <div
                                    id="3001_8162"
                                    className="Pixso-vector-3001_8162"
                                ></div>
                            )}
                            {slot_3001_8163 ?? (
                                <div
                                    id="3001_8163"
                                    className="Pixso-vector-3001_8163"
                                ></div>
                            )}
                            {slot_3001_8164 ?? (
                                <div
                                    id="3001_8164"
                                    className="Pixso-vector-3001_8164"
                                ></div>
                            )}
                            {slot_3001_8165 ?? (
                                <div
                                    id="3001_8165"
                                    className="Pixso-vector-3001_8165"
                                ></div>
                            )}
                            {slot_3001_8166 ?? (
                                <div
                                    id="3001_8166"
                                    className="Pixso-vector-3001_8166"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Mail0;
