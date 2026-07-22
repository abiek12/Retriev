import { Hono } from "hono";
import documentRoutes from "./document/document.route";

const app = new Hono();

// Register routes
app.route("/documents", documentRoutes);
// app.route("/chat", chatRoutes);

export default app;
