import bcrypt from "bcryptjs";
import {
    BuildOptions, DataTypes, Model, Sequelize,
} from "sequelize";
// import { edexaEncrypt, edexaDcrypt } from "./Utils";
import config from "../../common/config";

const SALT_WORK_FACTOR = 10;

export interface UsersAttributes {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    profilePic: string;
    token: string;
    isActive: boolean; // Active: 1, InActive: 0 ==== using for suspending user
    isDelete: boolean;
    isEmailVerified: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UsersModel extends Model<UsersAttributes>, UsersAttributes { }


export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UsersModel;
};

export function UsersFactory(sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // 0 - male, 1 - female, 2 - binary
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        token: {
            type: DataTypes.STRING(1234),
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // true active
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // true active
        },
        isEmailVerified: {
            type: DataTypes.INTEGER,
            defaultValue: 1, // 0 - pending, 1 - approved, 2 - reject
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    });
}
