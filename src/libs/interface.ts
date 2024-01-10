export interface IPlayer {
  url?: any;
  muted?: boolean;
  playing?: boolean;
  isActive?: boolean;
  playerId?: string;
}

export interface IBottom extends IPlayer {
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom?: () => void;
}
