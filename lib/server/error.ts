/**
 * 关于错误处理的逻辑
 * 1. 错误处理由catchError统一处理，其中包括 Zod错误，业务错误，第三调用错误
 * 2. 错误处理需要返回结构 { status, code }，其中 status 为 HTTP 状态码，code 用于状态码的说明
 */

import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { generateErrorMessage } from "zod-error";

interface ErrorResponse {
  code: string;
  message: string;
  i18nCode?: string;
}

export const ErrorCode = z.enum([
  "bad_request",
  "not_found",
  "internal_server_error",
  "unauthorized",
  "forbidden",
  "rate_limit_exceeded",
  "invite_expired",
  "invite_pending",
  "exceeded_limit",
  "conflict",
  "unprocessable_entity",
]);

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  invite_pending: 409,
  invite_expired: 410,
  unprocessable_entity: 422,
  rate_limit_exceeded: 429,
  internal_server_error: 500,
};

export class CustomError extends Error {
  public readonly code: z.infer<typeof ErrorCode>;
  public readonly i18nCode?: string;

  constructor({
    code,
    message,
    i18nCode,
  }: {
    code: z.infer<typeof ErrorCode>;
    message: string;
    i18nCode?: string;
  }) {
    super(message);
    this.code = code;
    this.i18nCode = i18nCode;
  }
}

export function processError(error: any): ErrorResponse & { status: number } {
  console.error("API error occurred", error.message);

  if (error instanceof ZodError) {
    return {
      ...fromZodError(error),
      status: errorCodeToHttpStatus.unprocessable_entity,
    };
  }

  // CustomError errors
  if (error instanceof CustomError) {
    return {
      code: error.code,
      message: error.message,
      i18nCode: error.i18nCode,
      status: errorCodeToHttpStatus[error.code],
    };
  }

  // 这里可以包装其他第三方库的错误
  // Prisma record not found error
  // if (error.code === "P2025") {
  //   return {
  //     code: "not_found",
  //     message:
  //       error?.meta?.cause ||
  //       error.message ||
  //       "The requested resource was not found.",
  //     status: 404,
  //   };
  // }

  // 任何其他为捕获的错误都将包装一下，不会把实际的错误详细信息暴露出去
  return {
    code: "internal_server_error",
    message:
      "An internal server error occurred. Please contact our support if the problem persists.",
    status: 500,
  };
}

export function catchError(err: unknown, headers?: Record<string, string>) {
  const result = processError(err);
  const { status, ...error } = result;

  return NextResponse.json<ErrorResponse>(error, { headers, status });
}

export function fromZodError(error: ZodError): Omit<ErrorResponse, "status"> {
  return {
    code: "unprocessable_entity",
    message: generateErrorMessage(error.issues, {
      maxErrors: 1,
      delimiter: {
        component: ": ",
      },
      path: {
        enabled: true,
        type: "objectNotation",
        label: "",
      },
      code: {
        enabled: true,
        label: "",
      },
      message: {
        enabled: true,
        label: "",
      },
    }),
  };
}
