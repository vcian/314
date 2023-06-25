import { v4 as uuidv4 } from 'uuid';
import Container from "typedi";
import { WorkspaceDocument } from '../../common/model';
import { fileData } from '../../common/utils/helper';
import { getVectorDbClass } from '../../common/vectorDb';

export default class IWorkspaceDocument {
  static async addDocuments(workspace, additions = []) {
    try {
      const tokenData: any = Container.get('auth-token');

      const VectorDb = getVectorDbClass();
      if (additions.length === 0) return false;
      for (const path of additions) {
        const data = await fileData(path);
        if (!data) continue;
        const docId = uuidv4();
        const { pageContent, ...metadata } = data;
        const newDoc = {
          docId,
          filename: path.split('/')[1],
          docpath: path,
          workspaceId: Number(workspace.id),
          metadata: JSON.stringify(metadata),
        };
        const vectorized = await VectorDb.addDocumentToNamespace(
          workspace.slug,
          { ...data, docId },
          path,
        );
        if (!vectorized) {
          console.error('Failed to vectorizefff', path);
          continue;
        }
        console.log({ newDoc });
        await WorkspaceDocument.create(newDoc);
      }
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }
  static async removeDocuments(workspace, removals = []) {
    const VectorDb = getVectorDbClass();

    if (removals.length === 0) return;

    for (const path of removals) {
      const document = await WorkspaceDocument.findOne({
        where: { docpath: path, workspaceId: workspace.id },
      });
      if (!document) continue;
      await VectorDb.deleteDocumentFromNamespace(
        workspace.slug,
        document.docId,
      );
      await WorkspaceDocument.destroy({
        where: { docpath: path, workspaceId: workspace.id },
      });
    }

    return true;
  }
}
