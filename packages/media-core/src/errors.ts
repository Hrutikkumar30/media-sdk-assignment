export class MediaApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseData?: any
  ) {
    super(message);
    this.name = 'MediaApiError';
  }
}

export class AuthenticationError extends MediaApiError {
  constructor(message: string = 'Authentication failed. Please check your API key.') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends MediaApiError {
  constructor(message: string = 'Resource not found.') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends MediaApiError {
  constructor(message: string = 'Rate limit exceeded. Please try again later.') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}
