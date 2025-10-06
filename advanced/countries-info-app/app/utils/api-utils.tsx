interface FetchInput {
  url: string,
  options?: RequestInit,
  onSuccess?: (json: any) => void,
  onError?: (message: string) => void,
  onComplete?: () => void
}

export const fetchJson = async (input: FetchInput) => {
  let result = null;
  try {
    const response = await fetch(input.url, input.options ?? {})

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    result = await response.json()
    if (input.onSuccess) {
      input.onSuccess(result)
    }
  } catch (error) {
    if (input.onError) {
      if (error instanceof Error) {
        input.onError(error.message)
      } else {
        input.onError(String(error))
      }
    } else {
      throw error
    }
  } finally {
    if (input.onComplete) {
      input.onComplete()
    }
    return result
  }
}