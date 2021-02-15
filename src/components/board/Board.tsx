import { useState, useEffect } from 'react';
import { Columns } from '../column/Column';
import { IBoardProps } from './IBoard';
import { useBoardStyles } from './BoardStyles';
import { IColumnProps } from '../column/IColumn';
import { generateUniqueKey } from '../../util/Key';

const loadDefaultColumns = (): Array<Partial<IColumnProps>> => {
    const columns: Array<Partial<IColumnProps>> = [];
    columns.push({ uniqueKey: generateUniqueKey(), name: 'To Do', cards: []});
    columns.push({ uniqueKey: generateUniqueKey(), name: 'Doing', cards: []});
    columns.push({ uniqueKey: generateUniqueKey(), name: 'Done', cards: []});
    return columns;
}

export const Board = (props: IBoardProps) => {

    const [ columns, setColumns ] = useState(new Array(0));
    const classes = useBoardStyles();
    
    useEffect(() => { 
        setColumns(loadDefaultColumns());
    }, []);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{props.title.toUpperCase()}</h1>
            <Columns columns={columns} />
        </div>
    );
}