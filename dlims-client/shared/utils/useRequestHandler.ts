import toast from 'react-hot-toast'
import useStatus from './useStatus'
// import useStatus from './useStatus'

function useRequestHandler() {
  const {
    status,
    setLoading,
    setSuccess,
    setError,
    setMiniLoading,
    resetStatus,
  } = useStatus()

  interface RequestHandlerOptions {
    showToast?: boolean
    confirmation?: boolean
    confirmationMessage?: string
    loadingType?: 'mini' | 'standard'
    loadingMessage?: string
    successMessage?: string
    onSuccess?: () => void
    errorMessage?: string
    onError?: () => void
    finallyRun?: () => void
  }
  const defaultRequestHandlerOptions: RequestHandlerOptions = {
    showToast: true,
    confirmation: false,
    loadingType: 'mini',
  }
  function requestHandler(
    fn: () => Promise<any>,
    {
      showToast = true,
      confirmation = false,
      loadingType = 'mini',
      confirmationMessage,
      loadingMessage,
      successMessage,
      onSuccess = () => {},
      errorMessage,
      onError = () => {},
      finallyRun = () => {},
    }: RequestHandlerOptions = defaultRequestHandlerOptions
  ) {
    if (confirmation) {
      let confirm = window.confirm(confirmationMessage)
      if (!confirm) return
    }
    let loadingToast: any
    if (showToast && loadingMessage)
      loadingToast = toast.loading(loadingMessage)
    loadingType === 'standard' ? setLoading() : setMiniLoading(true)
    return Promise.resolve(fn())
      .then((value) => {
        if (showToast && successMessage) toast.success(successMessage)
        setSuccess(successMessage || 'Success')
        onSuccess()
        if (value) return value
      })
      .catch((e) => {
        const message =
          e?.response?.data?.message ||
          e?.message ||
          e.toString() ||
          errorMessage
        if (showToast && message) toast.error(message)
        setError(message)
        onError()
      })
      .finally(() => {
        if (loadingType === 'mini') setMiniLoading(false)
        if (showToast && loadingMessage) toast.dismiss(loadingToast)
        finallyRun()
      })
  }

  return {
    status,
    requestHandler,
  }
}

export default useRequestHandler
