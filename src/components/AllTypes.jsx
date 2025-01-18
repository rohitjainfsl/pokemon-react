import instance from "../axiosConfig";

async function AllTypes() {
  const response = await instance.get("/type/?limit=21");
  return response.results;
}

export default AllTypes;
