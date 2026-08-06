import Star1005 from "@/components/Star1005";
import "@/styles/Likedphoto.css";
interface LikedphotoProps {
    id?: string;
    className?: string;
    slot_431_165320?: React.ReactNode;
}
const Likedphoto = (props: LikedphotoProps) => {
    const { id, className = "", slot_431_165320 } = props;

    return (
        <div
            className={["component-431_165318", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165318" className="Pixso-symbol-431_165318">
                <div
                    id="431_165319"
                    className="Pixso-rectangle-431_165319"
                ></div>
                {slot_431_165320 ?? (
                    <Star1005
                        id="431_165320"
                        className="Pixso-instance-431_165320"
                    ></Star1005>
                )}
            </div>
        </div>
    );
};
export default Likedphoto;
