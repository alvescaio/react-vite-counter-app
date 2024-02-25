import { useState } from 'react';
import PropTypes from 'prop-types';

export const CounterApp = () => {
    
    const [ number, setNumber ] = useState('');
    const [ whatsNumber, setWhatsNumber] = useState()
    const [showForm, setShowForm] = useState(false);
    const [tentatives, setTentatives] = useState([])

    const handleNumber = (value) => { 
        // console.log(event)
        setNumber(value);
        // setCounter( (c) => c + 1 )
    }

    const save = () => {
        localStorage.setItem("number", number);
        setShowForm(true);
    }

    const chooseNumber = () => {
        const counts = [...number].reduce((acc, cur, index) => {
            if(whatsNumber.indexOf(cur) > -1) {
                acc.countRight = acc.countRight + 1;
                if(whatsNumber.indexOf(cur) === index)
                    acc.countPosRight = acc.countPosRight + 1;
            }
            return acc;
        }, {countRight: 0, countPosRight: 0});

        const isCorrect = counts.countPosRight === 4 && counts.countRight === 4; 

        setTentatives([...tentatives, {
            whatsNumber, ...counts, isCorrect
        }])
    }

    return (
        <>
            {!showForm && (
                <>
                    <h1>WhatsNumber</h1>
                    <h2> { number } </h2>
                    <label>
                        Digite o número:
                        <br />
                        <input name="number" type='text' onChange={(e) => handleNumber(e?.target?.value)} />
                    </label>
                    <button onClick={() => save() }> Salvar </button>
                </>
            )}

            {!!showForm && (
                <>
                    <label>
                        Qual é o número:
                        <br/>
                        <input name="whatsNumber" type="text" onChange={(e) => setWhatsNumber(e?.target?.value)} />
                        <button onClick={() => chooseNumber()}>
                            Escolher
                        </button>
                    </label>

                    <br/>

                    <div style={{display: 'flex', flexFlow: 'column', marginTop: 30}}>
                    {tentatives.map((el) => (
                        <div key={el.whatsNumber}>
                            {el.whatsNumber} - {el.countRight} corretos, {el.countPosRight} posição correta
                        </div>
                    ))}
                    </div>
                </>
            )}
        </>
    );
}

