import { v4 as uuidv4 } from 'uuid';
import { getVectorDbClass } from '../vectorDb';
import { OpenAi } from '../openAi';
import { resetMemory } from './commands/reset';
import { WorkspaceChat } from '../model/';

export const grepCommand = (message) => {
  const availableCommands = Object.keys(VALID_COMMANDS);

  for (let i = 0; i < availableCommands.length; i++) {
    const cmd = availableCommands[i];
    const re = new RegExp(`^(${cmd})`, 'i');
    if (re.test(message)) {
      return cmd;
    }
  }

  return null;
};
const VALID_COMMANDS = {
  '/reset': resetMemory,
};

const convertToPromptHistory = (history = []) => {
  const formattedHistory = [];
  history.forEach((history) => {
    const { prompt, response } = history;
    const data = JSON.parse(response);
    formattedHistory.push([
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.text },
    ]);
  });
  return formattedHistory.flat();
};

export const chatWithWorkspace = async (
  workspace,
  message,
  chatMode = 'query',
) => {
  const uuid = uuidv4();
  const openai = new OpenAi();
  const VectorDb = getVectorDbClass();
  const command = grepCommand(message);
  if (!!command && Object.keys(VALID_COMMANDS).includes(command)) {
    return await VALID_COMMANDS[command](workspace, message, uuid);
  }

  const { safe, reasons = [] } = await openai.isSafe(message);
  if (!safe) {
    return {
      id: uuid,
      type: 'abort',
      textResponse: null,
      sources: [],
      close: true,
      error: `This message was moderated and will not be allowed. Violations for ${reasons.join(
        ', ',
      )} found.`,
    };
  }

  const hasVectorizedSpace = await VectorDb.hasNamespace(workspace.slug);
  if (!hasVectorizedSpace) {
    console.log('not has anme space');
    const rawHistory = await WorkspaceChat.findAll({
      where: { workspaceId: workspace.id, include: true },
    });
    const chatHistory = convertToPromptHistory(rawHistory);
    const response = await openai.sendChat(chatHistory, message, workspace);
    const data = { text: response, sources: [], type: 'chat' };

    await WorkspaceChat.create({
      workspaceId: workspace.id,
      prompt: message,
      response: data,
    });
    return {
      id: uuid,
      type: 'textResponse',
      textResponse: response,
      sources: [],
      close: true,
      error: null,
    };
  } else {
    const {
      response,
      sources,
      message: error,
    } = await VectorDb[chatMode]({
      namespace: workspace.slug,
      input: message,
      workspace,
    });
    if (!response) {
      return {
        id: uuid,
        type: 'abort',
        textResponse: null,
        sources: [],
        close: true,
        error,
      };
    }

    const data = { text: response, sources, type: chatMode };
    await WorkspaceChat.create({
      workspaceId: workspace.id,
      prompt: message,
      response: JSON.stringify(data),
    });
    return {
      id: uuid,
      type: 'textResponse',
      textResponse: response,
      sources,
      close: true,
      error,
    };
  }
};
