import { useState, useEffect } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    useEffect(() => {
        const sortedItems = [...props.initialData].sort((a, b) => {
            return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
        });
        setItems(sortedItems);
    }, [props.sorting, props.initialData]);

    const startEditing = (id: number, name: string) => {
        setEditingId(id);
        setEditValue(name);
    };

    const saveEditing = (id: number) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, name: editValue } : item
        ));
        setEditingId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
        if (e.key === 'Enter') {
            saveEditing(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {items.map(item => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                            onBlur={() => saveEditing(item.id)}
                            autoFocus
                        />
                    ) : (
                        <div 
                            onClick={() => startEditing(item.id, item.name)}
                            style={{ cursor: 'pointer', padding: '5px' }}
                        >
                            {item.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}