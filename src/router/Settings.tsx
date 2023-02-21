import { Helmet } from "react-helmet";
import { shallow } from "zustand/shallow";
import HeaderContainer from "../components/containers/HeaderContainer";
import Header from "../components/Header";
import SettingItem from "../components/SettingItem";
import useBoundStore from "../store";
import { Lng, Theme } from "../store/themeSlice";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import i18n from "../i18n";

export default function Settings() {
  const { theme, setTheme, isSystemDefault, setIsSystemDefault, lng, setLng } =
    useBoundStore(
      (state) => ({
        theme: state.theme,
        setTheme: state.setTheme,
        isSystemDefault: state.isSystemDefault,
        setIsSystemDefault: state.setIsSystemDefault,
        lng: state.lng,
        setLng: state.setLng,
      }),
      shallow
    );
  const { t } = useTranslation();

  const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "default") {
      setIsSystemDefault(true);
    } else {
      setIsSystemDefault(false);
      setTheme(e.target.value as Theme);
    }
  };

  const onLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setLng(e.target.value as Lng);
  };

  return (
    <>
      <Helmet>
        <title>JMDB | {t("settings")}</title>
      </Helmet>
      <HeaderContainer
        Header={<Header showBackBtn={false} title={t("settings") as string} />}
      >
        <SettingItem title={t("colorTheme")}>
          <select
            className="bg-gray-50 p-3 rounded-2xl dark:bg-black outline-none text-gray-500 dark:text-gray-400"
            defaultValue={isSystemDefault ? "default" : theme}
            onChange={onThemeChange}
          >
            <option value="light">{t("light")}</option>
            <option value="dark">{t("dark")}</option>
            <option value="default">{t("system")}</option>
          </select>
        </SettingItem>
        <SettingItem title={t("lang")}>
          <select
            className="bg-gray-50 p-3 rounded-2xl dark:bg-black outline-none text-gray-500 dark:text-gray-400"
            defaultValue={lng}
            onChange={onLangChange}
          >
            <option value="en-US">English</option>
            <option value="ko-KR">한국어</option>
          </select>
        </SettingItem>
      </HeaderContainer>
    </>
  );
}
