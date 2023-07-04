import React from 'react';
import { connect } from 'react-redux';
import { addComment, addReply, fetchComments } from '../../redux/actions/commentActions';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {useSelector} from "react-redux";

const CommentBoard = ({ postId, fetchComments, addComment, addReply }) => {

    const { authState } = useOktaAuth();
    useEffect(() => {
        fetchComments(postId, authState.accessToken.accessToken);
    }, [postId, fetchComments,authState]);

    const comments = useSelector(state => state.comments.comments);

    return (
        <div>
            {/*<h1>Comment Board</h1>*/}

            <div>
                {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={comment.user}
                        timestamp={comment.timestamp}
                        text={comment.text}
                        likes={comment.likes}
                        replies={comment.replies} // review
                    />
                ))
                    ) : (
                        <p>No comments yet</p>
                    )
                }
            </div>
            <CommentInput addComment={(text) => addComment(postId, text)} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = {
    addComment,
    addReply,
    fetchComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBoard);
