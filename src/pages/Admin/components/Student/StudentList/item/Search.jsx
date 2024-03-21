import React from 'react'
import apis from '../../../../../../services/apis/modules';
import { useSelector, useDispatch } from 'react-redux'
import { list ,pagination,setSeachStatus,setSeachValue} from '../../../../../../redux/slices/student-slice'; 


export default function Search() {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total} = useSelector((state) => state.studentSlice);
  async function handleSearch(e){
    const keywordValue = e.target.elements.keyword.value;
    dispatch(setSeachValue({value_search:keywordValue}));
    const searchList = await apis.studentApi.search(access_token,keywordValue,0,take);
    if (searchList.status==200) {
    if(keywordValue){
      dispatch(setSeachStatus({is_search:true}));
      dispatch(list(searchList.data.data));
      dispatch(pagination({total:searchList.data.total,skip:0}));
    }else{
      dispatch(setSeachStatus({is_search:false}));
    }

    }
  }
  return (
    <form className="flex items-center max-w-sm mx-auto mb-6"
      onSubmit={(e)=>{e.preventDefault(); handleSearch(e)}}
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
        placeholder="Search name..."
        required=""
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
  )
}
