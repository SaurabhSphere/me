import {
  FIELD_PROMO_MESSAGE,
  PRIVATE_CONTACT_MESSAGE,
  SAURABH_EMAIL,
} from "./constants.js";

const PHONE_CONTACT_TERMS = new Set([
  "contact",
  "phone",
  "number",
  "mobile number",
  "phone number",
  "contact number",
  "call",
  "whatsapp",
]);

const SAURABH_ENTITY_TERMS = new Set(["saurabh", "saurabh kumar", "his", "him"]);

const FIELD_TOPIC_TERMS = new Set([
  "mobile app",
  "app development",
  "flutter",
  "react",
  "next.js",
  "node",
  "node.js",
  "backend",
  "api",
  "database",
  "postgresql",
  "mongodb",
  "redis",
  "db2",
  "cloud",
  "aws",
  "firebase",
  "rag",
  "llm",
  "fine-tuning",
  "prompt engineering",
  "fastapi",
  "typescript",
  "javascript",
  "python",
]);

export function isPhoneNumberRequest(message) {
  const lowered = message.toLowerCase();
  const asksForContact = Array.from(PHONE_CONTACT_TERMS).some((term) => lowered.includes(term));
  const targetsSaurabh = Array.from(SAURABH_ENTITY_TERMS).some((term) => lowered.includes(term));
  const asksForDigits = /(\+?\d[\d\-\s]{7,})/.test(lowered);

  return asksForContact && (targetsSaurabh || asksForDigits);
}

export function privateContactResponse() {
  return PRIVATE_CONTACT_MESSAGE;
}

export function isFieldRelatedQuery(message) {
  const lowered = message.toLowerCase();
  return Array.from(FIELD_TOPIC_TERMS).some((term) => lowered.includes(term));
}

export function maybeAppendFieldPromo(message, replyText) {
  if (isFieldRelatedQuery(message) && !replyText.includes(SAURABH_EMAIL)) {
    return `${replyText}${FIELD_PROMO_MESSAGE}`;
  }
  return replyText;
}
