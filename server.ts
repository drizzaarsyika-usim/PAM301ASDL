import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

interface RoomSession {
  roomId: string;
  createdTime: number;
  lastUpdated: number;
  caseId: string;
  currentStageIndex: number;
  unlockedStages: number[];
  stageAnswers: Record<string, string>;
  teammates: string[];
  roleAssignments: Record<string, string>;
  reflections: {
    challengingFork: string;
    teamEfficiency: string;
    wardTakeaway: string;
  };
  timerRemaining: number;
  isTimerRunning: boolean;
}

const rooms = new Map<string, RoomSession>();

// Cleanup stale rooms older than 24 hours
setInterval(() => {
  const now = Date.now();
  for (const [id, room] of rooms.entries()) {
    if (now - room.lastUpdated > 24 * 60 * 60 * 1000) {
      rooms.delete(id);
    }
  }
}, 60 * 60 * 1000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", activeRooms: rooms.size });
  });

  // API: Create new room (support both /api/rooms and /api/room/create)
  const handleCreateRoom = (req: express.Request, res: express.Response) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let roomId = "";
    for (let i = 0; i < 6; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const initialCaseId = req.body.caseId || "w1-cardio-1";
    const newRoom: RoomSession = {
      roomId,
      createdTime: Date.now(),
      lastUpdated: Date.now(),
      caseId: initialCaseId,
      currentStageIndex: req.body.currentStageIndex ?? 0,
      unlockedStages: req.body.unlockedStages || [0],
      stageAnswers: req.body.stageAnswers || {},
      teammates: req.body.teammates || ["Ahmad Faiz", "Nurul Syahirah", "Tan Wei Ming", "Kavitha a/p Ramesh", "Muhammad Danish", "Siti Sarah", "Lee Jian Wei", "Farah Nabila"],
      roleAssignments: req.body.roleAssignments || {},
      reflections: req.body.reflections || req.body.reflection || {
        challengingFork: "",
        teamEfficiency: "",
        wardTakeaway: ""
      },
      timerRemaining: req.body.timerSeconds ?? req.body.timerRemaining ?? 480,
      isTimerRunning: req.body.isTimerRunning ?? false
    };

    rooms.set(roomId, newRoom);
    res.json({ success: true, roomId, session: newRoom, room: newRoom });
  };

  app.post("/api/rooms", handleCreateRoom);
  app.post("/api/room/create", handleCreateRoom);

  // API: Get room (support both /api/rooms/:roomId and /api/room/:roomId)
  const handleGetRoom = (req: express.Request, res: express.Response) => {
    const roomId = req.params.roomId.toUpperCase();
    const room = rooms.get(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found or expired" });
    }
    res.json({ success: true, roomId, session: room, room });
  };

  app.get("/api/rooms/:roomId", handleGetRoom);
  app.get("/api/room/:roomId", handleGetRoom);

  // API: Sync room state (support both /api/rooms/:roomId/sync and /api/room/:roomId/sync)
  const handleSyncRoom = (req: express.Request, res: express.Response) => {
    const roomId = req.params.roomId.toUpperCase();
    let room = rooms.get(roomId);
    if (!room) {
      room = {
        roomId,
        createdTime: Date.now(),
        lastUpdated: Date.now(),
        caseId: req.body.caseId || "w1-cardio-1",
        currentStageIndex: req.body.currentStageIndex ?? 0,
        unlockedStages: req.body.unlockedStages || [0],
        stageAnswers: req.body.stageAnswers || {},
        teammates: req.body.teammates || [],
        roleAssignments: req.body.roleAssignments || {},
        reflections: req.body.reflections || req.body.reflection || { challengingFork: "", teamEfficiency: "", wardTakeaway: "" },
        timerRemaining: req.body.timerSeconds ?? req.body.timerRemaining ?? 480,
        isTimerRunning: req.body.isTimerRunning ?? false
      };
      rooms.set(roomId, room);
    } else {
      room.lastUpdated = Date.now();
      if (req.body.caseId) room.caseId = req.body.caseId;
      if (req.body.currentStageIndex !== undefined) room.currentStageIndex = req.body.currentStageIndex;
      if (req.body.unlockedStages) room.unlockedStages = req.body.unlockedStages;
      if (req.body.stageAnswers) room.stageAnswers = { ...room.stageAnswers, ...req.body.stageAnswers };
      if (req.body.teammates) room.teammates = req.body.teammates;
      if (req.body.roleAssignments) room.roleAssignments = req.body.roleAssignments;
      if (req.body.reflections) room.reflections = { ...room.reflections, ...req.body.reflections };
      if (req.body.reflection) room.reflections = { ...room.reflections, ...req.body.reflection };
      if (req.body.timerSeconds !== undefined) room.timerRemaining = req.body.timerSeconds;
      if (req.body.timerRemaining !== undefined) room.timerRemaining = req.body.timerRemaining;
      if (req.body.isTimerRunning !== undefined) room.isTimerRunning = req.body.isTimerRunning;
    }
    res.json({ success: true, roomId, session: room, room });
  };

  app.post("/api/rooms/:roomId/sync", handleSyncRoom);
  app.post("/api/room/:roomId/sync", handleSyncRoom);

  // Helper for generating with model fallback & retry
  async function generateWithFallback(
    ai: GoogleGenAI,
    models: string[],
    prompt: string,
    systemInstruction: string
  ): Promise<string> {
    let lastError: any = null;

    for (const model of models) {
      // Try up to 2 attempts per model with a brief backoff
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.4
            }
          });

          if (response.text) {
            return response.text;
          }
        } catch (err: any) {
          lastError = err;
          const status = err?.status || err?.code || (err?.message?.includes("503") ? 503 : 0);
          console.warn(`[Gemini API] Model ${model} attempt ${attempt} failed: ${err.message || err}`);

          // If 503 or 429, wait a moment before retry or fallback
          if (attempt === 1 && (status === 503 || status === 429 || err?.message?.includes("high demand"))) {
            await new Promise((resolve) => setTimeout(resolve, 800));
            continue;
          }
          break; // move to next model
        }
      }
    }

    throw lastError || new Error("All Gemini model endpoints failed.");
  }

  // API: Gemini Clinical AI Facilitator / Tutor
  app.post("/api/gemini/tutor", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured. Please ensure your API key is provided in Settings > Secrets."
        });
      }

      const {
        caseTitle,
        stageTitle,
        stagePrompt,
        studentInput,
        teamAnswer,
        expertBenchmark,
        patientStem,
        patientContext,
        userQuestion
      } = req.body;

      const teamText = (teamAnswer || studentInput || "").trim();
      const patientInfo = patientStem || patientContext || "Hospital patient presentation";
      const benchmarkText = expertBenchmark || "Standard Malaysian clinical benchmark";
      const questionText = userQuestion ? `Student Socratic Query: "${userQuestion}"` : "";

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const systemInstruction = `You are an expert Clinical Medicine Professor and Senior Consultant Facilitator guiding medical students in a Self-Directed Learning (SDL) clinical reasoning session. 
Your goal is to provide constructive, pedagogically sound, and Socratic feedback on the medical student team's typed commitment versus the gold standard clinical reasoning benchmarks.
Focus on:
1. Identifying strengths in their clinical reasoning (e.g. correct semantic qualifiers, pathophysiological synthesis, prioritization of life-threats).
2. Spotting cognitive biases (e.g., anchoring, premature closure, search satisficing, diagnostic momentum).
3. Offering 2-3 focused Socratic probing questions or high-yield bedside clinical pearls.
4. Integrating patient-centered nuances and holistic/Islamic medical considerations where relevant (e.g. solat adaptation in illness, fasting during Ramadan, halal pharmacological alternatives, empathetic communication).
Keep your tone encouraging, professional, structured with concise bullet points, and directly applicable to clinical practice.`;

      const prompt = `Case: ${caseTitle || "Clinical Case"}
Patient Context: ${patientInfo}
Active Stage: ${stageTitle || "Clinical Reasoning Stage"}
${stagePrompt ? `Stage Task: ${stagePrompt}\n` : ""}
${questionText ? `${questionText}\n` : ""}
[Team's Submitted Commitment]:
"""
${teamText || "No answer submitted yet by the team."}
"""

[Reference Gold Standard / Expert Benchmark]:
"""
${benchmarkText}
"""

Please provide a concise, structured SDL Facilitator Feedback with:
1. 💡 Clinical Reasoning Strengths & Alignment
2. ⚠️ Potential Blindspots, Red Flags, or Cognitive Biases to Guard Against
3. 🎯 High-Yield Bedside Pearls & Socratic Question for Team Discussion`;

      // Candidate models for automatic fallback:
      const candidateModels = ["gemini-3.7-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

      let feedbackText: string;
      try {
        feedbackText = await generateWithFallback(ai, candidateModels, prompt, systemInstruction);
      } catch (genError: any) {
        console.error("All Gemini API models failed during high demand spike:", genError);

        // Resilient Socratic fallback synthesized from benchmark so the learning session is never blocked:
        feedbackText = `💡 **Clinical Reasoning Strengths & Alignment**
• Your team is addressing key elements of ${stageTitle || "this clinical stage"}.
• Clinical Benchmark Priority: ${benchmarkText.slice(0, 300)}...

⚠️ **Potential Blindspots & Biases to Guard Against**
• **Premature Closure & Anchoring**: Avoid locking onto the most common presentation without systematically ruling out atypical acute life-threats.
• Ensure full physiological monitoring and red-flag parameters are actively re-evaluated.

🎯 **Socratic Questions for Team Discussion**
• How do the patient's acute hemodynamic parameters and risk factors alter your immediate vs. subsequent step?
• What cognitive bias guard or devil's advocate challenge would most strengthen this commitment before final ward sign-off?

*(Note: Live cloud AI experienced a brief upstream demand spike; benchmark synthesis generated above).*`;
      }

      res.json({ feedback: feedbackText });
    } catch (err: any) {
      console.error("Gemini Tutor Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI clinical feedback" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SDL Clinical Reasoning Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
