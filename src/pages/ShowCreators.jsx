import { supabase } from '../clients.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'

function ShowCreators() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select()
      if (error) console.error(error)
      else setCreators(data)
    }
    fetchCreators()
  }, [])

  return (
    <section id="all-creators">
      <header className="section-head">
        <h2>ALL CREATORS</h2>
      </header>
      {creators.length === 0 ? (
          <article className="empty-state">
            <h3>NO CREATORS YET 😞</h3>
          </article>
        ) : (
          <div className="creators">
            {creators.map((creator) => (
              <Card
                key={creator.id}
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
                youtube={creator.youtube}
                twitter={creator.twitter}
                instagram={creator.instagram}
                tiktok={creator.tiktok}
              />
            ))}
          </div>
        )}
    </section>
  )
}

export default ShowCreators
