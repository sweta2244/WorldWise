import { useParams } from "react-router-dom";
import { useState } from "react";
import { Save, X, Edit, Plus, Trash2 } from "lucide-react";
import NavBar from "../components/NavBar";
import { useWorldWise } from "../contexts/useWorldWise";

export default function CityDetailPage() {
  const { locationInfo, dispatch } = useWorldWise();
  const { id } = useParams();
  const index = Number(id); // ✅ Ensure index is a number

  const [city, setCity] = useState(locationInfo[index] || null);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    city: city?.city || "",
    country: city?.country || "",
    budget: city?.budget || "",
    description: city?.description || "",
    image: city?.image || "",
  });

  const [budgetItems, setBudgetItems] = useState(city?.budgetItems || []);
  const [newItem, setNewItem] = useState({ category: "", amount: "", description: "" });
  const [showAddItem, setShowAddItem] = useState(false);

  if (!city) {
    return (
      <div className="error-page">
        <div className="error-content">
          <h1 className="error-title">City not found</h1>
        </div>
      </div>
    );
  }

  /** ✅ Save entire city */
  const handleSave = () => {
    const updatedCity = {
      ...city,
      ...editForm,
      budgetItems,
    };
    setCity(updatedCity);
    setIsEditing(false);

    dispatch({
      type: "save",
      index,
      budget: updatedCity.budget,
      description: updatedCity.description,
      image: updatedCity.image,
      budgetItems: updatedCity.budgetItems,
    });
  };

  /** ✅ Add budget item */
  const handleAddBudgetItem = () => {
    const item = {
      id: Date.now().toString(),
      ...newItem,
    };
    const updatedItems = [...budgetItems, item];
    setBudgetItems(updatedItems);
    setNewItem({ category: "", amount: "", description: "" });
    setShowAddItem(false);

    dispatch({ type: "add_item", index, budgetItem: item });
  };

  /** ✅ Delete budget item */
  const handleDeleteBudgetItem = (itemIndex) => {
    const updatedItems = budgetItems.filter((_, idx) => idx !== itemIndex);
    setBudgetItems(updatedItems);

    dispatch({ type: "delete_item", index, i_index: itemIndex });
  };

  /** ✅ Update budget item */
  const handleUpdateBudgetItem = (itemIndex, field, value) => {
    const updatedItems = budgetItems.map((item, idx) =>
      idx === itemIndex ? { ...item, [field]: value } : item
    );
    setBudgetItems(updatedItems);

  };

  const totalBudget = budgetItems.reduce((sum, item) => {
    const amount = Number.parseFloat(item.amount.replace(/[^0-9.]/g, "")) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-mountain">
      <div className="min-h-screen bg-overlay">
        <NavBar />

        <div className="container py-8">
          <div className="city-detail-grid">
            {/* ✅ City Info Section */}
            <div className="card">
              <div className="card-content-no-padding">
                <div className="relative">
                  {isEditing ? (
                    <div className="p-6">
                      <label className="form-label" htmlFor="image">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        className="form-input mb-4"
                        value={editForm.image}
                        onChange={(e) =>
                          setEditForm({ ...editForm, image: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <img
                      src={city.image || "/placeholder.svg"}
                      alt={city.city}
                      className="city-detail-image"
                    />
                  )}

                  <div className="city-detail-actions">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary" onClick={handleSave}>
                          <Save className="icon" />
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="icon" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="icon" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="city-detail-info">
                  {isEditing ? (
                    <div className="dialog-form">
                      <div className="form-group">
                        <label className="form-label" htmlFor="city">
                          City
                        </label>
                        <input
                          id="city"
                          className="form-input"
                          value={editForm.city}
                          onChange={(e) =>
                            setEditForm({ ...editForm, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="country">
                          Country
                        </label>
                        <input
                          id="country"
                          className="form-input"
                          value={editForm.country}
                          onChange={(e) =>
                            setEditForm({ ...editForm, country: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="budget">
                          Daily Budget
                        </label>
                        <input
                          id="budget"
                          className="form-input"
                          value={editForm.budget}
                          onChange={(e) =>
                            setEditForm({ ...editForm, budget: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-textarea"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="city-detail-header-info">
                        <div>
                          <h1 className="city-detail-title">{city.city}</h1>
                          <p className="city-detail-country">{city.country}</p>
                        </div>
                        <div className="city-detail-budget">
                          <p className="city-detail-budget-amount">
                            {city.budget}
                          </p>
                          <p className="city-detail-budget-label">per day</p>
                        </div>
                      </div>
                      <p className="city-detail-description">
                        {city.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ✅ Budget Breakdown Section */}
            <div className="card">
              <div className="card-header">
                <div className="budget-header">
                  <h2 className="card-title">Budget Breakdown</h2>
                  <div className="budget-total">
                    <span className="budget-total-amount">
                      ${totalBudget.toFixed(0)}/day
                    </span>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setShowAddItem(true)}
                    >
                      <Plus className="icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="budget-items">
                  {budgetItems.map((item, idx) => (
                    <div key={item.id} className="budget-item">
                      <div className="budget-item-info">
                        {isEditing ? (
                          <div className="dialog-form">
                            <input
                              className="form-input mb-2"
                              value={item.category}
                              onChange={(e) =>
                                handleUpdateBudgetItem(
                                  idx,
                                  "category",
                                  e.target.value
                                )
                              }
                              placeholder="Category"
                            />
                            <input
                              className="form-input"
                              value={item.description}
                              onChange={(e) =>
                                handleUpdateBudgetItem(
                                  idx,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="budget-item-category">
                              {item.category}
                            </h4>
                            <p className="budget-item-description">
                              {item.description}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="budget-item-actions">
                        {isEditing ? (
                          <input
                            className="form-input budget-item-input"
                            value={item.amount}
                            onChange={(e) =>
                              handleUpdateBudgetItem(
                                idx,
                                "amount",
                                e.target.value
                              )
                            }
                            placeholder="$0"
                          />
                        ) : (
                          <span className="budget-item-amount">
                            {item.amount}
                          </span>
                        )}
                        {isEditing && (
                          <button
                            className="btn btn-sm btn-destructive"
                            onClick={() => handleDeleteBudgetItem(idx)}
                          >
                            <Trash2 className="icon-sm" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {showAddItem && (
                    <div className="budget-add-form">
                      <div className="budget-add-inputs">
                        <input
                          className="form-input"
                          placeholder="Category (e.g., Food, Transport)"
                          value={newItem.category}
                          onChange={(e) =>
                            setNewItem({ ...newItem, category: e.target.value })
                          }
                        />
                        <input
                          className="form-input"
                          placeholder="Amount (e.g., $25)"
                          value={newItem.amount}
                          onChange={(e) =>
                            setNewItem({ ...newItem, amount: e.target.value })
                          }
                        />
                        <input
                          className="form-input"
                          placeholder="Description"
                          value={newItem.description}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="budget-add-actions">
                        <button
                          className="btn btn-primary"
                          onClick={handleAddBudgetItem}
                        >
                          Add Item
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowAddItem(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
