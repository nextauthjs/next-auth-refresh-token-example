import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  return (
    <div>
      <Head>
        <title>Next-Auth Refresh Tokens</title>
      </Head>

      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}

      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
