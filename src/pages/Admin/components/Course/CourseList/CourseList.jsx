import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import apis from "../../../../../services/apis/modules/course.module";
import { useState, useEffect } from "react";

const CourseList = () => {
  const access_token = localStorage.getItem("access_token");

  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const keyword = e.target.keyword.value;

    const search = await apis.search(keyword);
    if (search.status) {
      setSearchResult(search.data);
      console.log("searchResult", searchResult);
    }
  };

  const handleDelete = async (course_id) => {
    await apis.delete(course_id);
  };

  const [courseUpdate, setCourseUpdate] = useState(false);

  const handleOpenModalUpdate = () => {
    setCourseUpdate(true);
  };

  const handleFormSubmit = async (course_id, e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");

    const form_data = {
      name: e.target.name.value,
      duration: Number(e.target.duration.value),
      start_date: new Date(e.target.start_date.value).toISOString(),
      end_date: new Date(e.target.end_date.value).toISOString(),
      description: e.target.description.value,
    };

    await apis.update(access_token, course_id, form_data);
  };

  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };
  const handleOk = () => {
    setShowDetail(false);
    setCourseUpdate(false);
  };
  const handleCancel = () => {
    setShowDetail(false);
    setCourseUpdate(false);
  };

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    async function handleGetCourseList() {
      const getCourseList = await apis.find_all();

      if (getCourseList.status) {
        setCourseList(getCourseList.data);
      }
    }
    handleGetCourseList();
  }, []);

  return (
    <div>
      <form
        className="flex items-center max-w-sm mx-auto mb-6"
        onSubmit={handleSearch}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            name="keyword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            placeholder="Search course name..."
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Start date
              </th>
              <th scope="col" className="px-6 py-3">
                End date
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(searchResult.length > 0 ? searchResult : courseList).map(
              (course) => (
                <tr
                  key={course.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{course.id}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {course.name}
                  </th>
                  <td className="px-6 py-4">{course.duration}</td>
                  <td className="px-6 py-4">{course.start_date}</td>
                  <td className="px-6 py-4">{course.end_date}</td>
                  <td className="px-6 py-4">{course.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between">
                      <Button type="dashed" dark onClick={handleShowDetail}>
                        Detail
                      </Button>
                      {showDetail && (
                        <Modal
                          title="COURSE DETAILS"
                          open={showDetail}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <p>ID: {course.id}</p>
                          <p>Name: {course.name}</p>
                          <p>Duration: {course.duration}</p>
                          <p>Start date: {course.start_date}</p>
                          <p>End date: {course.end_date}</p>
                          <p>Description: {course.description}</p>
                        </Modal>
                      )}
                      <Button
                        type="dashed"
                        dark
                        onClick={handleOpenModalUpdate}
                      >
                        <span>
                          <EditOutlined />
                        </span>
                      </Button>
                      {courseUpdate && (
                        <Modal
                          title="UPDATE COURSE INFORMATION"
                          open={courseUpdate}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <form
                              onSubmit={(e) => {
                                handleFormSubmit(course.id, e);
                              }}
                            >
                              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Name of course"
                                    required=""
                                  />
                                </div>
                                <div className="w-full">
                                  <label
                                    htmlFor="duration"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Duration
                                  </label>
                                  <input
                                    type="number"
                                    name="duration"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Course duration"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="start_date"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Start date
                                  </label>
                                  <input
                                    type="text"
                                    name="start_date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="YYYY-MM-DD"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="end_date"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    End date
                                  </label>
                                  <input
                                    type="text"
                                    name="end_date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="YYYY-MM-DD"
                                  />
                                </div>
                              </div>

                              <div className="mt-6 sm:col-span-2">
                                <label
                                  htmlFor="description"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Description
                                </label>
                                <textarea
                                  type="text"
                                  name="description"
                                  rows={8}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Course description"
                                />
                              </div>

                              <button
                                type="submit"
                                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                              >
                                Update
                              </button>
                            </form>
                          </div>
                        </Modal>
                      )}
                      <Button
                        type="dashed"
                        dark
                        onClick={() => handleDelete(course.id)}
                      >
                        <span>
                          <DeleteOutlined />
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
