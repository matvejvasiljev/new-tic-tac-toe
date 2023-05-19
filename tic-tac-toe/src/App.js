import './App.css';
import { useState, useRef, useEffect } from "react"

function Square({ value, onSquareClick }) {
    const b = useRef(null)
    const [height, setHeight] = useState(0)
    useEffect(() => {
        setHeight(b.current.offsetWidth)
    })
    return (
        <button onClick={onSquareClick} ref={b} style={{ height: height + "px" }} className={value !== null ? "pressedButton" : ""}>{value}</button>
    )
}

export default function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [player, setPlayer] = useState("X")
    const [info, setInfo] = useState("Next player: ")

    function checkWin() {
        let winPos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ]
        for (let i of winPos) {
            // if (squares[i[0]] === player && squares[i[1]] === player && squares[i[2]] === player) {
            //     console.log("Player " + player + " won!");
            // }
            const [a, b, c] = i
            // if (!squares.includes(null)) {
            //     console.log("It's a draw");
            // }
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log("Player " + squares[a] + " won!");
                return squares[a]
            }
        }
        return null
    }

    function handleClick(id) {
        // console.log(id);
        let newSquares = squares.slice()
        newSquares[id] = player
        setSquares(newSquares)
        setPlayer(player === "X" ? "O" : "X")
    }

    function handleRestart() {
        setSquares(Array(9).fill(null))
        setPlayer("X")
    }

    // useEffect(() => {
    //     checkWin()
    // }, [squares])

    let winner = checkWin()

    // if (winner) {
    //     setInfo("Winner: ")
    // }

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <p>{winner ? "Winner: " + winner : !squares.includes(null) ? "Draw" : "Next player: " + player} </p>
            <button id="restartButton" onClick={() => handleRestart()}>
                <img src="../restart.svg" alt="" />
            </button>
            <div className="buttons" style={winner ? { pointerEvents: "none" } : { pointerEvents: "auto" } }>
                {squares.map((element, id) => (
                    <Square value={element} key={id} onSquareClick={() => handleClick(id)}></Square>
                ))}
            </div>
            <div className="sideMenu">
                <div className="customPlayerA">
                    <button>X</button>
                    <ul>
                        <li>X</li>
                        <li>O</li>
                        <li>🐶</li>
                        <li>🍀</li>
                        <li>💡</li>
                    </ul>
                </div>
                <div className="customPlayerB">
                    <button>O</button>
                    <ul>
                        <li>X</li>
                        <li>O</li>
                        <li>🐶</li>
                        <li>🍀</li>
                        <li>💡</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

// Restart button

// export default function Button() {
//   const [click, setClick] = useState(0)
//   return(
//     <div className="game">
//     <h1>Clicks: {click}</h1>
//     <button onClick={() => setClick(click + 1)}>Click!</button>
//     </div>
//   )
// }