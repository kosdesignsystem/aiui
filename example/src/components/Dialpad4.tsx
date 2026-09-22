import "@/styles/Dialpad4.css";
interface Dialpad4Props {
    id?: string;
    className?: string;
}
const Dialpad4 = (props: Dialpad4Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3078_6323", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6323"
                className="Pixso-symbol-3078_6323 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Dialpad4;
