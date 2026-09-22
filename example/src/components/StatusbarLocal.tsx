import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/StatusbarLocal.css";
interface StatusbarLocalProps {
    id?: string;
    className?: string;
    slot_5222_17195?: React.ReactNode;
    slot_5222_17197?: React.ReactNode;
    slot_5222_17198?: React.ReactNode;
    slot_5222_17199?: React.ReactNode;
    slot_5222_17200?: React.ReactNode;
    slot_5222_17201?: React.ReactNode;
    slot_5222_17202?: React.ReactNode;
    slot_3007_9524?: React.ReactNode;
    slot_3007_9525?: React.ReactNode;
    slot_3007_9527?: React.ReactNode;
    slot_3007_9528?: React.ReactNode;
    slot_3007_9529?: React.ReactNode;
}
const StatusbarLocal = (props: StatusbarLocalProps) => {
    const {
        id,
        className = "",
        slot_5222_17195,
        slot_5222_17197,
        slot_5222_17198,
        slot_5222_17199,
        slot_5222_17200,
        slot_5222_17201,
        slot_5222_17202,
        slot_3007_9524,
        slot_3007_9525,
        slot_3007_9527,
        slot_3007_9528,
        slot_3007_9529
    } = props;

    return (
        <div
            className={["component-3007_9542", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3007_9542"
                className="Pixso-symbol-3007_9542 pixso-relative-flex"
            >
                <div
                    id="5222_17194"
                    className="Pixso-frame-5222_17194 pixso-relative-no-shrink"
                >
                    {slot_5222_17195 ?? (
                        <div
                            id="5222_17195"
                            className="Pixso-vector-5222_17195"
                        ></div>
                    )}
                    <div id="5222_17196" className="Pixso-frame-5222_17196">
                        {slot_5222_17197 ?? (
                            <div
                                id="5222_17197"
                                className="Pixso-vector-5222_17197"
                            ></div>
                        )}
                        {slot_5222_17198 ?? (
                            <div
                                id="5222_17198"
                                className="Pixso-vector-5222_17198"
                            ></div>
                        )}
                        {slot_5222_17199 ?? (
                            <div
                                id="5222_17199"
                                className="Pixso-vector-5222_17199"
                            ></div>
                        )}
                        {slot_5222_17200 ?? (
                            <div
                                id="5222_17200"
                                className="Pixso-vector-5222_17200"
                            ></div>
                        )}
                        {slot_5222_17201 ?? (
                            <div
                                id="5222_17201"
                                className="Pixso-vector-5222_17201"
                            ></div>
                        )}
                        {slot_5222_17202 ?? (
                            <div
                                id="5222_17202"
                                className="Pixso-vector-5222_17202"
                            ></div>
                        )}
                    </div>
                </div>
                <div
                    id="3007_9541"
                    className="Pixso-frame-3007_9541 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3007_9541 pixso-relative-flex">
                        <div
                            id="3007_9523"
                            className="Pixso-frame-3007_9523 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {slot_3007_9524 ?? (
                                <p
                                    id="3007_9524"
                                    className="Pixso-paragraph-3007_9524 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"13:52"}
                                </p>
                            )}
                            {slot_3007_9525 ?? (
                                <Count2darkmodefalse
                                    id="3007_9525"
                                    className="Pixso-instance-3007_9525 pixso-relative-no-shrink"
                                ></Count2darkmodefalse>
                            )}
                        </div>
                        <div
                            id="3007_9526"
                            className="Pixso-frame-3007_9526 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {slot_3007_9527 ?? (
                                <Signal5058
                                    id="3007_9527"
                                    className="Pixso-instance-3007_9527 pixso-relative-no-shrink"
                                ></Signal5058>
                            )}
                            {slot_3007_9528 ?? (
                                <Wifil5062
                                    id="3007_9528"
                                    className="Pixso-instance-3007_9528 pixso-relative-no-shrink"
                                ></Wifil5062>
                            )}
                            {slot_3007_9529 ?? (
                                <Darkmodefalseischargingtruechargecount8
                                    id="3007_9529"
                                    className="Pixso-instance-3007_9529 pixso-relative-no-shrink"
                                    slot_421_9830={
                                        <p
                                            id="421_9830"
                                            className="Pixso-paragraph-421_9830 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            {"98%"}
                                        </p>
                                    }
                                ></Darkmodefalseischargingtruechargecount8>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StatusbarLocal;
