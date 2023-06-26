const { WorkspaceChat } = require('../../model');

export const resetMemory = async (workspace, _message, msgUUID) => {
  WorkspaceChat.update(
    { include: false },
    { where: { workspaceId: workspace.id } },
  );
  return {
    uuid: msgUUID,
    type: 'textResponse',
    textResponse: 'Workspace chat memory was reset!',
    sources: [],
    close: true,
    error: false,
  };
};
