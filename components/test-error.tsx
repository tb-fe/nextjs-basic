"use client";

import { Button } from "./ui/button";


export function TestError() {
  const fetchData = async () => {
    const response = await fetch('/api/error-example')
    const json = await response.json();

    // 如果请求未成功，则抛出错误
    if (!response.ok) {
      // 弹出服务端的错误消息
      return alert(json.message)
    }
  }

  const handleFetch = () => {
    fetchData()
  }

  return (
    <div>
       <Button onClick={handleFetch}>测试错误组件</Button>
    </div>
  )
}