import "@/styles/FolderGallery0.css";
interface FolderGallery0Props {
    visible_2410512228_3561958138?: boolean;
    visible_3482159252_657028622?: boolean;
    stroke?: string;
    image?: string;
    id?: string;
    className?: string;
    slot_504_3602?: React.ReactNode;
    slot_504_3604?: React.ReactNode;
    slot_504_3608?: React.ReactNode;
    slot_504_3610?: React.ReactNode;
}
const FolderGallery0 = (props: FolderGallery0Props) => {
    const {
        visible_2410512228_3561958138 = true,
        visible_3482159252_657028622 = true,
        stroke,
        image,
        id,
        className = "",
        slot_504_3602,
        slot_504_3604,
        slot_504_3608,
        slot_504_3610
    } = props;

    return (
        <div
            className={["component-504_3600", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="504_3600" className="Pixso-symbol-504_3600">
                {stroke === "yes" && image === "yes" && (
                    <div id="504_3601" className="Pixso-symbol-504_3601">
                        {slot_504_3602 ?? (
                            <div
                                id="504_3602"
                                className="Pixso-vector-504_3602"
                            ></div>
                        )}
                    </div>
                )}
                {stroke === "yes" && image === "no" && (
                    <div id="504_3603" className="Pixso-symbol-504_3603">
                        {slot_504_3604 ?? (
                            <div
                                id="504_3604"
                                className="Pixso-vector-504_3604"
                            ></div>
                        )}
                    </div>
                )}
                {stroke === "no" && image === "no" && (
                    <div id="504_3607" className="Pixso-symbol-504_3607">
                        {slot_504_3608 ?? (
                            <div
                                id="504_3608"
                                className="Pixso-vector-504_3608"
                            ></div>
                        )}
                    </div>
                )}
                {stroke === "no" && image === "yes" && (
                    <div id="504_3609" className="Pixso-symbol-504_3609">
                        {slot_504_3610 ?? (
                            <div
                                id="504_3610"
                                className="Pixso-vector-504_3610"
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default FolderGallery0;
