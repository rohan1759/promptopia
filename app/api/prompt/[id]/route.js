import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

// TO FETCH PROMPT
export const GET = async (req, { params }) => {
    try{
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response("Prompt not found", {status: 404})
        }
        
        return new Response(JSON.stringify(prompt), {status:200})
    }
    catch(error){
        return new Response("Failed to fetch Prompt", {status:500})
    }
}

// TO UPDATE PROMPT
export const PATCH = async (req, {params}) => {
    const { prompt, tag } = await req.json();

    try{
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return Response("Prompt not found", {status: 404})
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status:200})
    }
    catch(error){
        return new Response("Failed to Update Prompt", {status:500})
    }
}

// TO DELETE PROMPT
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted successfully", {status:200})
    } catch (error) {
        return new Response("Failed to Delete Prompt", {status:500})
    }
}