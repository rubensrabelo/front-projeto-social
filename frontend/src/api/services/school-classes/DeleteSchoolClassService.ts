import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function DeleteSchoolClassService(id_coordinator: string, id_class: number) {
    const url = `${ENV.API_BASE_URL}/turmas/${id_coordinator}/${id_class}`;

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

