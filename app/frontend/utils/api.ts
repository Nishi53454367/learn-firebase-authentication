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

/** GoogleCloud(APIGateway)のAPI */
export const getShop = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_ENDPOINT}/shop`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response;
}

/** GoogleCloud(APIGateway)のAPI */
export const getNotices = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_ENDPOINT}/notices`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response;
}