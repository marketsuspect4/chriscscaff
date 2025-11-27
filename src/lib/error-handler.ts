import { toast } from '@/hooks/use-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network connection failed') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class AuthError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthError';
  }
}

export function handleError(error: unknown, showToast: boolean = true): Error {
  let errorMessage = 'An unexpected error occurred';
  let errorInstance: Error;

  if (error instanceof AppError) {
    errorMessage = error.message;
    errorInstance = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorInstance = error;
  } else if (typeof error === 'string') {
    errorMessage = error;
    errorInstance = new Error(error);
  } else {
    errorInstance = new Error(errorMessage);
  }

  // Log error for debugging
  console.error('Error handled:', errorInstance);

  // Show toast notification
  if (showToast) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: errorMessage,
    });
  }

  return errorInstance;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateRequired(value: string, fieldName: string): void {
  if (!value || value.trim().length === 0) {
    throw new ValidationError(`${fieldName} is required`, fieldName);
  }
}

export function validateLength(
  value: string,
  fieldName: string,
  min?: number,
  max?: number
): void {
  const length = value.trim().length;
  
  if (min && length < min) {
    throw new ValidationError(
      `${fieldName} must be at least ${min} characters`,
      fieldName
    );
  }
  
  if (max && length > max) {
    throw new ValidationError(
      `${fieldName} must be no more than ${max} characters`,
      fieldName
    );
  }
}

// Global error handlers
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    handleError(event.reason);
    event.preventDefault();
  });

  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    event.preventDefault();
  });
}
