import { catchError, CustomError } from "@/lib/server/error"

export const GET = async () => {
  try {
    // 其他业务代码...

    // 抛出自己的错误
    throw new CustomError({
      code: 'bad_request',
      message: '这是一个示例错误',
    })

  } catch (error) {
    // 错误在这里统一捕获并格式化返回
    return catchError(error)
  }
}