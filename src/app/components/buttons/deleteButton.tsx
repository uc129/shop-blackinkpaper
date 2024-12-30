'use client'

import { useState } from "react";



export const DeleteButton = ({ deleteFunction }: { deleteFunction: () => void }) => {


    const [clicked, setClicked] = useState(false);

    if (clicked) {
        return (
            <div>
                <button onClick={() => deleteFunction()}>Confirm</button>
                <button onClick={() => setClicked(!clicked)}>Cancel</button>
            </div>
        )
    }

    else
        return (
            <button onClick={() => setClicked(!clicked)}>{clicked ? 'Cancel' : 'Delete'}</button>
        )
}