export class ErrorWithStatus extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, ...params: string[]) {
      super(...params);
      this.statusCode = statusCode;
  
      Object.setPrototypeOf(this, ErrorWithStatus.prototype);
    }
  }