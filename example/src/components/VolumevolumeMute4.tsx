import "@/styles/VolumevolumeMute4.css";
interface VolumevolumeMute4Props {
    id?: string;
    className?: string;
}
const VolumevolumeMute4 = (props: VolumevolumeMute4Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_7955", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_7955"
                className="Pixso-symbol-3001_7955 pixso-position-relative"
            ></div>
        </div>
    );
};
export default VolumevolumeMute4;
