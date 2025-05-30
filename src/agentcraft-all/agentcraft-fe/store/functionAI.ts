import { request } from 'utils/clientRequest';
export async function getFunctionAiApp(projectName: string, serviceName: string) {
    const result = await request(`/api/infra/cap/getProject?projectName=${projectName}&serviceName=${serviceName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result;
}



export async function addFunctionAiApp(payload: any) {
    const result = await request("/api/infra/cap/createProject", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result;
}
