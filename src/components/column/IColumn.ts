import { ICardProps } from "../card/ICard";

export interface IColumnProps {
    uniqueKey: number;
    index: number;
    name: string;
    cards: Array<ICardProps>;
    onCardAdded?: (card: ICardProps) => void
    onCardDeleted?: (card: ICardProps) => void
}

export interface IColumns {
    columns: Array<IColumnProps>
}