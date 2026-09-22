import "@/styles/Newswitch.css";
interface NewswitchProps {
    id?: string;
    className?: string;
}
const Newswitch = (props: NewswitchProps) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3078_6180", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6180"
                className="Pixso-symbol-3078_6180 pixso-position-relative"
            >
                <div id="3078_6181" className="Pixso-frame-3078_6181"></div>
            </div>
        </div>
    );
};
export default Newswitch;
