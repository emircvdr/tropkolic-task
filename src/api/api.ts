import axios from "axios";

function getData() {
  return axios
    .get("https://beta.tripkolic.com/api/v1/product/task/tours")
    .then((res) => {
      return res.data.products;
    });
}

export { getData };
