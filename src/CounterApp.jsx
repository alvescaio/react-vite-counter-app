import { useState } from 'react';

export const CounterApp = () => {

    const storageTentativesArray = localStorage.getItem("tentatives") || '[]';
    const storageTentatives = JSON.parse(storageTentativesArray);
    const storageNumber = localStorage.getItem("number");
    
    const [ number, setNumber ] = useState(storageNumber === 'null' ? '': storageNumber);
    const [ whatsNumber, setWhatsNumber] = useState();
    const [showForm, setShowForm] = useState(!!storageTentatives?.length);
    const [tentatives, setTentatives] = useState(storageTentatives);

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

        localStorage.setItem('tentatives', JSON.stringify([...tentatives, {
            whatsNumber, ...counts, isCorrect
        }]));

        setTentatives([...tentatives, {
            whatsNumber, ...counts, isCorrect
        }]);

    }

    const reset = () => {
        localStorage.setItem("tentatives", '');
        localStorage.setItem("number", '');
        location.reload();
    }

    return (
        <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', padding: 10}}>
            {!showForm && (
                <>
                    <h1>WhatsNumber</h1>
                    <h2> { number } </h2>
                    <p>
                        Digite o número:
                    </p>
                    <div style={{display: 'flex'}}>
                        <input name="number" type='text' onChange={(e) => handleNumber(e?.target?.value)} />
                        <button onClick={() => save() }> Salvar </button>
                    </div>
                </>
            )}

            {!!showForm && (
                <>
                    <p>
                        Qual é o número:
                    </p>
                    <div style={{display:'flex'}}>
                        <input name="whatsNumber" type="text" onChange={(e) => setWhatsNumber(e?.target?.value)} />
                        <button onClick={() => chooseNumber()}>
                            Escolher
                        </button>
                    </div>

                    <div style={{display: 'flex', flexFlow: 'column', marginTop: 30}}>
                        {console.log(tentatives)}
                    {tentatives.map((el) => (
                        <div key={el.whatsNumber}>
                            {el.whatsNumber} - {el.countRight} corretos, {el.countPosRight} posição correta
                        </div>
                    ))}
                    </div>

                </>
            )}
            <button onClick={() => reset()} style={{marginTop: 30}}>reset</button>
        </div>
    );
}

