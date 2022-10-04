const Home = ({data}) => {
  return (
    <div>
      test
      {Object.keys(data).map((key,index)=> <div key={index} >{`${data[key]} (${key})`}</div> )}
    </div>
  )
}

export async function getStaticProps() {
  try {
      const responce = await fetch(`http://data.fixer.io/api/symbols?access_key=${process.env.FIXER_KEY}`)
      const info = await responce.json()
      const data = info.symbols
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