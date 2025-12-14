import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function DeleteTeacherService(idCoordinator: string, idTeacher: string) {
    const url = `${ENV.API_BASE_URL}/professores/${idCoordinator}/${idTeacher}`;

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

