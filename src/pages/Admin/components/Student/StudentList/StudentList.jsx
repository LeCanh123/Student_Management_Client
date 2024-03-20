import Search from "./item/Search";
import Body from "./item/Body";
import PaginationPage from "./item/Pagination";
const StudentList = () => { 
  return (
    <div>
      {" "}
      <Search></Search>
      <Body></Body>
      <PaginationPage></PaginationPage>
    </div>
  );
};

export default StudentList;
