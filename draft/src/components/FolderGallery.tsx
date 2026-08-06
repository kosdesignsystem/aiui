import Foldergallery0 from "@/components/Foldergallery0";
import "@/styles/FolderGallery.css";
interface FolderGalleryProps {
    id?: string;
    className?: string;
    slot_1981_158338?: React.ReactNode;
}
const FolderGallery = (props: FolderGalleryProps) => {
    const { id, className = "", slot_1981_158338 } = props;

    return (
        <div
            className={["component-1981_158342", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1981_158342" className="Pixso-symbol-1981_158342">
                {slot_1981_158338 ?? (
                    <Foldergallery0
                        id="1981_158338"
                        className="Pixso-instance-1981_158338"
                        stroke="yes"
                        image="no"
                    ></Foldergallery0>
                )}
            </div>
        </div>
    );
};
export default FolderGallery;
