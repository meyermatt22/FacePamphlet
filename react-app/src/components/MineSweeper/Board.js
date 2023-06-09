import React, { useState, useEffect } from "react";
import CreateBoard from "./CreateBoard";
import { revealed } from "./Reveal";
import Cell from "./Cell";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { deleteProfileThunk } from "../../store/profiles";
import ProfileDeleteModal2 from "../ProfPageDeleteModal";
import WinnerModal from "../WinnerModal";
import WinnerModal2 from "../WinnerModal/index2";
import WinnerModal3 from "../WinnerModal/index3";
import WinnerModal4 from "../WinnerModal/index4";
import WinnerModal5 from "../WinnerModal/index5";
import WinnerModal6 from "../WinnerModal/index6";
import WinnerModal7 from "../WinnerModal/index7";
import WinnerModal8 from "../WinnerModal/index8";


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
    // console.log("right - click");
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
      if(nonMinecount < 1) setWinner(true)
    }
  };
  if (!grid) return <h1>grid is missing</h1>;
  return (
    <div className="parent" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      {<WinnerModal score={nonMinecount} />}
      {<WinnerModal2 score={nonMinecount} />}
      {<WinnerModal3 score={nonMinecount} />}
      {<WinnerModal4 score={nonMinecount} />}
      {<WinnerModal5 score={nonMinecount} />}
      {<WinnerModal6 score={nonMinecount} />}
      {<WinnerModal7 score={nonMinecount} />}
      {<WinnerModal8 score={nonMinecount} />}
      <div style={{ color: "rgb(146, 229, 161)", textAlign: "center", fontSize: "35px" }}>
        Non-Bugs : {nonMinecount}
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
        <button className="confirm-profile-delete" type="submit">Yes, delete my profile</button>
        <button className="decline-profile-delete" onClick={closeModal}>No, keep my profile</button>
    </form>
      )}
    </div>
  );
}

export default Board;
