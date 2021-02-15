import { useState, MouseEvent, KeyboardEvent, ReactElement } from 'react';
import { Grid, InputBase, Container, Button, ButtonGroup } from '@material-ui/core';
import { ICardProps, ICards } from './ICard';
import { useCardStyles } from './CardStyles';
import { Droppable, DroppableProvided, Draggable, DraggableProvided } from 'react-beautiful-dnd';

export const Cards = (props: ICards) => {
    return (
        <Droppable droppableId={props.columnIndex.toString()}>
            {(provided: DroppableProvided): ReactElement<HTMLElement> => {
                return (
                    <Grid
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}>
                            {props.cards.map((card: ICardProps, index: number) => {
                                return <Card
                                        key={card.uniqueKey}
                                        uniqueKey={card.uniqueKey}
                                        index={index}
                                        description={card.description}
                                        columnIndex={props.columnIndex}
                                        onCardAdded={props.onCardAdded}
                                        onCardEdition={props.onCardEdition}
                                        onDelete={props.onDelete}
                                    />;
                            })}
                            {provided.placeholder}
                    </Grid>
                )
            }}
        </Droppable>
    )
}

export const Card = (props: ICardProps) => {
    const [ description, setDescription ] = useState(props.description || '');
    const [ editDescription, setEditDescription ] = useState(props.description ? false : true);
    const { onCardAdded, onCardEdition, onDelete } = props;
    const classes = useCardStyles();

    const updateDescription = (event: KeyboardEvent<HTMLInputElement>): void => {
        setDescription((event.target as HTMLInputElement).value);
        if(event.key === 'Enter') {
            saveDescription();
        }
    }

    const saveDescription = (event?: MouseEvent<HTMLButtonElement>): void => {
        if(onCardAdded){
            onCardAdded({...props, description});
        }
        setEditDescription(false);
    }

    const onClickEdition = () => {
        if(onCardEdition) {
            onCardEdition();
        }
        setEditDescription(true);
    }

    const deleteCard = () => {
        if(onDelete) {
            onDelete(props.index);
        }
    }

    return (
        <Draggable draggableId={props.uniqueKey.toString()} index={props.index}>
            {(provided: DraggableProvided): ReactElement<HTMLElement> => {
                return (
                    <Grid
                        className={classes.root}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}>
                        <Grid id={`${props.columnIndex}.${props.index}`} item xs className={classes.grid} onClick={onClickEdition}>
                            {editDescription
                                ?
                                    <div>
                                        <InputBase
                                            defaultValue={description}
                                            onKeyUp={updateDescription}
                                            inputProps={{ 'aria-label': 'naked' }}
                                        />
                                    </div>
                                :
                                    <Container fixed>
                                        {description}
                                    </Container>
                            }
                        </Grid>
                        {editDescription
                            ?
                                <ButtonGroup color="default" variant="contained" aria-label="outlined primary button group">
                                    <Button onClick={saveDescription}>Save</Button>
                                    <Button onClick={deleteCard}>Delete</Button>
                                </ButtonGroup>
                            :
                                null
                        }
                    </Grid>
                );
            }}
        </Draggable>
    );
}