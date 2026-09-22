import "@/styles/DarkModenothemegreentypegreensizesmall.css";
interface DarkModenothemegreentypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26957?: React.ReactNode;
}
const DarkModenothemegreentypegreensizesmall = (
    props: DarkModenothemegreentypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26957 } = props;

    return (
        <div
            className={["component-1_26956", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26956"
                className="Pixso-symbol-1_26956 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26957 ?? (
                    <p
                        id="1_26957"
                        className="Pixso-paragraph-1_26957 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypegreensizesmall;
