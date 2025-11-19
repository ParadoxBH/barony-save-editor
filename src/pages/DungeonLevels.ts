export type LevelMap = { [key: string]: Level };

export interface Level {
  level?: number;//Quando o mapa tem um andar especifico que aparece
  levels?: number[];//Quando o mapa tem varios andares que aparece
  level_range?: { min: number; max: number };//Quando o mapa se estende a varios andares 
  levels_range?: { min: number; max: number }[];//Quando o mapa se estende a varios andares em mais de um range
  secret?: boolean;// quando o mapa é acessado atravez de passagem secreta
  prob?: number;// quando o mapa tem chance de aparecer para o jogador
}

export const levels: LevelMap = {
  boss: { level: 20 },
  bram: { level: 34, secret: true },
  castle: { level: 9, secret: true },
  caves: { level_range: { min: 26, max: 29 } },
  cavetocitadel: { level: 30 },
  citadel: { level_range: { min: 31, max: 34 } },
  devil: { level: 24 },
  gnome: { level: 3, secret: true },
  hamlet: { level: 25 },
  hell: { level_range: { min: 21, max: 24 } },
  labtoruin: { level: 15 },
  labyrinth: { level_range: { min: 11, max: 14 } },
  lair: { level: 29, secret: true },
  library: { level: 17, secret: true },
  maze: { level: 14, secret: true },
  mines: { level_range: { min: 1, max: 4 } },
  minetoswamp: { level: 5 },
  minetown: { level: 4, secret: true, prob: 50 },
  ruin: { level_range: { min: 16, max: 19 } },
  sanctum: { level: 35 },
  sokoban: { level: 12, secret: true },
  start: { level: 0 },
  swamp: { level_range: { min: 6, max: 9 } },
  swamptolab: { level: 10 },
  temple: { level: 8, secret: true },
  underworld: { levels_range: [{min: 6, max: 7}, {min: 19, max: 20}], secret: true },
  unknown: {},// quando da erro na seleção de mapa é jogado para este mapa
};

export interface LevelList {
    name: string;
    secret: boolean;
    level_start: number;
    level_end: number;
    prob: number;
}


export function getLevelList(): LevelList[]
{
  const result: LevelList[] = [];

  for (const [name, levelData] of Object.entries(levels)) {
    const secret = levelData.secret ?? false;
    const prob = levelData.prob ?? 100;

    // Caso 1: level único
    if (levelData.level !== undefined) {
      result.push({
        name,
        secret,
        level_start: levelData.level,
        level_end: levelData.level,
        prob,
      });
    }
    // Caso 2: levels (array de níveis individuais)
    else if (levelData.levels && levelData.levels.length > 0) {
      const sortedLevels = [...levelData.levels].sort((a, b) => a - b);
      result.push({
        name,
        secret,
        level_start: sortedLevels[0],
        level_end: sortedLevels[sortedLevels.length - 1],
        prob,
      });
    }
    // Caso 3: level_range
    else if (levelData.level_range) {
      result.push({
        name,
        secret,
        level_start: levelData.level_range.min,
        level_end: levelData.level_range.max,
        prob,
      });
    }
    // Caso 4: levels_range (múltiplos ranges)
    else if (levelData.levels_range && levelData.levels_range.length > 0) {
      for (const range of levelData.levels_range) {
        result.push({
          name,
          secret,
          level_start: range.min,
          level_end: range.max,
          prob,
        });
      }
    }
    // Caso 5: sem informação de nível (como boss e unknown)
    /*
    else {
      result.push({
        name,
        secret,
        level_start: Infinity,
        level_end: Infinity,
        prob,
      });
    }*/
  }

  // Ordenação: primeiro por level_start, depois secret (false antes de true)
  result.sort((a, b) => {
    if (a.level_start !== b.level_start) {
      return a.level_start - b.level_start;
    }
    // Se level_start for igual, não-secreto vem antes
    return Number(a.secret) - Number(b.secret);
  });

  return result;
}