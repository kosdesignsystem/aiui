import "@/styles/DarkModenothemepurpletypedefaultsizesmall.css";
interface DarkModenothemepurpletypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26983?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultsizesmall = (
    props: DarkModenothemepurpletypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26983 } = props;

    return (
        <div
            className={["component-1_26982", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26982"
                className="Pixso-symbol-1_26982 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26983 ?? (
                    <p
                        id="1_26983"
                        className="Pixso-paragraph-1_26983 fill-light_contentprimary-1_10528-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultsizesmall;
