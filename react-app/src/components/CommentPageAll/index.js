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
