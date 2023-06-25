import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface WorkspaceAttributes {
  id: number;
  name: string;
  vectorTag: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface WorkspaceModel
  extends Model<WorkspaceAttributes>,
    WorkspaceAttributes {}

export type WorkspaceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WorkspaceModel;
};

export function WorkspaceFactory(sequelize: Sequelize): WorkspaceStatic {
  return <WorkspaceStatic>sequelize.define(
    'workspaces',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vectorTag: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
}
