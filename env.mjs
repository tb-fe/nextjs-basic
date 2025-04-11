import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    HOST: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_STATIC_URL: z.string().url(),
  },
  runtimeEnv: {
    // client
    NEXT_PUBLIC_STATIC_URL: process.env.NEXT_PUBLIC_STATIC_URL,

    // server
    HOST: process.env.HOST,
  },
});
