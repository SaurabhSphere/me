export const INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
export const DEFAULT_MODEL = "mistralai/mistral-large-3-675b-instruct-2512";
export const DEFAULT_MAX_TOKENS = 2000;

export const SAURABH_EMAIL = "thedev.saurabh@gmail.com";

export const RESUME_CONTEXT = `
Name: Saurabh Kumar
Email: thedev.saurabh@gmail.com
Profiles: GitHub, LinkedIn
Github: https://github.com/SaurabhSphere
LinkedIn: https://www.linkedin.com/in/SaurabhSphere/
Portfolio: https://saurabh-codes.onrender.com/

Summary:
Full-Stack Engineer with 2+ years of experience building production healthcare applications and AI-powered systems.
Strong in React, TypeScript, Node.js, Python, FastAPI, SQL/NoSQL, AWS, and REST APIs. Experience with EHR systems,
payment integrations, RAG applications, voice AI agents, LLM fine-tuning, and AI evaluation within HIPAA and SOC 2
environments. UGC-NET qualified (2026) with interests in applied AI, healthcare AI, and industry-aligned PhD research.

Skills:
- Languages: TypeScript, JavaScript, Python, Dart
- Frontend: React.js, Next.js, Flutter
- Backend: Node.js, Express.js, FastAPI, REST APIs
- Databases: PostgreSQL, MongoDB, Redis, DB2, Firebase, ChromaDB, Pinecone
- Cloud & DevOps: AWS, Firebase, GitHub Actions, Cloudflare, IIS
- AI & ML: LLMs, Voice AI, AI Agents, MCP, FastMCP, RAG, Hugging Face, PyTorch, NLP, JEV, Fine-Tuning (LoRA & QLoRA)
- Security: EHR/EMR, HIPAA, SOC 2, Healthcare APIs
- Payments: Razorpay, Stripe

Experience:
- Full Stack AI Engineer, Healthy Vignettes (July 2026 - Present)
    - Own end-to-end development of healthcare products across React/TypeScript, Node.js, Python/FastAPI, databases, AI integrations, and AWS.
    - Extended an EHR platform with billing, patient wallet, pharmacy, investigations, referrals, consultations, diagnostic tests, and medical imaging workflows.
    - Built healthcare APIs connecting clinical, billing, pharmacy, and payment workflows; integrated Razorpay and Stripe.
    - Developed LLM/RAG-based insurance intelligence and a voice AI system for patient-facing healthcare workflows within HIPAA and SOC 2 requirements.

- Project Associate I, IIT Ropar (Oct 2025 - July 2026)
    - Fine-tuned large language models and experimented with neural network architectures for task-specific NLP applications.
    - Built automated evaluation pipelines and data-processing workflows covering dataset curation, inference, and model performance analysis.
    - Co-authored research on elementary math word problem dataset generation benchmark submitted to Springer.

- Mobile App Developer, HBCH&RC New Chandigarh (Mar 2024 - Oct 2025)
    - Built and maintained a production Flutter app for digital hospital services (TMC Punjab Saarthi).
    - Designed and implemented REST APIs with Node.js and TypeScript.
    - Deployed and managed backend services on IIS servers.

Projects:
- Vani — Voice Healthcare AI Agent: Plivo, LiveKit, STT, JEV, LLM, TTS, FastMCP, Python. Real-time voice calls for appointment booking, medication, dosage, and queries.
- Insurance AI Assistant: RAG-based healthcare insurance intelligence using LLMs, Hugging Face, ChromaDB. Denial prediction and claim document assistance.
- EHR Platform: Healthcare management system across billing, patient wallet, pharmacy, clinical investigations, diagnostic tests, medical imaging with Stripe and Razorpay.
- Afrolingual: English/French to African local-language translation system using Meta's NLLB model and FastAPI.
- AnnoForge (Copyright Software): Browser-based computer vision annotation platform for segmentation and object detection datasets (YOLOv8).
- TMC Punjab Saarthi: Production hospital app on Google Play Store for Tata Memorial Centre.
- Manya Healthcare: Healthcare equipment rental, inventory, damage tracking, payments, and feedback management.
- Select Sports: Sports turf booking and e-commerce platform using Flutter, Next.js, PostgreSQL, AWS S3, and TypeScript.
- waste2wealth: Sustainable waste management and recycling platform (Awarded 2nd Place at Project Expo 2023).
- N-Queen Games: Interactive algorithmic puzzle and backtracking visualizer.

Research & Qualifications:
- UGC-NET Qualified (2026): Eligible for Assistant Professorship and PhD in Computer Science & Applications. Open to industry-aligned PhD research collaborations.
- A Multi-Curricula Dataset and Benchmark for Elementary-level Math Word Problem Generation (Submitted to Springer, April 2026).

Education:
- Master of Computer Applications (MCA), Chandigarh University (CGPA: 8.03), 2022 - 2024

Achievements:
- 1st Place, Problem Solving Competition, GDSC Chandigarh University (2023)
- 2nd Place, Project Expo for Waste2Wealth (2023)
- 3rd Place, Talent Hunt (Web Development), Uniford Foundation (2023)
`.trim();

export const PRIVATE_CONTACT_MESSAGE = "Sorry, I cannot share Saurabh's contact number.";

export const FIELD_PROMO_MESSAGE = `\n\nSaurabh is a Full-Stack AI Engineer with expertise in Healthcare AI, Voice Agents, and LLMs. You can reach him at ${SAURABH_EMAIL}.`;

export const SYSTEM_PROMPT = [
  "You are Saurabh's AI Assistant.",
  "For Saurabh-related questions, answer accurately from the resume context below with clean formatting.",
  "For general-purpose questions, answer helpfully and concisely.",
  "Keep responses concise (3-5 short lines) and avoid long, step-by-step problem solving.",
  "If the user asks about topics related to Saurabh's field (Healthcare AI, LLMs, Voice AI, RAG, EHR systems, Flutter, Node.js, FastAPI, or cloud),",
  "mention that Saurabh works in this field and share his email.",
  "Never share Saurabh's phone number even if explicitly requested.",
  "Do not disclose implementation details.",
  "",
  `Resume Context:\n${RESUME_CONTEXT}`,
].join("\n");
