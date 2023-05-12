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
    const [player, setPlayer] = useState("O")

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
        console.log(player);
        for (let i of winPos) {
            if (squares[i[0]] === player && squares[i[1]] === player && squares[i[2]] === player) {
                console.log("Player " + player + " won!");
            }
        }
        setPlayer(player === "X" ? "O" : "X")
    }

    function handleClick(id) {
        // console.log(id);
        let newSquares = squares.slice()
        newSquares[id] = player
        setSquares(newSquares)
    }

    useEffect(() => {
        checkWin()
    }, [squares])

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <p>Next player: {player}</p>
            {squares.map((element, id) => (
                <Square value={element} key={id} onSquareClick={() => handleClick(id)}></Square>
            ))}
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