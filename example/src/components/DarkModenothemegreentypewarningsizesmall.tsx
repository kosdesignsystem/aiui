import "@/styles/DarkModenothemegreentypewarningsizesmall.css";
interface DarkModenothemegreentypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26959?: React.ReactNode;
}
const DarkModenothemegreentypewarningsizesmall = (
    props: DarkModenothemegreentypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26959 } = props;

    return (
        <div
            className={["component-1_26958", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26958"
                className="Pixso-symbol-1_26958 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26959 ?? (
                    <p
                        id="1_26959"
                        className="Pixso-paragraph-1_26959 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypewarningsizesmall;
