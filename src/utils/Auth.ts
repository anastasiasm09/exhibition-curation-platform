export function setGoogleToken(token : string) {
    localStorage.setItem("google_token", token)
}

export function getGoogleToken() : string | null {
    return localStorage.getItem("google_token")
}

export function isUserAuthenticated() : boolean {
    return !!getGoogleToken()
}