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