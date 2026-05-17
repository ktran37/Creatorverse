import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { SiYoutube, SiX, SiInstagram, SiTiktok } from 'react-icons/si'
import { supabase } from '../clients.js'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [youtube, setYoutube] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()
      if (error) return console.error(error)
      setName(data.name)
      setUrl(data.url)
      setDescription(data.description)
      setImageURL(data.imageURL ?? '')
      setYoutube(data.youtube ?? '')
      setTwitter(data.twitter ?? '')
      setInstagram(data.instagram ?? '')
      setTiktok(data.tiktok ?? '')
    }
    fetchCreator()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('creators')
      .update({
        name,
        url,
        description,
        imageURL,
        youtube: youtube || null,
        twitter: twitter || null,
        instagram: instagram || null,
        tiktok: tiktok || null,
      })
      .eq('id', id)
    if (error) console.error(error)
    else navigate('/')
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)
    if (error) console.error(error)
    else navigate('/')
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">← Back to all creators</Link>
      <header className="section-head">
        <h2>Edit creator</h2>
      </header>

      <article>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            URL
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Image URL <em>(optional)</em>
            <input
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
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiX /> X (Twitter)</span>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiInstagram style={{ color: '#E1306C' }} /> Instagram</span>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </label>

            <label className="social-field">
              <span><SiTiktok style={{ color: '#69C9D0' }} /> TikTok</span>
              <input
                type="url"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </label>
          </fieldset>

          <div className="form-actions">
            <button type="submit">Update Creator</button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                if (window.confirm('Delete this creator?')) handleDelete()
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}

export default EditCreator
