import { Context } from "hono";
import chatService from "./chat.service";

class ChatController {
  async chat(c: Context) {
    const body = await c.req.json();

    const response = await chatService.sendMessage(body);

    return c.json({
      success: true,
      data: response,
      message: "Success",
    });
  }
}

export default new ChatController();
