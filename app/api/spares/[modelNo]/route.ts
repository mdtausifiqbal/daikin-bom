import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { modelNo: string } }) {
  const { modelNo } = params

  if (!modelNo) {
    return NextResponse.json({ error: "Model number is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.cphwpfzsns-daikinair1-p1-public.model-t.cc.commerce.ondemand.com/occ/v2/fsm/getSpares/${modelNo}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch spare parts: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching spare parts:", error)
    return NextResponse.json({ error: "Failed to fetch spare parts from external API" }, { status: 500 })
  }
}
