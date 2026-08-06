import "@/styles/Remove1.css";
interface Remove1Props {
    id?: string;
    className?: string;
}
const Remove1 = (props: Remove1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-431_163983", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_163983" className="Pixso-symbol-431_163983"></div>
        </div>
    );
};
export default Remove1;
