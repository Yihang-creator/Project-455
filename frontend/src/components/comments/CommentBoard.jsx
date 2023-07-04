import React from 'react';
import { connect } from 'react-redux';
import { addComment, addReply, fetchComments } from '../../redux/actions/commentActions';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {useSelector} from "react-redux";

const CommentBoard = ({ postId, fetchComments, addComment, addReply }) => {

    const { oktaAuth } = useOktaAuth();
    useEffect(() => {
        fetchComments(postId, oktaAuth.getAccessToken());
    }, [postId, fetchComments, oktaAuth]);

    const comments = useSelector(state => state.comments.comments);

    return (
        <div>
            {/*<h1>Comment Board</h1>*/}
            <div>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={comment.user}
                        timestamp={comment.timestamp}
                        text={comment.text}
                        likes={comment.likes}
                        replies={comment.replies} // review
                    />
                ))}
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
