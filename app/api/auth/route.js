import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./[...nextauth]/route"

export async function GET(request) {
    try {

        const session = await getServerSession(authOptions)
        return NextResponse.json(
            { session }
        )
    } catch (error) {
        return NextResponse.error({
            status: 500,
            statusText: "Internal Server Error",
            body: "Internal Server Error"
        })
    }
}
