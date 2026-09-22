import Communicationdatatransfer8 from "@/components/Communicationdatatransfer8";
import CommunicationWiFi8 from "@/components/Communicationwifi8";
import Volumevolumemute4 from "@/components/Volumevolumemute4";
import Volumevolumeup4 from "@/components/Volumevolumeup4";
import Screenlightmode04 from "@/components/Screenlightmode04";
import Screenlightmode1004 from "@/components/Screenlightmode1004";
import Darkmodenotypesecondarystatedefault from "@/components/Darkmodenotypesecondarystatedefault";
import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Frame557322845.css";
const Frame557322845 = () => {
    const navigate = useNavigate();
    const transitionConfig: any = {};

    const mousedown_5573_22919_421_11156_3139_4820 = () => {
        navigate(getPathByGuid("5573:23218"), {
            state: {
                from: "5573:22919_421:11156_3139:4820",
                et: "md"
            }
        });
    };

    const drag_5573_22919_421_11156_3402_20969 = () => {
        navigate(getPathByGuid("0:0"), {
            state: {
                from: "5573:22919_421:11156_3402:20969",
                et: "dg"
            }
        });
    };

    const drag_5573_22919_421_11156_3597_17655 = () => {
        navigate(getPathByGuid("5573:22268"), {
            state: {
                from: "5573:22919_421:11156_3597:17655",
                et: "dg"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_22845"
                className="Pixso-frame-5573_22845 pixso-relative-no-shrink"
            >
                <div
                    id="5573_22846"
                    className="Pixso-rectangle-5573_22846"
                ></div>
                <div
                    id="5573_22847"
                    className="Pixso-rectangle-5573_22847"
                ></div>
                <div
                    id="5573_22875"
                    className="Pixso-frame-5573_22875 pixso-flex-auto-height"
                >
                    <div className="frame-content-5573_22875 pixso-relative-flex">
                        <div
                            id="5573_22876"
                            className="Pixso-frame-5573_22876 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-5573_22876 pixso-relative-flex">
                                <p
                                    id="5573_22877"
                                    className="Pixso-paragraph-5573_22877 fill-darkcontentprimary-1_10409-paragraph pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    {"13:52"}
                                </p>
                                <p
                                    id="5573_22878"
                                    className="Pixso-paragraph-5573_22878 fill-darkcontentsubprimary-1_10410-paragraph text-regular16-421_9277 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    {"Понедельник, 24 июня"}
                                </p>
                            </div>
                        </div>
                        <div
                            id="5573_22879"
                            className="Pixso-frame-5573_22879 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-5573_22879 pixso-relative-flex">
                                <div
                                    id="5573_22880"
                                    className="Pixso-frame-5573_22880 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    <div
                                        id="5573_22881"
                                        className="Pixso-frame-5573_22881 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22881 pixso-relative-flex">
                                            <Communicationdatatransfer8
                                                id="5573_22882"
                                                className="Pixso-instance-5573_22882 pixso-relative-no-shrink"
                                            ></Communicationdatatransfer8>
                                            <div
                                                id="5573_22883"
                                                className="Pixso-frame-5573_22883 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-5573_22883 pixso-relative-flex">
                                                    <p
                                                        id="5573_22884"
                                                        className="Pixso-paragraph-5573_22884 fill-darkcontentprimary-1_10389-paragraph text-bold16-3001_7934 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Моб. интернет"}
                                                    </p>
                                                    <p
                                                        id="5573_22885"
                                                        className="Pixso-paragraph-5573_22885 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                                    >
                                                        {"Megafon LTE"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22886"
                                        className="Pixso-frame-5573_22886 pixso-relative-no-shrink pixso-flex"
                                    >
                                        <div className="frame-content-5573_22886 pixso-relative-flex">
                                            <CommunicationWiFi8
                                                id="5573_22887"
                                                className="Pixso-instance-5573_22887 pixso-relative-no-shrink"
                                            ></CommunicationWiFi8>
                                            <div
                                                id="5573_22888"
                                                className="Pixso-frame-5573_22888 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-5573_22888 pixso-relative-flex">
                                                    <p
                                                        id="5573_22889"
                                                        className="Pixso-paragraph-5573_22889 fill-darkcontentsecondary-1_4597-paragraph text-bold16-3001_7934 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Wi-Fi "}
                                                    </p>
                                                    <p
                                                        id="5573_22890"
                                                        className="Pixso-paragraph-5573_22890 fill-darkcontentprimary-1_1007-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Соединение..."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22891"
                                    className="Pixso-frame-5573_22891 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    <div
                                        id="5573_22892"
                                        className="Pixso-frame-5573_22892 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22892 pixso-relative-flex">
                                            <div
                                                id="5573_22893"
                                                className="Pixso-vector-5573_22893 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22895"
                                                className="Pixso-paragraph-5573_22895 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Авиарежим"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22896"
                                        className="Pixso-frame-5573_22896 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22896 pixso-relative-flex">
                                            <div
                                                id="5573_22897"
                                                className="Pixso-vector-5573_22897 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22899"
                                                className="Pixso-paragraph-5573_22899 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Геолокация"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22900"
                                        className="Pixso-frame-5573_22900 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22900 pixso-relative-flex">
                                            <div
                                                id="5573_22901"
                                                className="Pixso-vector-5573_22901 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22903"
                                                className="Pixso-paragraph-5573_22903 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Звук"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22904"
                                        className="Pixso-frame-5573_22904 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22904 pixso-relative-flex">
                                            <div
                                                id="5573_22905"
                                                className="Pixso-vector-5573_22905 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22907"
                                                className="Pixso-paragraph-5573_22907 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Фонарик"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22908"
                                    className="Pixso-frame-5573_22908 fill-darkcontentprimary-1_10389 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-5573_22908 pixso-relative-flex">
                                        <Volumevolumemute4
                                            id="5573_22909"
                                            className="Pixso-instance-5573_22909 pixso-relative-no-shrink"
                                        ></Volumevolumemute4>
                                        <Volumevolumeup4
                                            id="5573_22910"
                                            className="Pixso-instance-5573_22910 pixso-relative-no-shrink"
                                        ></Volumevolumeup4>
                                        <div
                                            id="5573_22911"
                                            className="Pixso-rectangle-5573_22911"
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22912"
                                    className="Pixso-frame-5573_22912 fill-darkcontentborder-1_10415 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-5573_22912 pixso-relative-flex">
                                        <div
                                            id="5573_22913"
                                            className="Pixso-frame-5573_22913 fill-darkcontentprimary-1_10389 pixso-flex"
                                        >
                                            <div className="frame-content-5573_22913 pixso-relative-flex">
                                                <div
                                                    id="5573_22914"
                                                    className="Pixso-rectangle-5573_22914 pixso-relative-no-shrink"
                                                ></div>
                                            </div>
                                        </div>
                                        <Screenlightmode04
                                            id="5573_22915"
                                            className="Pixso-instance-5573_22915 pixso-relative-no-shrink"
                                        ></Screenlightmode04>
                                        <Screenlightmode1004
                                            id="5573_22916"
                                            className="Pixso-instance-5573_22916 pixso-relative-no-shrink"
                                        ></Screenlightmode1004>
                                    </div>
                                </div>
                                <Darkmodenotypesecondarystatedefault
                                    id="5573_22917"
                                    className="Pixso-instance-5573_22917 pixso-relative-no-shrink"
                                    text_4846_0={`Перейти в настройки`}
                                    instance_4846_125="Component_3001_9745"
                                    visible_4846_41={true}
                                    slot_3001_9870={
                                        <p
                                            id="461_34676"
                                            className="Pixso-paragraph-461_34676 text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            {"Перейти в настройки"}
                                        </p>
                                    }
                                    slot_3001_9869={
                                        <div
                                            id="3001_9869"
                                            className="Pixso-instance-3001_9869 pixso-relative-no-shrink"
                                        ></div>
                                    }
                                ></Darkmodenotypesecondarystatedefault>
                            </div>
                        </div>
                    </div>
                </div>
                <StatusBarlocal
                    id="5573_22918"
                    className="Pixso-instance-5573_22918"
                    slot_3007_9528={
                        <div
                            id="461_41625"
                            className="Pixso-instance-461_41625 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_41622"
                            className="Pixso-instance-461_41622 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_41605"
                            className="Pixso-vector-461_41605"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_41628"
                            className="Pixso-instance-461_41628 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_41629"
                                    className="Pixso-instance-461_41629 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_41632"
                                    className="Pixso-paragraph-461_41632 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_41615"
                            className="Pixso-paragraph-461_41615 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_22919"
                    className="Pixso-instance-5573_22919"
                    onMousedown5573_22919421_111563139_4820={withStopPropagation(
                        mousedown_5573_22919_421_11156_3139_4820
                    )}
                    onDrag5573_22919421_111563402_20969={withStopPropagation(
                        drag_5573_22919_421_11156_3402_20969
                    )}
                    onDrag5573_22919421_111563597_17655={withStopPropagation(
                        drag_5573_22919_421_11156_3597_17655
                    )}
                    slot_421_11171={
                        <div
                            id="461_31339"
                            className="Pixso-vector-461_31339"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557322845;
