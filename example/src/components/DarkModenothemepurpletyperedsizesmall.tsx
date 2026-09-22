import "@/styles/DarkModenothemepurpletyperedsizesmall.css";
interface DarkModenothemepurpletyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26945?: React.ReactNode;
}
const DarkModenothemepurpletyperedsizesmall = (
    props: DarkModenothemepurpletyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26945 } = props;

    return (
        <div
            className={["component-1_26944", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26944"
                className="Pixso-symbol-1_26944 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26945 ?? (
                    <p
                        id="1_26945"
                        className="Pixso-paragraph-1_26945 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletyperedsizesmall;
