const CLIENT_ID = "ef3dbe29e95781d561acb3dfbcab36b1";
const REDIRECT_URI = "http://localhost:3000/login/oauth2/callback/kakao";
// const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;