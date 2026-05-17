import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SiYoutube, SiX, SiInstagram, SiTiktok } from 'react-icons/si'
import { supabase } from '../clients.js'

function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()
      if (error) console.error(error)
      else setCreator(data)
    }
    fetchCreator()
  }, [id])

  if (!creator) return <p>Loading...</p>

  const socials = [
    { url: creator.youtube, Icon: SiYoutube, label: 'YouTube', color: '#FF0000' },
    { url: creator.twitter, Icon: SiX, label: 'X (Twitter)', color: '#ffffff' },
    { url: creator.instagram, Icon: SiInstagram, label: 'Instagram', color: '#E1306C' },
    { url: creator.tiktok, Icon: SiTiktok, label: 'TikTok', color: '#69C9D0' },
  ].filter((s) => s.url)

  return (
    <section className="form-page">
      <Link to="/" className="back-link">← Back to all creators</Link>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>

      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit channel
      </a>

      {socials.length > 0 && (
        <div className="socials view-socials">
          {socials.map(({ url, Icon, label, color }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              style={{ color }}
            >
              <Icon /> <span>{label}</span>
            </a>
          ))}
        </div>
      )}

      <div className="form-actions">
        <Link to={`/edit/${creator.id}`} role="button">
          Edit
        </Link>
      </div>
    </section>
  )
}

export default ViewCreator
