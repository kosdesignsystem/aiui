import "@/styles/Calculator10.css";
interface Calculator10Props {
    id?: string;
    className?: string;
}
const Calculator10 = (props: Calculator10Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10200", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10200"
                className="Pixso-symbol-1_10200 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Calculator10;
