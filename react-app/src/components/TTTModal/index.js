import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./TTTModal.css";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { deleteProfileThunk } from "../../store/profiles";
import ProfileDeleteModal2 from "../ProfPageDeleteModal/index2";
import OpenModalButton from "../OpenModalButton";

function TTTModal({profileId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory()

  const [tile1, setTile1] = useState(null);
  const [tile2, setTile2] = useState(null);
  const [tile3, setTile3] = useState(null);
  const [tile4, setTile4] = useState(null);
  const [tile5, setTile5] = useState(null);
  const [tile6, setTile6] = useState(null);
  const [tile7, setTile7] = useState(null);
  const [tile8, setTile8] = useState(null);
  const [tile9, setTile9] = useState(null);
  const [currPlayer, setCurrPlayer] = useState("O");
  const [winner, setWinner] = useState(false);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resetValues = (e) => {
    e.preventDefault();

    setTile1(null);
    setTile2(null);
    setTile3(null);
    setTile4(null);
    setTile5(null);
    setTile6(null);
    setTile7(null);
    setTile8(null);
    setTile9(null);
  };

  const tilesArray = [
    tile1,
    tile2,
    tile3,
    tile4,
    tile5,
    tile6,
    tile7,
    tile8,
    tile9,
  ];

  const handleDelete = async (e) => {
    e.preventDefault()

    const deletedProfile = await dispatch(deleteProfileThunk(profileId))

    if (deletedProfile.message === 'delete successful') {
        history.push("/profiles/current");
        closeModal();
      };
}

let sweets = false

  useEffect(() => {
       for(let i = 0; i < winningConditions.length; i++) {
        let set = winningConditions[i]
        console.log(tilesArray[set[0]], tilesArray[set[1]] , tilesArray[set[2]], set[1])
        if(tilesArray[set[0]] === 'O' && tilesArray[set[1]] === 'O' && tilesArray[set[2]] === 'O') {
            setWinner(true)


        } else if (tilesArray[set[0]] === 'X' && tilesArray[set[1]] === 'X' && tilesArray[set[2]] === 'X') {
           setWinner(true)

        }
       }


   }, [dispatch, tilesArray])

   console.log('sweet stuff', sweets)

  const handleClick = (e) => {
    e.preventDefault();

    if (!tile1) {
      setTile1(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick2 = (e) => {
    e.preventDefault();

    if (!tile2) {
      setTile2(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick3 = (e) => {
    e.preventDefault();

    if (!tile3) {
      setTile3(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick4 = (e) => {
    e.preventDefault();

    if (!tile4) {
      setTile4(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick5 = (e) => {
    e.preventDefault();

    if (!tile5) {
      setTile5(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick6 = (e) => {
    e.preventDefault();

    if (!tile6) {
      setTile6(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick7 = (e) => {
    e.preventDefault();

    if (!tile7) {
      setTile7(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick8 = (e) => {
    e.preventDefault();

    if (!tile8) {
      setTile8(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };
  const handleClick9 = (e) => {
    e.preventDefault();

    if (!tile9) {
      setTile9(currPlayer);
      if (currPlayer === "X") {
        setCurrPlayer("O");
      } else {
        setCurrPlayer("X");
      }
    }
  };

  return (
    <div className="background">
      <section className="title">
        <h1 className="title">I smell a robot... <br/>
        prove, prove, prove to me you're not a robot... <br/>
        look mortal, if ye be... <br/>
        you must play the game till line makes three!</h1>
      </section>
      <section className="display">
        Player <span className="display-player playerX">{currPlayer}</span>'s turn
      </section>
      <section className="container">
        <button className="tile" id="one" onClick={handleClick} value={tile1}>
          {tile1}
        </button>
        <button className="tile" id="two" onClick={handleClick2} value={tile2}>
          {tile2}
        </button>
        <button className="tile" id="three" onClick={handleClick3} value={tile3}>
          {tile3}
        </button>
        <button className="tile" id="four" onClick={handleClick4} value={tile4}>
          {tile4}
        </button>
        <button className="tile" onClick={handleClick5} value={tile5}>
          {tile5}
        </button>
        <button className="tile" id="six" onClick={handleClick6} value={tile6}>
          {tile6}
        </button>
        <button className="tile" id="seven" onClick={handleClick7} value={tile7}>
          {tile7}
        </button>
        <button className="tile" id="eight" onClick={handleClick8} value={tile8}>
          {tile8}
        </button>
        <button className="tile" id="nine" onClick={handleClick9} value={tile9}>
          {tile9}
        </button>
      </section>
      <section className="display announcer hide"></section>
      <section className="controls">
        <button id="reset" onClick={resetValues}>
          Reset
        </button>
        <div>
        { winner && (
        <form onSubmit={handleDelete}>
                {/* <OpenModalButton buttonText={"delete"} className="confirm-profile-delete" modalComponent={<TTTModal profileId={profileId}/>}/> */}
                <button className="confirm-profile-delete" type="submit">Yes, delete my profile</button>
                <button className="decline-profile-delete" onClick={closeModal}>No, keep my profile</button>
            </form>
        )}
        </div>
      </section>
    </div>
  );
}

export default TTTModal;
