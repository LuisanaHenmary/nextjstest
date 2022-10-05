import { useCallback, useEffect, useState} from "react"

const Home = ({data}) => {

  const [mout, setMout] = useState(0)
  const symbols = data.symbols

  const currencyConversion = useCallback(async () => {
    const query = "USD_PHP";

    try {
      const resp = await fetch(`https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${data.key_curr}`)
      const info = await resp.json()
      setMout(info[query])

    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    currencyConversion()
  }, [currencyConversion]);


  return (
    <div>
      {mout}
      {Object.keys(symbols).map((key,index)=> <div key={index} >{`${symbols[key]} (${key})`}</div> )}
    </div>
  )
}

export async function getStaticProps() {
  try {
      const responce = await fetch(`http://data.fixer.io/api/symbols?access_key=${process.env.FIXER_KEY}`)
      const info = await responce.json()

      const data = {
        symbols: info.symbols,
        key_curr: process.env.CURR_CONV
      }

      return {
          props: {
              data
          }
      }
  }
  catch (error) {
      console.log(error)
  }

}

export default Home