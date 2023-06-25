import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface DocumentVectorAttributes {
  id: number;
  docId: string;
  filename: string;
  docpath: string;
  workspaceId: string;
  metadata: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DocumentVectorModel
  extends Model<DocumentVectorAttributes>,
    DocumentVectorAttributes {}

export type DocumentVectorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DocumentVectorModel;
};

export function DocumentVectorFactory(
  sequelize: Sequelize,
): DocumentVectorStatic {
  return <DocumentVectorStatic>sequelize.define(
    'documentVectors',
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
      vectorId: { type: DataTypes.TEXT },
    },
    {
      timestamps: true,
    },
  );
}
