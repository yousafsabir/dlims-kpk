import useStatus from './useStatus'
import toast from 'react-hot-toast'

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
    errorMessage?: string
  }
  const defaultRequestHandlerOptions: RequestHandlerOptions = {
    showToast: true,
    confirmation: false,
    loadingType: 'mini',
  }
  function requestHandler<T>(args: T,
    fn: (...args: T[]) => Promise<any>,
    {
      showToast = true,
      confirmation = false,
      loadingType = 'mini',
      confirmationMessage,
      loadingMessage,
      successMessage,
      errorMessage,
    }: RequestHandlerOptions = defaultRequestHandlerOptions
  ) {
    return function () {
      // Confirmation From User
      if (confirmation) {
        let confirm = window.confirm(confirmationMessage)
        if (!confirm) return
      }
      let loadingToast: any
      if (showToast && loadingMessage)
        loadingToast = toast.loading(loadingMessage)
      loadingType === 'standard' ? setLoading() : setMiniLoading(true)
      Promise.resolve(fn(args))
        .then(() => {
          if (showToast && successMessage) toast.success(successMessage)
          setSuccess(successMessage || 'Success')
        })
        .catch((e) => {
          const message =
            e?.response?.data?.message || e?.message || e.toString()
          if (showToast && errorMessage) toast.error(message)
          setError(message)
        })
        .finally(() => {
          if (loadingType === 'mini') setMiniLoading(false)
          if (showToast && loadingMessage) toast.dismiss(loadingToast)
        })
    }
  }

  return {
    status,
    requestHandler,
  }
}

export default useRequestHandler
