import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    else
        return (
            <div></div>
        );
}

function RenderComments({ comments, addComment, dishId}) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((cmt) => {
                        return (
                            <li key={cmt.id}>
                                <p>{cmt.comment}</p>
                                <p>--{cmt.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(cmt.date)))}</p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if(props.isLoading){
        return (
           <div className="container">
            <div className="row">
            <Loading />
            </div>
           </div>
        );
    } else if (props.errMess){
        return (
            <div className="container">
             <div className="row">
             <h4>{props.errMess}</h4>
             </div>
            </div>
         );  
    } else
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                     <RenderDish dish={props.dish} />
                     <RenderComments comments={props.comments}
                      addComment = {props.addComment} 
                       dishId={props.dish.id} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }


}


export default DishDetail;