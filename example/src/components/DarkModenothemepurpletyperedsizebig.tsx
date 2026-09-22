import "@/styles/DarkModenothemepurpletyperedsizebig.css";
interface DarkModenothemepurpletyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26858?: React.ReactNode;
}
const DarkModenothemepurpletyperedsizebig = (
    props: DarkModenothemepurpletyperedsizebigProps
) => {
    const { id, className = "", slot_1_26858 } = props;

    return (
        <div
            className={["component-1_26857", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26857"
                className="Pixso-symbol-1_26857 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26858 ?? (
                    <p
                        id="1_26858"
                        className="Pixso-paragraph-1_26858 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletyperedsizebig;
