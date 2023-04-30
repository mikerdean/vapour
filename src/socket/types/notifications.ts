type Notification<T> = {
  data: T;
  sender: string;
};

type NotificationAsString = Notification<string>;

type NotificationFromPlayer = Notification<{
  item: unknown;
  player: {
    playerid: number;
    speed: number;
  };
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

type OnRemove = Notification<{
  id: string | number;
  transaction?: boolean;
  type: string;
}>;

type OnScreensaverDeactivated = Notification<{
  shuttingdown: boolean;
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
  // "Player.OnPropertyChanged"
  "Player.OnResume": NotificationFromPlayer;
  // "Player.OnSeek"
  "Player.OnSpeedChanged": NotificationFromPlayer;
  "Player.OnStop": NotificationFromPlayer;
};
