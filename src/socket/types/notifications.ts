type Notification<T> = {
  data: T;
  sender: string;
};

type NotificationAsString = Notification<string>;

type NotificationFromPlayer = Notification<{
  item: unknown;
  player: Player;
}>;

type Player = {
  playerid: number;
  speed: number;
};

type PlayerSeek = Player & {
  seekoffset: Time;
  time: Time;
};

type Time = {
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
};

type PlaylistOnAdd = Notification<{
  item: unknown;
  playlistid: number;
  position: number;
}>;

type PlaylistOnClear = Notification<{
  playlistid: number;
}>;

type PlaylistOnRemove = Notification<{
  playlistid: number;
  position: number;
}>;

type OnExport = Notification<{
  failcount: number;
  file: string;
}>;

type OnInputRequested = Notification<{
  title: string;
  type: string;
  value: string;
}>;

type OnPropertyChanged = Notification<{
  player: Player;
  value: unknown;
}>;

type OnRemove = Notification<{
  id: string | number;
  transaction?: boolean;
  type: string;
}>;

type OnScreensaverDeactivated = Notification<{
  shuttingdown: boolean;
}>;

type OnSeek = Notification<{
  item: unknown;
  player: PlayerSeek;
}>;

type OnQuit = Notification<{
  exitcode: number;
}>;

type OnUpdate = Notification<{
  added: boolean;
  id: string | number;
  transaction?: boolean;
  type: string;
}>;

type OnVolumeChange = Notification<{
  muted: boolean;
  volume: number;
}>;

export type NotificationMap = {
  "Application.OnVolumeChange": OnVolumeChange;

  "AudioLibrary.OnCleanFinished": NotificationAsString;
  "AudioLibrary.OnCleanStarted": NotificationAsString;
  "AudioLibrary.OnExport": OnExport;
  "AudioLibrary.OnRemove": OnRemove;
  "AudioLibrary.ScanFinished": NotificationAsString;
  "AudioLibrary.OnScanStarted": NotificationAsString;
  "AudioLibrary.OnUpdate": OnUpdate;

  "GUI.OnDPMSActivated": NotificationAsString;
  "GUI.OnDPMSDeactivated": NotificationAsString;
  "GUI.OnScreensaverActivated": NotificationAsString;
  "GUI.OnScreensaverDeactivated": OnScreensaverDeactivated;

  "Input.OnInputFinished": NotificationAsString;
  "Input.OnInputRequested": OnInputRequested;

  "Player.OnAVChange": NotificationFromPlayer;
  "Player.OnAVStart": NotificationFromPlayer;
  "Player.OnPause": NotificationFromPlayer;
  "Player.OnPlay": NotificationFromPlayer;
  "Player.OnPropertyChanged": OnPropertyChanged;
  "Player.OnResume": NotificationFromPlayer;
  "Player.OnSeek": OnSeek;
  "Player.OnSpeedChanged": NotificationFromPlayer;
  "Player.OnStop": NotificationFromPlayer;

  "Playlist.OnAdd": PlaylistOnAdd;
  "Playlist.OnClear": PlaylistOnClear;
  "Playlist.OnRemove": PlaylistOnRemove;

  "System.OnLowBattery": NotificationAsString;
  "System.OnQuit": OnQuit;
  "System.OnRestart": NotificationAsString;
  "System.OnSleep": NotificationAsString;
  "System.OnWake": NotificationAsString;

  "VideoLibrary.OnCleanFinished": NotificationAsString;
  "VideoLibrary.OnCleanStarted": NotificationAsString;
  "VideoLibrary.OnExport": OnExport;
  "VideoLibrary.OnRefresh": NotificationAsString;
  "VideoLibrary.OnRemove": OnRemove;
  "VideoLibrary.ScanFinished": NotificationAsString;
  "VideoLibrary.OnScanStarted": NotificationAsString;
  "VideoLibrary.OnUpdate": OnUpdate;
};
