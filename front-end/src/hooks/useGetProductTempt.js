export const useGetProductTempt = () => {
  const query = async (productId) => {
    if (!productId) {
      throw new Error("Product Id is required");
    }

    const res = await fetch(`http://localhost:8081/temperature/${productId}`);
    if (res.ok) {
      const resJson = await res.json();

      return {
        name: resJson.name,
        temperature: resJson.temperature,
        status: resJson.status
      }
    }

    const err = await res.json();
    throw new Error(err.message);
  }

  return { query };
}