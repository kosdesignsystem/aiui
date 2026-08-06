import "@/styles/Video.css";
interface VideoProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Video = (props: VideoProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-1854_481", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1854_481" className="Pixso-symbol-1854_481">
                {is_outline === "false" && (
                    <div id="1854_482" className="Pixso-symbol-1854_482"></div>
                )}
                {is_outline === "true" && (
                    <div id="1854_484" className="Pixso-symbol-1854_484"></div>
                )}
            </div>
        </div>
    );
};
export default Video;
