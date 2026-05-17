export type Workspace = {
  id: number;
  name: string;
  type: 'DESK' | 'CONFERENCE_ROOM';
  pricePerHour: number;
};

export const mockWorkspaces: Workspace[] = [
  { id: 1, name: 'Biurko 1', type: 'DESK', pricePerHour: 15.0 },
  { id: 2, name: 'Biurko 2', type: 'DESK', pricePerHour: 15.0 },
  { id: 3, name: 'Sala Konferencyjna 1', type: 'CONFERENCE_ROOM', pricePerHour: 120.0 },
  { id: 4, name: 'Sala Konferencyjna 2', type: 'CONFERENCE_ROOM', pricePerHour: 80.0 },
];

export type Login = {
  id: number;
  name: string;
  password: string;
  log: boolean;
};

export const mockLogin: Login[] = [
  { id: 0, name: '', password: '' ,log:false},
  { id: 1, name: 'Admin', password: 'Admin' ,log:true},
  { id: 2, name: 'Bartek', password: 'Drogosz2004' ,log:true},
];
