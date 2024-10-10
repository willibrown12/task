import { getConnection } from "../../database"

export async function getTeams() {
    const connection = await getConnection();
    const teams = await connection?.execute(`SELECT * FROM development.teams;`)
    const result = teams?.[0]
    return result
}