import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
console.log(process.env.REACT_APP_OPENAI_API_KEY);

const generateImage = async () => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;
  return image_url;
};
export default generateImage;
