
import { Link } from "react-router-dom"
import { ArrowRight, Plus, Edit, Trash2 } from "lucide-react"
import NavBar from "../Components/NavBar";
import { useWorldWise } from "../contexts/useWorldWise";


export default function Pricing() {
  
  const { locationInfo, dispatch } = useWorldWise();
  

  return (
    <div className="min-h-screen bg-mountain">
      <div className="min-h-screen bg-overlay">
        <NavBar />

        <div className="container py-12">
          <div className="pricing-hero">
            <h1 className="pricing-title">Travel Budget by City</h1>
            <p className="pricing-subtitle">
              Discover budget-friendly destinations and plan your next adventure with detailed cost breakdowns for
              cities around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 max-w-6xl mx-auto">
            {locationInfo.map((city,id) => (
              <div key={id} className="card city-card">
                <div className="card-content-no-padding">
                  <div className="relative">
                    <img src={city.image || "/placeholder.svg"} alt={city.city} className="city-image" />
                    <div className="city-actions">
                      <button
                        className="btn btn-sm btn-destructive"
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch({type:"remove",index:id})
                        }}
                      >
                        <Trash2 className="icon-sm" />
                      </button>
                    </div>
                  </div>

                  <Link to={`/budgeting/${id}`} className="city-card">
                    <div className="city-info">
                      <div className="city-header">
                        <div>
                          <h3 className="city-name">{city.city}</h3>
                          <p className="city-country">{city.country}</p>
                        </div>
                        <div>
                          <p className="city-budget">{city.budget}</p>
                        </div>
                      </div>

                      <p className="city-description">{city.description}</p>

                      <div className="city-link">
                        <span>View Budget</span>
                        <ArrowRight className="icon" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
