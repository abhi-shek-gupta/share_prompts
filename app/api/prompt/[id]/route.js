import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET(read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH(update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await request.json();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt Not Found", { status: 404 });
    existingPrompt.tag = tag;
    existingPrompt.prompt = prompt;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to Update prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await findByIdAndRemove(params.id);
    return new Response("Prompt deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Prompt", { status: 500 });
  }
};
