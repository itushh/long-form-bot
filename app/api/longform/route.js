import { LongForm } from "@/lib/gemini"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const shortform = searchParams.get("shortform")

    return new Response(JSON.stringify({ message: await LongForm(shortform) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}