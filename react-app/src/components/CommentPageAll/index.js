import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCommentsThunk } from "../../store/comment";
import { useHistory } from "react-router-dom";

function AllComments() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllCommentsThunk())
    }, [dispatch]);

    const comments = useSelector(state => Object.values(state.comments))

    console.log('inside all comments area : ', comments)

    // if(comments.length < 1) return <h1>Where have all the comments gone?</h1>

    return (
        <div id="allComments">
            <h1>All comments page</h1>
            <div>
                {comments?.map(({textContent}) => (
                    <div>
                        {textContent}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllComments;
