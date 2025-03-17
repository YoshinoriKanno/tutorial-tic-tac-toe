import { useState } from 'react';
import Board from "./Board";

export default function Game() {
  // 🔹 履歴を管理する state
  // ゲームのすべての盤面（過去の状態を含む）を `history` に保存
  // 初期値は 9 個の `null` が入った配列
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // 🔹 現在の手数（何手目か）を管理する state
  // 0 から始まり、プレイヤーが動くたびに増える
  const [currentMove, setCurrentMove] = useState(0);

  // 🔹 次のプレイヤーを判定（偶数なら 'X'、奇数なら 'O'）
  const xIsNext = currentMove % 2 === 0;

  // 🔹 `history` から現在の盤面を取得
  const currentSquares = history[currentMove];

  /**
   * 🛠️ `handlePlay`
   * 1. `nextSquares`（次の盤面）を `history` に追加
   * 2. `currentMove` を更新して最新の盤面を表示
   */
  function handlePlay(nextSquares) {
    // 🔹 `history` の現在の手までを取得（未来の履歴を削除）
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // 🔹 履歴を更新（新しい `history` を保存）
    setHistory(nextHistory);

    // 🔹 `currentMove` を更新し、最新の盤面を表示
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * 🛠️ `jumpTo`
   * 指定した手に移動（過去の状態に戻る）
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // 🔹 `currentMove` を更新
  }

  /**
   * 🔄 過去の手に戻るボタンリストを作成
   */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`; // 例: "Go to move #3"
    } else {
      description = "Go to game start"; // 最初の手に戻る
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* 🔹 盤面（Board コンポーネント） */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      {/* 🔹 ゲームの履歴（過去の手に戻るボタン） */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
