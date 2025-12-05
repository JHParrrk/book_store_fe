import { Banner } from "../models/banner.model";
import { requestHandler } from "./https";

export const fetchBanners = async () => {
  return await requestHandler<Banner[]>("get", "/banners");
};
