import { AppSocket } from "./App";
import { PlayerId } from "gameshow-lib/Types";

export interface BasicManager {
    registerSocket: (socket: AppSocket, uuid: PlayerId) => void;
    unregisterSocket: (Socket: AppSocket, uuid: PlayerId) => void;
}