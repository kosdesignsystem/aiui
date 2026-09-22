import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
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
import "@/styles/Frame557322770.css";
const Frame557322770 = () => {
    const navigate = useNavigate();
    const transitionConfig: any = {};

    const drag_5573_22804 = () => {
        navigate(getPathByGuid("5573:23218"), {
            state: {
                from: "5573:22804",
                et: "dg"
            }
        });
    };

    const mousedown_5573_22844_421_11156_3139_4820 = () => {
        navigate(getPathByGuid("5573:23218"), {
            state: {
                from: "5573:22844_421:11156_3139:4820",
                et: "md"
            }
        });
    };

    const drag_5573_22844_421_11156_3402_20969 = () => {
        navigate(getPathByGuid("0:0"), {
            state: {
                from: "5573:22844_421:11156_3402:20969",
                et: "dg"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_22770"
                className="Pixso-frame-5573_22770 pixso-relative-no-shrink"
            >
                <div
                    id="5573_22771"
                    className="Pixso-rectangle-5573_22771"
                ></div>
                <div
                    id="5573_22772"
                    className="Pixso-rectangle-5573_22772"
                ></div>
                <div
                    id="5573_22800"
                    className="Pixso-frame-5573_22800 pixso-flex-auto-height"
                >
                    <div className="frame-content-5573_22800 pixso-relative-flex">
                        <div
                            id="5573_22801"
                            className="Pixso-frame-5573_22801 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-5573_22801 pixso-relative-flex">
                                <p
                                    id="5573_22802"
                                    className="Pixso-paragraph-5573_22802 fill-darkcontentprimary-1_10409-paragraph pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    {"13:52"}
                                </p>
                                <p
                                    id="5573_22803"
                                    className="Pixso-paragraph-5573_22803 fill-darkcontentsubprimary-1_10410-paragraph text-regular16-421_9277 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    {"Понедельник, 24 июня"}
                                </p>
                            </div>
                        </div>
                        <div
                            id="5573_22804"
                            className="Pixso-frame-5573_22804 pixso-relative-no-shrink pixso-flex-auto-height"
                            onDrag={withStopPropagation(drag_5573_22804)}
                        >
                            <div className="frame-content-5573_22804 pixso-relative-flex">
                                <div
                                    id="5573_22805"
                                    className="Pixso-frame-5573_22805 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    <div
                                        id="5573_22806"
                                        className="Pixso-frame-5573_22806 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22806 pixso-relative-flex">
                                            <Communicationdatatransfer8
                                                id="5573_22807"
                                                className="Pixso-instance-5573_22807 pixso-relative-no-shrink"
                                            ></Communicationdatatransfer8>
                                            <div
                                                id="5573_22808"
                                                className="Pixso-frame-5573_22808 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-5573_22808 pixso-relative-flex">
                                                    <p
                                                        id="5573_22809"
                                                        className="Pixso-paragraph-5573_22809 fill-darkcontentprimary-1_10389-paragraph text-bold16-3001_7934 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Моб. интернет"}
                                                    </p>
                                                    <p
                                                        id="5573_22810"
                                                        className="Pixso-paragraph-5573_22810 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                                    >
                                                        {"Megafon LTE"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22811"
                                        className="Pixso-frame-5573_22811 pixso-relative-no-shrink pixso-flex"
                                    >
                                        <div className="frame-content-5573_22811 pixso-relative-flex">
                                            <CommunicationWiFi8
                                                id="5573_22812"
                                                className="Pixso-instance-5573_22812 pixso-relative-no-shrink"
                                            ></CommunicationWiFi8>
                                            <div
                                                id="5573_22813"
                                                className="Pixso-frame-5573_22813 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-5573_22813 pixso-relative-flex">
                                                    <p
                                                        id="5573_22814"
                                                        className="Pixso-paragraph-5573_22814 fill-darkcontentsecondary-1_4597-paragraph text-bold16-3001_7934 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Wi-Fi "}
                                                    </p>
                                                    <p
                                                        id="5573_22815"
                                                        className="Pixso-paragraph-5573_22815 fill-darkcontentprimary-1_1007-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-flex-auto-height"
                                                    >
                                                        {"Соединение..."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22816"
                                    className="Pixso-frame-5573_22816 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    <div
                                        id="5573_22817"
                                        className="Pixso-frame-5573_22817 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22817 pixso-relative-flex">
                                            <div
                                                id="5573_22818"
                                                className="Pixso-vector-5573_22818 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22820"
                                                className="Pixso-paragraph-5573_22820 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Авиарежим"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22821"
                                        className="Pixso-frame-5573_22821 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22821 pixso-relative-flex">
                                            <div
                                                id="5573_22822"
                                                className="Pixso-vector-5573_22822 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22824"
                                                className="Pixso-paragraph-5573_22824 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Геолокация"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22825"
                                        className="Pixso-frame-5573_22825 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22825 pixso-relative-flex">
                                            <div
                                                id="5573_22826"
                                                className="Pixso-vector-5573_22826 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22828"
                                                className="Pixso-paragraph-5573_22828 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Звук"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="5573_22829"
                                        className="Pixso-frame-5573_22829 pixso-relative-no-shrink pixso-flex-auto-height"
                                    >
                                        <div className="frame-content-5573_22829 pixso-relative-flex">
                                            <div
                                                id="5573_22830"
                                                className="Pixso-vector-5573_22830 pixso-relative-no-shrink pixso-flex"
                                            ></div>
                                            <p
                                                id="5573_22832"
                                                className="Pixso-paragraph-5573_22832 fill-darkcontentprimary-1_10389-paragraph text-regular12-3001_7937 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {"Фонарик"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22833"
                                    className="Pixso-frame-5573_22833 fill-darkcontentprimary-1_10389 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-5573_22833 pixso-relative-flex">
                                        <Volumevolumemute4
                                            id="5573_22834"
                                            className="Pixso-instance-5573_22834 pixso-relative-no-shrink"
                                        ></Volumevolumemute4>
                                        <Volumevolumeup4
                                            id="5573_22835"
                                            className="Pixso-instance-5573_22835 pixso-relative-no-shrink"
                                        ></Volumevolumeup4>
                                        <div
                                            id="5573_22836"
                                            className="Pixso-rectangle-5573_22836"
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    id="5573_22837"
                                    className="Pixso-frame-5573_22837 fill-darkcontentborder-1_10415 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-5573_22837 pixso-relative-flex">
                                        <div
                                            id="5573_22838"
                                            className="Pixso-frame-5573_22838 fill-darkcontentprimary-1_10389 pixso-flex"
                                        >
                                            <div className="frame-content-5573_22838 pixso-relative-flex">
                                                <div
                                                    id="5573_22839"
                                                    className="Pixso-rectangle-5573_22839 pixso-relative-no-shrink"
                                                ></div>
                                            </div>
                                        </div>
                                        <Screenlightmode04
                                            id="5573_22840"
                                            className="Pixso-instance-5573_22840 pixso-relative-no-shrink"
                                        ></Screenlightmode04>
                                        <Screenlightmode1004
                                            id="5573_22841"
                                            className="Pixso-instance-5573_22841 pixso-relative-no-shrink"
                                        ></Screenlightmode1004>
                                    </div>
                                </div>
                                <Darkmodenotypesecondarystatedefault
                                    id="5573_22842"
                                    className="Pixso-instance-5573_22842 pixso-relative-no-shrink"
                                    text_4846_0={`Перейти в настройки`}
                                    instance_4846_125="Component_3001_9745"
                                    visible_4846_41={true}
                                    slot_3001_9870={
                                        <p
                                            id="461_34711"
                                            className="Pixso-paragraph-461_34711 text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
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
                    id="5573_22843"
                    className="Pixso-instance-5573_22843"
                    slot_3007_9528={
                        <div
                            id="461_41103"
                            className="Pixso-instance-461_41103 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_41100"
                            className="Pixso-instance-461_41100 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_41083"
                            className="Pixso-vector-461_41083"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_41106"
                            className="Pixso-instance-461_41106 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_41107"
                                    className="Pixso-instance-461_41107 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_41110"
                                    className="Pixso-paragraph-461_41110 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_41093"
                            className="Pixso-paragraph-461_41093 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_22844"
                    className="Pixso-instance-5573_22844"
                    onMousedown5573_22844421_111563139_4820={withStopPropagation(
                        mousedown_5573_22844_421_11156_3139_4820
                    )}
                    onDrag5573_22844421_111563402_20969={withStopPropagation(
                        drag_5573_22844_421_11156_3402_20969
                    )}
                    slot_421_11171={
                        <div
                            id="461_31515"
                            className="Pixso-vector-461_31515"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557322770;
