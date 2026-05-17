import { Link } from 'react-router-dom'
import { SiYoutube, SiX, SiInstagram, SiTiktok } from 'react-icons/si'

function SocialLinks({ youtube, twitter, instagram, tiktok }) {
  const links = [
    { url: youtube, Icon: SiYoutube, label: 'YouTube', color: '#FF0000' },
    { url: twitter, Icon: SiX, label: 'X (Twitter)', color: '#ffffff' },
    { url: instagram, Icon: SiInstagram, label: 'Instagram', color: '#E1306C' },
    { url: tiktok, Icon: SiTiktok, label: 'TikTok', color: '#69C9D0' },
  ].filter((l) => l.url)

  if (links.length === 0) return null

  return (
    <div className="socials">
      {links.map(({ url, Icon, label, color }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          style={{ color }}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

function Card({
  id,
  name,
  url,
  description,
  imageURL,
  youtube,
  twitter,
  instagram,
  tiktok,
}) {
  return (
    <article className="card">
      {imageURL ? (
        <img src={imageURL} alt={name} />
      ) : (
        <div className="card-placeholder" aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Visit channel
      </a>
      <SocialLinks
        youtube={youtube}
        twitter={twitter}
        instagram={instagram}
        tiktok={tiktok}
      />
      <div className="card-actions">
        <Link to={`/creator/${id}`}>
          <button>View</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </article>
  )
}

export default Card
