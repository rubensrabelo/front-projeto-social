import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function UpdateBankService(teacher_id: string, bank_id: number, body: any) {

    const url = `${ENV.API_BASE_URL}/professores/${teacher_id}/banco_questoes/${bank_id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const { message, status } = await parseErrorResponse(response);
        throw new AuthError(message, status);
    }

    return await response.json();
}
