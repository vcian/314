import { dbConfig } from '../loaders/database';
import { DocumentVectorFactory } from './document.vectors.model';
import { UsersFactory } from './users.model';

import { WorkspaceFactory } from './workspace.model';
import { WorkspaceChatFactory } from './workspaceChat.model';
import { WorkspaceDocumentFactory } from './workspaceDocuments.model';

export const Workspace = WorkspaceFactory(dbConfig);
export const WorkspaceDocument = WorkspaceDocumentFactory(dbConfig);
export const DocumentVector = DocumentVectorFactory(dbConfig);
export const WorkspaceChat = WorkspaceChatFactory(dbConfig);
export const Users = UsersFactory(dbConfig);
