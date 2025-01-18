import { IoIosSearch } from "react-icons/io";
import AllTypes from "./components/AllTypes";
import { useEffect, useState } from "react";
function App() {
  const [allTypes, setAllTypes] = useState([]);
  useEffect(() => {
    fetchAllTypes();
  }, []);

  async function fetchAllTypes() {
    setAllTypes(await AllTypes());
  }

  console.log(allTypes);
  return (
    <>
      <div className="w-[40rem] mx-auto py-4 text-center">
        <h1 className="mb-6 text-5xl font-bold">POKE WORLD</h1>
        <div className="flex items-center justify-between gap-4 px-4">
          <select
            name=""
            id=""
            className="w-1/3 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          ></select>
          <label className="w-2/3 relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoIosSearch className="h-5 w-5 fill-slate-300" />
            </span>
            <input
              className="w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
