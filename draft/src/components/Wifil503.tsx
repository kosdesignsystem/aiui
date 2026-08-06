import "@/styles/Wifil503.css";
interface Wifil503Props {
    id?: string;
    className?: string;
}
const Wifil503 = (props: Wifil503Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-333_130378", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="333_130378" className="Pixso-symbol-333_130378"></div>
        </div>
    );
};
export default Wifil503;
