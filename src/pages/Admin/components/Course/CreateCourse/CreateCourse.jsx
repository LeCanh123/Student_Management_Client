import apis from "../../../../../services/apis/modules/course.module.js";

const CreateCourse = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const access_token = localStorage.getItem("access_token");

    const form_data = {
      name: e.target.name.value,
      duration: Number(e.target.duration.value),
      start_date: new Date(e.target.start_date.value).toISOString(),
      end_date: new Date(e.target.end_date.value).toISOString(),
      description: e.target.description.value,
    };

    await apis.create(access_token, form_data);
  };
  return (
    <div>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new course
        </h2>

        <form onSubmit={handleFormSubmit}>
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
            Add new course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
