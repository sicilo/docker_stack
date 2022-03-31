import { useEffect, useState } from 'react'
import './styles.scss'

type Props = {
    id: string,
    label: string,
    name: string,
    value: string,
    type?: string,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Input = ({
    id,
    label,
    name,
    onChange,
    value,
    type = "text"
}: Props): JSX.Element => {

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        // setValue(e.currentTarget.value)
        onChange(e)
    }

    // useEffect(()=>{},[value])

    return (
        <>
            <section className={'App-input ' + (type === 'file' ? '__file' : '')}>
                <label htmlFor={id}>{label}</label>
                <input
                    name={name}
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleOnChange} />
            </section>
        </>)
}