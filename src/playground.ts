import { z } from "zod";
import { createMessageProtocol } from "./createMessageProtocol";

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

const handler = messageBus.createHandler((event) => {});
