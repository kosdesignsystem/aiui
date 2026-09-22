import "@/styles/Phone10.css";
interface Phone10Props {
    id?: string;
    className?: string;
}
const Phone10 = (props: Phone10Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10247", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10247"
                className="Pixso-symbol-1_10247 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Phone10;
