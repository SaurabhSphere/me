import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_MODEL,
  INVOKE_URL,
  SYSTEM_PROMPT,
} from "./constants.js";

function parseReply(data) {
  return data?.choices?.[0]?.message?.content?.trim() || "I could not parse the model response.";
}

export async function fetchNvidiaReply({
  apiKey,
  userMessage,
  history,
  temperature = 0.15,
  topP = 1,
  frequencyPenalty = 0,
  presencePenalty = 0,
  maxTokens = DEFAULT_MAX_TOKENS,
}) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessage },
  ];

  const payload = {
    model: DEFAULT_MODEL,
    messages,
    max_tokens: maxTokens,
    temperature,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stream: false,
  };

  const response = await fetch(INVOKE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`NVIDIA API error (${response.status}): ${details}`);
  }

  const data = await response.json();
  return {
    reply: parseReply(data),
    assistantMessage: { role: "assistant", content: parseReply(data) },
    userMessage: { role: "user", content: userMessage },
  };
}
