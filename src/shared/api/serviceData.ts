import { api } from "./client";
import { defaultOptions, toForm } from "./config";

export interface ServiceData {
  about: string;
  start: string;
  rules_link: string;
  pd_link: string;
  welcome_home_text: string;
  welcome_bonus_text: string;
  registered_subtext: string;
  invite_text: string;
  validate_qr_before: string;
  visit_bonus: number;
  bot_url: string;
  [key: string]: unknown;
}

export const getServiceData = async (): Promise<ServiceData> => {
  const { data } = await api.post<ServiceData>(
    "service/data",
    toForm({ ...defaultOptions() }),
  );
  return data;
};
