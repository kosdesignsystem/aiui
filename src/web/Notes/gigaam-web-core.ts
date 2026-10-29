export type TokenConfig = { pieces: string[]; blank: number; model: string; sampleRate: number };
export function decodeCTC(ids: ArrayLike<number | bigint>, length: number, config: TokenConfig): string {
  const pieces: string[] = [];
  let previous = -1;
  for (let index = 0; index < Math.min(length, ids.length); index++) {
    const id = Number(ids[index]);
    if (id !== previous && id !== config.blank && id >= 0 && id < config.pieces.length) {
      const piece = config.pieces[id];
      if (!/^<.*>$/.test(piece)) pieces.push(piece);
    }
    previous = id;
  }
  return pieces.join('').replace(/▁/g, ' ').trim();
}
