import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    quantity: '',
    featured: false,
    published: true,
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const validate = () => {
    const errs = {};

    if (!form.name || form.name.trim().length < 1) {
      errs.name = 'Name is required';
    }

    if (form.price === '' || Number(form.price) < 0) {
      errs.price = 'Price must be greater than 0';
    }

    if (form.quantity !== '' && Number(form.quantity) < 0) {
      errs.quantity = 'Quantity must be greater than 0';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((formData) => ({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      name: form.name,
      price: Number(form.price),
      quantity: form.quantity === '' ? null : Number(form.quantity),
      featured: form.featured,
      published: form.published,
    };

    try {
      const res = await fetch('https://api.oluwasetemi.dev/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: 'Request failed' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Price</label><br />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <label>Quantity</label><br />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <p>{errors.quantity}</p>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
            Published
          </label>
        </div>

        <button type="submit">Create Product</button>
      </form>

      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </>
  );
}

export default App;
