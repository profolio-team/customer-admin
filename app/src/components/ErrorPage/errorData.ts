interface CustomErrors {
  code: string;
  message: string;
  text: string;
}

export const errors: CustomErrors[] = [
  {
    code: "404",
    message: "Page not found",
    text: "Sorry. The page you are looking for has been removed or moved to somewhere else.",
  },
  {
    code: "403",
    message: "Access denied",
    text: "Sorry. You don’t have permission to access this page.",
  },
  {
    code: "500",
    message: "Unexpected error",
    text: "Sorry. We are facing an internal server error and fixing it already. Please try again later.",
  },
  {
    code: "503",
    message: "Service unavailable",
    text: "Sorry. Service is getting a tune-up. Please try again later.",
  },
];
