import "@/styles/Remove2.css";
interface Remove2Props {
    id?: string;
    className?: string;
}
const Remove2 = (props: Remove2Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1057_170143", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_170143" className="Pixso-symbol-1057_170143"></div>
        </div>
    );
};
export default Remove2;
