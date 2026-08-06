import "@/styles/Chevronright2.css";
interface Chevronright2Props {
    id?: string;
    className?: string;
}
const Chevronright2 = (props: Chevronright2Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-213_126717", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="213_126717" className="Pixso-symbol-213_126717"></div>
        </div>
    );
};
export default Chevronright2;
