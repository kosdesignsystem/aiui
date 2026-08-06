import "@/styles/Photo.css";
interface PhotoProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Photo = (props: PhotoProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-52_126978", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="52_126978" className="Pixso-symbol-52_126978">
                {is_outline === "false" && (
                    <div
                        id="52_126979"
                        className="Pixso-symbol-52_126979"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="52_126981"
                        className="Pixso-symbol-52_126981"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Photo;
