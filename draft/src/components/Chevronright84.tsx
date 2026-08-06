import "@/styles/Chevronright84.css";
interface Chevronright84Props {
    id?: string;
    className?: string;
}
const Chevronright84 = (props: Chevronright84Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1057_170117", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_170117" className="Pixso-symbol-1057_170117"></div>
        </div>
    );
};
export default Chevronright84;
