export class ApiResponse<T> {
    status: 'success' | 'error' = 'success';
    message: string;
    data: T | null;
  
    constructor(status: 'success' | 'error' = 'success', message: string, data: T | null = null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  