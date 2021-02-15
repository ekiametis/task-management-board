import { useState, MouseEvent, KeyboardEvent, useEffect } from 'react';
import { Grid, Paper, IconButton, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import { Cards } from '../card/Card';
import { IColumnProps, IColumns } from './IColumn';
import { generateUniqueKey } from '../../util/Key';
import { useColumnStyles } from './ColumnStyles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ICardProps } from '../card/ICard';


export const Columns = (props: IColumns) => {

    const [ columns, setColumns ] = useState(new Array<IColumnProps>(0));

    useEffect(() => {
        setColumns(props.columns);
    });
    
    const onDragEnd = (result: DropResult): void => {
        const columnsClone = [...columns];
        if(result.destination) {
            if(result.source.droppableId === result.destination?.droppableId) {
                const columnIndex = parseInt(result.source.droppableId);
                const cardToMove = columnsClone[columnIndex].cards[result.source.index];
                columnsClone[columnIndex].cards = columnsClone[columnIndex].cards.filter(c => c.index !== result.source.index);
                columnsClone[columnIndex].cards.splice(result.destination.index, 0, cardToMove);
                setColumns(reorganizeCards(columnsClone));
            } else {
                const originColumnIndex = parseInt(result.source.droppableId);
                const destinationColumnIndex = parseInt(result.destination.droppableId);
                const cardToMove = columnsClone[originColumnIndex].cards[result.source.index];
                columnsClone[originColumnIndex].cards = columnsClone[originColumnIndex].cards.filter(c => c.index !== result.source.index);
                columnsClone[destinationColumnIndex].cards.splice(result.destination.index, 0, cardToMove);
                setColumns(reorganizeCards(columnsClone));
            }
        }
    }

    const reorganizeCards = (newColumns: Array<IColumnProps>): Array<IColumnProps> => {
        const result = newColumns.map((column, columnIndex) => {
            column.cards = column.cards.map((card, cardIndex) => ({...card, index: cardIndex, columnIndex: columnIndex }));
            return column;
        });
        return result;
    }

    const removeCard = (card: ICardProps): void => {
        const columnsClone = [...columns];
        columnsClone[card.columnIndex].cards = columnsClone[card.columnIndex].cards.filter(c => c.index !== card.index );
        setColumns(reorganizeCards(columnsClone));
    }

    const addNewCard = (card: ICardProps): void => {
        const columnsClone = [...columns];
        const cardExistent = columnsClone[card.columnIndex].cards[card.index];
        if(cardExistent) {
            columnsClone[card.columnIndex].cards = columnsClone[card.columnIndex].cards.filter(c => c.index !== card.index);
            columnsClone[card.columnIndex].cards.splice(card.index, 0, card);
        } else {
            columnsClone[card.columnIndex].cards.push(card);
        }
        setColumns(reorganizeCards(columnsClone));
    }
    
    return (
        <DragDropContext
            onDragEnd={onDragEnd}>
            <Grid container spacing={3}>
                {columns.map((column, index) => 
                    <Column 
                        key={column.uniqueKey} uniqueKey={column.uniqueKey} index={index} name={column.name} cards={column.cards} onCardAdded={addNewCard} onCardDeleted={removeCard}/>)}
            </Grid>
        </DragDropContext>
    );
}

export const Column = (props: IColumnProps) => {
    const [ name, setName ] = useState(props.name);
    const [ editColumnName, setEditColumnName ] = useState(false);
    const [ allowAddNewCard, setAllowAddNewCard ] = useState(true);
    const [ allowEditColumnName, setAllowEditColumnName ] = useState(false);
    const { onCardAdded, onCardDeleted } = props;
    const classes = useColumnStyles();

    const newCardAdded = (card: ICardProps): void => {
        if(onCardAdded){
            onCardAdded(card);
        }
        setAllowAddNewCard(true);
    }

    const removeCard = (index: number): void => {
        const card = props.cards.find((card) => index === card.index);
        if(onCardDeleted && card){
            onCardDeleted(card);
            setAllowAddNewCard(true);
        }
    }

    const addNewCard = (event: MouseEvent<HTMLButtonElement>): void => {
        if(allowAddNewCard && onCardAdded){
            const card: ICardProps = {
                uniqueKey: generateUniqueKey(),
                index: props.cards.length,
                columnIndex: props.index,
                onCardAdded: newCardAdded,
                onCardEdition: onCardEdit,
                onDelete: removeCard,
            }
            onCardAdded(card);
            setAllowAddNewCard(false);
        }
    }

    const onCardEdit = (): void => {
        setAllowAddNewCard(false);
    }

    const clickColumnName = (event: MouseEvent<HTMLButtonElement>): void => {
        setEditColumnName(true);
    }

    const updateColumnName = (event: KeyboardEvent<HTMLInputElement>): void => {
        if(event.key === 'Enter') {
            setName((event.target as HTMLInputElement).value);
            setEditColumnName(false);
        }
    }

    const handleColumnMouseEnter = () => {
        setAllowEditColumnName(true);
    }

    const handleColumnMouseLeave = () => {
        setAllowEditColumnName(false);
    }
    
    return (
        <Grid item xs={4}>
            <Paper id={props.index.toString()} elevation={3} className={classes.root}>
                { !editColumnName
                    ?
                        <h1 className={classes.columnName} onMouseEnter={handleColumnMouseEnter} onMouseLeave={handleColumnMouseLeave}>
                            {name}
                            {allowEditColumnName 
                                ? 
                                <IconButton aria-label="Edit column name" onClick={clickColumnName} className={classes.columnButton}>
                                    <CreateIcon />
                                </IconButton>
                                : null
                            }
                        </h1>
                    :
                        <h1>
                            <InputBase
                                defaultValue={name}
                                onKeyUp={updateColumnName}
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </h1>
                }
                <Cards 
                    cards={props.cards}
                    columnIndex={props.index}
                    onCardAdded={newCardAdded}
                    onCardEdition={onCardEdit}
                    onDelete={removeCard} />
                <IconButton aria-label="Add column" onClick={addNewCard} className={classes.anotherCard}>
                    <AddIcon/>
                    Add another card
                </IconButton>
            </Paper>
        </Grid>
    );
}