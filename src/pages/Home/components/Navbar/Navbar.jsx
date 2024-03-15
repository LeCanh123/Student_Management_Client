import { useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import apis from "../../../../services/apis/modules/user.module";

const Navbar = () => {
  const access_token = localStorage.getItem("access_token");

  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("🇺🇸 English (US)");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
              className="h-8"
              alt="Rikkei Academy Logo"
            />
          </a>
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {selectedLanguage}
            </button>
            {access_token ? (
              <a
                onClick={() => localStorage.removeItem("access_token")}
                href="login"
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t("Log out")}
                <CiLogout className="ml-1" />
              </a>
            ) : (
              <a
                href="login"
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t("Login")}
                <CiLogin className="ml-1" />
              </a>
            )}

            {/* Dropdown */}
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              id="language-dropdown-menu"
            >
              <ul className="py-2 font-medium" role="none">
                <li>
                  <button
                    value="🇺🇸 English (US)"
                    onClick={() => handleLanguageChange("🇺🇸 English (US)")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">
                      🇺🇸 English (US)
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    value="🇯🇵 中文 (繁體)"
                    onClick={() => handleLanguageChange("🇯🇵 中文 (繁體)")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">
                      🇯🇵 中文 (繁體)
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    value="🇻🇳 Tiếng Việt"
                    onClick={() => handleLanguageChange("🇻🇳 Tiếng Việt")}
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div class="inline-flex items-center">🇻🇳 Tiếng Việt</div>
                  </button>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-language"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-language"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-language"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href=""
                  className="hover:underline block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  {t("Home")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {t("About")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {t("Services")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {t("Contact")}
                </a>
              </li>
              <li>
                <a
                  href="admin"
                  className="hover:underline block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {t("Admin")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
