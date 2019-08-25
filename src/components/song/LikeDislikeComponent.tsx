import React from "react";
import {Button, Card} from "semantic-ui-react";
import {IUserInteraction, save} from "../../utils/localStorage";

interface ILike {
    liked: boolean | undefined;
    unique_id: string;
    setLiked(liked: boolean | undefined): void;
}

export const LikeDislikeComponent = ({liked, unique_id, setLiked}: ILike) => {
    const likeDislike = (interaction: IUserInteraction) => {
        let value: boolean | undefined = undefined;
        if( !(interaction.liked === liked )) {
            value = interaction.liked
        }
        setLiked(value);
        save(interaction);
    };

    return (
        <Card.Content extra>
            <div className="ui two buttons">
                <Button data-testid={"like-button"} basic={liked === false || liked === undefined}
                        onClick={() => likeDislike({unique_id, liked: true})}
                        color="green">
                    Like
                </Button>
                <Button data-testid={"dislike-button"} basic={liked === true || liked === undefined}
                        onClick={() => likeDislike({unique_id, liked: false})}
                        color="red">
                    Dislike
                </Button>
            </div>
        </Card.Content>
    );
};
