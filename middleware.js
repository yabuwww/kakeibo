export const config = {
  matcher: '/(.*)', 
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // Vercelの設定画面からユーザー名とパスワードを取得する
  const USERNAME = process.env.BASIC_AUTH_USER;
  const PASSWORD = process.env.BASIC_AUTH_PASS;

  // 取得した値を使って、正解の合言葉を作成する
  const expectedAuth = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

  if (authHeader !== expectedAuth) {
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
}