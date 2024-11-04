
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth 환경변수가 설정되지 않았습니다.');
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
            params: {
                prompt: "select_account",  // 계정 선택 화면 강제
            }
        }
        })
    ]
})

export { handler as GET, handler as POST }