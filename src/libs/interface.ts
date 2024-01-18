import { ReactNode } from "react";

export interface IPlayer {
  url?: any;
  muted?: boolean;
  playing?: boolean;
  isActive?: boolean;
  playerId?: string;
  username?:string;
  color?:string;
}

export interface IBottom extends IPlayer {
  toggleAudio?: () => void;
  toggleVideo?: () => void;
  leaveRoom?: () => void;
}

export interface ICopySection {
  roomId?:string;
}

export interface ILayout {
  children: ReactNode;
}

export interface IAvatar {
  text:string;
  className?:string;
  color?:string;
}

export interface IUser {
  username?:string;
  userId:string;
}
