import { useCallback, useState } from "react";
import { ErrorData } from "../types/types";
  
const getErrorMessage = (status:number, data?: ErrorData, err?: Error): string => {
    let errorMessage = '';
  
    switch (status) {
      case 400:
        errorMessage = data?.message || 'Некорректный запрос';
        break;
      case 401:
        errorMessage = 'Неверные учетные данные';
        break;
      case 403:
        errorMessage = 'Доступ запрещен';
        break;
      case 404:
        errorMessage = 'Ресурс не найден';
        break;
      case 409:
        errorMessage = 'Пользователь уже существует';
        break;
      case 422:
        errorMessage = 'Неправильный логин или пароль. Пользователь уже существует';
        break;
      case 500:
        errorMessage = 'Ошибка сервера';
        break;
      default:
        errorMessage = `Ошибка ${status}`;
    }
  
    if (err && err.message) {
      errorMessage = err.message;
    }
  
    return errorMessage;
  };
  
  const useErrorHandler = () => {
    const [error, setError] = useState<string | null>(null);
  
    const handleError = useCallback((status: number, data?: ErrorData, err?: Error) => {
      const errorMessage = getErrorMessage(status, data, err);
        return setError(errorMessage);
    }, []);
  
    const clearError = useCallback(() => {
      setError(null);
    }, []);
  
    return {
      error,
      handleError,
      clearError,
    };
  };
  
  export default useErrorHandler;