import sendRequest from "./send-request";
const BASE_URL = "/api/comments";

export async function createComment(commentData) {
  return sendRequest(BASE_URL + "/create", "POST", commentData);
}
