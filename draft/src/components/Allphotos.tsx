import "@/styles/Allphotos.css";
interface AllphotosProps {
    id?: string;
    className?: string;
    slot_1981_158327?: React.ReactNode;
    slot_1981_158328?: React.ReactNode;
    slot_1981_158329?: React.ReactNode;
}
const Allphotos = (props: AllphotosProps) => {
    const {
        id,
        className = "",
        slot_1981_158327,
        slot_1981_158328,
        slot_1981_158329
    } = props;

    return (
        <div
            className={["component-1981_158330", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1981_158330" className="Pixso-symbol-1981_158330">
                {slot_1981_158327 ?? (
                    <div
                        id="1981_158327"
                        className="Pixso-vector-1981_158327"
                    ></div>
                )}
                {slot_1981_158328 ?? (
                    <div
                        id="1981_158328"
                        className="Pixso-vector-1981_158328"
                    ></div>
                )}
                {slot_1981_158329 ?? (
                    <div
                        id="1981_158329"
                        className="Pixso-vector-1981_158329"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Allphotos;
