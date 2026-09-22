import "@/styles/VolumevolumeUp4.css";
interface VolumevolumeUp4Props {
    id?: string;
    className?: string;
}
const VolumevolumeUp4 = (props: VolumevolumeUp4Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_7959", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_7959"
                className="Pixso-symbol-3001_7959 pixso-position-relative"
            ></div>
        </div>
    );
};
export default VolumevolumeUp4;
