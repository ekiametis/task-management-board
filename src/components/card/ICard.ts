export interface ICardProps {
    uniqueKey: number;
    index: number;
    columnIndex: number;
    description?: string;
    onCardAdded?: (card: ICardProps) => void;
    onCardEdition?: () => void;
    onDelete?: (index: number) => void;
}

export interface ICards {
    cards: Array<ICardProps>;
    columnIndex: number;
    onCardAdded?: (card: ICardProps) => void;
    onCardEdition?: () => void;
    onDelete?: (index: number) => void;
}