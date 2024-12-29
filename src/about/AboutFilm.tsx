import { Link, useParams } from "react-router-dom"
import { Movie } from "../types/Types"

const AboutFilm = () => {

  const { name } = useParams();
  return (
    <div>
      <Link to={`/`} className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-auto py-1">
          <button className='w-full'>
            Back
          </button>
        </Link>
        <div>{name}</div>
    </div>
  )
}

export default AboutFilm