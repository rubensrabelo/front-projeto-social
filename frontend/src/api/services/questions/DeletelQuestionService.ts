import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function DeleteQuestionService(id_teacher: string, question_id: number) {
    const url = `${ENV.API_BASE_URL}/professores/${id_teacher}/questoes/${question_id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        const { message, status } = await parseErrorResponse(response);
        throw new AuthError(message, status);
    }

    return true;
}

