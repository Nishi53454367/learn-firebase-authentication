/** 認証なしAPI */
export const get = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/`);
  return response;
}

/** 認証ありAPI */
export const getAuth = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response;
}