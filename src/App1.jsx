
function App() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    const price = parseFloat(form.price);
    if (!form.price || isNaN(price) || price <= 0.01)
      errs.price = 'Price must be over 0.01';
    return errs;
  };

  const handleChange = (e) => {
    setForm((formData) => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const res = await fetch('https://api.oluwasetemi.dev/api/v0/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Error creating product' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label> <br />
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div>{errors.name}</div>}
        </div>

        <div>
          <label>Description</label> <br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <div>{errors.description}</div>}
        </div>

        <div>
          <label>Price</label> <br />
          <input
            type="number"
            name="price"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <div>{errors.price}</div>}
        </div>

        <button type="submit">Create Product</button>
      </form>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </>
  );
}

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
      errs.name = 'name is required (min 1 character)';
    }

    if (form.price === '' || Number(form.price) < 0) {
      errs.price = 'Price must be 0 or more';
    }

    if (form.quantity !== '' && Number(form.quantity) < 0) {
      errs.quantity = 'Quantity must be 0 or more';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, tyoe, checked } = e.target;
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
        headers: {
          'Content-Type': 'application/json',
        },
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
      <form action="">
        <div>
          <label>Name</label> <br />
          <input
            type="text"
            name="name"
            value={form.value}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Price</label> <br />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <label>Quantity</label>
          <br />
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
        <pre style={{ marginTop: 20 }}>{JSON.stringify(response, null, 2)}</pre>
      )}
    </>
  );
}