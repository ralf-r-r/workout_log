export interface Session {
    sessionId: string
    name: string
    date: string
    description: string
    attachmentUrl?: string
}

export interface SessionRequest {
    name: string
    date: string
    description: string
}
