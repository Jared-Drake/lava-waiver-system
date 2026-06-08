const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/waivers";

export async function createWaiver(formData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

   // Default to an empty object in case the response does not contain JSON.
  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

    // Throw the backend error data when the request is unsuccessful.
  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function searchWaiver(searchType, searchValue) {
  const cleanSearchValue = searchValue.trim();

  let url = "";

  if (searchType === "code") {
    url = `${API_BASE_URL}/code/${cleanSearchValue.toUpperCase()}`;
  } else if (searchType === "parent") {
    url = `${API_BASE_URL}/search/parent?lastName=${encodeURIComponent(
      cleanSearchValue
    )}`;
  } else {
    url = `${API_BASE_URL}/search/participant?lastName=${encodeURIComponent(
      cleanSearchValue
    )}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No waiver found for that search.");
  }

  return response.json();
}