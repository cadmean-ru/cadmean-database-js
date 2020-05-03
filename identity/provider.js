class TokensProvider {
    accessToken;
    refreshToken;

    saveTokens = (accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    loadTokens = () => {
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
    }
}