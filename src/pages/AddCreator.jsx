import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiYoutube, SiX, SiInstagram, SiTiktok } from 'react-icons/si'
import { supabase } from '../clients.js'

function AddCreator() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [youtube, setYoutube] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase
      .from('creators')
      .insert([
        {
          name,
          url,
          description,
          imageURL,
          youtube: youtube || null,
          twitter: twitter || null,
          instagram: instagram || null,
          tiktok: tiktok || null,
        },
      ])
    setSubmitting(false)
    if (error) console.error(error)
    else navigate('/')
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">← Back to all creators</Link>
      <header className="section-head">
        <h2>Add a new creator</h2>
        <p>Share someone worth following with the community.</p>
      </header>

      <article>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="e.g. Marques Brownlee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            URL
            <input
              type="url"
              placeholder="https://youtube.com/@creator"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <small>Link to their channel or main profile.</small>
          </label>

          <label>
            Description
            <textarea
              placeholder="What kind of content do they make? Why should others follow?"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Image URL <em>(optional)</em>
            <input
              type="url"
              placeholder="https://..."
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>

          <fieldset>
            <legend>Social media <em>(all optional)</em></legend>

            <label className="social-field">
              <span><SiYoutube style={{ color: '#FF0000' }} /> YouTube</span>
              <input
                type="url"
                placeholder="https://youtube.com/@..."
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiX /> X (Twitter)</span>
              <input
                type="url"
                placeholder="https://x.com/..."
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiInstagram style={{ color: '#E1306C' }} /> Instagram</span>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiTiktok style={{ color: '#69C9D0' }} /> TikTok</span>
              <input
                type="url"
                placeholder="https://tiktok.com/@..."
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </label>
          </fieldset>

          <div className="form-actions">
            <button type="submit" aria-busy={submitting}>
              {submitting ? 'Adding...' : 'Add Creator'}
            </button>
            <Link to="/" role="button" className="secondary">
              Cancel
            </Link>
          </div>
        </form>
      </article>
    </section>
  )
}

export default AddCreator
