import type { AssessResponse, UserProfile } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function assess(
  message: string,
  profile: UserProfile | null,
): Promise<AssessResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, profile }),
    });
  } catch {
    throw new ApiError(
      "We couldn't reach the assessment service. Please check your connection and try again.",
    );
  }
  if (!response.ok) {
    throw new ApiError(
      "Something went wrong while checking the schemes. Please try again in a moment.",
    );
  }
  return (await response.json()) as AssessResponse;
}
