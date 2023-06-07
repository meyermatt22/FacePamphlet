import React from 'react'
import "./MineSweeper.css"

export default function Cell({details,updateFlag, revealcell}) {
    const style={
        cellStyle:{
            width:40,height:40,backgroundColor:'grey',border:'1px solid white',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'20px',
            cursor: 'pointer',
        },
    }

    return (
        <div style={style.cellStyle} onClick={()=>{revealcell(details.x,details.y)}} onContextMenu={()=>{updateFlag(details.x,details.y)}}>
            {details.revealed && (details.value)}
            {!details.revealed && details.flagged && (<img className='flags' src='https://i.imgur.com/o5iOiHI.jpg' />)}
        </div>
    )
}
