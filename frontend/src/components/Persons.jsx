const Person = ({personsToShow, handleDelete}) => {
    console.log('Persons', personsToShow)
    const label = "delete"
    return (
        <ul>
            {personsToShow.map(person =>
                <li className="person" key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person.id)}>{label}</button>
                </li>
            )}
        </ul>
    )
}

export default Person;