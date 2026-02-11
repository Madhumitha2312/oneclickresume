import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "summary") {
      systemPrompt = "You are a professional resume writer. Generate a compelling professional summary (2-3 sentences) based on the provided information. Be concise, impactful, and use action words. Return ONLY the summary text, nothing else.";
      userPrompt = `Generate a professional summary for: Name: ${data.name}, Title: ${data.title}, Skills: ${data.skills?.join(", ") || "N/A"}, Experience: ${data.experience?.map((e: any) => `${e.role} at ${e.company}`).join(", ") || "N/A"}`;
    } else if (action === "improve") {
      systemPrompt = "You are a professional resume writer. Improve the given text to be more professional, concise, and impactful. Use action verbs and quantify achievements where possible. Return ONLY the improved text, nothing else.";
      userPrompt = `Improve this resume text: "${data.text}"`;
    } else if (action === "skills") {
      systemPrompt = "You are a career advisor. Based on the job title and existing skills, suggest 5 additional relevant skills. Return ONLY a comma-separated list of skills, nothing else.";
      userPrompt = `Job title: ${data.title}. Current skills: ${data.skills?.join(", ") || "None"}. Suggest 5 more relevant skills.`;
    } else {
      throw new Error("Invalid action");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI generation failed");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
