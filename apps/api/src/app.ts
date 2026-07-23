import { Hono } from "hono";
import documentRoutes from "./document/document.route";
import textRoutes from "./text/text.route";

const app = new Hono();

// Register routes
app.route("/documents", documentRoutes);
app.route("/text", textRoutes);

export default app;
