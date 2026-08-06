import "@/styles/Done2.css";
interface Done2Props {
    id?: string;
    className?: string;
}
const Done2 = (props: Done2Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1057_170124", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_170124" className="Pixso-symbol-1057_170124"></div>
        </div>
    );
};
export default Done2;
