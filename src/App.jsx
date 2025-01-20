import { IoIosSearch } from "react-icons/io";
import { HiPlusCircle } from "react-icons/hi";
import instance from "./axiosConfig";
import { useEffect, useState } from "react";

function App() {
  const [allTypes, setAllTypes] = useState([]);
  const [pokemonsToDisplay, setPokemonsToDisplay] = useState([]);
  const [pokemonsToDisplayCopy, setPokemonsToDisplayCopy] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllTypes();
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch20Pokemons();
  }, [offset]);
  // console.log(allTypes);

  async function fetchAllTypes() {
    const response = await instance.get("/type/?limit=21");
    setAllTypes(response.data.results);
  }

  async function fetch20Pokemons() {
    try {
      const response = await instance.get(
        `/pokemon?limit=${limit}&offset=${offset}`
      );
      const temp = response.data.results;
      const promises = [];
      const finalData = [];

      temp.forEach(async (obj) => {
        promises.push(instance.get(obj.url.split("v2")[1]));
      });

      const temp2 = await Promise.all(promises);
      temp2.forEach((obj) => finalData.push(obj.data));

      setPokemonsToDisplay((prevPokemons) => {
        return [...prevPokemons, ...finalData];
      });
      setPokemonsToDisplayCopy((prevPokemons) => {
        return [...prevPokemons, ...finalData];
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function handleTypeChange(e) {
    try {
      setLoading(true);
      const copy = pokemonsToDisplayCopy;
      const finalCopy = [];
      if (e.target.value === "all") {
        console.log("copy", copy);
        setPokemonsToDisplay(copy);
      } else {
        copy.forEach((object) => {
          object.types.forEach((obj) => {
            if (obj.type.name === e.target.value) finalCopy.push(object);
          });
        });
        // console.log(finalCopy);
        setPokemonsToDisplay(finalCopy);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  console.log(pokemonsToDisplay);
  return (
    <>
      <HiPlusCircle
        onClick={() => setOffset(offset + limit)}
        className="fixed text-5xl bottom-3 right-3 cursor-pointer"
      />
      <div className="w-[40rem] mx-auto py-4 text-center">
        <h1 className="mb-6 text-5xl font-bold">POKE WORLD</h1>
        <div className="flex items-center justify-between gap-4 px-4">
          <select
            name=""
            id=""
            className="w-1/3 bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm capitalize"
            defaultValue=""
            onChange={handleTypeChange}
          >
            <option value="" disabled>
              Filter By Type
            </option>
            <option value="all">All Types</option>
            {allTypes.map((typeObject, index) => (
              <option key={index} value={typeObject.name}>
                {typeObject.name}
              </option>
            ))}
          </select>
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

      <div className="w-full my-8 px-12">
        {loading ? (
          <h1 className="text-center font-bold text-4xl">Loading...</h1>
        ) : (
          <div className="flex flex-wrap items-center justify-evenly gap-2">
            {pokemonsToDisplay.map((obj) => {
              return (
                <div
                  key={obj.id}
                  className="pokemon w-[22%] h-64 mb-8 flex flex-col items-center"
                >
                  <img
                    src={obj.sprites.other.dream_world.front_default}
                    alt=""
                    className="w-4/5 h-3/4"
                  />
                  <div className="content mt-2 text-center">
                    <h3 className="text-lg font-bold capitalize">{obj.name}</h3>
                    <div className="flex gap-1">
                      <strong>Type: </strong>
                      <p>
                        {obj.types.map((object) => object.type.name).toString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
