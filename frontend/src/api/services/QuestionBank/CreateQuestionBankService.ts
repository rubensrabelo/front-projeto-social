import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function createQuestionBank(id_teacher: string, body: any) {
    const params = new URLSearchParams();

    if (id_teacher) {
        params.append("id_professor", id_teacher);
    }

    const url = `${ENV.API_BASE_URL}/professores/banco_questoes?${params.toString()}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const { message, status } = await parseErrorResponse(response);
        throw new AuthError(message, status);
    }

    return await response.json();
}

