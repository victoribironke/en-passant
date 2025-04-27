export type PlayerData = {
  name: string;
  accuracy: number;
  stats: {
    brilliant: number;
    great: number;
    best: number;
    excellent: number;
    good: number;
    book: number;
    inaccuracy: number;
    mistake: number;
    miss: number;
    blunder: number;
  };
  rating: number;
};

export type ChesscomGame = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
  };
  black: {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
  };
};

export type Game = {
  pgn: string;
  positions: string[];
};
