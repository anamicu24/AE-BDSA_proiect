
export const getProducts = async (filters) => {
    let url = `${import.meta.env.VITE_API_URL}/products`;
  
    if (filters.category) {
      url += `/category/${filters.category}`;
    }
  
    const response = await fetch(url);
    const json = await response.json();
  
    return json;
  };
  