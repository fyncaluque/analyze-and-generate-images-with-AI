export const analyzeImage = async (imageURL) => {
  const key = process.env.REACT_APP_VISION_KEY;
  const endpoint = process.env.REACT_APP_VISION_ENDPOINT;

  let response = await fetch(
    `${endpoint}/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": `${key}`,
      },
      body: JSON.stringify({ url: imageURL }),
    }
  );
  const data = await response.json();
  return data;
};

export default analyzeImage;
