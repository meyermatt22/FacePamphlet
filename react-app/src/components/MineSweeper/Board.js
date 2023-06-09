import React, { useState, useEffect } from "react";
import CreateBoard from "./CreateBoard";
import { revealed } from "./Reveal";
import Cell from "./Cell";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { deleteProfileThunk } from "../../store/profiles";

function Board({ profileId}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);
  const [winner, setWinner] = useState(false);
  const { closeModal } = useModal();

  console.log("inside board, grid content, ", grid);

  const handleDelete = async (e) => {
    e.preventDefault();

    const deletedProfile = await dispatch(deleteProfileThunk(profileId));

    if (deletedProfile.message === "delete successful") {
      history.push("/profiles/current");
      closeModal();
    }
  };

  const style = {
    display: "flex",
    flexDirection: "row",
  };
  useEffect(() => {
    const freshBoard = () => {
      const newBoard = CreateBoard(10, 10, 20);
      setNonMinecount(10 * 10 - 20);
      // console.log(newBoard.mineLocation);
      setmineLocation(newBoard.mineLocation);
      setGrid(newBoard.board);
    };
    freshBoard();
  }, []);

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    // deep copy of the object
    console.log("right - click");
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    console.log(newGrid[x][y]);
    setGrid(newGrid);
  };

  const revealcell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      alert("you lose! you get nothing!");
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
      }
      setGrid(newGrid);
    } else {
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
  };
  if (!grid) return <h1>grid is missing</h1>;
  return (
    <div className="parent">
      <h1>look here</h1>
      <div style={{ color: "white", textAlign: "center", fontSize: "35px" }}>
        Non-Mines : {nonMinecount}
      </div>
      <div>
        {grid.map((singlerow, index1) => {
          return (
            <div style={style} key={index1}>
              {singlerow.map((singlecol, index2) => {
                return (
                  <Cell
                    details={singlecol}
                    key={index2}
                    revealcell={revealcell}
                    updateFlag={updateFlag}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {winner && (
        <form onSubmit={handleDelete}>
          {/* <OpenModalButton buttonText={"delete"} className="confirm-profile-delete" modalComponent={<TTTModal profileId={profileId}/>}/> */}
          <OpenModalButton
            buttonText={"Yes, delete my profile"}
            className="confirm-profile-delete2"
            modalComponent={<Board />}
          />
          <button className="decline-profile-delete" onClick={closeModal}>
            No, keep my profile
          </button>
        </form>
      )}
    </div>
  );
}

export default Board;
