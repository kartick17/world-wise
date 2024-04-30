import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message='Add your first city' />

  let countries = cities.reduce((arr, el) => {
    const city = arr.find((country) => country?.country === el?.country)

    if (!city) return [...arr, { country: el.country, emoji: el.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList
