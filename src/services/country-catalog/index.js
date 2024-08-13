import httpCommon from "../../utils/http-common";
//
const getCountryLists = () => {
  return new Promise((resolve, reject) => {
    httpCommon
      .get("/all")
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const CountryCatalog = {
  getCountryLists,
};

export default CountryCatalog;
