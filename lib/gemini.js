const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
const headers = { "Content-Type": "application/json" }

async function LongForm(shortform) {
    const data = {
        contents: [
            {
                parts: [
                    { text: `what is long form of ${shortform}. Just tell me long form only.` }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export { LongForm }