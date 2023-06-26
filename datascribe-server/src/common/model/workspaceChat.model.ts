import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface WorkspaceChatAttributes {
  id: number;
  workspaceId: string;
  prompt: string;
  response: any;
  include: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface WorkspaceChatModel
  extends Model<WorkspaceChatAttributes>,
    WorkspaceChatAttributes {}

export type WorkspaceChatStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WorkspaceChatModel;
};

export function WorkspaceChatFactory(
  sequelize: Sequelize,
): WorkspaceChatStatic {
  return <WorkspaceChatStatic>sequelize.define(
    'workspaceChats',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      workspaceId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prompt: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      include: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    },
  );
}
