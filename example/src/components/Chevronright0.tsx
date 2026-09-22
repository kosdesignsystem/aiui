import "@/styles/Chevronright0.css";
interface Chevronright0Props {
    id?: string;
    className?: string;
}
const Chevronright0 = (props: Chevronright0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_848", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div
                id="1_848"
                className="Pixso-symbol-1_848 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Chevronright0;
