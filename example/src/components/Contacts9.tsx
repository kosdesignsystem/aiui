import "@/styles/Contacts9.css";
interface Contacts9Props {
    id?: string;
    className?: string;
    onClick5573_239921_101931_8506?: (e: any) => void;
    onClick5573_239921_101933_8799?: (e: any) => void;
    onDrag5573_239921_101935_536?: (e: any) => void;
    onClick5573_245211_101931_8506?: (e: any) => void;
    onClick5573_244151_101931_8506?: (e: any) => void;
    onClick5573_242041_101931_8506?: (e: any) => void;
    onClick5573_242041_101933_8799?: (e: any) => void;
    onDrag5573_242041_101935_536?: (e: any) => void;
    onClick5573_243101_101931_8506?: (e: any) => void;
    onClick5573_243101_101933_8799?: (e: any) => void;
    onDrag5573_243101_101935_536?: (e: any) => void;
}
const Contacts9 = (props: Contacts9Props) => {
    const {
        id,
        className = "",
        onClick5573_239921_101931_8506,
        onClick5573_239921_101933_8799,
        onDrag5573_239921_101935_536,
        onClick5573_245211_101931_8506,
        onClick5573_244151_101931_8506,
        onClick5573_242041_101931_8506,
        onClick5573_242041_101933_8799,
        onDrag5573_242041_101935_536,
        onClick5573_243101_101931_8506,
        onClick5573_243101_101933_8799,
        onDrag5573_243101_101935_536
    } = props;

    return (
        <div
            className={["component-1_10193", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10193"
                className="Pixso-symbol-1_10193 pixso-position-relative"
                onClick={
                    onClick5573_243101_101933_8799 ||
                    onClick5573_243101_101931_8506 ||
                    onClick5573_242041_101933_8799 ||
                    onClick5573_242041_101931_8506 ||
                    onClick5573_244151_101931_8506 ||
                    onClick5573_245211_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506 ||
                    onClick5573_239921_101933_8799 ||
                    onClick5573_239921_101931_8506
                }
                onDrag={
                    onDrag5573_243101_101935_536 ||
                    onDrag5573_242041_101935_536 ||
                    onDrag5573_239921_101935_536 ||
                    onDrag5573_239921_101935_536 ||
                    onDrag5573_239921_101935_536
                }
            ></div>
        </div>
    );
};
export default Contacts9;
