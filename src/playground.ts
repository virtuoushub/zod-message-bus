import { z } from "zod";

const createMessageProtocol = <
  T extends Record<string, z.ZodRawShape>,
  EventsAsDiscoUnion = EventsConfigToDiscriminatedUnion<T>,
>(opts: {
  events: T;
}) => {
  return {
    createSender: (func: (event: EventsAsDiscoUnion) => void) => {
      return func;
    },
    createHandler: (func: (event: EventsAsDiscoUnion) => void) => {
      return func;
    },
  };
};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type EventsConfigToDiscriminatedUnion<T extends Record<string, z.ZodRawShape>> =
  {
    [K in keyof T]: Prettify<
      {
        type: K;
      } & z.infer<z.ZodObject<T[K]>>
    >;
  }[keyof T];

// { type: 'LOG_IN'; username: string; password: string } | { type: 'LOG_OUT' }

const messageBus = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
});

const send = messageBus.createSender(window.postMessage);

send({
  type: "LOG_OUT",
});

const handler = messageBus.createHandler((event) => {});

// window.addEventListener("message", (event) => {
//   event.data;
// });

// send();
