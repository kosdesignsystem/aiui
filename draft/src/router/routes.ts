import Frame2027161555 from "@/views/Frame2027161555";
import Frame2088158830 from "@/views/Frame2088158830";
import Frame2088158933 from "@/views/Frame2088158933";

export const routes = [{
          path: "/",
          component: Frame2027161555,
          guid: "2027:161555",
        },
{
          path: "/frame2088158830",
          component: Frame2088158830,
          guid: "2088:158830",
        },
{
          path: "/frame2088158933",
          component: Frame2088158933,
          guid: "2088:158933",
        }];


export const guidPathMap = new Map(
  routes.map((item) => [item.guid, item.path])
);
export const pathGuidMap = new Map(
  routes.map((item) => [item.path, item.guid])
);

export const getPathByGuid = (guid: string) => {
  return guidPathMap.get(guid) || "";
};

export const getGuidByPath = (path: string) => {
  return pathGuidMap.get(path) || "";
};
