import React from 'react';

export default function BlogPostViewComments(props) {

    let callRef = React.createRef();
    let display = false;

    function showReplay() {

        if (display) {

            display = false;
            callRef.current.style.display = "none";
        }

        else {

            display = true;
            callRef.current.style.display = "block";
        }
    }

    function addReplay(e) {

        const replay = e[0].value;

        const confirm = window.confirm("Inappropriate posts will be deleted!\nAre you sure you want to continue?");

        if (confirm) {

            window.alert("Your replay was sent successfully!");
            window.location.reload();
        }
    }

    return (
        <div className="row">

            <div className="card text-white bg-secondary" style={{width: "49%"}}>
                <div className="card-header">{props.comment.id+1}. {props.comment.name}</div>
                <div className="card-body">
                    <p className="card-text">{props.comment.text}</p>
                </div>
                <div className="card-footer">
                    <small>February 17, 2021, 11:56</small>
                    <button className="btn btn-danger" onClick={() => showReplay()} style={{position: "relative", float: "right", fontStyle: "italic"}}><small>Replay</small></button>
                </div>
            </div>

            <div style={{width: "2%"}}></div>

            <div className="card" style={{width: "49%", display: "none"}} ref={callRef}>
                <form method="POST" onSubmit={e => { e.preventDefault(); addReplay(e.target) }}>
                    <div className="card-body form-floating">
                        <textarea className="form-control" id="floatingTextarea" style={{resize: "none"}} placeholder="Leave your replay here" name="comment" required></textarea>
                    </div>
                    <div className="card-footer" style={{textAlign: "right"}}>
                        <button className="btn btn-primary" style={{fontStyle: "italic"}}><small>Submit</small></button>
                    </div>
                </form>
            </div>

        </div>
    )
}
