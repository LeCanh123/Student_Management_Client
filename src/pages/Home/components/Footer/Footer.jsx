import {
  FacebookOutlined,
  GoogleOutlined,
  XOutlined,
  GithubOutlined,
  GitlabOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href=""
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
                className="h-8"
                alt="Rikkei Academy Logo"
              />
            </a>

            <footer className="bg-white dark:bg-gray-900">
              <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Company
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                        <a href="#" className=" hover:underline">
                          About
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Careers
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Help center
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Facebook
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Google
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Twitter
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Legal
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Privacy Policy
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Licensing
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Terms &amp; Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Download
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          iOS
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Android
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Windows
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          MacOS
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <FacebookOutlined />
                  <span className="sr-only">Facebook page</span>
                </a>

                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <GoogleOutlined />
                  <span className="sr-only">Google community</span>
                </a>

                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <XOutlined />
                  <span className="sr-only">Twitter page</span>
                </a>

                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <GithubOutlined />
                  <span className="sr-only">GitHub account</span>
                </a>

                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <GitlabOutlined />
                  <span className="sr-only">GitLab account</span>
                </a>

                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <YoutubeOutlined />
                  <span className="sr-only">Youtube account</span>
                </a>
              </div>
            </footer>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a
              href="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
              className="hover:underline"
            >
              Rikkei Academy™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
