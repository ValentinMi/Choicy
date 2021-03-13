import React from "react";
import { Box, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export interface ErrorMessageProps {}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
