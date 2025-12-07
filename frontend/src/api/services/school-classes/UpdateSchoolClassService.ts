import ENV from "../../../config/envConfig.ts";
import { AuthError } from "../../errors/AuthError.ts";
import { parseErrorResponse } from "../../utils/parseErrorResponse.ts";

export async function UpdateSchoolClassService(id_coordinator: string, id_class: number, body: any) {
    const url = `${ENV.API_BASE_URL}/turmas/editar/${id_coordinator}/${id_class}`;

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

