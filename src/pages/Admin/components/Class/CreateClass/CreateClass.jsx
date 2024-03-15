import apis from "../../../../../services/apis/modules/class.module";

const CreateClass = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const access_token = localStorage.getItem("access_token");

    const form_data = {
      name: e.target.name.value,
      teacher: e.target.teacher.value,
      course_id: Number(e.target.course_id.value),
      max_students: Number(e.target.max_students.value),
    };

    await apis.create(access_token, form_data);
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add a new class
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleFormSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name of class"
                  />
                </div>

                <div>
                  <label
                    htmlFor="teacher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Teacher's name
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    placeholder="Name of teacher"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="course_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course ID
                  </label>
                  <input
                    type="number"
                    name="course_id"
                    placeholder="Course ID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="max_students"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of students
                  </label>
                  <input
                    type="number"
                    name="max_students"
                    placeholder="Maximum number of students"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Add new class
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateClass;
