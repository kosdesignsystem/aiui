import "@/styles/DarkModenothemegreentypegreensizebig.css";
interface DarkModenothemegreentypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26870?: React.ReactNode;
}
const DarkModenothemegreentypegreensizebig = (
    props: DarkModenothemegreentypegreensizebigProps
) => {
    const { id, className = "", slot_1_26870 } = props;

    return (
        <div
            className={["component-1_26869", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26869"
                className="Pixso-symbol-1_26869 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26870 ?? (
                    <p
                        id="1_26870"
                        className="Pixso-paragraph-1_26870 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypegreensizebig;
