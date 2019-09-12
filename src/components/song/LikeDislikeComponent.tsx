import React from "react";
import {Button, Card} from "semantic-ui-react";
import {IUserInteraction, save} from "../../utils/localStorage";

interface ILike {
    liked: boolean | undefined;
    id: number;
    setLiked(liked: boolean | undefined): void;
}

export const LikeDislikeComponent = ({liked, id, setLiked}: ILike) => {
    const likeDislike = (interaction: IUserInteraction) => {
        let value: boolean | undefined;
        if ( !(interaction.liked === liked )) {
            value = interaction.liked;
        }
        setLiked(value);
        save(interaction);
    }
    return (
        <Card.Content extra>
            <div className="ui two buttons">
                <Button data-testid={"like-button"} basic={liked === false || liked === undefined}
                        onClick={() => likeDislike({id, liked: true})}
                        color="green">
                    Like
                </Button>
                <Button data-testid={"dislike-button"} basic={liked === true || liked === undefined}
                        onClick={() => likeDislike({id, liked: false})}
                        color="red">
                    Dislike
                </Button>
            </div>
        </Card.Content>
    );
};
