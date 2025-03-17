import calculateWinner from '../utils/calculateWinner'; // 🔹 勝者を判定する関数
import Square from './Square'; // 🔹 1つのマスを表すコンポーネント

export default function Board({ xIsNext, squares, onPlay }) {
  /**
   * 🛠️ `handleClick`
   * マス目がクリックされたときの処理
   * - すでに埋まっている場合 or 勝者が決まっている場合は何もしない
   * - クリックされたマスに `X` または `O` をセット
   * - `onPlay` を呼び出して、更新後の `squares` を親コンポーネントに渡す
   */
  const handleClick = (i) => {
    // すでに埋まっているマス or 勝敗が決まっていたら何もしない
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // 現在の盤面をコピーして新しい配列を作成（不変性を保つ）
    const nextSquares = squares.slice();

    // `X` か `O` を配置（ターンによって決まる）
    nextSquares[i] = xIsNext ? "X" : "O";

    // 更新後の `squares` を `onPlay` を通じて親コンポーネントへ渡す
    onPlay(nextSquares);
  };

  /**
   * 🏆 勝者の判定
   * `calculateWinner(squares)` を使って、現在の盤面の勝者をチェック
   */
  const winner = calculateWinner(squares);

  /**
   * 📝 ステータスメッセージの決定
   * - 勝者がいる場合 → "Winner: X" または "Winner: O"
   * - まだ勝負がついていない場合 → "Next player: X" または "Next player: O"
   */
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {/* 🔹 勝者 or 次のプレイヤーの表示 */}
      <div className="status">{status}</div>

      {/* 🔹 3×3 のマス目を表示（`Square` コンポーネントを使う） */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
