const petFinderKey = "1wd4lErnMbN7hOMFKUQAXF5NEciMSYjMkos1Q0DYTzoJa4qHkO";
const petFinderSecret = "Ca9Bkhqbke7Iqb300ACRgGc7FnkRBiPhcAb6jiuQ";
const URL = "https://api.petfinder.com/v2/oauth2/token";

export default async (req, res) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", petFinderKey);
  params.append("client_secret", petFinderSecret);
  const petFinderRes = await fetch(`${URL}`, {
    method: "POST",
    body: params,
  });
  const data = await petFinderRes.json();
  res.send(data);
};
