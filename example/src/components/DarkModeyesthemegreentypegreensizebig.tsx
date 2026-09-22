import "@/styles/DarkModeyesthemegreentypegreensizebig.css";
interface DarkModeyesthemegreentypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26874?: React.ReactNode;
}
const DarkModeyesthemegreentypegreensizebig = (
    props: DarkModeyesthemegreentypegreensizebigProps
) => {
    const { id, className = "", slot_1_26874 } = props;

    return (
        <div
            className={["component-1_26873", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26873"
                className="Pixso-symbol-1_26873 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26874 ?? (
                    <p
                        id="1_26874"
                        className="Pixso-paragraph-1_26874 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypegreensizebig;
