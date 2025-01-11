let BASE_URL = "https://676afc4abc36a202bb83d19d.mockapi.io/api/v20";
const useFetch = () => {
  const response = ({ url, method = "GET", data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .catch((error) => console.log(error));
  };
  return response;
};

export { useFetch };
