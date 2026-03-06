import { Banner } from "@/features/main/types/banner.model";
import { requestHandler } from "@/apis/https";

export const fetchBanners = async () => {
  return await requestHandler<Banner[]>("get", "/banners");
};
