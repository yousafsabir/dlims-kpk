import { useState } from 'react'

const useStatus = () => {
  const [status, setStatus] = useState({
    miniLoading: false,
    loading: false,
    success: false,
    error: false,
    message: '',
  })
  const setMiniLoading = (value: boolean) => {
    setStatus((prev) => ({
      ...prev,
      miniLoading: value,
    }))
  }
  const setLoading = () => {
    setStatus((prev) => ({
      ...prev,
      loading: true,
      error: false,
      success: false,
    }))
  }
  const setSuccess = (message: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: false,
      success: true,
      error: false,
      message: message,
    }))
  }
  const setError = (message: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: false,
      success: false,
      error: true,
      message: message,
    }))
  }
  const resetStatus = () => {
    setStatus({
      miniLoading: false,
      loading: false,
      success: false,
      error: false,
      message: '',
    })
  }
  return {
    status,
    setLoading,
    setSuccess,
    setError,
    setMiniLoading,
    resetStatus,
  }
}

export default useStatus
