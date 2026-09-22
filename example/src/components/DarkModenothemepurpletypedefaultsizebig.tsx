import "@/styles/DarkModenothemepurpletypedefaultsizebig.css";
interface DarkModenothemepurpletypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26896?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultsizebig = (
    props: DarkModenothemepurpletypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26896 } = props;

    return (
        <div
            className={["component-1_26895", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26895"
                className="Pixso-symbol-1_26895 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26896 ?? (
                    <p
                        id="1_26896"
                        className="Pixso-paragraph-1_26896 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultsizebig;
