import { Helmet } from "react-helmet";
import { shallow } from "zustand/shallow";
import HeaderContainer from "../components/containers/HeaderContainer";
import Header from "../components/Header";
import SettingItem from "../components/SettingItem";
import useBoundStore from "../store";
import { Theme } from "../store/themeSlice";

export default function Settings() {
  const { theme, setTheme, isSystemDefault, setIsSystemDefault } =
    useBoundStore(
      (state) => ({
        theme: state.theme,
        setTheme: state.setTheme,
        isSystemDefault: state.isSystemDefault,
        setIsSystemDefault: state.setIsSystemDefault,
      }),
      shallow
    );

  return (
    <>
      <Helmet>
        <title>JMDB | Settings</title>
      </Helmet>
      <HeaderContainer Header={<Header showBackBtn={false} title="Settings" />}>
        <SettingItem title="Color Theme">
          <select
            className="bg-gray-50 p-3 rounded-2xl dark:bg-black outline-none text-gray-500 dark:text-gray-400"
            defaultValue={isSystemDefault ? "default" : theme}
            onChange={(e) => {
              if (e.target.value === "default") {
                setIsSystemDefault(true);
              } else {
                setIsSystemDefault(false);
                setTheme(e.target.value as Theme);
              }
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="default">System</option>
          </select>
        </SettingItem>
      </HeaderContainer>
    </>
  );
}
