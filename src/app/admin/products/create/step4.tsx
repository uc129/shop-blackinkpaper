import { ProductType } from "@/app/api/products/model";
import { FormContainer } from "@/app/components/form-components/form-container";
import React, { use, useEffect, useState } from "react";



type Step4Type = Partial<ProductType>

export const CreateProductStep4 = ({ retrieveProductDetails }: { retrieveProductDetails: (productDetails: Step4Type) => void }) => {

    const [step4Details, setStep4Details] = useState<Step4Type>({

        features: [
            {
                title: '',
                description: ''
            }
        ],
        tools: [
            {
                title: '',
                description: ''
            }
        ],
        notes: [
            {
                title: '',
                description: ''
            }
        ]
    })

    useEffect(() => {
        retrieveProductDetails(step4Details)
    }, [step4Details])


    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const index = parseInt(e.target.id)
        const updatedFeatures = step4Details.features!.map((feature, i) => {
            if (i === index) {
                return { ...feature, [name]: value }
            }
            return feature
        })

        setStep4Details({
            ...step4Details,
            features: updatedFeatures
        })
    }

    const handleAddFeature = (e: React.MouseEvent) => {
        e.preventDefault()
        setStep4Details({
            ...step4Details,
            features: [...step4Details.features!, { title: '', description: '' }]
        })
    }

    const handleToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const index = parseInt(e.target.id)
        const updatedTools = step4Details.tools!.map((tool, i) => {
            if (i === index) {
                return { ...tool, [name]: value }
            }
            return tool
        })

        setStep4Details({
            ...step4Details,
            tools: updatedTools
        })
    }



    const handleAddTool = (e: React.MouseEvent) => {
        e.preventDefault()

        setStep4Details({
            ...step4Details,
            tools: [...step4Details.tools!, { title: '', description: '' }]
        })
    }

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const index = parseInt(e.target.id)
        const updatedNotes = step4Details.notes!.map((note, i) => {
            if (i === index) {
                return { ...note, [name]: value }
            }
            return note
        })

        setStep4Details({
            ...step4Details,
            notes: updatedNotes
        })
    }

    const handleAddNote = (e: React.MouseEvent) => {
        e.preventDefault()
        setStep4Details({
            ...step4Details,
            notes: [...step4Details.notes!, { title: '', description: '' }]
        })
    }

    const handleRemoveFeature = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault()
        setStep4Details({
            ...step4Details,
            features: step4Details.features!.filter((_, i) => i !== index)
        })
    }

    const handleRemoveTool = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault()
        setStep4Details({
            ...step4Details,
            tools: step4Details.tools!.filter((_, i) => i !== index)
        })
    }

    const handleRemoveNote = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault()
        setStep4Details({
            ...step4Details,
            notes: step4Details.notes!.filter((_, i) => i !== index)
        })
    }





    return (
        <div>
            <FormContainer >
                <h1>Add Features</h1>
                <form>
                    {step4Details.features!.map((feature, index) => (
                        <div key={index}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id={index.toString()} value={feature.title} onChange={handleFeatureChange}
                            />
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" id={index.toString()} value={feature.description} onChange={handleFeatureChange} />
                            {step4Details.features?.length! > 1 &&
                                <button onClick={handleRemoveFeature(index)}> Remove Feature </button>}

                        </div>
                    ))}
                    <button onClick={handleAddFeature}>Add Feature</button>
                </form>


                <h1>Add Tools</h1>
                <form>
                    {step4Details.tools!.map((tool, index) => (
                        <div key={index}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id={index.toString()} value={tool.title}
                                onChange={handleToolChange}
                            />
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" id={index.toString()} value={tool.description}
                                onChange={handleToolChange}
                            />
                            {step4Details.tools?.length! > 1 &&
                                <button onClick={handleRemoveTool(index)}> Remove Tool </button>}
                        </div>
                    ))}
                    <button onClick={handleAddTool} >Add Tool</button>
                </form>


                <h1>Add Notes</h1>
                <form>
                    {step4Details.notes!.map((note, index) => (
                        <div key={index}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id={index.toString()} value={note.title}
                                onChange={handleNoteChange}
                            />
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" id={index.toString()} value={note.description}
                                onChange={handleNoteChange}
                            />
                            {step4Details.notes?.length! > 1 &&
                                <button onClick={handleRemoveNote(index)}> Remove Note </button>
                            }
                        </div>


                    ))}
                    <button onClick={handleAddNote} >Add Note</button>
                </form>
            </FormContainer>
        </div>
    )




}