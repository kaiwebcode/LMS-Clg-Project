import { env } from "./env";
import arcjet, { shield } from "@arcjet/next";

const aj = arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});

export default aj;
