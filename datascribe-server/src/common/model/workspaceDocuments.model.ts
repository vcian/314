import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface WorkspaceDocumentAttributes {
  id: number;
  docId: string;
  filename: string;
  docpath: string;
  workspaceId: number;
  metadata: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface WorkspaceDocumentModel
  extends Model<WorkspaceDocumentAttributes>,
    WorkspaceDocumentAttributes {}

export type WorkspaceDocumentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WorkspaceDocumentModel;
};

export function WorkspaceDocumentFactory(
  sequelize: Sequelize,
): WorkspaceDocumentStatic {
  return <WorkspaceDocumentStatic>sequelize.define(
    'workspaceDocument',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      docId: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      docpath: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      workspaceId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      filename: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true },
  );
}
