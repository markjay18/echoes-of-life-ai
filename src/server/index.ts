// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// app.post("/api/generate", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt || typeof prompt !== "string") {
//       return res.status(400).json({
//         error: "Prompt is required",
//       });
//     }

//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "openrouter/free",
//           messages: [
//             {
//               role: "user",
//               content: `Create a short, engaging description based on this idea:

// ${prompt}`,
//             },
//           ],
//         }),
//       },
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("OpenRouter error:", data);

//       return res.status(response.status).json({
//         error: data?.error?.message ?? "OpenRouter request failed",
//       });
//     }

//     const description = data?.choices?.[0]?.message?.content ?? "";

//     return res.json({
//       description,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`API server running at http://localhost:${PORT}`);
// });
